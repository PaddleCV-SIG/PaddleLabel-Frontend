import type { Annotation } from '@/models/Annotation';
import type { Label } from '@/models/Label';
import type { ToolType } from '@/models/ToolType';
import type Konva from 'konva';
import type { Stage } from 'konva/lib/Stage';
import type { ReactElement } from 'react';
import { Circle, Group, Rect } from 'react-konva';
import { hexToRgb, PPRenderFuncProps } from './drawUtils';

export type PPRectangleType = {
  xmin: number;
  ymin: number;
  xmax?: number;
  ymax?: number;
};

function createRectangle(points: number[]): PPRectangleType | undefined {
  if (!points || points.length < 2) return undefined;
  return {
    xmin: points[0],
    ymin: points[1],
    xmax: points[2] || undefined,
    ymax: points[3] || undefined,
  };
}

function drawRectangle(props: PPRenderFuncProps): ReactElement[] {
  // console.log(`drawRectangle, annotation:`, annotation);
  if (
    !props.annotation ||
    !props.annotation.lines ||
    !props.annotation.label ||
    !props.annotation.label.color
  )
    return [<></>];
  const points: PPRectangleType = props.annotation.lines;
  const color = props.annotation.label.color;
  const rgb = hexToRgb(color);
  if (!rgb) return [<></>];

  // console.log(`drawRectangle, points:`, points, `color:`, color);
  const selected = props.currentAnnotation?.frontendId == props.annotation.frontendId;
  const transparency = selected ? 0.5 : 0.1;

  const rect =
    points.xmax != undefined && points.ymax != undefined ? (
      <Rect
        onMouseOver={() => {
          if (props.currentTool == 'editor') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        onClick={() => {
          if (props.currentTool == 'editor') props.onSelect(props.annotation);
        }}
        stroke={color}
        strokeWidth={2 / props.scale}
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
      if (props.currentTool != 'editor') return;
      // start Forbid drage cross image border
      const stage: Stage = props.stageRef?.current;
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
        ...props.annotation,
        points: points,
      };
      props.onDrag(newAnno);
    };
    return (
      <Circle
        onMouseDown={() => {
          if (props.currentTool == 'editor') props.onSelect(props.annotation);
        }}
        draggable={props.currentTool == 'editor'}
        onDragMove={onDragEvt}
        onDragEnd={onDragEvt}
        onMouseOver={() => {
          if (props.currentTool == 'editor') document.body.style.cursor = 'pointer';
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        x={isMin ? points.xmin : points.xmax}
        y={isMin ? points.ymin : points.ymax}
        radius={5 / props.scale}
        fill={color}
      />
    );
  }
  // Create dots
  return [
    <Group key={props.annotation.annotationId}>
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
      lines: Rectangle,
    });
  };

  const addDotToRectangle = (
    e: Konva.KonvaEventObject<MouseEvent>,
    offsetX: number,
    offsetY: number,
    scale: number,
  ) => {
    if (!props.currentAnnotation || !props.currentAnnotation.lines) return;
    const mouseX = (e.evt.offsetX + offsetX) / scale;
    const mouseY = (e.evt.offsetY + offsetY) / scale;
    const Rectangle: PPRectangleType = props.currentAnnotation.lines;
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
