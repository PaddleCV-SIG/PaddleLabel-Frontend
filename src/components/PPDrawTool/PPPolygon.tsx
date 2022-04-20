import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type { Stage } from 'konva/lib/Stage';
import type { ReactElement } from 'react';
import { Circle, Group, Line } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { hexToRgb } from './drawUtils';

export type PPPolygonType = {
  color: string;
  points: number[];
};

function createPolygon(color?: string, points?: number[]): PPPolygonType | undefined {
  if (!color || !points) return undefined;
  return {
    color: color,
    points: points,
  };
}

function drawPolygon(props: PPRenderFuncProps): ReactElement {
  if (!props.annotation || !props.annotation.lines || !props.annotation.lines[0]) return <></>;
  const points: number[] = props.annotation.lines[0].points;
  const color = props.annotation.lines[0].color;
  const rgb = hexToRgb(color);
  if (!rgb) return <></>;

  // const selected = props.currentAnnotation?.frontendId == props.annotation.frontendId;
  const transparency = 0.3; // Polygon fixed 0.3
  // let transparency = selected ? props.transparency * 0.01 + 0.02 : props.transparency * 0.01;
  // if (transparency > 1) transparency = 1;
  // if (transparency < 0) transparency = 0;

  // console.log(`drawPolygon, annotation: ${JSON.stringify(annotation)}`);
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
          if (props.currentTool == 'editor') props.onSelect(props.annotation);
        }}
        draggable={props.currentTool == 'editor'}
        onDragMove={(evt) => {
          // console.log(`Circle onDrageMove`);
          evt.cancelBubble = true;
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
          points[index - 1] = newPositionX;
          points[index] = newPositionY;
          const newAnno = { ...props.annotation, points: [{ color: color, points: points }] };
          props.onDrag(newAnno);
        }}
        onMouseOver={() => {
          // console.log(`Circle onMouseOver`);
          if (props.currentTool == 'editor' && props.stageRef?.current)
            props.stageRef.current.container().style.cursor = 'cell';
        }}
        onMouseOut={() => {
          // console.log(`Circle onMouseOut`);
          if (props.currentTool == 'editor' && props.stageRef?.current)
            props.stageRef.current.container().style.cursor = 'default';
        }}
        x={x}
        y={point}
        radius={5 / props.scale}
        fill={color}
      />,
    );
    x = undefined;
  });
  // Create polygon
  return (
    <Group key={props.annotation.frontendId}>
      <Line
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
        points={points}
        tension={0}
        closed={true}
        fill={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`}
      />
      {pointElements}
    </Group>
  );
}

/**
 * Get the max id from annotation list
 * If no annotation, start from 0
 * @param annotations
 * @returns
 */
function getMaxId(annotations?: Annotation<PPPolygonType[]>[]): any {
  let maxId = 0;
  if (!annotations) return maxId;
  for (const annotation of annotations) {
    if (!annotation || !annotation.frontendId) continue;
    if (annotation.frontendId > maxId) maxId = annotation.frontendId;
  }
  return maxId;
}

export default function (props: PPDrawToolProps<PPPolygonType[]>): PPDrawToolRet {
  const startNewPolygon = (mouseX: number, mouseY: number) => {
    const polygon = createPolygon(props.currentLabel?.color, [mouseX, mouseY]);
    if (!polygon) return;
    props.onAnnotationAdd({
      dataId: props.dataId,
      type: 'polygon',
      frontendId: getMaxId(props.annotations) + 1,
      label: props.currentLabel,
      lines: [polygon],
    });
  };

  const addDotToPolygon = (mouseX: number, mouseY: number) => {
    if (!props.currentAnnotation) return;
    const existLines = props.currentAnnotation.lines || [];
    const polygon = createPolygon(
      props.currentLabel?.color,
      existLines[0]?.points.concat([mouseX, mouseY]),
    );
    if (!polygon) return;
    const anno = {
      dataId: props.dataId,
      type: 'polygon' as ToolType,
      frontendId: props.currentAnnotation.frontendId,
      label: props.currentAnnotation.label,
      points: [polygon],
    };
    props.onAnnotationModify(anno);
  };

  const OnMouseDown = (param: EvtProps) => {
    if (props.currentTool != 'polygon') return;
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      startNewPolygon(param.mouseX, param.mouseY);
    } else {
      addDotToPolygon(param.mouseX, param.mouseY);
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
    drawAnnotation: drawPolygon,
  };
}
