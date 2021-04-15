// 承办方路由
import Layout from '@/layout'

export const commonRoute = [
  {
    path: '/related',
    component: Layout,
    meta: { title: '相关信息', icon: 'el-icon-share', belong: 'all' },
    children: [
      {
        path: 'host',
        name: 'Host',
        component: () => import('@/views/related/host_info'),
        meta: { title: '承办方信息', icon: 'el-icon-s-custom', belong: 'cm' }
      },
      {
        path: 'community',
        name: 'Community',
        component: () => import('@/views/related/host_info'),
        meta: { title: '社区方信息', icon: 'el-icon-user-solid', belong: 'ht' }
      },
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('@/views/manager/manager_charge'),
        meta: { title: '管理者信息', icon: 'el-icon-user-solid', belong: 'all' }
      },
      {
        path:'inform',
        name:'Inform',
        component: () => import('@/views/related/my_inform'),
        meta: { title: '我的消息', icon: 'el-icon-user-solid', belong: "all" },
      },
      {
        path: 'activityInfo',
        name: 'ActivityInfo',
        hidden: true,
        component: () => import('@/views/related/activity_info'),
        meta: { title: '活动详情', icon: 'el-icon-s-ticket', belong: "all"}
      },
      {
        path: 'hostDetails',
        name: 'HostDetails',
        // hidden: true,
        component: () => import('@/views/related/host_details'),
        meta: { title: '承办方详情', icon: 'el-icon-s-ticket', belong: "cm"}
      },
      {
        path: 'cmDetails',
        name: 'CmDetails',
        hidden: true,
        component: () => import('@/views/related/host_details'),
        meta: { title: '社区方详情', icon: 'el-icon-s-ticket', belong: "ht"}
      },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/related/publish_info'),
        meta: { title: '活动发布', icon: 'el-icon-s-ticket', belong: 'cm' }
      }
    ]
  },

  {
    path: '/personnel',
    component: Layout,
    children: [
      {
        path: 'residents',
        name: 'Residents',
        component: () => import('@/views/personnel/index'),
        meta: { title: '居民信息', icon: 'el-icon-info', belong: 'cm' }
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/personnel/index'),
        meta: { title: '职员信息', icon: 'el-icon-info', belong: 'ht' }
      },
    ]
  },
  {
    path: '/process',
    component: Layout,
    meta: { title: '流程监管', icon: 'el-icon-s-operation', belong: 'all' },
    children: [
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('@/views/process/activity'),
        meta: { title: '活动流程', icon: 'el-icon-s-claim', belong: 'all' }
      },
      {
        path: 'details',
        name: 'Details',
        component: () => import('@/views/process/process_details'),
        meta: { title: '活动流程详情', icon: 'el-icon-s-order', belong: 'all' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/process/order'),
        meta: { title: '活动申办工单', icon: 'el-icon-s-order', belong: 'all' }
      }
    ]
  },

  {
    path: '/data',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Databoard',
        component: () => import('@/views/databoard/index'),
        meta: { title: '数据监管', icon: 'el-icon-s-platform', belong: 'all' }
      }
    ]
  },
]

export default commonRoute