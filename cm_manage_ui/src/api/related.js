import request from '@/utils/request'

// 新增社区管理员
export function addCmManager(data){
  return request({
    url: '/api/manager/addCmManager',
    method: 'post',
    data
  })
}

// 新增承办方管理员
export function addHtManager(data){
  return request({
    url: '/api/manager/addHtManager',
    method: 'post',
    data
  })
}

// 分页查询管理员列表
export function getMgList(data){
  return request({
    url: '/api/manager/getList',
    method: 'post',
    data
  })
}

// 修改个体管理员信息
export function modifyManager(data){
  return request({
    url: '/api/manager/modifyManager',
    method: 'post',
    data
  })
}

// 删除个体管理员信息
export function delManager(data){
  return request({
    url: '/api/manager/delManager',
    method: 'post',
    data
  })
}

