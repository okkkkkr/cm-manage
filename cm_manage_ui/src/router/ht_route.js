// 承办方路由
import Layout from '@/layout'

export const ht_route = [
  {
    path: '/unit',
    component: Layout,
    meta: { belong: 'ht' },
    children: [
      {
        path: 'ht',
        name: 'Ht',
        component: () => import('@/views/unit/host_index'),
        meta: { title: '个体信息', icon: 'el-icon-user-solid'}
      },
    ]
  },
  {
    path: '/ht-personal',
    component: Layout,
    hidden: true,
    meta: { belong: "ht" },
    children: [
      {
        path: 'set',
        name: 'Set',
        component: () => import('@/views/unit/host_details'),
        meta: { title: '个人信息修改', icon: 'el-icon-user-solid'}
      }
      
    ]
  },
  {
    path: '/ht-related',
    component: Layout,
    meta: { title: '相关信息', icon: 'el-icon-share', belong: 'ht' },
    children: [
      {
        path: 'community',
        name: 'Community',
        hidden: true,
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
        component: () => import('@/views/related/inform'),
        meta: { title: '我的消息', icon: 'el-icon-user-solid'},
      },
      {
        path: 'itemInfo',
        name: 'ItemInfo',
        hidden: true,
        component: () => import('@/views/related/item_details'),
        meta: { title: '项目详情', icon: 'el-icon-s-ticket'}
      },
      {
        path: 'activityInfo',
        name: 'ActivityInfo',
        hidden: true,
        component: () => import('@/views/related/activity_info'),
        meta: { title: '活动详情', icon: 'el-icon-s-ticket'}
      },
      {
        path: 'setActivityInfo',
        name: 'setActivityInfo',
        hidden: true,
        component: () => import('@/views/related/set_ac_details'),
        meta: { title: '新增活动', icon: 'el-icon-s-ticket'}
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
  // {
  //   path: '/personnel',
  //   component: Layout,
  //   meta: { belong: 'ht' },
  //   children: [
  //     {
  //       path: 'employees',
  //       name: 'Employees',
  //       component: () => import('@/views/personnel/employees'),
  //       meta: { title: '职员信息', icon: 'el-icon-info'}
  //     },
  //   ]
  // },
  {
    path: '/process',
    component: Layout,
    meta: { title: '流程监管', icon: 'el-icon-s-operation', belong: 'ht' },
    children: [
      {
        path: 'activity',
        name: 'Activity',
        hidden: true,
        component: () => import('@/views/process/activity'),
        meta: { title: '活动流程监控', icon: 'el-icon-s-claim' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/process/order'),
        meta: { title: '项目委托工单', icon: 'el-icon-s-order' }
      },
      {
        path: 'details',
        name: 'Details',
        hidden: true,
        component: () => import('@/views/process/process_details'),
        meta: { title: '活动流程详情', icon: 'el-icon-s-order'}
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
    path: '/data',
    component: Layout,
    hidden: true,
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