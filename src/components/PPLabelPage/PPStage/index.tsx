/* eslint-disable @typescript-eslint/no-unused-vars */
import { Annotation } from '@/models/Annotation';
import { ToolType } from '@/models/ToolType';
import { Label } from '@/models/Label';
import type Konva from 'konva';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Layer, Stage, Image, Group } from 'react-konva';
import useImage from 'use-image';
import styles from './index.less';
import PPBrush from '@/components/PPDrawTool/PPBrush';
import { EvtProps, PPDrawToolRet } from '@/components/PPDrawTool/drawUtils';

// Mock Data
const imgSrc = './pics/basketball.jpg';

// Calculate current mouse pointer
function getPointer(toolType: ToolType) {
  switch (toolType) {
    case 'mover':
      return 'move';
    case 'rectangle':
    case 'polygon':
      return 'crosshair';
    default:
      return 'default';
  }
}

export type PPStageProps = {
  imgSrc?: string;
  scale: number;
  annotations?: Annotation<any>[];
  currentTool: ToolType;
  currentAnnotation?: Annotation<any>;
  setCurrentAnnotation: (anntation: Annotation<any>) => void;
  onAnnotationAdd: (anntation: Annotation<any>) => void;
  onAnnotationModify: (annotation: Annotation<any>) => void;
  onAnnotationModifyComplete: () => void;
  transparency: number;
  drawTool: PPDrawToolRet;
};

const Component: React.FC<PPStageProps> = (props) => {
  const [image] = useImage(props.imgSrc || imgSrc);
  const transparency = props.transparency == undefined ? 0 : props.transparency * 0.01;

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const [dragEndPos, setDragEndPos] = useState({ x: 0, y: 0 });

  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<LayerType>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamically adjust canvas size, prevent content overflow
  function handleWindowResize() {
    const parent = document.getElementById('dr');
    if (parent) {
      // console.log(`parentSize: `, parent.clientWidth, parent.clientHeight);
      setCanvasWidth(parent.clientWidth);
      setCanvasHeight(parent.clientHeight);
    }
  }

  // Decide render method

  useEffect(() => {
    // Listen to window resize event
    window.removeEventListener('resize', handleWindowResize);
    window.addEventListener('resize', handleWindowResize);
    // Set inital canvas size
    const parent = document.getElementById('dr');
    if (parent) {
      setCanvasWidth(parent.clientWidth);
      setCanvasHeight(parent.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;
    // console.log('props.currentTool', props.currentTool, 'cursor:', getPointer(props.currentTool));
    stageRef.current.container().style.cursor = getPointer(props.currentTool);
  }, [props.currentTool]);

  const getEvtParam = (e: Konva.KonvaEventObject<MouseEvent>) => {
    return {
      e: e,
      offsetX: -canvasWidth / 2 - dragEndPos.x,
      offsetY: -canvasHeight / 2 - dragEndPos.y,
      canvasRef: canvasRef,
      layerRef: layerRef,
    };
  };

  // Handle layer events
  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // e.cancelBubble = true;
    // console.log(
    //   `PPStage onMouseDown, offsetXY:`,
    //   -canvasWidth / 2 - dragEndPos.x,
    //   -canvasHeight / 2 - dragEndPos.y,
    //   props.scale,
    // );
    props.drawTool.onMouseDown(getEvtParam(e));
  };
  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    props.drawTool.onMouseMove(getEvtParam(e));
  };
  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    props.drawTool.onMouseUp(getEvtParam(e));
  };
  const onContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log('imgLayer onContextMenu');
    e.cancelBubble = true;
    // Prevent right-click menu
    e.evt.preventDefault();
  };

  const shapes = [];
  if (props.annotations) {
    console.log('PPStage rendering annotations:', props.annotations);
    for (const annotation of props.annotations) {
      if (!annotation) continue;
      const layer = props.drawTool.createElementsFunc({
        annotation: annotation,
        onDrag: props.onAnnotationModify,
        onDragEnd: props.onAnnotationModifyComplete,
        scale: props.scale,
        currentTool: props.currentTool,
        onSelect: props.setCurrentAnnotation,
        stageRef: stageRef,
        currentAnnotation: props.currentAnnotation,
        transparency: transparency,
        canvasRef: canvasRef,
        layerRef: layerRef,
      });
      shapes.push(layer);
    }
  }

  const draggable = props.currentTool == 'mover';

  return (
    <>
      <canvas
        style={{ display: 'none' }}
        ref={canvasRef}
        width={image?.width}
        height={image?.height}
      />
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        offsetX={-canvasWidth / 2}
        offsetY={-canvasHeight / 2}
        className={styles.stage}
        ref={stageRef}
        // Can not apply scale on Stage cuz it always scale from left corner
        draggable={draggable}
        onDragMove={(evt) => {
          if (props.currentTool != 'mover') return;
        }}
        onDragEnd={(evt) => {
          if (props.currentTool != 'mover') return;
          console.log(`dragEndPosX,Y: (${evt.target.x()},${evt.target.y()})`);
          setDragEndPos({
            x: evt.target.x(),
            y: evt.target.y(),
          });
        }}
      >
        <Layer
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onContextMenu={onContextMenu}
          scaleX={props.scale}
          scaleY={props.scale}
          draggable={false}
        >
          <Image
            name="baseImage"
            draggable={false}
            image={image}
            x={-(image?.width || 0) / 2}
            y={-(image?.height || 0) / 2}
          />
        </Layer>
        <Layer
          ref={layerRef}
          name="annotation"
          scaleX={props.scale}
          scaleY={props.scale}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onContextMenu={onContextMenu}
        >
          {shapes}
          <Image
            x={-(image?.width || 0) / 2}
            y={-(image?.height || 0) / 2}
            image={canvasRef.current || undefined}
          />
        </Layer>
      </Stage>
    </>
  );
};
export default Component;
