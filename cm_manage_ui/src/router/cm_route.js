//社区方路由列表
import Layout from '@/layout'

export const cmRoute = [
  {
    path: '/cm-related',
    component: Layout,
    meta: { title: '相关信息', icon: 'el-icon-share', belong: 'cm' },
    children: [
      {
        path: 'host',
        name: 'host',
        component: () => import('@/views/related/host_info'),
        meta: { title: '承办方信息', icon: 'el-icon-s-custom', belong: 'cm' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/related/activity_info'),
        meta: { title: '已发布的活动', icon: 'el-icon-s-ticket', belong: 'cm' }
      }
    ]
  },

  {
    path: '/cm-residents',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'residents',
        component: () => import('@/views/residents/index'),
        meta: { title: '居民信息', icon: 'el-icon-info', belong: 'cm' }
      },
    ]
  },
  {
    path: '/cm-process',
    component: Layout,
    meta: { title: '流程监管', icon: 'el-icon-s-operation', belong: 'cm' },
    children: [
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/process/activity'),
        meta: { title: '活动流程', icon: 'el-icon-s-claim', belong: 'cm' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/process/order'),
        meta: { title: '活动申办工单', icon: 'el-icon-s-order', belong: 'cm' }
      }
    ]
  },

  {
    path: '/cm-data',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Databoard',
        component: () => import('@/views/databoard/index'),
        meta: { title: '数据监管', icon: 'el-icon-s-platform', belong: 'cm' }
      }
    ]
  },
]

export default cmRoute