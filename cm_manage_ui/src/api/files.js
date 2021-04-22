import request from '../utils/request'

export function delFiles(data){
    return request({
        url:'/api/upload/delFiles',
        method: 'POST',
        data
    })
}