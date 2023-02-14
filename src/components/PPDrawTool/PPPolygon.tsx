import type { Annotation } from '@/models/Annotation';
import type { Stage } from 'konva/lib/Stage';
import type { ReactElement } from 'react';
import { Circle, Group, Line } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { hexToRgb } from './drawUtils';
// let isMove = false;
import { history } from 'umi';

function createPolygon(color: string, points: number[], pathName: string): string | undefined {
  // debugger;
  if (!color || !points) return undefined;
  if (pathName === '/optical_character_recognition') {
    const data = points.join('|');
    const newdata = data + '||待识别|0|';
    return newdata;
  } else {
    return points.join(',');
  }
}
function drawPolygon(props: PPRenderFuncProps, flag: boolean, address?: string): ReactElement {
  const annotation = props.annotation;
  if (!annotation || !annotation.result || annotation.result.length < 2 || !annotation.label?.color)
    return <></>;
  console.log('annotation.result', annotation.result.split(','));
  const points: number[] = annotation.result.split(',').map((item: string, index: number) => {
    if (index % 2 === 0) {
      const items = Number(item) + -props.canvasWidth / 2;
      return items;
    } else {
      const items = Number(item) + -props.canvasHeight / 2;
      return items;
    }
  });
  console.log('points', points, points.length);

  const color = annotation.label.color;
  const rgb = hexToRgb(color);
  if (!rgb) return <></>;
  const selected = props.currentAnnotation?.frontendId == annotation.frontendId;
  const transparency = selected ? 0.5 : 0.2;
  let x: number | undefined = undefined;
  const pointElements: ReactElement[] = [];

  points.forEach((point, index) => {
    if (index % 2 === 0) {
      x = point;
      // debugger;
      return;
    }
    pointElements.push(
      <Circle
        onMouseDown={() => {
          // if (props.currentTool === 'polygon') {

          // }
          // debugger;
          if (props.currentTool !== 'rectangle') {
            if (props.ChanegeTool) {
              // debugger;
              props.ChanegeTool('polygon');
            }
            props.onSelect(annotation);
            props.onPointIndex(index);
          }
          // if (props.ChanegeTool) {
          //   props.ChanegeTool('editor');
          // }
          // props.onSelect(annotation);
        }}
        // onMouseDown={() => {
        //   if (props.currentTool == 'editor') props.onSelect(annotation);
        // }}
        // draggable={props.currentTool == 'editor'}
        // onMouseDown={() => {
        //   if (props.currentTool == 'editor') {
        //     // console.log(`select ${JSON.stringify(annotation)}`);
        //     props.OnSelects(annotation);
        //     props.onSelect(annotation);
        //   }
        // }}
        // onDragMove={onDragEvt}
        // draggable={true}
        onDragEnd={(evt) => {
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
          if (props.pathName === '/optical_character_recognition') {
            const strings = address ? `||${address}|0|` : '||待识别|0|';
            const newdata = points.join('|') + strings;
            // result = newdata;
            const newAnno = { ...annotation, result: newdata };
            props.onDragUP(newAnno);
          } else {
            const newAnno = { ...annotation, result: points.join(',') };
            props.onDragUP(newAnno);
          }
        }}
        onMouseOver={() => {
          // console.log(`Circle onMouseOver`);
          // if (props.currentTool == 'editor' && props.stageRef?.current)
          if (props.stageRef?.current && props.currentTool !== 'rectangle')
            props.stageRef.current.container().style.cursor = 'cell';
          props.layerRef.current?.batchDraw();
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
    <Group
      key={annotation.frontendId}
      onClick={() => {
        if (props.currentTool === 'editor' || props.currentTool === 'mover')
          props.onSelect(annotation);
      }}
    >
      <Line
        onMouseOver={() => {
          if (props.currentTool == 'editor') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        stroke={color}
        strokeWidth={2 / props.scale}
        globalCompositeOperation="source-over"
        lineCap="round"
        points={points}
        tension={0}
        closed={flag}
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
function getMaxFrontendId(annotations?: Annotation[]) {
  if (!annotations || annotations.length == 0) return 0;
  let max = 0;
  for (const annotation of annotations) {
    if (annotation.frontendId > max) max = annotation.frontendId;
  }
  return max;
}

export default function (props: PPDrawToolProps): PPDrawToolRet {
  const startNewPolygon = (
    mouseX: number,
    mouseY: number,
    selectFinly: Annotation,
    pathName: string,
    annotations?: Annotation[],
  ) => {
    const polygon = createPolygon(props.currentLabel?.color, [mouseX, mouseY], pathName);
    if (!polygon) return;
    let frontendId;
    if (history?.location?.pathname === '/instance_segmentation') {
      if (props.finlyList && props.finlyList?.length > 0 && props.selectFinly) {
        // 有列表长度且有选中

        frontendId = props.selectFinly.frontendId;
      } else if (props.finlyList && props.finlyList?.length > 0 && !props.selectFinly) {
        // 有列表长度，无选中
        frontendId = props.finlyList?.length > 0 ? getMaxFrontendId(props.finlyList) + 1 : 1;
      } else if (props.finlyList?.length === 0 && !props.selectFinly) {
        // 无列表长度，无选中
        // debugger;
        console.log('无列表长度，无选中', props.frontendIdOps.frontendId);
        frontendId =
          props.frontendIdOps.frontendId > 0
            ? props.frontendIdOps.frontendId
            : getMaxFrontendId(props.annotations) + 1;
      }
    } else {
      frontendId =
        props.frontendIdOps.frontendId > 0
          ? props.frontendIdOps.frontendId
          : getMaxFrontendId(props.annotations) + 1;
    }
    // debugger;
    if (frontendId != props.frontendIdOps.frontendId) props.frontendIdOps.setFrontendId(frontendId);
    const anno = {
      dataId: props.dataId,
      frontendId: frontendId,
      label: props.currentLabel,
      labelId: props.currentLabel?.labelId,
      result: polygon,
      type: '',
    };
    if (pathName === '/optical_character_recognition') {
      anno.type = 'ocr_polygon';
      anno.frontendId = getMaxId(annotations) + 1;
    } else {
      anno.type = 'polygon';
    }
    // debugger;

    props.onAnnotationAdd(anno);
  };

  const addDotToPolygon = (mouseX: number, mouseY: number, pathName: string) => {
    if (!props.currentAnnotation || !props.currentAnnotation.result || !props.currentLabel?.color)
      return;
    let result = '';
    // const result = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
    if (pathName === '/optical_character_recognition') {
      const data = props.currentAnnotation.result?.split('||');
      const results2 = data[0] + `|${mouseX}|${mouseY}`;
      result = results2 + '||' + data[1];
      // debugger;
    } else {
      result = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
    }
    const anno = {
      ...props.currentAnnotation,
      result: result,
    };

    props.onAnnotationModify(anno);
  };

  const OnMouseDown = (param: EvtProps) => {
    // && props.currentTool != 'editor'
    // debugger;
    if (props.currentTool != 'polygon') return;
    // const mouseX = param.mouseX + param.offsetX;
    // const mouseY = param.mouseY + param.offsetY;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    // if (!props.currentAnnotation && param.flags) {
    if (param.flags) {
      startNewPolygon(mouseX, mouseY, props.selectFinly, param.pathName, props.annotations);
    } else {
      addDotToPolygon(mouseX, mouseY, param.pathName);
    }
    if (props.onMouseDown) props.onMouseDown();

    // isMove = false;
  };
  const OnMousemove = (param: EvtProps) => {
    console.log('params', param);
    // const pointIndex = param.pointIndex;
    // const ctx3 = param.ctx3;
    // const pointArr = param.pointArr;
    // let beginX, beginY, endX, endY;
    // if (!ctx3 || pointIndex || !pointIndex) {
    //   return;
    // }
    // ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height); //清空画布
    // const mouseX = param.mouseX;
    // const mouseY = param.mouseY;
    // if (pointIndex !== pointArr.length - 1 && pointIndex !== 1) {
    //   beginX = pointArr[pointIndex - 3] - 0 + +param.offsetX;
    //   beginY = pointArr[pointIndex - 2] - 0 + param.offsetY;
    //   endX = pointArr[pointIndex + 1] - 0 + +param.offsetX;
    //   endY = pointArr[pointIndex + 2] - 0 + param.offsetY;
    // } else if (pointIndex === pointArr.length - 1) {
    //   // 最后一个
    //   beginX = pointArr[0] - 0 + +param.offsetX;
    //   beginY = pointArr[1] - 0 + param.offsetY;
    //   endX = pointArr[pointIndex - 3] - 0 + +param.offsetX;
    //   endY = pointArr[pointIndex - 2] - 0 + param.offsetY;
    // } else {
    //   // 第一个
    //   beginX = pointArr[pointArr.length - 3] - 0 + +param.offsetX;
    //   beginY = pointArr[pointArr.length - 2] - 0 + param.offsetY;
    //   endX = pointArr[pointIndex + 1] - 0 + +param.offsetX;
    //   endY = pointArr[pointIndex + 2] - 0 + param.offsetY;
    // }
    // ctx3.beginPath();
    // ctx3.moveTo(beginX, beginY);
    // ctx3.lineTo(mouseX, mouseY);
    // ctx3.moveTo(endX, endY);
    // ctx3.lineTo(mouseX, mouseY);
    // ctx3.fillStyle = props.currentLabel?.color; //填充颜色
    // ctx3.fill(); //填充
    // ctx3.stroke(); //绘制
  };
  const OnMouseUp = (param: EvtProps) => {
    // debugger;
    if (props.ChanegeTool && props.preTool) {
      props.ChanegeTool(props.preTool);
    }
    if (props.currentTool != 'polygon') return;
    // console.log(`OnMouseUp`);
    if (param.e.evt.button === 2) {
      // debugger;
      return;
    }
    if (props.onMouseUp) props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMousemove,
    onMouseUp: OnMouseUp,
    drawAnnotation: drawPolygon,
  };
}
