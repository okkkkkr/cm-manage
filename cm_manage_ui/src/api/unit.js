import request from '@/utils/request'

// 新增项目
export function addItem(data) {
  return request({
    url: '/api/activity/addItem',
    method: 'post',
    data
  })
}

// 分页查看项目列表
export function getItemList(data) {
  return request({
    url: '/api/activity/getItemList',
    method: 'post',
    data
  })
}

// 社区查看项目列表数
export function getActivityNum(data) {
  return request({
    url: '/api/activity/getActivityNum',
    method: 'post',
    data
  })
}

// 承办方分页查看活动列表
export function getHtActivity(data) {
  return request({
    url: '/api/activity/ht/getActivity',
    method: 'post',
    data
  })
}
