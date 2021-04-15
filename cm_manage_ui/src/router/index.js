import Layout from '@/layout'
import adRoute from './ad_route';
import commonRoute from './common_route';

export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'unit',
      name: 'Unit',
      component: () => import('@/views/unit/index'),
      meta: { title: '个体信息', icon: 'el-icon-user-solid', belong: "all" }
    }]
  },
  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: 'set',
        name: 'Set',
        hidden: true,
        component: () => import('@/views/unit/unit_details'),
        meta: { title: '个人信息修改', icon: 'el-icon-user-solid', belong: 'all' }
      }
      
    ]
  },
  // 引入角色的路由
  ...commonRoute,
  ...adRoute,
  
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]