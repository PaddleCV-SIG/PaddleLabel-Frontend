import type { Annotation as ServiceAnnotation } from '@/services';
import { ToolType } from './ToolType';

export interface Annotation<T = any> extends ServiceAnnotation {
  png?: string;
  frontendId: number;
  lines?: T;
  invisible?: boolean; // Only used by frontend
  delete?: boolean; // Only used by frontend
}
