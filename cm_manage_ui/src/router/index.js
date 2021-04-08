import Layout from '@/layout'
import adRoute from './ad_router';
import cmRoute from './cm_route';
import htRoute from './ht_route';

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

  // 引入角色专属的路由
  ...cmRoute,
  ...htRoute,
  ...adRoute,

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]