import type { Annotation } from '@/models/annotation';
import type { Label } from '@/models/label';
import type { ToolType } from '@/pages/SemanticSegmentation';
import type Konva from 'konva';
import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import { Circle, Line } from 'react-konva';

export type PPPolygonType = {
  color: string;
  points: number[];
  element?: React.ReactElement;
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

function createPolygon(
  color: string,
  points: number[],
  closed?: boolean,
): PPPolygonType | undefined {
  console.log(color, points);
  if (!color || !points) return undefined;
  const rgb = hexToRgb(color);
  if (!rgb) return undefined;

  // Create dots
  let x: number | undefined = undefined;
  const pointElements: ReactElement[] = [];
  points.forEach((point) => {
    if (!x) {
      x = point;
      return;
    }
    pointElements.push(<Circle x={x} y={point} radius={5} fill={color} />);
    x = undefined;
  });

  console.log(rgb);
  console.log(pointElements);

  return {
    color: color,
    points: points,
    element: (
      <>
        <Line
          stroke={color}
          strokeWidth={2}
          globalCompositeOperation="source-over"
          lineCap="round"
          points={points}
          tension={0.01}
          closed={closed}
          fill={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`}
        />
        {pointElements}
      </>
    ),
  };
}

/**
 * Get the max id from annotation list
 * If no annotation, start from 0
 * @param annotations
 * @returns
 */
function getMaxId(annotations: Annotation<PPPolygonType>[]): any {
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
  annotations: Annotation<PPPolygonType>[];
  currentAnnotation?: Annotation<PPPolygonType>;
  onAnnotationAdd: (annotation: Annotation<PPPolygonType>) => void;
  onAnnotationModify: (annotation: Annotation<PPPolygonType>) => void;
}) {
  const [currentTool, setCurrentTool] = useState(props.currentTool);
  useEffect(() => {
    setCurrentTool(props.currentTool);
  }, [props.currentTool]);

  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    console.log(currentTool);
    if (currentTool != 'polygon') return;
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      const polygon = createPolygon(props.currentLabel?.color, [e.evt.offsetX, e.evt.offsetY]);
      if (!polygon) return;
      props.onAnnotationAdd({
        annotationId: getMaxId(props.annotations) + 1,
        label: props.currentLabel,
        lines: [polygon],
      });
    } else {
      // Add a dot, add point to this line
      const existLines = props.currentAnnotation?.lines || [];
      const polygon = createPolygon(
        props.currentLabel?.color,
        existLines[0]?.points.concat([e.evt.offsetX, e.evt.offsetY]),
      );
      if (!polygon) return;
      const anno = {
        annotationId: props.currentAnnotation.annotationId,
        label: props.currentAnnotation.label,
        lines: [polygon],
      };
      props.onAnnotationModify(anno);
      console.log(anno);
    }
  };

  const OnMouseUp = () => {
    if (currentTool != 'polygon') return;
    // console.log(`OnMouseUp`);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: () => {},
    onMouseUp: OnMouseUp,
  };
}
