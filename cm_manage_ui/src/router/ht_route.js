// 承办方路由
import Layout from '@/layout'

export const htRoute = [
    {
        path: '/ht-related',
        component: Layout,
        meta: { title: '相关信息', icon: 'el-icon-share', belong: 'ht' },
        children: [
          {
            path: 'host',
            name: 'host',
            component: () => import('@/views/related/host_info'),
            meta: { title: '社区方信息', icon: 'el-icon-s-custom', belong: 'ht' }
          },
          {
            path: 'activity',
            name: 'activity',
            component: () => import('@/views/related/activity_info'),
            meta: { title: '已承办的活动', icon: 'el-icon-s-ticket', belong: 'ht' }
          }
        ]
      },
    
      {
        path: '/ht-employees',
        component: Layout,
        children: [
          {
            path: 'index',
            name: 'Residents',
            component: () => import('@/views/residents/index'),
            meta: { title: '职员信息', icon: 'el-icon-info', belong: 'ht' }
          },
        ]
      },
      {
        path: '/ht-process',
        component: Layout,
        meta: { title: '流程监管', icon: 'el-icon-s-operation', belong: 'ht' },
        children: [
          {
            path: 'activity',
            name: 'Activity',
            component: () => import('@/views/process/activity'),
            meta: { title: '活动流程', icon: 'el-icon-s-claim', belong: 'ht' }
          },
          {
            path: 'order',
            name: 'Order',
            component: () => import('@/views/process/order'),
            meta: { title: '活动申办工单', icon: 'el-icon-s-order', belong: 'ht' }
          }
        ]
      },
    
      {
        path: '/ht-data',
        component: Layout,
        children: [
          {
            path: 'index',
            name: 'Databoard',
            component: () => import('@/views/databoard/index'),
            meta: { title: '数据监管', icon: 'el-icon-s-platform', belong: 'ht' }
          }
        ]
      }
]

export default htRoute