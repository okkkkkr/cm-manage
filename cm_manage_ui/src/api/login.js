import request from '@/utils/request'

export function login(data){
    return request({
        url: '/api/sign/login',
        method:'post',
        data
    })
}

// export function open(){
//     return request({
//         url: '/api/test/files',
//         method:'get'
//     })
// }
