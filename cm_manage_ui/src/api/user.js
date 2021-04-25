import request from '@/utils/request'

// 创建主办方个体
export function createCommunity(data) {
  return request({
    url: '/api/users/community/create',
    method: 'post',
    data
  })
}

// 分页查询主办方列表
export function getCommunityList(pageNum,pageSize) {
  return request({
    url: `/api/users/community/getList/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

// 创建承办方个体
export function createHost(data) {
  return request({
    url: '/api/users/host/create',
    method: 'post',
    data
  })
}

// 分页查询承办方列表
export function getHostList(pageNum,pageSize) {
  return request({
    url: `/api/users/host/getList/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

// 创建管理员个体
export function createAdmin(data) {
  return request({
    url: '/api/users/admin/create',
    method: 'post',
    data
  })
}

// 分页查询管理员列表
export function getAdminList(pageNum,pageSize) {
  return request({
    url: `/api/users/admin/getList/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

// 通过GUID查询个体用户信息
export function getUnitByGuid(data) {
  return request({
    url: `/api/users/unit/getByGuid`,
    method: 'post',
    data
  })
}

// 通过ID查询管理者/登陆者信息
export function getManagerById(data) {
  return request({
    url: `/api/users/manager/getById`,
    method: 'post',
    data
  })
}

// 通过ID查询管理者/登陆者信息
export function modifyInfo(data) {
  return request({
    url: `/api/users/unit/modifyInfo`,
    method: 'post',
    data
  })
}

