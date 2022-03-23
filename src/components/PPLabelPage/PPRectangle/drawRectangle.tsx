import type { Annotation } from '@/models/Annotation';
import { Label } from '@/models/Label';
import { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
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

function createRectangle(points: number[]): PPRectangleType | undefined {
  if (!points || points.length < 2) return undefined;
  return {
    xmin: points[0],
    ymin: points[1],
    xmax: points[2] || undefined,
    ymax: points[3] || undefined,
  };
}

function drawRectangle(
  annotation: Annotation<PPRectangleType>,
  onDrag: (anntation: Annotation<PPRectangleType>) => void,
  onDragEnd: () => void,
  scale: number,
  currentTool: ToolType,
  onSelect: (anntation: Annotation<PPRectangleType>) => void,
  shapeRef?: React.MutableRefObject<any>,
  currentAnnotation?: Annotation<PPRectangleType>,
): ReactElement[] {
  // console.log(`drawRectangle, annotation:`, annotation);
  if (!annotation || !annotation.points || !annotation.label || !annotation.label.color)
    return [<></>];
  const points: PPRectangleType = annotation.points;
  const color = annotation.label.color;
  const rgb = hexToRgb(color);
  if (!rgb) return [<></>];

  // console.log(`drawRectangle, points:`, points, `color:`, color);
  const selected = currentAnnotation?.frontendId == annotation.frontendId;
  const transparency = selected ? 0.5 : 0.1;

  const rect =
    points.xmax != undefined && points.ymax != undefined ? (
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

  function createDot(isMin: boolean) {
    if (!isMin && (points.xmax == undefined || points.ymax == undefined)) return <></>;

    const onDragEvt = (evt: Konva.KonvaEventObject<DragEvent>) => {
      if (currentTool != 'editor') return;
      // start Forbid drage cross image border
      const stage: Stage = shapeRef?.current;
      const baseImage = stage.findOne('.baseImage');
      let reachBorder = false;
      let newPositionX = evt.target.x();
      if (newPositionX > baseImage.width() / 2) {
        newPositionX = baseImage.width() / 2;
        reachBorder = true;
      }
      if (newPositionX < -baseImage.width() / 2) {
        newPositionX = -baseImage.width() / 2;
        reachBorder = true;
      }
      let newPositionY = evt.target.y();
      if (newPositionY > baseImage.height() / 2) {
        newPositionY = baseImage.height() / 2;
        reachBorder = true;
      }
      if (newPositionY < -baseImage.height() / 2) {
        newPositionY = -baseImage.height() / 2;
        reachBorder = true;
      }
      if (reachBorder) {
        evt.target.setPosition({ x: newPositionX, y: newPositionY });
      }
      // End cross border control
      if (isMin) {
        points.xmin = newPositionX;
        points.ymin = newPositionY;
      } else {
        points.xmax = newPositionX;
        points.ymax = newPositionY;
      }
      const newAnno = {
        ...annotation,
        points: points,
      };
      onDrag(newAnno);
    };
    return (
      <Circle
        onMouseDown={() => {
          if (currentTool == 'editor' || currentTool == 'mover') onSelect(annotation);
        }}
        draggable={currentTool == 'editor'}
        onDragMove={onDragEvt}
        onDragEnd={onDragEvt}
        onMouseOver={() => {
          if (currentTool == 'editor') document.body.style.cursor = 'pointer';
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        x={isMin ? points.xmin : points.xmax}
        y={isMin ? points.ymin : points.ymax}
        radius={5}
        fill={color}
      />
    );
  }
  // Create dots
  return [
    <Group key={annotation.annotationId}>
      {rect}
      {createDot(true)}
      {createDot(false)}
    </Group>,
  ];
}

function findMaxId(annos: Annotation<PPRectangleType>[]) {
  let maxId = 1;
  if (!annos || annos.length == 0) {
    return maxId;
  }
  for (const anno of annos) {
    if (anno.frontendId && maxId <= anno.frontendId) maxId = anno.frontendId + 1;
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
  const startNewRectangle = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;

    const Rectangle = createRectangle([mouseX, mouseY]);
    if (!Rectangle) return;
    props.onAnnotationAdd({
      frontendId: findMaxId(props.annotations),
      type: 'rectangle',
      label: props.currentLabel,
      points: Rectangle,
    });
  };

  const addDotToRectangle = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (!props.currentAnnotation || !props.currentAnnotation.points) return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
    const Rectangle: PPRectangleType = props.currentAnnotation.points;
    if (!Rectangle) return;
    Rectangle.xmax = mouseX;
    Rectangle.ymax = mouseY;
    const anno = {
      type: 'rectangle' as ToolType,
      frontendId: props.currentAnnotation.frontendId,
      label: props.currentAnnotation.label,
      points: Rectangle,
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
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: () => {},
    onMouseUp: OnMouseUp,
    createElementsFunc: drawRectangle,
  };
}
