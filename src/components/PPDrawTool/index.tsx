import type Konva from 'konva';

export interface DrawTool {
  onMouseUp?: Konva.KonvaEventObject<MouseEvent>;
}
