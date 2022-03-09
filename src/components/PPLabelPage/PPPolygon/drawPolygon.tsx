import type { Annotation } from '@/models/annotation';
import type { Label } from '@/models/label';
import type { ToolType } from '@/pages/SemanticSegmentation';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import React from 'react';
import { Circle, Line } from 'react-konva';

export type PPPolygonType = {
  color: string;
  points: number[];
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

function createPolygon(color: string, points: number[]): PPPolygonType | undefined {
  if (!color || !points) return undefined;
  return {
    color: color,
    points: points,
  };
}

function createPolygons(annotations?: Annotation<PPPolygonType>[]): ReactElement[] {
  if (!annotations) return [<></>];
  const res = [];
  for (const annotation of annotations) {
    if (!annotation || !annotation.lines || !annotation.lines[0]) continue;
    const points = annotation.lines[0].points;
    const color = annotation.lines[0].color;
    const rgb = hexToRgb(color);
    if (!rgb) continue;

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
    // Create polygon
    res.push(
      <>
        <Line
          stroke={color}
          strokeWidth={2}
          globalCompositeOperation="source-over"
          lineCap="round"
          points={points}
          tension={0.01}
          closed={true}
          fill={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`}
        />
        {pointElements}
      </>,
    );
  }
  return res;
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
  const startNewPolygon = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
    const polygon = createPolygon(props.currentLabel?.color, [mouseX, mouseY]);
    if (!polygon) return;
    props.onAnnotationAdd({
      annotationId: getMaxId(props.annotations) + 1,
      label: props.currentLabel,
      lines: [polygon],
    });
  };

  const addDotToPolygon = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    if (!props.currentAnnotation) return;
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
    const existLines = props.currentAnnotation.lines || [];
    const polygon = createPolygon(
      props.currentLabel?.color,
      existLines[0]?.points.concat([mouseX, mouseY]),
    );
    if (!polygon) return;
    const anno = {
      annotationId: props.currentAnnotation.annotationId,
      label: props.currentAnnotation.label,
      lines: [polygon],
    };
    props.onAnnotationModify(anno);
  };

  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    if (props.currentTool != 'polygon') return;
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      startNewPolygon(e, scale);
    } else {
      addDotToPolygon(e, scale);
    }
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'polygon') return;
    // console.log(`OnMouseUp`);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: () => {},
    onMouseUp: OnMouseUp,
    createElementsFunc: createPolygons,
  };
}
