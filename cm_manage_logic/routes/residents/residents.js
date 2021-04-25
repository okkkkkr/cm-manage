const express = require('express');
const residents = express.Router();
const person = require('./service');

residents.post('/addResidents', person.addResidents) //新增居民信息
residents.post('/getResidentsList', person.getResidentsList) //分页获取居民信息
residents.post('/modifyResidents', person.modifyResidents) //修改居民信息
residents.post('/delResidents', person.delResidents) //删除居民信息

module.exports = residents