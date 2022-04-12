import type { ToolType } from '@/models/ToolType';
import { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import { Group, Image } from 'react-konva';
import { EvtProps, hexToRgb, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { Layer as LayerType } from 'konva/lib/Layer';
import { getMaxId } from './drawUtils';
import { Annotation } from '@/models/Annotation';

type CanvasLineType = {
  lineId: number;
  type: ToolType;
  width: number;
  color: string;
  points: number[];
};

function createLine(param: CanvasLineType): CanvasLineType | undefined {
  if (!param || !param.width || !param.color || !param.points || param.lineId == undefined)
    return undefined;
  return param;
}

/**
 * After render image, render newly drew lines.
 */
export function drawDirectCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  layerRef: React.RefObject<LayerType>,
  canvasLines: CanvasLineType[],
) {
  console.log(`drawDirectCanvas line: `, canvasLines);
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx || canvasLines.length == 0) {
    return;
  }
  // Clear canvas
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // ctx.filter = 'url(#remove-alpha)';
  // ctx['imageSmoothingEnabled'] = false; /* standard */
  // ctx['mozImageSmoothingEnabled'] = false; /* Firefox */
  // ctx['oImageSmoothingEnabled'] = false; /* Opera */
  // ctx['webkitImageSmoothingEnabled'] = false; /* Safari */
  // ctx['msImageSmoothingEnabled'] = false; /* IE */
  // Draw lines and rubbers
  for (const line of canvasLines) {
    const frontendId = line.points.at(0);
    console.log(
      `drawDirectCanvas line: `,
      line,
      `color: `,
      line.color,
      `belongs to frontendId:`,
      frontendId,
    );
    const points = line.points.slice(1);
    // const color = hexToRgb(line.color);
    // if (!color) continue;
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
    ctx.lineWidth = line.width;
    ctx.strokeStyle = line.color;
    ctx.globalCompositeOperation = line.type == 'brush' ? 'source-over' : 'destination-out';
    // ctx.closePath();
    ctx.stroke();
  }
  // Re draw layer
  layerRef.current?.batchDraw();
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
  const [canvasLines, setCanvasLines] = useState<CanvasLineType[]>([]);
  const [lineIdCounter, setLineIdCounter] = useState<number>(-1);
  const lineIdIncreaseAndGet = () => {
    setLineIdCounter(lineIdCounter + 1);
    return lineIdCounter + 1;
  };
  const addCanvasLines = (line: CanvasLineType) => {
    const newLines = canvasLines.concat([line]);
    setCanvasLines(newLines);
    return newLines;
  };

  // Color lines on canvas as frontendId
  function colorAsFrontendId(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    layerRef: React.RefObject<LayerType>,
  ) {
    if (!props.annotations) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const virtualCanvas: HTMLCanvasElement = document.getElementById('virtualCanvas');
    const virtualCtx = virtualCanvas.getContext('2d');
    const singleLineCanvas: HTMLCanvasElement = document.getElementById('singleLineCanvas');
    const singleLineCtx = singleLineCanvas.getContext('2d');
    if (!canvas || !ctx || !virtualCanvas || !virtualCtx || !singleLineCanvas || !singleLineCtx)
      return;
    if (!canvasLines.at(-1)) return;

    virtualCtx.clearRect(0, 0, virtualCanvas.width, virtualCanvas.height);
    // 1. Draw Line on singleLineCanvas
    // 2. Dump singleLineCanvas imageData, apply to virtualCanvas with frontendId using fillRect
    // 3. Dump virtualCanvas imageData, determine frontendId

    for (const line of canvasLines) {
      const frontendId = line.points.at(0);
      const points = line.points.slice(1);

      const destColor = '#' + (frontendId + '').padStart(6, '0');
      // const destColor = `rgba(0,${anno.frontendId},0, 255)`;
      console.log(
        `repaint line on singleLineCanvas, frontendId: `,
        frontendId,
        'destColor: ',
        destColor,
      );

      singleLineCtx.clearRect(0, 0, singleLineCanvas.width, singleLineCanvas.height);
      singleLineCtx.beginPath();
      singleLineCtx.moveTo(points[0], points[1]);
      for (let i = 0; i <= points.length / 2 - 1; i++) {
        const x = points[2 * i];
        const y = points[2 * i + 1];
        // console.log(`points.length: ${points.length}, i: ${i}, lineTo: ${x}, ${y}`);
        singleLineCtx.lineTo(x, y);
      }
      singleLineCtx.lineCap = 'round';
      singleLineCtx.lineJoin = 'round';
      singleLineCtx.lineWidth = line.width;
      singleLineCtx.strokeStyle = line.type == 'brush' ? '#FFFFFF' : destColor;
      singleLineCtx.globalCompositeOperation = 'source-over';
      singleLineCtx.stroke();

      // 2. Dump singleLineCanvas imageData, apply to virtualCanvas with frontendId using fillRect
      const singleLineImageData = singleLineCtx.getImageData(
        0,
        0,
        singleLineCanvas.width,
        singleLineCanvas.height,
      ).data;

      let x = 0,
        y = 0;
      for (let i = 0; i + 4 < singleLineImageData.length; i += 4) {
        const r = singleLineImageData[i];
        const g = singleLineImageData[i + 1];
        const b = singleLineImageData[i + 2];
        const a = singleLineImageData[i + 3];
        if (r || g || b || a) {
          // console.log(`found pixel: rgba()`, r, g, b, a);
          // Found white pixel
          if (r == 255 && g == 255 && b == 255 && a == 255) {
            console.log(`found white pixel: x,y,rgba()`, x, y, r, g, b, a);
            virtualCtx.fillStyle = '#FFFFFF';
            // Apply to virtualCanvas
            virtualCtx.fillRect(x, y, 1, 1);
          } else if (r || g || b || a) {
            console.log(`found line pixel: rgba()`, x, y, r, g, b, a);
            virtualCtx.fillStyle = destColor;
            // Apply to virtualCanvas
            virtualCtx.fillRect(x, y, 1, 1);
          }
        }
        x++;
        if (x == singleLineCanvas.width) {
          x = 0;
          y++;
        }
      }
    }

    // 3. Dump virtualCanvas imageData, determine frontendId
    const data = virtualCtx.getImageData(0, 0, virtualCanvas.width, virtualCanvas.height).data;
    console.log('virtualCtx getImageData.data:', data);
    const barray = new Uint8Array(data.length / 4);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      // const frontendIdStr = parseInt(
      //   rgbToHex(data[i], data[i + 1], data[i + 2]).replace('#', ''),
      //   16,
      // ).toString(10);
      // const frontendId = Math.round(parseInt(frontendIdStr, 10) * 0.01);
      if (data[i]) console.log('data[i]:', data[i]);
      if (data[i + 1]) console.log('data[i + 1]', data[i + 1]);
      if (data[i + 2]) console.log('data[i + 2]', data[i + 2]);
      if (data[i + 3]) console.log('data[i + 3]', data[i + 3]);
      barray[i / 4] = data[i + 2];
    }
    const blob = new Blob([barray], { type: 'application/octet-stream' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    // elem.href = virtualCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    elem.download = 'test.png';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    // drawDirectCanvas(canvasRef, layerRef, canvasLines);
  }

  /**
   * Color lines on canvas as label.color
   */
  function colorAsLabelColor(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    layerRef: React.RefObject<LayerType>,
  ) {
    if (!props.annotations) return;
    for (const anno of props.annotations) {
      if (!anno.label?.color) continue;
      const destColor = anno.label?.color;
      for (const lineId of anno.lines) {
        canvasLines[lineId].color = destColor;
      }
    }
    drawDirectCanvas(canvasRef, layerRef, canvasLines);
  }

  /**
   * Brush operate canvas directly, therefore only render raw png got from backend
   */
  function drawImage(param: PPRenderFuncProps<number[]>): ReactElement {
    // console.log(`drawImage: `, param.annotation);
    if (!param.annotation) return <></>;
    const img = param.annotation.png ? <Image image={param.annotation.png} /> : <></>;
    return img;
  }

  const OnMouseDown = (param: EvtProps) => {
    if (
      (props.currentTool != 'brush' && props.currentTool != 'rubber') ||
      !props.currentLabel?.color
    )
      return;
    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    const tool = getTool(props.currentTool, param.e.evt.button);
    const line = createLine({
      width: props.brushSize || 10,
      color: props.currentLabel?.color,
      points: [mouseX, mouseY, mouseX, mouseY],
      type: tool,
      lineId: lineIdIncreaseAndGet(),
    });
    if (!line) return;
    setCurrentTool(tool);
    // No annotation is marking, start new
    if (!props.currentAnnotation) {
      // Do not start new marking with rubber
      if (tool == 'rubber') return;
      const anno = {
        dataId: props.dataId,
        frontendId: getMaxId(props.annotations) + 1,
        label: props.currentLabel,
        lines: [line.lineId],
      };
      props.onAnnotationAdd(anno);
      line.points = [anno.frontendId].concat(line.points);
    } else {
      const anno = {
        dataId: props.dataId,
        frontendId: props.currentAnnotation.frontendId,
        label: props.currentAnnotation.label,
        lines: props.currentAnnotation.lines?.concat([line.lineId]),
      };
      props.onAnnotationModify(anno);
      line.points = [anno.frontendId].concat(line.points);
    }
    drawDirectCanvas(param.canvasRef, param.layerRef, addCanvasLines(line));
  };

  const OnMouseMove = (param: EvtProps) => {
    if (
      !currentTool ||
      !props.currentAnnotation ||
      !canvasLines.at(-1) ||
      !props.currentLabel?.color
    )
      return;
    const currentLine = canvasLines.pop();
    if (!currentLine) return;

    const mouseX = param.mouseX;
    const mouseY = param.mouseY;
    let newPoints = [mouseX, mouseY];
    if (props.currentAnnotation?.lines) {
      newPoints = currentLine.points.concat(newPoints);
    }
    const line = createLine({ ...currentLine, points: newPoints });
    if (!line) return;
    drawDirectCanvas(param.canvasRef, param.layerRef, addCanvasLines(line));
  };

  const OnMouseUp = () => {
    if (props.currentTool != 'brush' && props.currentTool != 'rubber') return;
    // console.log(`OnMouseUp`);
    setCurrentTool(undefined);
    props.onMouseUp();
    // generateAbsoluteColor(param.canvasRef, param.layerRef);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
    createElementsFunc: drawImage,
    colorAsFrontendId: colorAsFrontendId,
    colorAsLabelColor: colorAsLabelColor,
  };
}
