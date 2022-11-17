import type { ToolType } from '@/models/ToolType';
import { useState } from 'react';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import type { Annotation } from '@/models/Annotation';
// import { label } from '../../../cypress/support/label';

type CanvasLineType = {
  frontendId: number;
  type: ToolType;
  width: number;
  color: string;
  points: number[];
};
// let colors = '';
function createLine(param: CanvasLineType): string {
  if (
    !param ||
    !param.width ||
    param.color == undefined ||
    !param.points ||
    param.points.length < 2 ||
    param.frontendId == undefined
  )
    return '';
  const frontendId = param.type == 'rubber' ? 0 : param.frontendId;
  return `${param.width},${frontendId},${param.points.join(',')}`;
}

/**
 * Color lines on canvas as label.color
 */
let isClick = false;
let finlyResult = '';
function drawAnnotation(param: PPRenderFuncProps, flag: boolean) {
  console.log('flag', flag);
  const { canvasRef2, annotation } = param;
  const canvasRef = canvasRef2;
  const result = annotation.result;
  if (!result) return <></>;
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return <></>;
  console.log(`PPBrush.drawAnnotation, result:`, result);
  let points: number[] = [];
  let startIndex = 0;
  console.log('annotation.result', annotation, param.currentAnnotation);

  for (let i = 0; i < result.length; i++) {
    // Number end
    if (result.at(i) == ',') {
      // console.log(
      //   `PPBrush.drawAnnotation, Number end:`,
      //   parseFloat(result.slice(startIndex, i)),
      //   `i:`,
      //   i,
      // );
      points.push(parseFloat(result.slice(startIndex, i)));
      startIndex = i + 1;
    }
    // Array end
    else if (result.at(i) == '|') {
      // console.log(
      //   `PPBrush.drawAnnotation, Array end:`,
      //   parseFloat(result.slice(startIndex, i)),
      //   `i:`,
      //   i,
      // );
      points.push(parseFloat(result.slice(startIndex, i)));
      renderPoints(points, ctx, annotation);
      points = [];
      startIndex = i + 1;
    }
    // result end
    else if (i == result.length - 1) {
      // console.log(
      //   `PPBrush.drawAnnotation, result end:`,
      //   parseFloat(result.slice(startIndex, result.length)),
      //   `i:`,
      //   i,
      // );
      points.push(parseFloat(result.slice(startIndex, result.length)));
      renderPoints(points, ctx, annotation);
    }
  }
  console.log('annotation param.currentAnnotation rubber', isClick, param.currentTool, flag);
  // if (isClick && param.currentTool === 'rubber' && flag) {
  //   ctx.beginPath();
  //   const pointss = points.slice(2);
  //   const x = pointss.at(-2);
  //   const y = pointss.at(-1);
  //   console.log('rubbers', x, y);
  //   // ctx?.arc(x, y, points[0] / 2, 0, 2 * Math.PI);
  //   ctx?.arc(x, y, 10, 0, 2 * Math.PI);
  //   ctx.strokeStyle = 'blue'; //将线条颜色设置为蓝色
  //   ctx.stroke();
  // }
  return <></>;
}

function renderPoints(points: number[], ctx: CanvasRenderingContext2D, annotation: Annotation) {
  // console.log(`renderPoints: `, points, annotation, annotation.label?.color, ctx);
  // Draw shape
  console.log('points', points);

  if (points.length < 4) {
    console.log('found incorrect points:', points);
    return;
  }
  const width = points[0];
  const frontendId = points[1];
  if (width == 0) {
    renderPixel(ctx, points.slice(2), annotation.label?.color);
    return;
  }
  if (frontendId == 0) {
    renderBrush(ctx, width, points.slice(2), undefined);
    return;
  }
  // colors = annotation.label?.color;
  renderBrush(ctx, width, points.slice(2), annotation.label?.color);
}

function renderBrush(
  ctx: CanvasRenderingContext2D,
  width: number,
  points: number[], // x1, y1, x2, y2
  color: string | undefined, // No color means rubber
) {
  console.log(`renderBrush: `, points, width, color, ctx);
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  for (let i = 0; i <= points.length / 2 - 1; i++) {
    const x = points[2 * i];
    const y = points[2 * i + 1];
    // console.log(`points.length: ${points.length}, i: ${i}, lineTo: ${x}, ${y}`);
    ctx.lineTo(x, y);
  }
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = width;
  ctx.strokeStyle = '';
  ctx.globalCompositeOperation = color ? 'source-over' : 'destination-out';
  // ctx.strokeStyle = 'r';
  ctx.stroke();
}
function renderPixel(ctx: CanvasRenderingContext2D, points: number[], color: string | undefined) {
  console.log(`renderPixel: `, points, color, ctx);
  ctx.globalCompositeOperation = color ? 'source-over' : 'destination-out';
  if (color) ctx.fillStyle = color;
  for (let i = 0; i <= points.length / 2 - 1; i++) {
    const x = points[2 * i];
    const y = points[2 * i + 1];
    // console.log(`points.length: ${points.length}, i: ${i}, lineTo: ${x}, ${y}`);
    ctx.fillRect(x, y, 1, 1);
  }
}

function getMaxFrontendId(annotations?: Annotation[]) {
  if (!annotations || annotations.length == 0) return 0;
  let max = 0;
  for (const annotation of annotations) {
    if (annotation.frontendId > max) max = annotation.frontendId;
  }
  return max;
}

/**
 * Decide which tool should be applied
 * @param currentTool
 * @param mouseButton
 * @returns
 */
function getTool(currentTool: ToolType, mouseButton: number): ToolType {
  if (currentTool == 'rubber') return 'rubber';
  if (mouseButton == 2) return 'rubber';
  return 'brush';
}

export default function (props: PPDrawToolProps): PPDrawToolRet {
  const [currentTool, setCurrentTool] = useState<ToolType>();

  /**
   * Always start new annotation onMouseDown, assosiate annotations by same frontendId
   */
  const OnMouseDown = (param: EvtProps) => {
    isClick = true;
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      // !props.currentLabel?.color ||
      !props.brushSize
    )
      return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    const tool = getTool(props.currentTool, param.e.evt.button);

    console.log(
      `frontendId: `,
      props.frontendIdOps.frontendId,
      'maxId:',
      getMaxFrontendId(props.annotations),
      `tool: `,
      tool,
    );
    const frontendId =
      props.frontendIdOps.frontendId > 0
        ? props.frontendIdOps.frontendId
        : getMaxFrontendId(props.annotations) + 1;
    if (frontendId != props.frontendIdOps.frontendId) props.frontendIdOps.setFrontendId(frontendId);
    const line = createLine({
      width: props.brushSize || 10,
      color: tool === 'brush' ? props.currentLabel?.color || '' : '',
      points: [mouseX, mouseY, mouseX, mouseY],
      type: tool,
      frontendId: frontendId,
    });
    console.log(line);

    setCurrentTool(tool);
    if (!line) return;
    // debugger;
    if (tool === 'brush') {
      if (props.currentLabel) {
        const anno: Annotation = {
          dataId: props.dataId,
          label: props.currentLabel,
          labelId: props.currentLabel?.labelId,
          frontendId: frontendId,
          result: line,
          type: 'brush',
        };
        props.onAnnotationAdd(anno);
      }
    } else {
      // debugger;
      const anno: Annotation = {
        dataId: props.dataId,
        label: props.currentAnnotation ? props.currentAnnotation?.label : props.labels[0],
        labelId: props.currentAnnotation
          ? props.currentAnnotation?.labelId
          : props.labels[0]?.labelId,
        frontendId: frontendId,
        result: line,
        type: 'rubber',
      };
      props.onAnnotationAdd(anno);
    }
    finlyResult = line;
  };

  const OnMouseMove = (param: EvtProps) => {
    console.log('currentTool', currentTool);

    if (!currentTool) {
      return;
    }
    console.log('props.currentAnnotation', props.currentAnnotation, props.annotations);
    // const LastAnnotations = props.annotations[props.annotations?.length - 1];
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    console.log('mouseX', mouseX, mouseY);
    // props.currentAnnotation 最新的一个节点，假设不使用这个的话 可以取Annotation里面的节点来用
    // const newResult = LastAnnotations.result + `,${mouseX},${mouseY}`;
    // props.onAnnotationModify({ ...LastAnnotations, result: newResult });
    finlyResult = finlyResult + `,${mouseX},${mouseY}`;
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'rubber') return;
    // console.log(`OnMouseUp`);
    // const ctx = param.canvasRef;
    // const width = props.brushSize || 10;
    // renderBrush(ctx, width, pubPointes.slice(2), colors);
    const LastAnnotations = props.annotations[props.annotations?.length - 1];
    props.onAnnotationModify({ ...LastAnnotations, result: finlyResult });
    finlyResult = '';
    isClick = false;
    setCurrentTool(undefined);
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    drawAnnotation: drawAnnotation,
  };
}
