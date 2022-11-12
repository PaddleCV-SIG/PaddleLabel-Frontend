/* eslint-disable */
import type { Annotation } from '@/models/Annotation';
import type { ToolType } from '@/models/ToolType';
import type { Label } from '@/models/Label';
import type { Stage as StageType } from 'konva/lib/Stage';
import type Konva from 'konva';
import type { ReactElement } from 'react';
import { InteractorData } from '@/models/InteractorData';

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
  threshold?: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  interactorData?: InteractorData;
  label?: Label;
  radius?: number;
  tool?: {
    curr: ToolType;
    setCurr: (tool: ToolType) => void;
  };
  selectFinly?: Annotation;
  SelectAnnotation?: (anntation: Annotation) => void;
  onDragUP?: (anntation: Annotation) => void;
};

export type PPDrawToolProps = {
  frontendIdOps: { frontendId: number; setFrontendId: (id: number) => void };
  model: any;
  onAnnotationAdd: (annotation: Annotation) => void;
  onAnnotationModify: (annotation: Annotation) => void;
  modifyAnnoByFrontendId: (annotation: Annotation) => void;
  onMouseUp: () => void;
  currentLabel?: Label;
  brushSize?: number;
  scale: number;
  dataId?: number;
  currentTool?: ToolType;
  annotations?: Annotation[];
  currentAnnotation?: Annotation;
  onMouseDown?: () => void;
  labels?: Label[];
  finlyList?: Annotation[];
  selectFinly?: Annotation;
  isLabel: string;
};

export type EvtProps = {
  e: Konva.KonvaEventObject<MouseEvent>;
  mouseX: number;
  mouseY: number;
  offsetX: number;
  offsetY: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  stageRef: React.RefObject<StageType>;
  img?: HTMLImageElement;
};

export type EvtType = (props: EvtProps) => void;

export type PPDrawToolRet = {
  onMouseDown: EvtType;
  onMouseMove: EvtType;
  onMouseUp: EvtType;
  drawAnnotation: (props: PPRenderFuncProps, flag?: boolean) => ReactElement;
  drawGuidewires?: (x: number, y: number, context: any, brushSize?: number) => void;
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
