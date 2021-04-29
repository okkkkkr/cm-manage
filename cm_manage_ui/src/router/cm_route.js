//社区方路由列表
import Layout from '@/layout'

export const cmRoute = [
  {
    path: '/personal',
    component: Layout,
    hidden: true,
    meta: { belong: "cm" },
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
    path: '/cm-related',
    component: Layout,
    meta: { title: '相关信息', icon: 'el-icon-share', belong: 'cm' },
    children: [
      {
        path: 'host',
        name: 'host',
        component: () => import('@/views/related/host_info'),
        meta: { title: '承办方信息', icon: 'el-icon-s-custom'}
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
        component: () => import('@/views/related/inform'),
        meta: { title: '我的消息', icon: 'el-icon-user-solid'},
      },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/related/publish_info'),
        meta: { title: '活动信息', icon: 'el-icon-s-ticket'}
      },
      {
        path: 'activityInfo',
        name: 'ActivityInfo',
        // hidden: true,
        component: () => import('@/views/related/activity_info'),
        meta: { title: '活动详情', icon: 'el-icon-s-ticket'}
      },
      {
        path: 'hostDetails',
        name: 'HostDetails',
        // hidden: true,
        component: () => import('@/views/related/host_details'),
        meta: { title: '承办方详情', icon: 'el-icon-s-ticket'}
      }
    ]
  },

  {
    path: '/cm-residents',
    component: Layout,
    meta: { belong: 'cm' },
    children: [
      {
        path: 'index',
        name: 'residents',
        component: () => import('@/views/personnel/residents'),
        meta: { title: '居民信息', icon: 'el-icon-info'}
      },
      {
        path: 'list',
        name: 'List',
        hidden: true,
        component: () => import('@/views/personnel/resident_list'),
        meta: { title: '居民列表', icon: 'el-icon-info'}
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
        meta: { title: '活动流程', icon: 'el-icon-s-claim' }
      },
      {
        path: '/activity/details',
        name: 'ACDetails',
        component: () => import('@/views/process/process_details'),
        meta: { title: '活动流程详情', icon: 'el-icon-s-order' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/process/order'),
        meta: { title: '活动申办工单', icon: 'el-icon-s-order' }
      },
      {
        path: '/order/details',
        name: 'ORDetails',
        hidden: true,
        component: () => import('@/views/process/order_details'),
        meta: { title: '活动工单详情', icon: 'el-icon-s-order' }
      }
    ]
  },

  {
    path: '/cm-data',
    component: Layout,
    meta: { belong: 'cm' },
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