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
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/project_creation',
    name: 'project-creation',
    component: './ProjectCreation',
  },
  {
    path: '/project_detail',
    name: 'Project Detail',
    component: './ProjectDetail',
  },
  {
    path: '/classification',
    name: 'classification',
    component: './Classification',
  },
  {
    path: '/segmentation_mode',
    name: 'segmentation-mode',
    component: './SegmentationMode',
  },
  {
    path: '/semantic_segmentation',
    name: 'semantic_segmentation',
    component: './SemanticSegmentation',
  },
  {
    path: '/detection',
    name: 'Detection',
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
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin', // This way only admin can view
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
