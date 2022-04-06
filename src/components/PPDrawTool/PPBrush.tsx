import type { ToolType } from '@/models/ToolType';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Group, Image } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { getMaxId } from './drawUtils';

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
 * Brush operate canvas directly, therefore only render raw png got from backend
 */
function drawLine(props: PPRenderFuncProps<PPLineType[]>): ReactElement {
  console.log(`drawLine: `, props.annotation);
  if (!props.annotation) return <></>;
  const img = props.annotation.png ? <Image image={props.annotation.png} /> : <></>;
  const ctx = props.canvasRef.current?.getContext('2d');
  if (!ctx || !props.annotation.lines) {
    return img;
  }
  for (const line of props.annotation.lines) {
    // console.log(`drawing line: `, line);
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
    ctx.globalCompositeOperation = line.tool == 'brush' ? 'source-over' : 'destination-out';
    // ctx.closePath();
    ctx.stroke();
  }
  props.layerRef.current?.batchDraw();
  return <Group draggable={false}>{img}</Group>;
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

  const OnMouseDown = (param: EvtProps) => {
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      !props.currentLabel?.color
    )
      return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    const tool = getTool(props.currentTool, param.e.evt.button);
    const line = createLine(
      props.brushSize || 10,
      props.currentLabel?.color,
      [mouseX, mouseY, mouseX, mouseY],
      tool,
    );
    if (!line) return;
    setCurrentTool(tool);
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      // Do not start new marking with rubber
      if (tool == 'rubber') return;
      props.onAnnotationAdd({
        dataId: props.dataId,
        type: tool,
        frontendId: getMaxId(props.annotations) + 1,
        label: props.currentLabel,
        lines: [line],
      });
    } else {
      const anno = {
        type: 'brush' as ToolType,
        frontendId: props.currentAnnotation.frontendId,
        label: props.currentAnnotation.label,
        lines: props.currentAnnotation.lines?.concat([line]),
        dataId: props.dataId,
      };
      props.onAnnotationModify(anno);
    }
  };

  const OnMouseMove = (param: EvtProps) => {
    if (!currentTool || !props.currentAnnotation || !props.currentLabel?.color) return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    let newPoints = [mouseX, mouseY];
    let newLines: PPLineType[] = [];
    if (props.currentAnnotation?.lines) {
      newPoints =
        props.currentAnnotation.lines[props.currentAnnotation.lines.length - 1].points.concat(
          newPoints,
        );
      newLines = props.currentAnnotation.lines;
    }
    const line = createLine(
      props.brushSize || 10,
      props.currentLabel.color,
      newPoints,
      currentTool,
    );
    if (!line) return;
    newLines.pop();
    newLines.push(line);
    props.onAnnotationModify({
      ...props.currentAnnotation,
      lines: newLines,
      type: currentTool,
    });
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
    createElementsFunc: drawLine,
  };
}
