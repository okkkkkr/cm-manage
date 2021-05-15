const {query} = require('../../db');
const {initRES} = require('../../public/javascripts/res-model')
var uuid = require('node-uuid');

exports.orderRecord = async(req, res, next) => {
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM ac_order LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM ac_order LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql)
    .then(result1 => {
        req.body.record = result1;
        next();
    })
}

exports.filterCM = async(req, res, next) => {
    let record = req.body.record;
    let sql_cm = `SELECT cm_name FROM community WHERE guid = ?`
    record.forEach((item, index) => {
        query(sql_cm, item.ac_order_cm_guid).then(result => {
            item.cm_name = result[0].cm_name;
        })
        if(index == record.length - 1){
            req.body.record = record;
            next();
        }
    });
}

exports.filterHT = async(req, res, next) => {
    let record = req.body.record;
    let sql_ht = `SELECT ht_name FROM host WHERE guid = ?`
    record.forEach((item, index) => {
        query(sql_ht, item.ac_order_ht_guid).then(result => {
            
            item.ht_name = result[0].ht_name;
        })
        if(index == record.length - 1){
            let sql_all = `SELECT * FROM ac_order`
            query(sql_all).then(result2 => {
            let RES = Object.assign({}, initRES(200, '查询成功', record),{total: result2.length}) 
            res.send(RES);
            })
        }
    });
}

exports.getAllActivity = async(req, res, next) => {
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM activity_details LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM activity_details LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql)
    .then(result1 => {
        let sql_all = `SELECT * FROM activity_details`
        query(sql_all).then(result2 => {
        let RES = Object.assign({}, initRES(200, '查询成功', result1),{total: result2.length}) 
        res.send(RES);
        })
    })
}

