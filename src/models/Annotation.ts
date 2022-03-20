import type { Annotation as ServiceAnnotation } from '@/services';
import { ToolType } from './ToolType';

export interface Annotation<T = void> extends ServiceAnnotation {
  tool?: ToolType;
  active?: boolean;
  invisible?: boolean; // Only used by frontend
  lines?: T[];
  delete?: boolean; // Only used by frontend
}
