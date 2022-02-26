import { PPLineType } from '@/components/PPLabelPage/PPBrush/draw';
import type { Label } from './label';

export type Annotation = {
  annotationId: number;
  label: Label;
  invisible?: boolean;
  lines?: PPLineType[];
};
