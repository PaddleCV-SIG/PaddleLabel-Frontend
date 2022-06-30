// TODO: maybe the url should in camel case
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/project_overview',
    component: './ProjectOverview',
  },
  {
    path: '/ml',
    component: './ML',
  },
  {
    path: '/sample_project',
    component: './SampleProject',
  },
  {
    path: '/project_detail',
    component: './ProjectDetail',
  },
  {
    path: '/classification',
    component: './Classification',
  },
  {
    path: '/segmentation_mode',
    component: './SegmentationMode',
  },
  {
    path: '/semantic_segmentation',
    component: './SemanticSegmentation',
  },
  {
    path: '/instance_segmentation',
    component: './SemanticSegmentation',
  },
  {
    path: '/detection',
    component: './Detection',
  },
  {
    path: '/keypoint_detection',
    name: 'keypoint_detection',
    component: './KeypointDetection',
  },
  {
    path: '/medical',
    name: 'medical',
    component: './Medical',
  },
  {
    path: '/remote_sensing',
    name: 'remote-sensing',
    component: './RemoteSensing',
  },
  {
    path: '/change_detection',
    name: 'change-detection',
    component: './ChangeDetection',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
