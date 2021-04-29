const express = require('express');
const inform = express.Router();
const item = require('./service')

inform.post('/getInform', item.getInform) // 查看消息列表
inform.post('/addInform', item.addInform) // 新增通知消息
inform.post('/getInformList', item.getInformList) // 获取消息列表
inform.post('/updateInform', item.updateInform) // 更新消息状态

module.exports = inform