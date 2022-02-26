import { Annotation } from '@/models/annotation';
import { Label } from '@/models/label';
import { ToolType } from '@/pages/SemanticSegmentation';
import Konva from 'konva';
import React from 'react';
import { useState } from 'react';
import { Line } from 'react-konva';

export type PPLineType = {
  width: number;
  color: string;
  points: number[];
  tool: ToolType;
  element?: React.ReactElement;
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
    element: (
      <Line
        stroke={color}
        strokeWidth={width}
        globalCompositeOperation={tool === 'brush' ? 'source-over' : 'destination-out'}
        lineCap="round"
        points={points}
        tension={0.01}
      />
    ),
  };
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
function getMaxId(annotations: Annotation[]): any {
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
  annotations: Annotation[];
  currentAnnotation?: Annotation;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationModify: (annotation: Annotation) => void;
}) {
  const [currentTool, setCurrentTool] = useState<ToolType>();
  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log(
    //   `OnMouseDown, drawing on annotation: ${JSON.stringify(
    //     props.currentAnnotation,
    //   )}. Annotations: ${JSON.stringify(props.annotations)}`,
    // );
    const tool = getTool(props.currentTool, e.evt.button);
    const line = createLine(
      props.brushSize || 10,
      props.currentLabel?.color,
      [e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY],
      tool,
    );
    if (!line) return;
    setCurrentTool(tool);
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
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
      console.log(anno);
    }
  };

  const OnMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log(`onMouseMove, marking: ${marking}`);
    if (!currentTool || !props.currentAnnotation) return;
    let newPoints = [e.evt.offsetX, e.evt.offsetY];
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
    // console.log(`OnMouseUp`);
    setCurrentTool(undefined);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
  };
}
