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
    name: 'image_classification-sample',
    component: './ImageClassification',
  },
  {
    path: '/semantic_segmentation',
    name: 'semantic_segmentation-sample',
    component: './SemanticSegmentation',
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
