import { Label } from '@/models/label';
import { ToolType } from '@/pages/SemanticSegmentation';
import Konva from 'konva';
import React from 'react';
import { useState } from 'react';
import { Line } from 'react-konva';

function createLine(width: number, points: number[], key: number, tool: ToolType) {
  return (
    <Line
      key={key}
      stroke="#df4b26"
      strokeWidth={width}
      globalCompositeOperation={tool === 'brush' ? 'source-over' : 'destination-out'}
      lineCap="round"
      points={points}
      tension={0.01}
    />
  );
}

function getTool(currentTool: ToolType, mouseButton: number): ToolType {
  if (currentTool == 'rubber') return 'rubber';
  if (mouseButton == 2) return 'rubber';
  return 'brush';
}

export default function (props: {
  currentLabel: Label | undefined;
  brushSize?: number;
  points?: number[];
  currentTool?: ToolType;
}) {
  const [lines, setLines] = useState<React.ReactElement[]>([]);
  const [points, setPoints] = useState<number[]>([]);
  const [currentTool, setCurrentTool] = useState<ToolType>();

  const OnMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log(`OnMouseDown, e.evt.button: ${e.evt.button}`);
    const tool = getTool(props.currentTool, e.evt.button);
    const line = createLine(
      props.brushSize || 10,
      [e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY],
      lines.length,
      tool,
    );
    lines.push(line);
    setCurrentTool(tool);
    setPoints([e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY]);
    setLines(lines);
  };

  const OnMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // console.log(`onMouseMove, marking: ${marking}`);
    if (!currentTool) return;
    const newPoints = points.concat([e.evt.offsetX, e.evt.offsetY]);
    const line = createLine(props.brushSize || 10, newPoints, lines.length - 1, currentTool);
    lines.pop();
    lines.push(line);
    setPoints(newPoints);
    setLines(lines);
  };

  const OnMouseUp = () => {
    // console.log(`OnMouseUp`);
    setCurrentTool(undefined);
    setPoints([]);
  };
  return {
    elements: lines,
    onMouseDown: OnMouseDown,
    onMouseMove: OnMouseMove,
    onMouseUp: OnMouseUp,
  };
}
