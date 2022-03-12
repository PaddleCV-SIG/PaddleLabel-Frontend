import type { Annotation } from '@/models/annotation';
import type { Label } from '@/models/label';
import type { ToolType } from '@/pages/SemanticSegmentation';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import { Circle, Group, Line } from 'react-konva';

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

function drawPolygon(
  annotation: Annotation<PPPolygonType>,
  onDrag: (anntation: Annotation<PPPolygonType>) => void,
  onDragEnd: () => void,
  scale: number,
  currentTool: ToolType,
  onSelect: (anntation: Annotation<PPPolygonType>) => void,
  currentAnnotation?: Annotation<PPPolygonType>,
): ReactElement[] {
  if (!annotation || !annotation.lines || !annotation.lines[0]) return [<></>];
  const points = annotation.lines[0].points;
  const color = annotation.lines[0].color;
  const rgb = hexToRgb(color);
  if (!rgb) return [<></>];

  const selected = currentAnnotation?.annotationId == annotation.annotationId;
  const transparency = selected ? 0.5 : 0.1;

  // Create dots
  let x: number | undefined = undefined;
  const pointElements: ReactElement[] = [];
  points.forEach((point, index) => {
    if (!x) {
      x = point;
      return;
    }
    pointElements.push(
      <Circle
        onMouseDown={() => {
          if (currentTool == 'mover') onSelect(annotation);
        }}
        draggable={currentTool == 'mover'}
        onDragMove={(evt) => {
          console.log(`Circle onDrageMove`);
          const newPositionX = evt.evt.offsetX / scale;
          const newPositionY = evt.evt.offsetY / scale;
          points[index - 1] = newPositionX;
          points[index] = newPositionY;
          const newAnno = { ...annotation, lines: [{ color: color, points: points }] };
          onDrag(newAnno);
        }}
        onMouseOver={() => {
          console.log(`Circle onMouseOver`);
          if (currentTool == 'mover') document.body.style.cursor = 'pointer';
        }}
        onMouseOut={() => {
          console.log(`Circle onMouseOut`);
          document.body.style.cursor = 'default';
        }}
        x={x}
        y={point}
        radius={5}
        fill={color}
      />,
    );
    x = undefined;
  });
  // Create polygon
  return [
    <Group
      key={annotation.annotationId}
      // onDragStart={(evt) => {
      //   const originX = evt.evt.clientX / scale;
      //   const originY = evt.evt.clientY / scale;
      //   setDragStartMousePos({ x: originX, y: originY });
      // }}
      // onDragEnd={() => {
      //   onDragEnd();
      // }}
      // draggable={false}
      // onDragMove={(evt) => {
      //   evt.target.position();
      //   console.log(`dragStartMousePos: ${JSON.stringify(dragStartMousePos)}, scale: ${scale}`);
      //   const newPositionX = evt.evt.clientX / scale;
      //   const newPositionY = evt.evt.clientY / scale;
      //   console.log(`newPositionX: ${newPositionX}, newPositionY: ${newPositionY}`);
      //   const offsetX = newPositionX - dragStartMousePos.x;
      //   const offsetY = newPositionY - dragStartMousePos.y;
      //   console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);
      //   const newPoints: number[] = [];
      //   points.forEach((point, index) => {
      //     if (index % 2 == 1) {
      //       newPoints.push(point + offsetY);
      //     } else {
      //       newPoints.push(point + offsetX);
      //     }
      //   });
      //   console.log(`points: ${JSON.stringify(points)}, newPoints: ${JSON.stringify(newPoints)}`);
      //   const newAnno = { ...annotation, lines: [{ color: color, points: newPoints }] };
      //   setDragStartMousePos({ x: newPositionX, y: newPositionY });
      //   onDrag(newAnno);
      // }}
    >
      <Line
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
        points={points}
        tension={0}
        closed={true}
        fill={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`}
      />
      {pointElements}
    </Group>,
  ];
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
  onMouseUp: () => void;
}) {
  const startNewPolygon = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
    const polygon = createPolygon(props.currentLabel?.color, [mouseX, mouseY]);
    if (!polygon) return;
    props.onAnnotationAdd({
      tool: 'polygon',
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
      tool: 'polygon' as ToolType,
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
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: () => {},
    onMouseUp: OnMouseUp,
    createElementsFunc: drawPolygon,
  };
}
