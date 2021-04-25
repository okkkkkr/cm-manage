import Layout from '@/layout'
import adRoute from './ad_route';
import cm_doute from './cm_route'
import ht_doute from './ht_route';

export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta:{belong: "all"}
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    meta: {  belong: "all" },
    children: [{
      path: 'unit',
      name: 'Unit',
      component: () => import('@/views/unit/index'),
      meta: { title: '个体信息', icon: 'el-icon-user-solid'}
    }]
  },
  {
    path: '/personal',
    component: Layout,
    hidden: true,
    meta: { belong: "all" },
    children: [
      {
        path: 'set',
        name: 'Set',
        component: () => import('@/views/unit/unit_details'),
        meta: { title: '个人信息修改', icon: 'el-icon-user-solid'}
      }
      
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: { belong: "all" },
    hidden: true,
    children: [
      {
        path: 'set',
        name: 'Set',
        component: () => import('@/views/test'),
        meta: { title: 'test', icon: 'el-icon-user-solid'}
      }
      
    ]
  },
  // 引入角色的路由
  ...cm_doute,
  ...ht_doute,
  ...adRoute,
  
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta:{ belong: "all"}
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true , meta:{ belong: "all"}}
]