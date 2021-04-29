const {query} = require('../../db');
var {initRES} = require('../../public/javascripts/res-model');
const uuid = require('node-uuid');

// Create
// 添加项目
exports.addItem = async(req, res) => {
    let info = req.body;
    info.activity_items_id = uuid.v1();
    let sql = `INSERT INTO activity_items SET ?`
    query(sql, info).then(result => {
        res.send(initRES(200, "项目开启成功！"))
    })
}

// Read
// 分页查看项目
exports.getItemList = async(req, res) => {
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    let guid = req.body.guid
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM activity_items WHERE ac_items_holder_guid = ? LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM activity_items WHERE ac_items_holder_guid = ? LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql, guid)
    .then(result1 => {
        let sql_all = `SELECT * FROM activity_items WHERE ac_items_holder_guid = ?`
        query(sql_all, guid).then(result2 => {
            let RES = Object.assign({}, initRES(200, '查询成功',result1),{total: result2.length}) 
            res.send(RES);
        })
        
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

// 承办方分页查询活动
exports.getHtActivity = async(req, res) => {
    console.log(req.body)
    // let sql = `SELECT ac_guid FROM ac_order WHERE ac_order_ht_guid = ? and ac_order_state = '1'`
    // let sql_num = `SELECT * FROM activity_details WHERE guid = ?`
    // let count = 0;
    // await query(sql, req.body.guid).then(result1 => {
    //     let idList = result1;
    //     idList.forEach(item => {
    //         query(sql_num, item.activity_items_id).then(result2 => {
    //             count = count + result2[0].num
    //         })
    //     });
    // })

    res.send(initRES(200, "查询成功"))
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

exports.addActivity = async(req, res, next) => {
    
    var ac_guid = uuid.v1();
    var ac_order_id = uuid.v1();
    req.body.informContent = "活动申办工单一审"
    req.body.ac_order_id = ac_order_id;
    req.body.sender_id = req.body.cm_guid;
    req.body.receive_id = req.body.ht_guid;
    req.body.inform_type = "0"
    // 工单信息
    let sql_order = `INSERT INTO ac_order SET ?`
    let orderData = {
        ac_order_id,
        ac_order_name: req.body.activity_name + "申办工单",
        ac_order_cm_guid: req.body.cm_guid,
        ac_order_ht_guid: req.body.ht_guid,
        ac_guid,
        ac_order_state: '0'
    }
    
    await query(sql_order, orderData)
    .catch(error => {
        res.send(initRES('500', "服务器错误！"))
    })

    // 活动详情
    let sql_activity = `INSERT INTO activity_details SET ?`
    let activityData = {
        guid: ac_guid,
        ac_name: req.body.activity_name,
        ac_type: req.body.ac_type,
        ac_fund: req.body.ac_fund,
        ac_belong_items_id: req.body.cm_guid
    }

    await query(sql_activity, activityData)
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
        order_id: req.body.ac_order_id || uuid.v1(),
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
        inform_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-'+ date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes(),
        inform_state: '0'
    }

    query(sql_inform, informData).then(result => {
        res.send(initRES(200,"发起工单成功，已通知承办方处理！"))
    })
}