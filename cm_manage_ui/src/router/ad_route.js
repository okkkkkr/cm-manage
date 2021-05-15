// 管理员路由
import Layout from '@/layout'

export const adRoute = [
    {
      path: '/ad-audit',
      component: Layout,
      meta: { belong: 'ad' },
      children: [
        {
          path: 'index',
          name: 'Audit',
          component: () => import('@/views/admin/activity_audit/activity_audit'),
          meta: { title: '活动审核', icon: 'el-icon-s-platform', belong: 'ad' }
        },
        {
          path: 'details',
          name: 'Details',
          hidden: true,
          component: () => import('@/views/admin/activity_audit/activity_details'),
          meta: { title: '活动详情', icon: 'el-icon-s-platform', belong: 'ad' }
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
            name: 'Host',
            component: () => import('@/views/admin/info_charge/unit_info'),
            meta: { title: '承办方信息', icon: 'el-icon-user-solid', belong: 'ad'}
          },
          {
            path: 'community',
            name: 'Community',
            component: () => import('@/views/admin/info_charge/unit_info'),
            meta: { title: '社区方信息', icon: 'el-icon-user-solid', belong: 'ad'}
          },
          {
            path: 'admin',
            name: 'Admin',
            component: () => import('@/views/admin/info_charge/admin_info'),
            meta: { title: '管理员信息', icon: 'el-icon-user-solid', belong: 'ad' }
          }
        ]
      },
    
      {
        path: '/ad-charge',
        component: Layout,
        meta: { title: '权限监管', icon: 'el-icon-info', belong: 'ad' },
        children: [
          {
            path: 'cm-power',
            name: 'Cm-power',
            component: () => import('@/views/admin/power_charge/power_info'),
            meta: { title: '社区方权限', icon: 'el-icon-info', belong: 'ad' }
          },
          {
            path: 'ht-power',
            name: 'Ht-power',
            component: () => import('@/views/admin/power_charge/power_info'),
            meta: { title: '承办方权限', icon: 'el-icon-info', belong: 'ad' }
          },
          {
            path: 'ad-power',
            name: 'Ad-power',
            component: () => import('@/views/admin/power_charge/power_info'),
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
            component: () => import('@/views/admin/activity_charge/activity_info'),
            meta: { title: '活动发布记录', icon: 'el-icon-s-operation', belong: 'ad' }
          },
          {
            path: 'order',
            name: 'Order',
            component: () => import('@/views/admin/activity_charge/order_info'),
            meta: { title: '项目委托工单记录', icon: 'el-icon-s-operation', belong: 'ad' }
          }
        ]
      },
]

export default adRoute