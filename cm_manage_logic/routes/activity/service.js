const {query} = require('../../db');
var {initRES} = require('../../public/javascripts/res-model');
const uuid = require('node-uuid');

// Create

// Read
// 分页查看项目
exports.getItemList = async(req, res) => {
    let role = req.body.role
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    let guid = req.body.guid
    let guidName = role == 'cm' ? 'ac_items_holder_guid':'ac_items_host_guid'
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM activity_items WHERE ${guidName} = ? LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM activity_items WHERE ${guidName} = ? LIMIT ${pos1} , ${pos2}`
    }
    // console.log(data)
    query(sql, guid)
    .then(result1 => {
        let sql_all = `SELECT * FROM activity_items WHERE ${guidName} = ?`
        query(sql_all, guid).then(result2 => {
            let RES = Object.assign({}, initRES(200, '查询成功',result1),{total: result2.length}) 
            res.send(RES);
        })
        
    })
}

// 根据GUID查看项目细节
exports.getItemByGuid = async(req, res) => {
    let sql = `SELECT * FROM activity_items WHERE activity_items_id = ?`
    // console.log(data)
    query(sql, req.body.guid).then(result => {
        res.send(initRES(200,"查询成功", result[0]));
    })
}

// 社区方查询活动总数
exports.getActivityNum = async(req, res) => {
    let sql = `SELECT activity_items_id FROM activity_items WHERE ac_items_holder_guid = ?`
    let sql_num = `SELECT COUNT(guid) as num FROM activity_details WHERE ac_belong_items_id = ?`
    let count = 0;
    await query(sql, req.body.guid).then(result1 => {
        let idList = result1;
        idList.forEach(item => {
            query(sql_num, item.activity_items_id).then(result2 => {
                count = count + result2[0].num
            })
        });
    })

    res.send(initRES(200, "查询成功", {num: count}))
}

// 根据承办方GUID分页查询活动
exports.getHTActivity = async(req, res) => {
    console.log(req.body)
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    var sql = '';
    var sql_all = `SELECT * FROM ac_order WHERE ac_order_ht_guid = ? and ac_order_state != '0'`;
    if(pageNum == '1'){
        sql = `SELECT ac_guid FROM ac_order WHERE ac_order_ht_guid = ? and ac_order_state != '0' LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT ac_guid FROM ac_order WHERE ac_order_ht_guid = ? and ac_order_state != '0' LIMIT ${pos1} , ${pos2} `
    }
    var newArray = []
    let sql_ac = `SELECT * FROM activity_details WHERE guid = ?`
    query(sql, req.body.guid).then(result1 => {
        let idList = result1;
        if(idList.length == 0){
            let RES = Object.assign({}, initRES(200, "查询成功"),{total: 0})
            res.send(RES)
        }else{
            idList.forEach((item, index) => {
                query(sql_ac, item.ac_guid).then(result2 => {
                    newArray.push(result2[0])
                    if(index == idList.length - 1){
                        query(sql_all, req.body.guid).then(result3 => {
                            let RES = Object.assign({}, initRES(200, "查询成功", newArray),{total: result3.length}) 
                            res.send(RES)
                        })
                    }
                })
                
            });
        }
    })

    
}

// 根据主办方GUID查询活动
exports.getCMActivity = async(req, res) => {
    newArray = [];
    let sql_all_items = `SELECT activity_items_id FROM activity_items WHERE ac_items_holder_guid = ?`
    query(sql_all_items, req.body.guid).then(result => {
        var list = result;
        if(list.length == 0){
            res.send(initRES(200, "查询成功", newArray))
        }else{
            let sql_details = `SELECT * FROM activity_details WHERE ac_belong_items_id = ?`
            list.forEach((item, index) => {
                query(sql_details, item.activity_items_id).then(result => {
                    if(result.length != 0){
                        result.forEach(item => {
                            newArray.push(item);
                        })
                    }
                    if(index == list.length - 1){
                        res.send(initRES(200, "查询成功", newArray))
                    }
                })
            })
        }
    })
}

// 根据活动项目GUID查询活动
exports.getActivityByGuid = async(req, res) => {
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    let guid = req.body.guid
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM activity_details WHERE ac_belong_items_id = ? LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM activity_details WHERE ac_belong_items_id = ? LIMIT ${pos1} , ${pos2}`
    }
    // console.log(data)
    query(sql, guid)
    .then(result1 => {
        let sql_all = `SELECT * FROM activity_details WHERE ac_belong_items_id = ?`
        query(sql_all, guid).then(result2 => {
            let RES = Object.assign({}, initRES(200, '查询成功', result1),{total: result2.length}) 
            res.send(RES);
        })
    })
}

// 通过guid获取有效期内的活动项目（下拉框）
exports.getValidActivityByGuid = async(req, res) => {
    console.log(req.body)
    var newResult = []
    let sql = `SELECT * FROM activity_items WHERE ac_items_holder_guid = ? ORDER BY ac_items_bid_time`
    // let sql_num = `SELECT * FROM activity_details WHERE guid = ?`
    // let count = 0;
    await query(sql, req.body.guid).then(result1 => {
        let idList = result1;
        idList.forEach(item => {
            let date = new Date();
            let today = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
            let day = item.ac_items_end_time.split('/').join('');
            if(Number(day) > Number(today)){
                newResult.push(item)
            }
        });
    })

    res.send(initRES(200, "查询成功", newResult))
}

// 获取活动类型列表（下拉框）
exports.getTypeList = async(req, res) => {
    let sql = `SELECT * FROM ac_type_dictionary`
    query(sql, req.body.guid).then(result => {
        res.send(initRES(200, "查询成功", result))
    }) 
}

// --------开始标记---------------
// 根据活动GUID查询各项详情信息
exports.getDetailByGuid = async(req, res, next) => {
    console.log(req.body)
    let sql_order = `SELECT * FROM ac_order WHERE ac_guid = ?`
    query(sql_order, req.body.guid).then(result => {
        req.body['ac_order'] = result[0];
        next();
    })
}

exports.getCommunityByGuid = async(req, res, next) => {
    let sql = `SELECT * FROM community WHERE guid = ?`
    query(sql, req.body.ac_order.ac_order_cm_guid).then(result => {
        req.body['community'] = result[0];
        next();
    })
}

exports.getHostByGuid = async(req, res, next) => {
    let sql = `SELECT * FROM host WHERE guid = ?`
    query(sql, req.body.ac_order.ac_order_ht_guid).then(result => {
        req.body['host'] = result[0];
        next();
    })
}

exports.getSuppliesByGuid = async(req, res, next) => {
    if(req.body.detailId){
        let sql = `SELECT * FROM ac_supplies WHERE ac_guid = ?`
        query(sql, req.body.detailId).then(result => {
            req.body['ac_supplies'] = result;
            next();
        })
    }else{
        res.send(initRES(200, "查询成功", req.body))
    }
    
}

exports.getProcessByGuid = async(req, res, next) => {
    if(req.body.detailId){
        let sql = `SELECT * FROM ac_process WHERE ac_guid = ? ORDER BY ac_process_steps`
        query(sql, req.body.detailId).then(result => {
            req.body['ac_process'] = result;
            res.send(initRES(200, "查询成功", req.body))
        })
    }
}

// -----------------------结束标记------------------------

// 添加项目
exports.addItem = async(req, res, next) => {
    let info = req.body;
    let data = {
        activity_items_id: uuid.v1(),
        ac_items_name: info.item_name,
        ac_items_holder_guid: info.cm_guid,
        ac_items_host_guid: info.ht_guid,
        ac_items_bid_time: info.begin_time,
        ac_items_end_time: info.end_time,
        ac_items_applicant: info.handler_name,
        ac_items_money: info.ac_fund,
        ac_items_state: '1'
    }
    req.body['activity_items_id'] = data.activity_items_id;
    let sql = `INSERT INTO activity_items SET ?`
    query(sql, data).then(result => {
        next();
    })
}

exports.addActivity = async(req, res, next) => {
    console.log(req.body)
    var ac_order_id = uuid.v1();
    req.body.informContent = "活动项目委托信息"  
    req.body.ac_order_id = ac_order_id;
    req.body.sender_id = req.body.cm_guid;
    req.body.receive_id = req.body.ht_guid;
    req.body.inform_type = "0"
    // 工单信息
    let sql_order = `INSERT INTO ac_order SET ?`
    let orderData = {
        ac_order_id,
        ac_order_name: req.body.item_name + "工单",
        ac_order_cm_guid: req.body.cm_guid,
        ac_order_ht_guid: req.body.ht_guid,
        ac_guid: req.body.activity_items_id,
        ac_order_state: '1'
    }
    
    await query(sql_order, orderData)
    .catch(error => {
        res.send(initRES('500', "服务器错误！"))
    })
    next();
}

// 工单操作记录
exports.addOrder = async(req, res, next) => {
    var date = new Date()
    let sql_log = `INSERT INTO order_log SET ?`
    let logData = {
        order_log_id: uuid.v1(),
        order_id: req.body.ac_order_id,
        order_handler_id: req.body.handler_id,
        order_handler_name: req.body.handler_name,
        order_file: req.body.order_file || "",
        order_image: req.body.order_image || "",
        order_describe: req.body.order_describe || "",
        order_state: req.body.order_state || '0',
        order_submit_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-'+ date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
    }
    await query(sql_log, logData)
    .catch(error => {
        res.send(initRES('500', "服务器错误！"))
    })

    next();
}

// 消息通知
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
        inform_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes(),
        inform_state: '0'
    }

    query(sql_inform, informData).then(result => {
        res.send(initRES(200,"项目委托发起成功，已通知承办方处理！"));
    })
}

exports.updateActivity = async(req, res) => {
    let sql = `UPDATE activity_details SET ? WHERE guid = '${req.body[0]}'`
    let info = req.body[1]
    query(sql, info).then(result => {
        res.send(initRES(200,"修改信息成功"))
    })
    
}

// 拒绝后标记活动状态
exports.updateDetailState = async(req, res) => {
    sql = `UPDATE activity_details SET ac_publish = ? WHERE guid = ?`
    query(sql, [req.body.state, req.body.guid]).then(result => {
        res.send(initRES(200, "工单状态更新"))
    })
}

// 根据项目guid修改项目状态
exports.updateItemState = async(req, res) => {
    sql = `UPDATE activity_items SET ac_items_state = ? WHERE activity_items_id = ?`
    query(sql, [req.body.state, req.body.guid]).then(result => {
        res.send(initRES(200, "项目状态更新"))
    })
}


//根据guid查看活动细节
exports.getACDetailByGuid = async(req, res) =>{
    sql =  `SELECT * FROM activity_details WHERE guid = ?`
    query(sql, req.body.guid).then(result => {
        res.send(initRES(200, "查询成功", result[0]))
    })
}

exports.addAcDetails = async(req, res) => {
    req.body['guid'] = uuid.v1();
    console.log(req.body)
    sql = `INSERT INTO activity_details SET ?`
    query(sql, req.body).then(result => {
        res.send(initRES(200, "活动发布成功，请务必完善活动相关信息！", req.body.guid))
    })
}

exports.addAcSupplies = async(req, res) => {
    let list = req.body;
    var sql = `INSERT INTO ac_supplies SET ?`
    list.forEach((item,index) => {
        query(sql, item);
        if(index == list.length - 1){
            res.send(initRES(200, "活动物资信息已更新！"))
        }
    })
}

exports.addAcProcess = async(req, res) => {
    let list = req.body;
    var sql = `INSERT INTO ac_process SET ?`
    list.forEach((item,index) => {
        query(sql, item);
        if(index == list.length - 1){
            res.send(initRES(200, "活动流程信息已更新！"))
        }
    })
}