import type { ToolType } from '@/models/ToolType';
import { useState } from 'react';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import type { Annotation } from '@/models/Annotation';
// import { getRandomColor } from '@/services/utils';
import { history } from 'umi';
type CanvasLineType = {
  frontendId: number;
  type: ToolType;
  width: number;
  color: string;
  points: number[];
};
// let pubPointes = [];
// let colors = '';
function createLine(param: CanvasLineType): string {
  if (
    !param ||
    !param.width ||
    !param.color ||
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
// let isClick = false;
let finlyResult = '';
function drawAnnotation(param: PPRenderFuncProps) {
  const { canvasRef2, annotation } = param;
  const canvasRef = canvasRef2;
  const result = annotation.result;
  if (!result) return <></>;
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return <></>;
  let points: number[] = [];
  let startIndex = 0;

  for (let i = 0; i < result.length; i++) {
    // Number end
    if (result.at(i) == ',') {
      points.push(parseFloat(result.slice(startIndex, i)));
      startIndex = i + 1;
    }
    // Array end
    else if (result.at(i) == '|') {
      points.push(parseFloat(result.slice(startIndex, i)));
      renderPoints(points, ctx, annotation);
      points = [];
      startIndex = i + 1;
    }
    // result end
    else if (i == result.length - 1) {
      points.push(parseFloat(result.slice(startIndex, result.length)));
      renderPoints(points, ctx, annotation);
    }
  }
  // if (isClick && param.currentTool !== 'rubber' && flag) {
  //   ctx.beginPath();
  //   const pointss = points.slice(2);
  //   const x = pointss.at(-2);
  //   const y = pointss.at(-1);
  //   console.log('Brushs', x, y);
  //   ctx?.arc(x, y, points[0] / 16, 0, 2 * Math.PI);
  //   ctx.strokeStyle = 'red'; //将线条颜色设置为蓝色
  //   ctx.stroke();
  // }
  return <></>;
}
const drawGuidewires = (x: number, y: number, context: any, brushSize: number) => {
  context.save();
  // context.strokeStyle = 'rgba(0,0,230,0.9)';
  // context.lineWidth = 0.8;
  // drawVerticalLine(x, context);
  // drawHorizontalLine(y, context);
  // context.restore();
  context.beginPath();
  context?.arc(x, y, brushSize / 16, 0, 2 * Math.PI);
  context.strokeStyle = 'red'; //将线条颜色设置为蓝色
  context.stroke();
};
function renderPoints(points: number[], ctx: CanvasRenderingContext2D, annotation: Annotation) {
  // console.log(`renderPoints: `, points, annotation, annotation.label?.color, ctx);
  // Draw shape

  if (points.length < 4) {
    return;
  }
  const width = points[0];
  const frontendId = points[1];
  if (width === 0) {
    renderPixel(ctx, points.slice(2), annotation.label?.color);
    // renderBrush(ctx, width, points.slice(2), annotation.label?.color);
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
  // console.log(`renderBrush: `, points, width, color, ctx);
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
  if (color) ctx.strokeStyle = color;
  ctx.globalCompositeOperation = color ? 'source-over' : 'destination-out';
  ctx.stroke();
}
function renderPixel(ctx: CanvasRenderingContext2D, points: number[], color: string | undefined) {
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
    // isClick = true;
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      !props.currentLabel?.color ||
      !props.brushSize
    )
      return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    const tool = getTool(props.currentTool, param.e.evt.button);

    let frontendId;
    // debugger;
    if (history?.location?.pathname === '/instance_segmentation') {
      if (props.finlyList && props.finlyList?.length > 0 && props.selectFinly) {
        // 有列表长度且有选中

        frontendId = props.selectFinly.frontendId;
      } else if (props.finlyList && props.finlyList?.length > 0 && !props.selectFinly) {
        // 有列表长度，无选中
        frontendId = props.finlyList?.length > 0 ? getMaxFrontendId(props.finlyList) + 1 : 1;
      } else if (props.finlyList?.length === 0 && !props.selectFinly) {
        // 无列表长度，无选中
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
    if (frontendId != props.frontendIdOps.frontendId) props.frontendIdOps.setFrontendId(frontendId);
    const line = createLine({
      width: props.brushSize || 10,
      color: props.currentLabel?.color || 'blue',
      points: [mouseX, mouseY, mouseX, mouseY],
      type: tool,
      frontendId: frontendId,
    });
    // console.log(line);
    if (!line) return;
    setCurrentTool(tool);
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
    finlyResult = line;
    // const { canvasRef } = param;
    // const ctx = canvasRef.current?.getContext('2d');
    // ctx?.beginPath();
    // ctx?.moveTo(mouseX, mouseY);
    // isMove.value = true;
  };

  const OnMouseMove = (param: EvtProps) => {
    if (
      !currentTool ||
      !props.currentAnnotation ||
      !props.currentAnnotation.result ||
      props.currentAnnotation.result.length < 2 ||
      !props.currentLabel?.color
    ) {
      return;
    }
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    // props.currentAnnotation 最新的一个节点，假设不使用这个的话 可以取Annotation里面的节点来用
    // const newResult = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
    // props.onAnnotationModify({ ...props.currentAnnotation, result: newResult });
    // const { canvasRef } = param;
    // const ctx = canvasRef.current?.getContext('2d');
    // ctx?.lineTo(mouseX, mouseY);
    // ctx?.stroke();
    finlyResult = finlyResult + `,${mouseX},${mouseY}`;
  };

  const OnMouseUp = () => {
    if (
      !currentTool ||
      !props.currentAnnotation ||
      !props.currentAnnotation.result ||
      props.currentAnnotation.result.length < 2 ||
      !props.currentLabel?.color
    ) {
      return;
    }
    const LastAnnotations = props.annotations[props.annotations?.length - 1];
    // props.onAnnotationModify({ ...LastAnnotations, result: finlyResult });
    props.onAnnotationupdata({ ...LastAnnotations, result: finlyResult });
    finlyResult = '';
    // isClick = false;
    setCurrentTool(undefined);
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    drawGuidewires: drawGuidewires,
    drawAnnotation: drawAnnotation,
  };
}
