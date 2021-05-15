const express = require('express');
const activity = express.Router();
const item = require('./service')

activity.get('/getTypeList', item.getTypeList) // 查看活动类型列表
activity.post('/getItemList', item.getItemList) // 查看项目列表
activity.post('/getItemByGuid', item.getItemByGuid) // 通过guid查看项目详情
activity.post('/getActivityNum', item.getActivityNum) // 社区方查看活动数目
activity.post('/ht/getHTActivity', item.getHTActivity) // 根据承办方GUID查看活动列表
activity.post('/getValidActivityByGuid', item.getValidActivityByGuid) // 根据GUID获取有效的活动项
activity.post('/getCMActivity', item.getCMActivity) // 根据社区方GUID查看活动列表
activity.post('/getActivityByGuid', item.getActivityByGuid) // 根据活动GUID查看活动列表
activity.post('/getDetailByGuid', item.getDetailByGuid, item.getCommunityByGuid, item.getHostByGuid, item.getSuppliesByGuid, item.getProcessByGuid) // 根据活动GUID查看活动列表
activity.post('/getACDetailByGuid', item.getACDetailByGuid) // 根据活动详情guid获取活动详细信息

activity.post('/addActivity', item.addItem, item.addActivity, item.addOrder, item.addInform) // 新增项目
activity.post('/addAcDetails', item.addAcDetails) // 新增活动
activity.post('/addAcSupplies', item.addAcSupplies) // 新增活动物资
activity.post('/addAcProcess', item.addAcProcess) // 新增活动流程

activity.post('/updateActivity', item.updateActivity) // 更新活动内容
activity.post('/updateDetailState', item.updateDetailState) // 更新活动详情状态
activity.post('/updateItemState', item.updateItemState) // 更新活动项目状态

module.exports = activity