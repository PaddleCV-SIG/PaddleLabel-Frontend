import type { ToolType } from '@/models/ToolType';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Group, Image } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { Layer as LayerType } from 'konva/lib/Layer';
import { getMaxId } from './drawUtils';

type CanvasLineType = {
  lineId: number;
  type: ToolType;
  width: number;
  color: string;
  points: number[];
};

function createLine(param: CanvasLineType): CanvasLineType | undefined {
  if (!param || !param.width || !param.color || !param.points || !param.lineId) return undefined;
  return param;
}

/**
 * After render image, render newly drew lines.
 */
function drawDirectCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  layerRef: React.RefObject<LayerType>,
  canvasLines: CanvasLineType[],
) {
  console.log(`drawDirectCanvas line: `, canvasLines);
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx || canvasLines.length == 0) {
    return;
  }
  // Clear canvas
  if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // Draw lines and rubbers
  for (const line of canvasLines) {
    console.log(`drawDirectCanvas line: `, line);
    const points = line.points;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 0; i <= points.length / 2 - 1; i++) {
      const x = points[2 * i];
      const y = points[2 * i + 1];
      // console.log(`points.length: ${points.length}, i: ${i}, lineTo: ${x}, ${y}`);
      ctx.lineTo(x, y);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = line.width;
    ctx.strokeStyle = line.color;
    ctx.globalCompositeOperation = line.type == 'brush' ? 'source-over' : 'destination-out';
    // ctx.closePath();
    ctx.stroke();
  }
  // Re draw layer
  layerRef.current?.batchDraw();
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

export default function (props: PPDrawToolProps): PPDrawToolRet {
  const [currentTool, setCurrentTool] = useState<ToolType>();
  const [canvasLines, setCanvasLines] = useState<CanvasLineType[]>([]);
  const [lineIdCounter, setLineIdCounter] = useState<number>(0);
  const lineIdIncreaseAndGet = () => {
    setLineIdCounter(lineIdCounter + 1);
    return lineIdCounter + 1;
  };
  const addCanvasLines = (line: CanvasLineType) => {
    const newLines = canvasLines.concat([line]);
    setCanvasLines(newLines);
    return newLines;
  };

  /**
   * Brush operate canvas directly, therefore only render raw png got from backend
   */
  function drawImage(param: PPRenderFuncProps<number[]>): ReactElement {
    // console.log(`drawImage: `, param.annotation);
    if (!param.annotation) return <></>;
    const img = param.annotation.png ? <Image image={param.annotation.png} /> : <></>;
    return img;
  }

  const OnMouseDown = (param: EvtProps) => {
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      !props.currentLabel?.color
    )
      return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    const tool = getTool(props.currentTool, param.e.evt.button);
    const line = createLine({
      width: props.brushSize || 10,
      color: props.currentLabel?.color,
      points: [mouseX, mouseY, mouseX, mouseY],
      type: tool,
      lineId: lineIdIncreaseAndGet(),
    });
    if (!line) return;
    setCurrentTool(tool);
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      // Do not start new marking with rubber
      if (tool == 'rubber') return;
      props.onAnnotationAdd({
        dataId: props.dataId,
        frontendId: getMaxId(props.annotations) + 1,
        label: props.currentLabel,
        lines: [line.lineId],
      });
    } else {
      const anno = {
        toolType: 'brush' as ToolType,
        frontendId: props.currentAnnotation.frontendId,
        label: props.currentAnnotation.label,
        lines: props.currentAnnotation.lines?.concat([line.lineId]),
        dataId: props.dataId,
      };
      props.onAnnotationModify(anno);
    }
    drawDirectCanvas(param.canvasRef, param.layerRef, addCanvasLines(line));
  };

  const OnMouseMove = (param: EvtProps) => {
    if (
      !currentTool ||
      !props.currentAnnotation ||
      !canvasLines.at(-1) ||
      !props.currentLabel?.color
    )
      return;
    const currentLine = canvasLines.pop();
    if (!currentLine) return;

    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    let newPoints = [mouseX, mouseY];
    if (props.currentAnnotation?.lines) {
      newPoints = currentLine.points.concat(newPoints);
    }
    const line = createLine({ ...currentLine, points: newPoints });
    if (!line) return;
    drawDirectCanvas(param.canvasRef, param.layerRef, addCanvasLines(line));
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'brush' && props.currentTool != 'rubber') return;
    // console.log(`OnMouseUp`);
    setCurrentTool(undefined);
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    createElementsFunc: drawImage,
  };
}
