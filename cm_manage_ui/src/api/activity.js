import request from '../utils/request'

export function addActivity(data){
    return request({
        url:'/api/activity/addActivity',
        method: 'POST',
        data
    })
}

export function updateActivity(data){
    return request({
        url:'/api/activity/updateActivity',
        method: 'POST',
        data
    })
}

export function getCMActivity(data){
    return request({
        url:'/api/activity/getCMActivity',
        method: 'POST',
        data
    })
}

export function getActivityByGuid(data){
    return request({
        url:'/api/activity/getActivityByGuid',
        method: 'POST',
        data
    })
}

export function getDetailByGuid(data){
    return request({
        url:'/api/activity/getDetailByGuid',
        method: 'POST',
        data
    })
}

export function updateDetailState(data){
    return request({
        url:'/api/activity/updateDetailState',
        method: 'POST',
        data
    })
}

export function getACDetailByGuid(data){
    return request({
        url:'/api/activity/getACDetailByGuid',
        method: 'POST',
        data
    })
}

export function getItemByGuid(data){
    return request({
        url:'/api/activity/getItemByGuid',
        method: 'POST',
        data
    })
}

export function updateItemState(data){
    return request({
        url:'/api/activity/updateItemState',
        method: 'POST',
        data
    })
}

export function addAcDetails(data){
    return request({
        url:'/api/activity/addAcDetails',
        method: 'POST',
        data
    })
}

export function addAcSupplies(data){
    return request({
        url:'/api/activity/addAcSupplies',
        method: 'POST',
        data
    })
}

export function addAcProcess(data){
    return request({
        url:'/api/activity/addAcProcess',
        method: 'POST',
        data
    })
}
