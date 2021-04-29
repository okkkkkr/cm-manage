const { TooManyRequests } = require('http-errors');
const uuid = require('node-uuid');
const {
    query
} = require('../../db');
var {
    initRES
} = require('../../public/javascripts/res-model');

exports.getTOrderList = async (req, res, next) => {
    var guidSearch = req.body.role == 'cm' ? 'ac_order_cm_guid' : 'ac_order_ht_guid';
    let sql_order = `SELECT * FROM ac_order WHERE ${guidSearch} = ? AND ac_order_state = 1`;
    let sql_cm = `SELECT cm_name FROM community WHERE guid = ?`
    let sql_host = `SELECT ht_name FROM host WHERE guid = ?`
    let sql_log = `SELECT * FROM order_log WHERE order_id = ? ORDER BY order_submit_time`
    var resArray = [];

    await query(sql_order, req.body.guid).then(result => {
        resArray = result;
    }).then(() => {
        if(resArray.length == 0){
            resArray['detail'] = [];
            res.send(initRES(200,'获取成功',resArray))
        }else{
            resArray.forEach((item, index) => {
                query(sql_cm, item.ac_order_cm_guid).then(result1 => {
                    item['cm_name'] = result1[0].cm_name
                    query(sql_host, item.ac_order_ht_guid).then(result2 => {
                        item['ht_name'] = result2[0].ht_name
                        query(sql_log, item.ac_order_id).then(result3 => {
                            item['detail'] = result3
                            if(index == resArray.length - 1){
                                res.send(initRES(200,'获取成功',resArray))
                            }
                        })
                    })
                })
            })
        }
    })
}

exports.getFOrderList = async (req, res, next) => {
    var guidSearch = req.body.role == 'cm' ? 'ac_order_cm_guid' : 'ac_order_ht_guid';
    let sql_order = `SELECT * FROM ac_order WHERE ${guidSearch} = ? AND ac_order_state = 0 OR ac_order_state = 2`;
    let sql_cm = `SELECT cm_name FROM community WHERE guid = ?`
    let sql_host = `SELECT ht_name FROM host WHERE guid = ?`
    let sql_log = `SELECT * FROM order_log WHERE order_id = ? ORDER BY order_submit_time`
    var resArray = [];

    await query(sql_order, req.body.guid).then(result => {
        resArray = result;
    }).then(() => {
        if(resArray.length == 0){
            resArray['detail'] = [];
            res.send(initRES(200,'获取成功',resArray))
        }else{
            resArray.forEach((item, index) => {
                query(sql_cm, item.ac_order_cm_guid).then(result1 => {
                    item['cm_name'] = result1[0].cm_name
                    query(sql_host, item.ac_order_ht_guid).then(result2 => {
                        item['ht_name'] = result2[0].ht_name
                        query(sql_log, item.ac_order_id).then(result3 => {
                            item['detail'] = result3
                            if(index == resArray.length - 1){
                                res.send(initRES(200,'获取成功',resArray))
                            }
                        })
                    })
                })
            })
        }
    })
}

exports.changeOrderState = async (req, res, next) => {

}

exports.addOrder = async (req, res, next) => {
    req.body.order_log_id = uuid.v1();
    let sql = `INSERT INTO order_log SET ?`;
    query(sql, req.body).then(result => {
        res.send(initRES(200, "操作已记录！"))
    })
}
