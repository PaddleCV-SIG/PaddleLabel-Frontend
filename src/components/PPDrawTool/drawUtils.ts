/* eslint-disable */
import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type { Label } from '@/models/Label';
import type { Stage as StageType } from 'konva/lib/Stage';
import type { Layer as LayerType } from 'konva/lib/Layer';
import type Konva from 'konva';
import type { ReactElement } from 'react';

export type PPRenderFuncProps = {
  annotation: Annotation;
  onDrag: (anntation: Annotation) => void;
  onDragEnd: () => void;
  scale: number;
  currentTool: ToolType;
  onSelect: (anntation: Annotation) => void;
  stageRef: React.RefObject<StageType>;
  currentAnnotation?: Annotation;
  transparency: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export type PPDrawToolProps<T = any> = {
  currentLabel?: Label;
  brushSize?: number;
  scale: number;
  dataId: number;
  currentTool?: ToolType;
  annotations?: Annotation[];
  currentAnnotation?: Annotation;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationModify: (annotation: Annotation) => void;
  onMouseUp: () => void;
  frontendIdOps: { frontendId: number; setFrontendId: (id: number) => void };
};

export type EvtProps = {
  e: Konva.KonvaEventObject<MouseEvent>;
  mouseX: number;
  mouseY: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  layerRef: React.RefObject<LayerType>;
};

export type EvtType = (props: EvtProps) => void;

export type PPDrawToolRet<T = any> = {
  onMouseDown: EvtType;
  onMouseMove: EvtType;
  onMouseUp: EvtType;
  drawAnnotation: (props: PPRenderFuncProps) => ReactElement;
};

export function getMaxId(annotations?: Annotation[]): any {
  let maxId = 0;
  if (!annotations) return maxId;
  for (const annotation of annotations) {
    if (!annotation || !annotation.frontendId) continue;
    if (annotation.frontendId > maxId) maxId = annotation.frontendId;
  }
  return maxId;
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
