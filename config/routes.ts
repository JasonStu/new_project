export default [
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'Dashboard',
    icon: '',
    path: '/dashboard',
    component: './Dashboard',
  },
  {
    name: 'Inventory',
    icon: '',
    path: '/inventory',
    component: './Inventory',
  },
  {
    name: 'Items',
    icon: '',
    path: '/items',
    component: './Items',
  },
  {
    name: 'Wells',
    icon: '',
    path: '/wells',
    component: './Wells',
  },
  {
    name: 'Pans',
    icon: '',
    path: '/pans',
    component: './Pans',
  },
  {
    name: 'JP Locations',
    icon: '',
    path: '/locations',
    component: './JPLocation',
  },
  {
    path: '/',
    redirect: '/Inventory',
  },
  {
    component: './404',
  },
];
