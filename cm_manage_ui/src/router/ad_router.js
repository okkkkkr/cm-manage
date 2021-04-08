// 管理员路由
import Layout from '@/layout'

export const adRoute = [
    {
      path: '/ad-audit',
      component: Layout,
      children: [
        {
          path: 'index',
          name: 'Audit',
          component: () => import('@/views/databoard/index'),
          meta: { title: '活动审核', icon: 'el-icon-s-platform', belong: 'ad' }
        }
      ]
    },
    {
        path: '/ad-related',
        component: Layout,
        meta: { title: '信息监管', icon: 'el-icon-share', belong: 'ad' },
        children: [
          {
            path: 'host',
            name: 'host',
            component: () => import('@/views/related/host_info'),
            meta: { title: '承办方信息', icon: 'el-icon-s-custom', belong: 'ad' }
          },
          {
            path: 'community',
            name: 'community',
            component: () => import('@/views/related/activity_info'),
            meta: { title: '社区方信息', icon: 'el-icon-s-custom', belong: 'ad' }
          },
          {
            path: 'community',
            name: 'community',
            component: () => import('@/views/related/activity_info'),
            meta: { title: '管理员信息', icon: 'el-icon-s-custom', belong: 'ad' }
          }
        ]
      },
    
      {
        path: '/ad-power',
        component: Layout,
        meta: { title: '权限监管', icon: 'el-icon-info', belong: 'ad' },
        children: [
          {
            path: 'cm-power',
            name: 'cm-power',
            component: () => import('@/views/residents/index'),
            meta: { title: '社区方权限', icon: 'el-icon-info', belong: 'ad' }
          },
          {
            path: 'ht-power',
            name: 'ht-power',
            component: () => import('@/views/residents/index'),
            meta: { title: '承办方权限', icon: 'el-icon-info', belong: 'ad' }
          },
          {
            path: 'ad-power',
            name: 'ad-power',
            component: () => import('@/views/residents/index'),
            meta: { title: '管理员权限', icon: 'el-icon-info', belong: 'ad' }
          },
        ]
      },
      {
        path: '/ad-superise',
        component: Layout,
        meta: { title: '活动监管', icon: 'el-icon-s-operation', belong: 'ad' },
        children: [
          {
            path: 'content',
            name: 'Content',
            component: () => import('@/views/process/order'),
            meta: { title: '活动发布记录', icon: 'el-icon-s-operation', belong: 'ad' }
          },
          {
            path: 'order',
            name: 'Order',
            component: () => import('@/views/process/order'),
            meta: { title: '活动申办工单记录', icon: 'el-icon-s-operation', belong: 'ad' }
          }
          
        ]
      }
]

export default adRoute