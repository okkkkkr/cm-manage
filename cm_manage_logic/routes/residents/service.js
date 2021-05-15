const {query} = require('../../db');
const {initRES} = require('../../public/javascripts/res-model')
var uuid = require('node-uuid');

// Create
// 新增居民信息
exports.addResidents = async(req, res) => {
    let info = req.body;
    info.cm_residents_id = uuid.v1();
    info.cm_residents_paticipate = '0'

    let sql = 'INSERT INTO cm_residents SET ?'
    query(sql, info).then(result => {
        res.send(initRES(200, "居民入住成功"))
    })
}

// Read
// 分页查询居民信息
exports.getResidentsList = async(req, res) => {
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
    let guid = req.body.guid
    var sql = '';
    if(pageNum == '1'){
        sql = `SELECT * FROM cm_residents WHERE cm_guid = ? LIMIT ${pageSize}`;
        
    }else{
        let pos1 = (Number(pageNum) - 1)*Number(pageSize)
        let pos2 =  Number(pageSize);
        sql = `SELECT * FROM cm_residents WHERE cm_guid = ? LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql, guid)
    .then(result1 => {
        let sql_all = `SELECT * FROM cm_residents WHERE cm_guid = ?`
        query(sql_all, guid).then(result2 => {
            let RES = Object.assign({}, initRES(200, '查询成功',result1),{total: result2.length}) 
            res.send(RES);
        })
        
    })
}

// 查询居民数量
exports.getResidentsNum = async(req, res) => {
    let sql = `SELECT COUNT(cm_residents_id) as num FROM cm_residents WHERE cm_guid = ? `
    query(sql, req.body.guid).then(result => {
        res.send(initRES(200, "查询成功", result[0]))
    })
}

// Update
// 修改居民信息
exports.modifyResidents = async(req, res) => {
    let info = req.body;
    sqlDel = 'DELETE FROM cm_residents WHERE cm_residents_id = ?';
    sqlInsert = 'INSERT INTO cm_residents SET ?';
    query(sqlDel, info.cm_residents_id).then(() => {
        query(sqlInsert, info).then(() => {
            res.send(initRES(200, "居民信息修改成功"));
        })
    })
}

// Delete
// 删除居民信息
exports.delResidents = async(req, res) => {
    sqlDel = 'UPDATE cm_residents SET cm_residents_state = ? WHERE cm_residents_id = ?';
    query(sqlDel, ['0',req.body.cm_residents_id]).then(() => {
        res.send(initRES(200, "居民搬离信息已登记！"));
    })
}

exports.getResidentsRank = async(req, res) => {
    let guid = req.body.guid
    var sql = `SELECT * FROM cm_residents WHERE cm_guid = ? ORDER BY cm_residents_state desc LIMIT 10`
    query(sql, guid)
    .then(result => {
        console.log(result)
        res.send(initRES(200, '查询成功',result));
    })
}