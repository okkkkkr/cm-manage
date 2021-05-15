const {query} = require('../../db');
var {initRES} = require('../../public/javascripts/res-model');
const uuid = require('node-uuid');

exports.getInform = async(req, res) => {
    var senderName = req.body.role == 'cm' ? 'ht_name' : 'cm_name';
    var tableName = req.body.role == 'cm' ? 'host' : 'community';
    var sql_senderName = `SELECT ${senderName} FROM ${tableName} WHERE guid = ?`
    var sql = `SELECT * FROM inform WHERE inform_receiver = ? AND inform_state = ?`
    // let sql = `SELECT `
    query(sql, [req.body.guid,req.body.state]).then(result => {
        console.log("result",result)
        if(result.length == 0){
            res.send(initRES(200, "查询成功", result))
        }else{
            result.forEach((item, index) => {
                query(sql_senderName, item.inform_sender_id).then(result2 => {
                    if(senderName == 'ht_name'){
                        item['inform_sender_name'] = result2[0].ht_name
                    }else{
                        item['inform_sender_name'] = result2[0].cm_name
                    }
                    if(index == result.length - 1){
                        res.send(initRES(200, "查询成功", result))
                    }
                })
            });
        }
        
    })
}

exports.addInform = async(req, res) => {
    var date = new Date()
    let sql_inform = `INSERT INTO inform SET ?`
    let informData = {
        inform_id: uuid.v1(),
        inform_person_id: req.body.handler_id,
        inform_person_name: req.body.handler_name,
        inform_sender_id: req.body.sender_id,
        inform_receiver: req.body.receive_id,
        inform_type: req.body.inform_type,
        inform_content: req.body.informContent,
        inform_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-'+ date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes(),
        inform_state: '0'
    }
    console.log(informData)
    query(sql_inform, informData).then(result => {
        res.send(initRES(200, "该操作已通知合作方！"))
    })
}

exports.getInformList = async(req, res) => {
    let senderName = req.body.role == 'cm' ? 'ht_name' : 'cm_name';
    let tableName = req.body.role == 'cm' ? 'host' : 'community';
    let sql_senderName = `SELECT ${senderName} FROM ${tableName} WHERE guid = ?`
    let sql = `SELECT * FROM inform WHERE inform_receiver = ? `
    // let sql = `SELECT `
    query(sql, req.body.guid).then(result => {
        if(result.length == 0){
            res.send(initRES(200, "查询成功", result))
        }else{
            result.forEach((item, index) => {
                query(sql_senderName, item.inform_sender_id).then(result2 => {
                    if(senderName == 'ht_name'){
                        item['inform_sender_name'] = result2[0].ht_name
                    }else{
                        item['inform_sender_name'] = result2[0].cm_name
                    }
                    if(index == result.length - 1){
                        res.send(initRES(200, "查询成功", result))
                    }
                })
            });
        }
        
    })
}

exports.updateInform = async(req, res) => {
    let sql = `UPDATE inform SET inform_state = ? WHERE inform_id = ?`
    query(sql, [req.body.inform_state,req.body.inform_id]).then(result => {
        res.send(initRES(200, "通知阅读状态切换成功"))
    })
}