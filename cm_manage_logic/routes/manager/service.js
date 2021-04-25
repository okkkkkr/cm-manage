const { query } = require('../../db')
const { initRES } = require('../../public/javascripts/res-model');
var { encrypt } = require('../../utils/secret')

// Create
// 新增社区方管理员
exports.addCmManager = async (req, res) => {
    sqlManager = `INSERT INTO cm_manager SET ?`
    sqlAccount = `INSERT INTO account SET ?`
    let managerData = {
        _id: req.body._id,
        cm_manager_name: req.body.manager_name,
        cm_manager_age: req.body.manager_age,
        cm_manager_sex: req.body.manager_sex,
        cm_manager_place: req.body.manager_place,
        cm_manager_phone: req.body.manager_phone,
        cm_manager_position: req.body.manager_position,
        cm_manager_card: req.body.manager_card,
        cm_guid: req.body.guid
    }

    let account = {
        account: req.body._id,
        password: encrypt(req.body.manager_card.substring(12, 18)),
        belong: req.body.guid,
        role: 'cm'
    }

    query(sqlAccount, account).then(result => {
        query(sqlManager, managerData).then(() => {
            res.send(initRES(200, "管理员添加成功，账号设置完成。"))
        })
    })

}

// 新增承办方管理员
exports.addHtManager = async (req, res) => {
    sqlManager = `INSERT INTO ht_manager SET ?`
    sqlAccount = `INSERT INTO account SET ?`
    let managerData = {
        _id: req.body._id,
        ht_manager_name: req.body.manager_name,
        ht_manager_age: req.body.manager_age,
        ht_manager_sex: req.body.manager_sex,
        ht_manager_place: req.body.manager_place,
        ht_manager_phone: req.body.manager_phone,
        ht_manager_position: req.body.manager_position,
        ht_manager_card: req.body.manager_card,
        ht_guid: req.body.guid
    }

    let account = {
        account: req.body._id,
        password: encrypt(req.body.manager_card.substring(12, 18)),
        belong: req.body.guid,
        role: 'ht'
    }

    query(sqlAccount, account).then(result => {
        query(sqlManager, managerData).then(() => {
            res.send(initRES(200, "管理员添加成功，账号设置完成。"))
        })

    })
}

// Read
// 分页查询管理员列表
exports.getMgList = async(req, res) => {
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    let role = req.body.role == 'cm' ? 'cm_manager' : 'ht_manager'
    let guidName = req.body.role == 'cm' ? 'cm_guid' : 'ht_guid'
    let guid = req.body.guid
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM ${role} WHERE ${guidName} = ? LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM ${role} WHERE ${guidName} = ? LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql, guid)
    .then(result1 => {
        let sql_all = `SELECT * FROM ${role} WHERE ${guidName} = ?`
        query(sql_all, guid).then(result2 => {
            let RES = Object.assign({}, initRES(200, '查询成功',result1),{total: result2.length}) 
            res.send(RES);
        })
        
    })
}

// Update
// 修改管理员信息
exports.modifyManager = async(req, res) => {
    
    console.log(req.body)
    let info = req.body;
    var managerData = {}
    let tableName = req.body.role == 'cm' ? 'cm_manager' : 'ht_manager';
    if(req.body.role == 'cm'){
        managerData = {
            _id: req.body._id,
            cm_manager_name: req.body.manager_name,
            cm_manager_age: req.body.manager_age,
            cm_manager_sex: req.body.manager_sex,
            cm_manager_place: req.body.manager_place,
            cm_manager_phone: req.body.manager_phone,
            cm_manager_position: req.body.manager_position,
            cm_manager_card: req.body.manager_card,
            cm_guid: req.body.guid
        }
    }else{
        managerData = {
            _id: req.body._id,
            ht_manager_name: req.body.manager_name,
            ht_manager_age: req.body.manager_age,
            ht_manager_sex: req.body.manager_sex,
            ht_manager_place: req.body.manager_place,
            ht_manager_phone: req.body.manager_phone,
            ht_manager_position: req.body.manager_position,
            ht_manager_card: req.body.manager_card,
            ht_guid: req.body.guid
        }
    }
    sqlDel = `DELETE FROM ${tableName} WHERE _id = ?`;
    sqlInsert = `INSERT INTO ${tableName} SET ?`;
    query(sqlDel, req.body._id).then(() => {
        query(sqlInsert, managerData).then(() => {
            res.send(initRES(200, "管理员信息修改成功"));
        })
    })
}

// Delete
// 删除管理员信息
exports.delManager = async(req, res) => {
    let tableName = req.body.role == 'cm' ? 'cm_manager' : 'ht_manager'
    sqlDel = `DELETE FROM ${tableName} WHERE _id = ?`;
    query(sqlDel, req.body._id).then(() => {
        res.send(initRES(200, "管理员信息已清理"));
    })
}