import type { Annotation as ServiceAnnotation } from '@/services';

export interface Annotation extends ServiceAnnotation {
  invisible?: boolean; // Only used by frontend
  delete?: boolean; // Only used by frontend
}
