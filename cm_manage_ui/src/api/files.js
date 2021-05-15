import request from '../utils/request'

export function delImage(data){
    return request({
        url:'/api/upload/delImage',
        method: 'POST',
        data
    })
}

export function delFiles(data){
    return request({
        url:'/api/upload/delFiles',
        method: 'POST',
        data
    })
}