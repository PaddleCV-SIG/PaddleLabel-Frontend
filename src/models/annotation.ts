import type { Label } from './label';

export type Annotation<T> = {
  annotationId: number;
  label: Label;
  invisible?: boolean;
  lines?: T[];
  delete?: boolean;
};
