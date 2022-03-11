import { ToolType } from '@/pages/SemanticSegmentation';
import { LegacyRef } from 'react';
import type { Label } from './label';

export type Annotation<T> = {
  annotationId: number;
  tool: ToolType;
  label: Label;
  invisible?: boolean; // Only used by frontend
  lines?: T[];
  delete?: boolean; // Only used by frontend
  shapeRef?: LegacyRef<any>; // Only used by frontend
  transformerRef?: LegacyRef<any>; // Only used by frontend
};
