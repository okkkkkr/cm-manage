const express = require('express');
const order = express.Router();
const log = require('./service');

order.post('/getTOrderList', log.getTOrderList) //获取执行中的工单
order.post('/getFOrderList', log.getFOrderList) //获取已结束的工单
order.post('/addOrder', log.addOrder) //新增工单操作记录
order.post('/changeOrderState', log.changeOrderState) //更新工单记录信息

order.post('/updateOrder', log.updateOrder) //更新工单状态

module.exports = order