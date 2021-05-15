import request from '@/utils/request'

export function testGetActivity(data) {
  return request({
    url: '/api/test/getActivity',
    method: 'get'
  })
}

export function testSignUp(data) {
    return request({
      url: '/api/test/signUp',
      method: 'post',
      data
    })
  }