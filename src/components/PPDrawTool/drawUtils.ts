import type { Annotation } from '@/models/Annotation';
import { ToolType } from '@/models/ToolType';
import { Label } from '@/models/Label';
import { Stage as StageType } from 'konva/lib/Stage';
import { Layer as LayerType } from 'konva/lib/Layer';
import Konva from 'konva';
import { ReactElement } from 'react';

export type PPRenderFuncProps<T = any> = {
  annotation: Annotation<T>;
  onDrag: (anntation: Annotation<T>) => void;
  onDragEnd: () => void;
  scale: number;
  currentTool: ToolType;
  onSelect: (anntation: Annotation<T>) => void;
  stageRef: React.RefObject<StageType>;
  currentAnnotation?: Annotation<T>;
  transparency: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export type PPDrawToolProps<T = any> = {
  currentLabel?: Label;
  brushSize?: number;
  scale: number;
  dataId: number;
  currentTool?: ToolType;
  annotations?: Annotation<T>[];
  currentAnnotation?: Annotation<T>;
  onAnnotationAdd: (annotation: Annotation<T>) => void;
  onAnnotationModify: (annotation: Annotation<T>) => void;
  onMouseUp: () => void;
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
  createElementsFunc: (props: PPRenderFuncProps<T>) => ReactElement;
};

export function getMaxId(annotations?: Annotation<any[]>[]): any {
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
