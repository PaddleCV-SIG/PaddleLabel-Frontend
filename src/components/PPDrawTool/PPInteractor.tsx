import { useState } from 'react';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import type { Stage as StageType } from 'konva/lib/Stage';
import type { Annotation } from '@/models/Annotation';
import { ModelUtils } from '@/services/utils';

/**
 * Color lines on canvas as label.color
 */
function drawAnnotation(param: PPRenderFuncProps) {
  const { canvasRef, annotation } = param;
  const result = annotation.result;
  if (!result) return <></>;
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return <></>;
  const width = canvasRef.current?.width || 0;
  const threshold = param.threshold ? param.threshold : 0.5;
  // console.log(`PPBrush.drawAnnotation, result:`, result);
  const points: number[] = [];
  let startIndex = 0;
  let numCount = 0;
  for (let i = 0; i < result.length; i++) {
    // Number end
    if (result.at(i) == ',') {
      // console.log(
      //   `PPBrush.drawAnnotation, Number end:`,
      //   parseFloat(result.slice(startIndex, i)),
      //   `i:`,
      //   i,
      // );
      numCount++;
      const point = parseFloat(result.slice(startIndex, i));
      if (point >= threshold) points.push(Math.floor(numCount / width), numCount % width);
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
      numCount++;
      const point = parseFloat(result.slice(startIndex, i));
      if (point >= threshold) points.push(Math.floor(numCount / width), numCount % width);
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
  const [mousePoints, setMousePoints] = useState<any[][]>([]);
  const model = ModelUtils(useState);

  /**
   * Record +- points, send API for latest mark, render on Canvas.
   */
  const OnMouseDown = (param: EvtProps) => {
    if (props.currentTool != 'interactor' || !props.currentLabel?.color) return;
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
    let newMousePoints = mousePoints;
    if (param.e.evt.button == 2) {
      newMousePoints = newMousePoints.concat([mouseX, mouseY, false]);
    } else {
      newMousePoints = newMousePoints.concat([mouseX, mouseY, true]);
    }
    setMousePoints(newMousePoints);
    console.log(newMousePoints, props.currentLabel.color);
    // Predict from ML Backend
    if (!newMousePoints.length || !param.stageRef.current || frontendId == undefined) {
      return;
    }
    const stage: StageType = param.stageRef.current;
    const imgBase64 = stage.findOne('.baseImage').toDataURL().slice(22);
    model
      .predict({
        format: 'b64',
        img: imgBase64,
        other: { clicks: newMousePoints },
      })
      .then((line) => {
        console.log(line);
        const anno: Annotation = {
          dataId: props.dataId,
          label: props.currentLabel,
          labelId: props.currentLabel.labelId,
          frontendId: frontendId,
          result: line,
          type: 'brush',
        };
        props.onAnnotationAdd(anno);
      });
  };

  const OnMouseMove = () => {};

  const OnMouseUp = () => {
    if (props.currentTool != 'interactor') return;
    // console.log(`OnMouseUp`);
    props.onMouseUp();
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    drawAnnotation: drawAnnotation,
  };
}
