import type { Annotation } from '@/models/annotation';
import type { Label } from '@/models/label';
import type { ToolType } from '@/pages/SemanticSegmentation';
import type Konva from 'konva';
import React, { ReactElement } from 'react';
import { useState } from 'react';
import { Line } from 'react-konva';

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

function createLines(annotations?: Annotation<PPLineType>[]): ReactElement[] {
  if (!annotations) return [<></>];
  const res = [];
  for (const annotation of annotations) {
    if (!annotation || !annotation.lines) continue;
    for (const line of annotation.lines) {
      if (!line.width || !line.color || !line.points || !line.tool) continue;
      res.push(
        <Line
          stroke={line.color}
          strokeWidth={line.width}
          globalCompositeOperation={line.tool === 'brush' ? 'source-over' : 'destination-out'}
          lineCap="round"
          points={line.points}
          tension={0.01}
        />,
      );
    }
  }
  return res;
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
function getMaxId(annotations: Annotation<PPLineType>[]): any {
  let maxId = 0;
  for (const annotation of annotations) {
    if (!annotation) continue;
    if (annotation.annotationId > maxId) maxId = annotation.annotationId;
  }
  return maxId;
}

export default function (props: {
  currentLabel: Label;
  brushSize?: number;
  points?: number[];
  currentTool?: ToolType;
  annotations: Annotation<PPLineType>[];
  currentAnnotation?: Annotation<PPLineType>;
  onAnnotationAdd: (annotation: Annotation<PPLineType>) => void;
  onAnnotationModify: (annotation: Annotation<PPLineType>) => void;
}) {
  // console.log('drawBrush');
  const [currentTool, setCurrentTool] = useState<ToolType>();

  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    console.log(props.currentTool);
    if (props.currentTool != 'brush' && props.currentTool != 'rubber') return;
    // console.log(
    //   `OnMouseDown, drawing on annotation: ${JSON.stringify(
    //     props.currentAnnotation,
    //   )}. Annotations: ${JSON.stringify(props.annotations)}`,
    // );
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
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
        annotationId: getMaxId(props.annotations) + 1,
        label: props.currentLabel,
        lines: [line],
      });
    } else {
      const anno = {
        annotationId: props.currentAnnotation.annotationId,
        label: props.currentAnnotation.label,
        lines: props.currentAnnotation.lines?.concat([line]),
      };
      props.onAnnotationModify(anno);
    }
  };

  const OnMouseMove = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    if (!currentTool || !props.currentAnnotation) return;
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
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
    });
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'brush' && props.currentTool != 'rubber') return;
    // console.log(`OnMouseUp`);
    setCurrentTool(undefined);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    createElementsFunc: createLines,
  };
}
