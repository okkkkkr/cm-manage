import request from '@/utils/request'

export function orderRecord(data) {
    return request({
      url: '/api/search/orderRecord',
      method: 'post',
      data
    })
  }

  export function getAllActivity(data) {
    return request({
      url: '/api/search/getAllActivity',
      method: 'post',
      data
    })
  }