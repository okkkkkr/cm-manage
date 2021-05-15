const express = require('express');
const search = express.Router();
const item = require('./service');

search.post('/orderRecord', item.orderRecord, item.filterCM, item.filterHT) //新增居民信息
search.post('/getAllActivity', item.getAllActivity) //新增居民信息

module.exports = search  