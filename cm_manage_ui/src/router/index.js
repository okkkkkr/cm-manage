/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'databoard',
      name: 'Databoard',
      component: () => import('@/views/databoard/index'),
      meta: { title: '数据看板', icon: 'dashboard' }
    }]
  },

  {
    path: '/fund',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Fund',
        component: () => import('@/views/fund/index'),
        meta: { title: '基金监测', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/stock',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Stock',
        component: () => import('@/views/stock/index'),
        meta: { title: '股票监测', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/warehouse',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Warehouse',
        component: () => import('@/views/warehouse/index'),
        meta: { title: '我的持仓', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/north',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'North',
        component: () => import('@/views/temporary/north'),
        meta: { title: '北向资金', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Test',
        component: () => import('@/views/test-model/index'),
        meta: { title: '测试模块', icon: 'el-icon-s-help' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]