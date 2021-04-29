import request from '../utils/request'

export function addInform(data){
    return request({
        url:'/api/inform/addInform',
        method: 'POST',
        data
    })
}

export function getInform(data){
    return request({
        url:'/api/inform/getInform',
        method: 'POST',
        data
    })
}

export function getInformList(data){
    return request({
        url:'/api/inform/getInformList',
        method: 'POST',
        data
    })
}

export function updateInform(data){
    return request({
        url:'/api/inform/updateInform',
        method: 'POST',
        data
    })
}

