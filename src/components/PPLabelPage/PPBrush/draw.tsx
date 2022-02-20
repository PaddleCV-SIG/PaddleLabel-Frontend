import { Label } from '@/models/label';
import Konva from 'konva';
import React from 'react';
import { useState } from 'react';
import { Line } from 'react-konva';

function createLine(width: number, points: number[], key: number) {
  return (
    <Line
      key={key}
      stroke="#df4b26"
      strokeWidth={width}
      // globalCompositeOperation={props.mode === 'brush' ? 'source-over' : 'destination-out'}
      globalCompositeOperation="source-over"
      lineCap="round"
      points={points}
      tension={0.01}
    />
  );
}

export default function (props: {
  currentLabel: Label | undefined;
  brushSize?: number;
  points?: number[];
}) {
  const [marking, setMarking] = useState<boolean>(false);
  const [lines, setLines] = useState<React.ReactElement[]>([]);
  const [points, setPoints] = useState<number[]>([]);

  //   console.log(`re-rendering draw, lines: ${lines}`);
  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setMarking(true);
    setPoints([e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY]);
    const line = createLine(
      props.brushSize || 10,
      [e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY],
      lines.length,
    );
    lines.push(line);
    setLines(lines);
  };

  const OnMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log(`onMouseMove`);
    if (!marking) return;
    const newPoints = points.concat([e.evt.offsetX, e.evt.offsetY]);
    setPoints(newPoints);
    const line = createLine(props.brushSize || 10, newPoints, lines.length - 1);
    lines.pop();
    lines.push(line);
    setLines(lines);
  };

  const OnMouseUp = () => {
    // console.log(`onMouseUp`);
    setMarking(false);
    setPoints([]);
  };
  return {
    elements: lines,
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
  };
}
