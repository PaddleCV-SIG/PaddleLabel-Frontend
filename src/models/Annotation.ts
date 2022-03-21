import type { Annotation as ServiceAnnotation } from '@/services';

export interface Annotation<T = void> extends ServiceAnnotation {
  frontendId?: number;
  points?: T;
  invisible?: boolean; // Only used by frontend
  delete?: boolean; // Only used by frontend
}
