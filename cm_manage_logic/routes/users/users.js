const express = require('express');
const user = express.Router();
const unit = require('./service')

// 社区相关
user.post('/community/create', unit.createCommunity); //新增社区方个体
user.get('/community/getList/:pageNum/:pageSize', unit.getCmList) //分页查询社区方列表

// 承办方相关
user.post('/host/create', unit.createHost); //新增承办方个体
user.get('/host/getList/:pageNum/:pageSize', unit.getHtList) //分页查询承办方列表

// 管理员相关
user.post('/admin/create', unit.createAdmin); //新增管理员
user.get('/admin/getList/:pageNum/:pageSize', unit.getAdList) //分页查询管理员列表

// 公共
user.post('/unit/getByGuid', unit.getUnitByGuid) // 根据GUID查询个体用户
user.post('/manager/getById', unit.getManagerById) // 根据GUID查询登录者信息
user.post('/unit/modifyInfo', unit.updateInfo) //修改个体信息

module.exports = user