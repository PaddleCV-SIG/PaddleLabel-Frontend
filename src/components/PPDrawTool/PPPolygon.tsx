import type { Annotation } from '@/models/Annotation';
import type { Stage } from 'konva/lib/Stage';
import type { ReactElement } from 'react';
import { Circle, Group, Line } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { hexToRgb } from './drawUtils';
let isMove = false;
function createPolygon(color?: string, points?: number[]): string | undefined {
  if (!color || !points) return undefined;
  return points.join(',');
}

function drawPolygon(props: PPRenderFuncProps): ReactElement {
  const annotation = props.annotation;
  if (!annotation || !annotation.result || annotation.result.length < 2 || !annotation.label?.color)
    return <></>;
  const points: number[] = annotation.result.split(',').map(Number);
  const color = annotation.label.color;
  const rgb = hexToRgb(color);
  if (!rgb) return <></>;

  // const selected = props.currentAnnotation?.frontendId == annotation.frontendId;
  const transparency = 0.3; // Polygon fixed 0.3
  // let transparency = selected ? props.transparency * 0.01 + 0.02 : props.transparency * 0.01;
  // if (transparency > 1) transparency = 1;
  // if (transparency < 0) transparency = 0;

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
          if (props.currentTool == 'editor') props.onSelect(annotation);
        }}
        draggable={props.currentTool == 'editor'}
        onDragMove={(evt) => {
          // console.log(`onDragMove, annotation: `, annotation);
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
          const newAnno = { ...annotation, result: points.join(',') };
          // console.log(newAnno);
          props.onDrag(newAnno);
        }}
        onMouseOver={() => {
          // console.log(`Circle onMouseOver`);
          if (props.currentTool == 'editor' && props.stageRef?.current)
            props.stageRef.current.container().style.cursor = 'cell';
        }}
        onMouseOut={() => {
          // console.log(`Circle onMouseOut`);
          if (props.stageRef?.current) props.stageRef.current.container().style.cursor = 'default';
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
    <Group key={annotation.frontendId}>
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
          if (props.currentTool == 'editor') props.onSelect(annotation);
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
function getMaxId(annotations?: Annotation[]): any {
  let maxId = 0;
  if (!annotations) return maxId;
  for (const annotation of annotations) {
    if (!annotation || !annotation.frontendId) continue;
    if (annotation.frontendId > maxId) maxId = annotation.frontendId;
  }
  return maxId;
}

export default function (props: PPDrawToolProps): PPDrawToolRet {
  const startNewPolygon = (mouseX: number, mouseY: number, selectFinly: Annotation) => {
    const polygon = createPolygon(props.currentLabel?.color, [mouseX, mouseY]);
    // debugger;
    if (!polygon) return;
    console.log(polygon);
    props.onAnnotationAdd({
      dataId: props.dataId,
      type: 'polygon',
      frontendId:
        selectFinly?.frontendId !== undefined
          ? selectFinly?.frontendId
          : getMaxId(props.annotations) + 1,
      label: props.currentLabel,
      labelId: props.currentLabel?.labelId,
      result: polygon,
    });
  };

  const addDotToPolygon = (mouseX: number, mouseY: number) => {
    if (!props.currentAnnotation || !props.currentAnnotation.result || !props.currentLabel?.color)
      return;
    const result = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
    const anno = {
      ...props.currentAnnotation,
      result: result,
    };
    props.modifyAnnoByFrontendId(anno);
  };

  const OnMouseDown = (param: EvtProps) => {
    if (props.currentTool != 'polygon' && props.currentTool != 'editor') return;
    const mouseX = param.mouseX + param.offsetX;
    const mouseY = param.mouseY + param.offsetY;
    console.log(`currentAnnotation:`, props.currentAnnotation);
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      startNewPolygon(mouseX, mouseY, props.selectFinly);
    } else {
      addDotToPolygon(mouseX, mouseY);
    }
    isMove = false;
  };
  const OnMousemove = (param: EvtProps) => {
    if (props.currentTool != 'polygon' && props.currentTool != 'editor') return;
    const mouseX = param.mouseX + param.offsetX;
    const mouseY = param.mouseY + param.offsetY;
    // console.log(`currentAnnotation:`, props.currentAnnotation);
    // No annotation is marking, start new
    if (props.currentAnnotation) {
      // console.log('OnMousemoveResult', result);
      const array = props.currentAnnotation.result?.split(',');
      const result = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
      if (array?.length >= 4 && !isMove) {
        console.log('result1', result);
        const anno = {
          ...props.currentAnnotation,
          result: result,
        };
        props.modifyAnnoByFrontendId(anno);
        isMove = true;
      } else if (array?.length >= 6 && isMove) {
        array.splice(array.length - 2, 2);
        console.log('newArray', array);
        const results = array.join(',');
        const resultss = results + `,${mouseX},${mouseY}`;
        const anno = {
          ...props.currentAnnotation,
          result: resultss,
        };
        props.modifyAnnoByFrontendId(anno);
        // props.onMouseMovePolygon(anno);
      }
    }
  };
  const OnMouseUp = () => {
    if (props.currentTool != 'polygon') return;
    // console.log(`OnMouseUp`);
    if (props.onMouseUp) props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMousemove,
    onMouseUp: OnMouseUp,
    drawAnnotation: drawPolygon,
  };
}
