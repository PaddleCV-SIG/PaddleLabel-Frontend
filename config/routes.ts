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
    path: '/classification_project',
    name: 'classification-project',
    component: './ClassificationProject',
  },
  {
    path: '/image_classification',
    name: 'image_classification',
    component: './ImageClassification',
  },
  {
    path: '/segmentation_project',
    name: 'segmentation-project',
    component: './SegmentationProject',
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
    path: '/detection_project',
    name: 'detection-project',
    component: './DetectionProject',
  },
  {
    path: '/object_detection',
    name: 'object_detection',
    component: './ObjectDetection',
  },
  {
    path: '/keypoint_project',
    name: 'keypoint-project',
    component: './KeypointProject',
  },
  {
    path: '/keypoint_detection',
    name: 'keypoint_detection',
    component: './KeypointDetection',
  },
  {
    path: '/remote_sensing',
    name: 'remote-sensing',
    component: './RemoteSensing',
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
