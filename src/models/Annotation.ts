import type { Annotation as ServiceAnnotation } from '@/services';

export interface Annotation<T = void> extends ServiceAnnotation {
  active?: boolean;
  invisible?: boolean; // Only used by frontend
  lines?: T[];
  delete?: boolean; // Only used by frontend
}
