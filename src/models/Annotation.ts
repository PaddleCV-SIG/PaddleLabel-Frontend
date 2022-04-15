import type { Annotation as ServiceAnnotation } from '@/services';

export interface Annotation extends ServiceAnnotation {
  frontendId: number;
  invisible?: boolean; // Only used by frontend
  delete?: boolean; // Only used by frontend
}
