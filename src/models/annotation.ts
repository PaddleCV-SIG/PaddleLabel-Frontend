import type { Label } from './label';

export type Annotation = {
  annotationId: string;
  label: Label;
  invisible?: boolean;
};
