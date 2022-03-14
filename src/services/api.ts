import { ProjectApi } from '@/services/apis/ProjectApi';
import { Configuration } from '@/services';

const baseUrl = localStorage.getItem('basePath');
export const projectApi = new ProjectApi(
  new Configuration(baseUrl ? { basePath: baseUrl } : undefined),
);
