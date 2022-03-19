import { Label as ServiceLabel } from '@/services';

export interface Label extends ServiceLabel {
  active?: boolean;
}
