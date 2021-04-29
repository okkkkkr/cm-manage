const express = require('express');
const activity = express.Router();
const item = require('./service')

activity.get('/getTypeList', item.getTypeList) // 查看活动类型列表
activity.post('/getItemList', item.getItemList) // 查看项目列表
activity.post('/addItem', item.addItem) // 新增活动项目
activity.post('/getActivityNum', item.getActivityNum) // 社区方查看活动数目
activity.post('/ht/getActivity', item.getHtActivity) // 承办方分页查看活动列表
activity.post('/getValidActivityByGuid', item.getValidActivityByGuid) // 新增项目

activity.post('/addActivity', item.addActivity, item.addOrder, item.addInform) // 新增活动

module.exports = activity