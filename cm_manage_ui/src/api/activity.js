import request from '../utils/request'

export function addActivity(data){
    return request({
        url:'/api/activity/addActivity',
        method: 'POST',
        data
    })
}