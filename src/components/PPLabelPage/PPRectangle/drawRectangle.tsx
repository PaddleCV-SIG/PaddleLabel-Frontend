import type { Annotation } from '@/models/annotation';
import type { Label } from '@/models/label';
import type { ToolType } from '@/pages/SemanticSegmentation';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import { Circle, Group, Rect } from 'react-konva';

export type PPRectangleType = {
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

function createRectangle(color: string, points: number[]): PPRectangleType | undefined {
  if (!color || !points) return undefined;
  return {
    color: color,
    points: points,
  };
}

function drawRectangle(
  annotation: Annotation<PPRectangleType>,
  onDrag: (anntation: Annotation<PPRectangleType>) => void,
  onDragEnd: () => void,
  scale: number,
  currentTool: ToolType,
  onSelect: (anntation: Annotation<PPRectangleType>) => void,
  currentAnnotation?: Annotation<PPRectangleType>,
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
    console.log(index, points);
    if (points.length > 4) {
      points.splice(index + 1, 2);
    }
    x = undefined;
  });
  // Create Rectangle
  // console.log(points); // DEBUG
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
      {/* FIXME: add rectangle */}
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
        // points={points}
        // tension={0}
        x={points[0]}
        y={points[1]}
        width={points[2] - points[0]}
        height={points[3] - points[1]}
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
function getMaxId(annotations: Annotation<PPRectangleType>[]): any {
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
  annotations: Annotation<PPRectangleType>[];
  currentAnnotation?: Annotation<PPRectangleType>;
  onAnnotationAdd: (annotation: Annotation<PPRectangleType>) => void;
  onAnnotationModify: (annotation: Annotation<PPRectangleType>) => void;
  onMouseUp: () => void;
}) {
  const startNewRectangle = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
    const Rectangle = createRectangle(props.currentLabel?.color, [mouseX, mouseY]);
    if (!Rectangle) return;
    props.onAnnotationAdd({
      tool: 'polygon',
      annotationId: getMaxId(props.annotations) + 1,
      label: props.currentLabel,
      lines: [Rectangle],
    });
  };

  const addDotToRectangle = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    if (!props.currentAnnotation) return;
    const mouseX = e.evt.offsetX / scale;
    const mouseY = e.evt.offsetY / scale;
    const existLines = props.currentAnnotation.lines || [];
    const Rectangle = createRectangle(
      props.currentLabel?.color,
      existLines[0]?.points.concat([mouseX, mouseY]),
    );
    if (!Rectangle) return;
    const anno = {
      tool: 'polygon' as ToolType,
      annotationId: props.currentAnnotation.annotationId,
      label: props.currentAnnotation.label,
      lines: [Rectangle],
    };
    props.onAnnotationModify(anno);
  };

  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>, scale: number) => {
    if (props.currentTool != 'polygon') return;
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      startNewRectangle(e, scale);
    } else {
      addDotToRectangle(e, scale);
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
    createElementsFunc: drawRectangle,
  };
}
