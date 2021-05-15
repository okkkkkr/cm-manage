import request from '@/utils/request'

export function login(data){
    return request({
        url: '/api/sign/login',
        method:'post',
        data
    })
}
