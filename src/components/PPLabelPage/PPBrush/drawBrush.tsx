import type { Annotation } from '@/models/Annotation';
import type { Label } from '@/models/Label';
import type { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Line, Group } from 'react-konva';
import { PPDrawFuncProps } from '../PPStage';

export type PPLineType = {
  width: number;
  color: string;
  points: number[];
  tool: ToolType;
};

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

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

function drawLine(props: PPDrawFuncProps): ReactElement {
  // console.log(`drawLine: `, annotation);
  if (!props.annotation || !props.annotation.points) return <></>;
  const res = [];
  for (const line of props.annotation.points) {
    // console.log(`rendering line: `, line.points);
    if (!line.width || !line.color || !line.tool) continue;
    const rgb = hexToRgb(line.color);
    if (!rgb) continue;
    res.push(
      <Line
        stroke={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${props.transparency * 0.01})`}
        strokeWidth={line.width}
        globalCompositeOperation={line.tool === 'brush' ? 'source-over' : 'destination-out'}
        lineCap="round"
        points={line.points}
        tension={1}
      />,
    );
  }
  return <Group draggable={false}>{res}</Group>;
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
function getMaxId(annotations: Annotation<PPLineType[]>[]): any {
  let maxId = 0;
  for (const annotation of annotations) {
    if (!annotation || !annotation.frontendId) continue;
    if (annotation.frontendId > maxId) maxId = annotation.frontendId;
  }
  return maxId;
}

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

  const OnMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      !props.currentLabel?.color
    )
      return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
    // console.log(
    //   `e.evt.offsetX,Y: (${e.evt.offsetX},${e.evt.offsetY}). offsetX,Y: (${offsetX},${offsetY}). mouseX,Y: (${mouseX},${mouseY}). scale: ${scale}`,
    // );
    const tool = getTool(props.currentTool, e.evt.button);
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
        type: tool,
        frontendId: getMaxId(props.annotations) + 1,
        label: props.currentLabel,
        points: [line],
      });
    } else {
      const anno = {
        type: 'brush' as ToolType,
        frontendId: props.currentAnnotation.frontendId,
        label: props.currentAnnotation.label,
        points: props.currentAnnotation.points?.concat([line]),
      };
      props.onAnnotationModify(anno);
    }
  };

  const OnMouseMove = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (!currentTool || !props.currentAnnotation || !props.currentLabel.color) return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
    let newPoints = [mouseX, mouseY];
    let newLines: PPLineType[] = [];
    if (props.currentAnnotation?.points) {
      newPoints =
        props.currentAnnotation.points[props.currentAnnotation.points.length - 1].points.concat(
          newPoints,
        );
      newLines = props.currentAnnotation.points;
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
      points: newLines,
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
