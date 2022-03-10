import { ToolType } from '@/pages/SemanticSegmentation';
import type { Label } from './label';

export type Annotation<T> = {
  annotationId: number;
  tool: ToolType;
  label: Label;
  invisible?: boolean;
  lines?: T[];
  delete?: boolean;
};
