// import type Konva from 'konva';
// import type { Stage } from 'konva/lib/Stage';
import type { ReactElement } from 'react';
import { Circle, Group, Rect } from 'react-konva';
import type { EvtProps, PPDrawToolProps, PPDrawToolRet, PPRenderFuncProps } from './drawUtils';
import { getMaxId, hexToRgb } from './drawUtils';
function createRectangle(points: number[]): string | undefined {
  if (!points || points.length < 2) return undefined;
  return points.join(',');
}
const p1 = {
  x: 0,
  y: 0,
};
const p2 = {
  x: 0,
  y: 0,
};
let isClick = false;
// let drawingSurfaceImageData;
// const renderReact = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
//   const width = Math.abs(p1.x - p2.x);
//   const height = Math.abs(p1.y - p2.y);
//   const ctx = canvasRef.current?.getContext('2d');
//   if (!ctx) return <></>;
//   console.log('canvasRef', canvasRef, ctx);

//   ctx.beginPath();
//   if (p2.x >= p1.x) {
//     if (p2.y >= p1.y) {
//       ctx.rect(p1.x, p1.y, width, height);
//     } else {
//       ctx.rect(p1.x, p1.y, width, -height);
//     }
//   } else {
//     if (p2.y >= p1.y) {
//       ctx.rect(p1.x, p1.y, -width, height);
//     } else {
//       ctx.rect(p1.x, p1.y, -width, -height);
//     }
//   }
//   console.log('p1', p1, p2);
//   ctx.strokeStyle = 'red'; //将线条颜色设置为蓝色
//   ctx.stroke();
//   // ctx.save();
// };
function drawGuidewires(x, y, context) {
  console.log('drawGuidewires函数执行了');

  context.save();
  context.strokeStyle = 'rgba(0,0,230,0.9)';
  context.lineWidth = 0.8;
  drawVerticalLine(x, context);
  drawHorizontalLine(y, context);
  context.restore();
}
function drawHorizontalLine(y, context) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}
function drawVerticalLine(x, context) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}
function drawRectangle(props: PPRenderFuncProps): ReactElement {
  // console.log(`drawRectangle, annotation:`, props.annotation, address);
  // return;
  // renderReact(props.canvasRef);
  let lengths: any = 0;
  if (props.annotation.type == 'ocr_rectangle') {
    const data = props.annotation.result?.split('||')[0];
    const results2 = data && data.split('|').join(',');
    lengths = results2?.split(',').length;
  } else {
    lengths = props?.annotation?.result?.split(',').length;
  }
  if (lengths && lengths < 4) {
    return <></>;
  }
  const annotation = props.annotation;
  if (
    !annotation ||
    !annotation.result ||
    !annotation.label ||
    !annotation.label.color ||
    !annotation.annotationId
  )
    return <></>;
  let pointsRaw = [];
  if (annotation.type == 'ocr_rectangle') {
    const data = annotation.result?.split('||')[0];
    // const address = annotation.result?.split('||')[1].split('|')[0];
    const results2 = data && data.split('|').join(',');
    // annotation.result = results2;
    pointsRaw = results2.split(',');
  } else {
    pointsRaw = annotation.result.split(',');
  }

  const points = {
    xmin: parseInt(pointsRaw[0]),
    ymin: parseInt(pointsRaw[1]),
    xmax: pointsRaw.length >= 3 ? parseInt(pointsRaw[2]) : undefined,
    ymax: pointsRaw.length >= 4 ? parseInt(pointsRaw[3]) : undefined,
  };
  const color = annotation.label.color;
  const rgb = hexToRgb(color);
  if (!rgb) return <></>;

  const selected = props.currentAnnotation?.frontendId == annotation.frontendId;
  const transparency = selected ? 0.5 : 0.2;
  // renderReact(param);
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
          if (props.currentTool === 'editor' || props.currentTool === 'mover')
            props.onSelect(annotation);
          // props.onSelect(annotation);
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

    // const onDragEvt = (evt: Konva.KonvaEventObject<DragEvent>) => {
    //   if (props.currentTool != 'editor') return;
    //   // start Forbid drage cross image border
    //   const stage: Stage = props.stageRef?.current;
    //   const baseImage = stage.findOne('.baseImage');
    //   let reachBorder = false;
    //   let newPositionX = evt.target.x();
    //   if (newPositionX > baseImage.width() / 2) {
    //     newPositionX = baseImage.width() / 2;
    //     reachBorder = true;
    //   }
    //   if (newPositionX < -baseImage.width() / 2) {
    //     newPositionX = -baseImage.width() / 2;
    //     reachBorder = true;
    //   }
    //   let newPositionY = evt.target.y();
    //   if (newPositionY > baseImage.height() / 2) {
    //     newPositionY = baseImage.height() / 2;
    //     reachBorder = true;
    //   }
    //   if (newPositionY < -baseImage.height() / 2) {
    //     newPositionY = -baseImage.height() / 2;
    //     reachBorder = true;
    //   }
    //   if (reachBorder) {
    //     evt.target.setPosition({ x: newPositionX, y: newPositionY });
    //   }
    //   // End cross border control
    //   if (isMin) {
    //     points.xmin = newPositionX;
    //     points.ymin = newPositionY;
    //   } else {
    //     points.xmax = newPositionX;
    //     points.ymax = newPositionY;
    //   }
    //   let result = '';
    //   console.log('props', props);

    //   if (props.pathName === '/optical_character_recognition') {
    //     // debugger;
    //     const data = `${points.xmin},${points.ymin},${points.xmax},${points.ymax}`;
    //     const strings = address ? `||${address}|0|` : '||待识别|0|';
    //     const newdata = data + strings;
    //     result = newdata;
    //   } else {
    //     result = `${points.xmin},${points.ymin},${points.xmax},${points.ymax}`;
    //   }
    //   const newAnno = {
    //     ...annotation,
    //     predicted_by: null,
    //     result: result,
    //   };
    //   props.onDragUP(newAnno);
    // };
    return (
      <Circle
        onMouseDown={() => {
          if (props.currentTool == 'editor') {
            // console.log(`select ${JSON.stringify(annotation)}`);
            // props.OnSelects(annotation);
            props.onSelect(annotation);
          }
        }}
        // draggable={props.currentTool == 'editor'}
        // onDragMove={onDragEvt}
        // onDragEnd={onDragEvt}
        onMouseOver={() => {
          if (props.currentTool == 'editor' && props.stageRef?.current)
            props.stageRef.current.container().style.cursor = 'cell';
        }}
        onMouseOut={() => {
          if (props.stageRef?.current) props.stageRef.current.container().style.cursor = 'default';
        }}
        x={isMin ? points.xmin : points.xmax}
        y={isMin ? points.ymin : points.ymax}
        radius={5 / props.scale}
        fill={color}
      />
    );
  }
  // Create dots
  return (
    <Group key={annotation.annotationId}>
      {rect}
      {createDot(true)}
      {createDot(false)}
    </Group>
  );
}

export default function (props: PPDrawToolProps): PPDrawToolRet {
  const startNewRectangle = (mouseX: number, mouseY: number, pathName: string) => {
    const polygon = createRectangle([mouseX, mouseY]);
    if (!polygon || !props.dataId) return;
    const anno: any = {
      dataId: props.dataId,
      type: 'rectangle',
      frontendId: getMaxId(props.annotations) + 1,
      label: props.currentLabel,
      labelId: props.currentLabel?.labelId,
      // result: polygon,
    };
    // debugger;
    if (pathName === '/optical_character_recognition') {
      const data = polygon.split(',').join('|');
      const newdata = data + '||待识别|0|';
      anno.result = newdata;
      anno.type = 'ocr_rectangle';
    } else {
      anno.result = polygon;
    }
    props.onAnnotationAdd(anno);
  };

  const addDotToRectangle = (mouseX: number, mouseY: number, pathName: string) => {
    if (!props.currentAnnotation || !props.currentAnnotation.result || !props.currentLabel?.color)
      return;
    // debugger;
    let result: any = '';
    if (pathName === '/optical_character_recognition') {
      const data: any = props.currentAnnotation.result?.split('||');
      const results2 = data && data[0].split('|');
      if (results2.length < 4) {
        result = results2.join('|') + `|${mouseX}|${mouseY}` + '||' + data[1];
      } else {
        const results = results2;
        results[2] = mouseX + '';
        results[3] = mouseY + '';
        result = results.join('|') + '||' + data[1];
      }
    } else {
      if (props.currentAnnotation.result.length < 4) {
        result = props.currentAnnotation.result + `,${mouseX},${mouseY}`;
      } else {
        const results = props.currentAnnotation.result.split(',');
        results[2] = mouseX + '';
        results[3] = mouseY + '';
        result = results.join(',');
      }
    }
    const anno = {
      ...props.currentAnnotation,
      result: result,
    };
    props.onAnnotationModify(anno);
    // debugger;
    if (props.onMouseUp) props.onMouseUp();
  };

  const OnMouseDown = (param: EvtProps) => {
    if (props.currentTool === 'rectangle' || props.currentTool === 'editor') {
      isClick = true;
      const mouseX = param.mouseX + param.offsetX;
      const mouseY = param.mouseY + param.offsetY;
      p1.x = param.mouseX;
      p1.y = param.mouseY;
      // debugger;
      if (!props.currentAnnotation) {
        startNewRectangle(mouseX, mouseY, param.pathName);
      }

      if (props.onMouseDown) props.onMouseDown();
    }
  };
  const OnMousemove = (param: EvtProps) => {
    if (props.currentTool != 'rectangle' && isClick !== true) return;
    p2.x = param.mouseX;
    p2.y = param.mouseY;
  };
  const OnMouseUp = (param: EvtProps) => {
    // debugger;
    if (props.currentTool != 'rectangle' && props.currentTool != 'editor' && isClick) return;
    isClick = false;
    const mouseX = param.mouseX + param.offsetX;
    const mouseY = param.mouseY + param.offsetY;
    addDotToRectangle(mouseX, mouseY, param?.pathName);
  };
  return {
    onMouseDown: OnMouseDown,
    onMouseMove: OnMousemove,
    onMouseUp: OnMouseUp,
    drawAnnotation: drawRectangle,
    drawGuidewires: drawGuidewires,
  };
}
