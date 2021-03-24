export default [
 
  {
    name: 'Dashboard',
    icon: '',
    path: '/dashboard',
    component: './Dashboard',
    access: 'canAdmin',
  },
  {
    name: 'Inventory',
    icon: '',
    path: '/inventory',
    component: './Inventory',
    access: 'canAdmin',
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
    access: 'canAdmin',
  },
  {
    name: 'Pans',
    icon: '',
    path: '/pans',
    component: './Pans',
    access: 'canAdmin',
  },
  {
    name: 'JP Locations',
    icon: '',
    path: '/locations',
    component: './JPLocation',
    access: 'canAdmin',
  },
  {
    name: 'Login',
    icon: '',
    path: '/Login',
    hideInMenu: true,
    component: './Login',
    headerRender: false,

  },
  {
    path: '/',
    redirect: '/items',
  },
  {
    component: './404',
  },
];
