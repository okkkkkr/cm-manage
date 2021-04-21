// 承办方路由
import Layout from '@/layout'

export const ht_route = [
  {
    path: '/ht-related',
    component: Layout,
    meta: { title: '相关信息', icon: 'el-icon-share', belong: 'ht' },
    children: [
      {
        path: 'community',
        name: 'Community',
        component: () => import('@/views/related/host_info'),
        meta: { title: '社区方信息', icon: 'el-icon-user-solid'}
      },
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('@/views/manager/manager_charge'),
        meta: { title: '管理者信息', icon: 'el-icon-user-solid'}
      },
      {
        path:'inform',
        name:'Inform',
        component: () => import('@/views/related/my_inform'),
        meta: { title: '我的消息', icon: 'el-icon-user-solid'},
      },
      {
        path: 'activityInfo',
        name: 'ActivityInfo',
        hidden: true,
        component: () => import('@/views/related/activity_info'),
        meta: { title: '活动详情', icon: 'el-icon-s-ticket'}
      },
      {
        path: 'cmDetails',
        name: 'CmDetails',
        hidden: true,
        component: () => import('@/views/related/host_details'),
        meta: { title: '社区方详情', icon: 'el-icon-s-ticket'}
      }
    ]
  },

  {
    path: '/personnel',
    component: Layout,
    meta: { belong: 'ht' },
    children: [
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/personnel/index'),
        meta: { title: '职员信息', icon: 'el-icon-info'}
      },
    ]
  },
  {
    path: '/process',
    component: Layout,
    meta: { title: '流程监管', icon: 'el-icon-s-operation', belong: 'ht' },
    children: [
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/process/activity'),
        meta: { title: '活动流程', icon: 'el-icon-s-claim' }
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/process/process_details'),
        meta: { title: '活动流程详情', icon: 'el-icon-s-order'}
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/process/order'),
        meta: { title: '活动申办工单', icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: '/data',
    component: Layout,
    meta: { belong: 'ht' },
    children: [
      {
        path: 'index',
        name: 'Databoard',
        component: () => import('@/views/databoard/index'),
        meta: { title: '数据监管', icon: 'el-icon-s-platform' }
      }
    ]
  },
]

export default ht_route