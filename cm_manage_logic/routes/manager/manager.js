const express = require('express');
const manager = express.Router();
const mg = require('./service');

manager.post('/addCmManager', mg.addCmManager) //添加社区管理员
manager.post('/addHtManager', mg.addHtManager) //添加承办方管理员
manager.post('/getList', mg.getMgList) //分页查询管理员列表
manager.post('/modifyManager', mg.modifyManager) //修改个体管理员信息
manager.post('/delManager', mg.delManager) //删除个体管理员信息

module.exports = manager