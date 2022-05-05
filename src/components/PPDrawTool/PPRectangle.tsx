import type Konva from 'konva';
import type { Stage } from 'konva/lib/Stage';
import type { ReactElement } from 'react';
import { Circle, Group, Rect } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPRenderFuncProps } from './drawUtils';
import { getMaxId, hexToRgb } from './drawUtils';

function createRectangle(points: number[]): string | undefined {
  if (!points || points.length < 2) return undefined;
  return points.join(',');
}

function drawRectangle(props: PPRenderFuncProps): ReactElement[] {
  // console.log(`drawRectangle, annotation:`, annotation);
  if (
    !props.annotation ||
    !props.annotation.result ||
    !props.annotation.label ||
    !props.annotation.label.color
  )
    return [<></>];
  const pointsRaw = props.annotation.result.split(',');
  const points = {
    xmin: parseInt(pointsRaw[0]),
    ymin: parseInt(pointsRaw[1]),
    xmax: pointsRaw.length >= 3 ? parseInt(pointsRaw[2]) : undefined,
    ymax: pointsRaw.length >= 4 ? parseInt(pointsRaw[3]) : undefined,
  };
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
        result: `${points.xmin},${points.ymin},${points.xmax},${points.ymax}`,
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

export default function (props: PPDrawToolProps) {
  const startNewRectangle = (mouseX: number, mouseY: number) => {
    const polygon = createRectangle([mouseX, mouseY]);
    if (!polygon) return;
    console.log(polygon);
    props.onAnnotationAdd({
      dataId: props.dataId,
      type: 'rectangle',
      frontendId: getMaxId(props.annotations) + 1,
      label: props.currentLabel,
      result: polygon,
    });
  };

  const addDotToRectangle = (mouseX: number, mouseY: number) => {
    if (!props.currentAnnotation || !props.currentAnnotation.result || !props.currentLabel?.color)
      return;
    const result = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
    const anno = {
      dataId: props.dataId,
      type: 'rectangle',
      frontendId: props.currentAnnotation.frontendId,
      label: props.currentAnnotation.label,
      result: result,
    };
    props.modifyAnnoByFrontendId(anno);
  };

  const OnMouseDown = (param: EvtProps) => {
    if (props.currentTool != 'rectangle') return;
    const mouseX = param.mouseX + param.offsetX;
    const mouseY = param.mouseY + param.offsetY;
    console.log(`currentAnnotation:`, props.currentAnnotation);
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      startNewRectangle(mouseX, mouseY);
    } else {
      addDotToRectangle(mouseX, mouseY);
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
