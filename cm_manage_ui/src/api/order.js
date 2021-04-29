import request from '@/utils/request'

export function getTOrderList(data){
    return request({
        url: '/api/order/getTOrderList',
        method:'post',
        data
    })
}

export function getFOrderList(data){
    return request({
        url: '/api/order/getFOrderList',
        method:'post',
        data
    })
}

export function addOrder(data){
    return request({
        url: '/api/order/addOrder',
        method:'post',
        data
    })
}

export function changeOrderState(data){
    return request({
        url: '/api/order/changeOrderState',
        method:'post',
        data
    })
}