import type { Label as ServiceLabel } from '@/services/web';

export interface Label extends ServiceLabel {
  active?: boolean;
}
