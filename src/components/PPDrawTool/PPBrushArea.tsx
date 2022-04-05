import type { Annotation } from '@/models/Annotation';
import type { Label } from '@/models/Label';
import type { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Stage as StageType } from 'konva/lib/Stage';
import { Line, Group } from 'react-konva';
import { getMaxId, hexToRgb } from './drawUtils';
import type { PPRenderFuncProps } from './PPLabelPage/PPStage';

export type PPLineType = {
  width: number;
  color: string;
  points: number[];
  tool: ToolType;
};

function createLine(
  width: number,
  color: string,
  points: number[],
  tool: ToolType,
): PPLineType | undefined {
  if (!width || !color || !points || !tool) return undefined;
  return {
    width: width,
    color: color,
    points: points,
    tool: tool,
  };
}

/**
 * Don't need to draw
 */
function drawLine(): ReactElement {
  return <></>;
}

/**
 * Decide which tool should be applied
 * @param currentTool
 * @param mouseButton
 * @returns
 */
function getTool(currentTool: ToolType, mouseButton: number): ToolType {
  if (currentTool == 'rubber') return 'rubber';
  if (mouseButton == 2) return 'rubber';
  return 'brush';
}

/**
 * Get the max id from annotation list
 * If no annotation, start from 0
 * @param annotations
 * @returns
 */

export default function (props: {
  currentLabel: Label;
  brushSize?: number;
  points?: number[];
  currentTool?: ToolType;
  annotations: Annotation<PPLineType[]>[];
  currentAnnotation?: Annotation<PPLineType[]>;
  onAnnotationAdd: (annotation: Annotation<PPLineType[]>) => void;
  onAnnotationModify: (annotation: Annotation<PPLineType[]>) => void;
  onMouseUp: () => void;
}) {
  // console.log('drawBrush');
  const [currentTool, setCurrentTool] = useState<ToolType>();
  const [painting, setPainting] = useState<boolean>(false);

  const OnMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
    stageRef?: React.RefObject<StageType>,
  ) => {
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      !props.currentLabel?.color ||
      !stageRef?.current
    )
      return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
    // console.log(
    //   `e.evt.offsetX,Y: (${e.evt.offsetX},${e.evt.offsetY}). offsetX,Y: (${offsetX},${offsetY}). mouseX,Y: (${mouseX},${mouseY}). scale: ${scale}`,
    // );
    const tool = getTool(props.currentTool, e.evt.button);
    const layerRef = stageRef.current.findOne('.annotation');
    const ctx = layerRef.toCanvas().getContext('2d');
    console.log(`layerRef:`, layerRef, 'ctx:', ctx);
    if (!ctx) return;
    ctx.strokeStyle = props.currentLabel?.color;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(mouseX, mouseY);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    layerRef._requestDraw();
    setCurrentTool(tool);
    setPainting(true);
  };

  const OnMouseMove = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (!currentTool || !painting || !props.currentAnnotation || !props.currentLabel.color) return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'brush' && props.currentTool != 'rubber') return;
    // console.log(`OnMouseUp`);
    setCurrentTool(undefined);
    setPainting(false);
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    createElementsFunc: drawLine,
  };
}
