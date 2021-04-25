const {query} = require('../../db');
const {initRES} = require('../../public/javascripts/res-model');
const {FILE_PATH} = require('../../config');
const fs = require("fs");
const path = require('path');
const imagePath = path.join(FILE_PATH, '/public/images');
const filesPath = path.join(FILE_PATH, '/public/files');

// Create Update
// 上传图片
exports.uploadImage = async (req, res, next) => {
    console.log("req.body",req.body)
    var tableName = req.body.role == 'cm' ? 'community' : 'host'
    var tableColumn = req.body.type == 'logo' ? `${req.body.role}_logo` : `${req.body.role}_image`
    var whoAccount = req.body.role == 'cm' ? 'cm_account' : 'ht_account'

    let viewPath = `http://${req.headers.host}/static/images/${req.body._id}/${req.file.filename}`

    let sql = `UPDATE ${tableName} SET ${tableColumn} = ? WHERE ${whoAccount} = ?`
    
    if(req.body.type == 'logo'){
        let data = [ viewPath, req.body._id];
        query(sql, data)
        .then(result => {
            next();
        })
    }else{
        let sql_search = `SELECT ${tableColumn} FROM ${tableName} WHERE ${whoAccount} = ?`
        query(sql_search, req.body._id).then(result => {
            var list = [];
            if(result[0].ht_image){
                list = JSON.parse(result[0].ht_image);
                list.push(viewPath)
                let data = [ JSON.stringify(list), req.body._id];
                query(sql, data)
                .then(result => {
                    next();
                })
            }else if(result[0].cm_image){
                list = JSON.parse(result[0].cm_image);
                list.push(viewPath)
                let data = [ JSON.stringify(list), req.body._id];
                query(sql, data)
                .then(result => {
                    next();
                    
                })
            }else{
                let pathArray = [viewPath]
                let data = [ JSON.stringify(pathArray), req.body._id];
                query(sql, data)
                .then(result => {
                    next();
                })
            }
        })
    }
    
}

// Read 
// 查阅个体信息
exports.getUnitInfo = async(req, res) => {
    var tableName =req.body._id.substring(0,2) == 'cm' ? 'community' : 'host';
    var whoAccount = req.body._id.substring(0,2) == 'cm' ? 'cm_account' : 'ht_account';
    let sql = `SELECT * FROM ${tableName} WHERE ${whoAccount} = ?`;
    query(sql, req.body._id).then(result => {
        res.send(initRES(200, "操作成功", result))
    })
}

// Delete
// 删除图片
exports.delFiles = async (req, res, next) => {
    console.log(req.body)
    var sqlSearch = '';
    var sqlUpdate = '';
    var newArray = [];
    let filePath = imagePath + '/' + req.body._id
    let rmList = fs.readdirSync(filePath);
    console.log(rmList)
    rmList.forEach(item => {
        if(item == req.body.fileName){
            fs.unlinkSync(filePath + '/' + item);
        }
    })
    if(req.body._id.substring(0,2) == 'cm'){
        sqlSearch = `SELECT cm_image FROM community WHERE cm_account = ?`
        sqlUpdate = `UPDATE community SET cm_image = ? WHERE cm_account = ?`
        
    }else{
        sqlSearch = `SELECT ht_image FROM host WHERE ht_account = ?`
        sqlUpdate = `UPDATE host SET ht_image = ? WHERE ht_account = ?`
    }

    query(sqlSearch, req.body._id).then(result => {
        console.log("result",JSON.parse(result[0].cm_image))
        let imgList = JSON.parse(result[0].cm_image)
        imgList.forEach(item => {
            let num = item.split('/').length;
            let imgName = item.split('/')[num - 1];
            if(imgName != req.body.fileName){
                newArray.push(item)
            }
        });
        query(sqlUpdate, [JSON.stringify(newArray), req.body._id]).then(result => {
            next();
        })
    })
    // query()
}