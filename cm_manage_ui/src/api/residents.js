import request from '@/utils/request'

// 居民入住登记
export function addResident(data) {
  return request({
    url: '/api/residents/addResidents',
    method: 'post',
    data
  })
}

// 分页获取居民列表
export function getResidentsList(data) {
  return request({
    url: '/api/residents/getResidentsList',
    method: 'post',
    data
  })
}

// 修改居民信息
export function modifyResidents(data) {
  return request({
    url: '/api/residents/modifyResidents',
    method: 'post',
    data
  })
}

// 修改居民信息
export function delResidents(data) {
  return request({
    url: '/api/residents/delResidents',
    method: 'post',
    data
  })
}