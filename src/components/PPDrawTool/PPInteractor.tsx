import { useState } from 'react';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import type { Annotation } from '@/models/Annotation';

type CanvasLineType = {
  frontendId: number;
  color: string;
  negativePoints: number[];
  positivePoints: number[];
};

function createLine(param: CanvasLineType): string {
  if (
    !param ||
    !param.color ||
    !(param.negativePoints && param.positivePoints) ||
    param.frontendId == undefined
  )
    return '';
  // Call API
  return '';
}

/**
 * Color lines on canvas as label.color
 */
function drawAnnotation(param: PPRenderFuncProps) {
  const { canvasRef, annotation } = param;
  const result = annotation.result;
  if (!result) return <></>;
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return <></>;
  // console.log(`PPBrush.drawAnnotation, result:`, result);
  let points: number[] = [];
  let startIndex = 0;
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
  return <></>;
}

function renderPoints(points: number[], ctx: CanvasRenderingContext2D, annotation: Annotation) {
  // console.log(`renderPoints: `, points, annotation, annotation.label?.color, ctx);
  // Draw shape
  if (points.length < 4) {
    console.log('found incorrect points:', points);
    return;
  }
  renderPixel(ctx, points.slice(2), annotation.label?.color);
}
function renderPixel(ctx: CanvasRenderingContext2D, points: number[], color: string | undefined) {
  // console.log(`renderPixel: `, points, color, ctx);
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

export default function (props: PPDrawToolProps): PPDrawToolRet {
  const [positivePoints, setPositivePoints] = useState<number[]>([]);
  const [negativePoints, setNegativePoints] = useState<number[]>([]);

  /**
   * Record +- points, send API for latest mark, render on Canvas.
   */
  const OnMouseDown = (param: EvtProps) => {
    if (props.currentTool != 'interactor' || !props.currentLabel?.color || !props.brushSize) return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    console.log(
      `frontendId: `,
      props.frontendIdOps.frontendId,
      'maxId:',
      getMaxFrontendId(props.annotations),
    );
    const frontendId =
      props.frontendIdOps.frontendId > 0
        ? props.frontendIdOps.frontendId
        : getMaxFrontendId(props.annotations) + 1;
    if (frontendId != props.frontendIdOps.frontendId) props.frontendIdOps.setFrontendId(frontendId);
    let negPoints = negativePoints;
    let posPoints = positivePoints;
    if (param.e.evt.button == 2) {
      negPoints = negPoints.concat([mouseX, mouseY]);
      setNegativePoints(negPoints);
    } else {
      posPoints = posPoints.concat([mouseX, mouseY]);
      setPositivePoints(posPoints);
    }
    // Pixel format
    const line = createLine({
      color: props.currentLabel?.color,
      frontendId: frontendId,
      negativePoints: negPoints,
      positivePoints: posPoints,
    });
    // console.log(line);
    if (!line) return;
    const anno: Annotation = {
      dataId: props.dataId,
      label: props.currentLabel,
      labelId: props.currentLabel.labelId,
      frontendId: frontendId,
      result: line,
      type: 'brush',
    };
    props.onAnnotationAdd(anno);
  };

  const OnMouseMove = () => {};

  const OnMouseUp = () => {
    if (props.currentTool != 'interactor') return;
    // console.log(`OnMouseUp`);
    props.onMouseUp();
    // generateAbsoluteColor(param.canvasRef, param.layerRef);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    drawAnnotation: drawAnnotation,
  };
}
