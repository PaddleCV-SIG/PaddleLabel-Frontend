import { Annotation } from '@/models/Annotation';
import { Label } from '@/models/Label';
import { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import { Circle, Group, Rect } from 'react-konva';

export type PPRectangleType = {
  xmin: number;
  ymin: number;
  xmax?: number;
  ymax?: number;
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

function createRectangle(color?: string, points?: number[]) {
  if (!color || !points || points.length < 2) return undefined;
  return {
    xmin: points[0],
    ymin: points[1],
    xmax: points[2] || undefined,
    ymax: points[3] || undefined,
  };
}

function drawRectangle(
  annotation: Annotation,
  onDrag: (anntation: Annotation) => void,
  onDragEnd: () => void,
  scale: number,
  currentTool: ToolType,
  onSelect: (anntation: Annotation) => void,
  currentAnnotation?: Annotation,
  offset?: { x: number; y: number },
): ReactElement[] {
  console.log(`drawRectangle, annotation:`, annotation);
  if (!annotation || !annotation.result || !annotation.label || !annotation.label.color)
    return [<></>];
  const points: PPRectangleType = JSON.parse(annotation.result);
  const color = annotation.label.color;
  const rgb = hexToRgb(color);
  if (!rgb) return [<></>];

  console.log(`drawRectangle, points:`, points, `color:`, color);
  const selected = currentAnnotation?.annotationId == annotation.annotationId;
  const transparency = selected ? 0.5 : 0.1;

  const rect =
    points.xmax && points.ymax ? (
      <Rect
        onMouseOver={() => {
          if (currentTool == 'mover') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        onClick={() => {
          if (currentTool == 'mover') onSelect(annotation);
        }}
        stroke={color}
        strokeWidth={2}
        globalCompositeOperation="source-over"
        lineCap="round"
        x={points.xmin}
        y={points.ymin}
        width={points.xmax - points.xmin}
        height={points.ymax - points.ymin}
        closed={true}
        fill={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`}
      />
    ) : (
      <></>
    );
  // Create dots
  return [
    <Group key={annotation.annotationId}>
      {rect}
      <Circle
        onMouseDown={() => {
          if (currentTool == 'editor' || currentTool == 'mover') onSelect(annotation);
        }}
        draggable={currentTool == 'editor'}
        onDragMove={(evt) => {
          if (currentTool != 'editor') return;
          const newPositionX = (evt.evt.offsetX + (offset?.x || 0)) / scale;
          const newPositionY = (evt.evt.offsetY + (offset?.y || 0)) / scale;
          points.xmin = newPositionX;
          points.ymin = newPositionY;
          const newAnno = {
            ...annotation,
            lines: [{ tool: 'rectangle' as ToolType, color: color, points: points }],
          };
          onDrag(newAnno);
        }}
        onMouseOver={() => {
          if (currentTool == 'editor') document.body.style.cursor = 'pointer';
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        x={points.xmin}
        y={points.ymin}
        radius={5}
        fill={color}
      />
      <Circle
        onMouseDown={() => {
          if (currentTool == 'editor' || currentTool == 'mover') onSelect(annotation);
        }}
        draggable={currentTool == 'editor'}
        onDragMove={(evt) => {
          if (currentTool != 'editor') return;
          const newPositionX = (evt.evt.offsetX + (offset?.x || 0)) / scale;
          const newPositionY = (evt.evt.offsetY + (offset?.y || 0)) / scale;
          points.xmax = newPositionX;
          points.ymax = newPositionY;
          const newAnno = {
            ...annotation,
            lines: [{ tool: 'rectangle' as ToolType, color: color, points: points }],
          };
          onDrag(newAnno);
        }}
        onMouseOver={() => {
          if (currentTool == 'editor') document.body.style.cursor = 'pointer';
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        x={points.xmax}
        y={points.ymax}
        radius={5}
        fill={color}
      />
    </Group>,
  ];
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
  onMouseUp: () => void;
}) {
  console.log('currentAnnotation', props.currentAnnotation);
  const startNewRectangle = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    const mouseX = e.evt.offsetX + offsetX / scale;
    const mouseY = e.evt.offsetY + offsetY / scale;

    const Rectangle = createRectangle(props.currentLabel?.color, [mouseX, mouseY]);
    if (!Rectangle) return;
    props.onAnnotationAdd({
      type: 'rectangle',
      label: props.currentLabel,
      result: JSON.stringify(Rectangle),
    });
  };

  const addDotToRectangle = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (!props.currentAnnotation || !props.currentAnnotation.result) return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
    const Rectangle: PPRectangleType = JSON.parse(props.currentAnnotation.result);
    if (!Rectangle) return;
    Rectangle.xmax = mouseX;
    Rectangle.ymax = mouseY;
    const anno = {
      type: 'rectangle' as ToolType,
      annotationId: props.currentAnnotation.annotationId,
      label: props.currentAnnotation.label,
      result: JSON.stringify(Rectangle),
    };
    props.onAnnotationModify(anno);
  };

  const OnMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (props.currentTool != 'rectangle') return;
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      startNewRectangle(e, offsetX, offsetY, scale);
    } else {
      addDotToRectangle(e, offsetX, offsetY, scale);
    }
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'rectangle') return;
    // console.log(`OnMouseUp`);
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: () => {},
    onMouseUp: OnMouseUp,
    createElementsFunc: drawRectangle,
  };
}
