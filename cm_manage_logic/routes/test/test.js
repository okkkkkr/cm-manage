const express = require('express')
const test = express.Router();
const fs = require("fs");
const path = require('path');
const { query } = require('../../db');
const { initRES } = require('../../public/javascripts/res-model');
const uuid = require('node-uuid');

test.get('/files', async(req,res) => {
    let MyUrl = __dirname + '/hunan/renma'
    fs.readdir(MyUrl, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            //拼接获取绝对路径，fs.stat(绝对路径,回调函数)
            let fPath = path.join(MyUrl, file);
            fs.stat(fPath, (err, stat) => {
                // console.log(stat)
                if (stat.isFile()) {
                    //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory等函数进行判断是文件还是文件夹
                    let name = file.split('-')
                    // console.log(name)
                    // console.log(__dirname)

                    let route = __dirname + '/' +name[1];
                    let fileRoute = route + `/${file}`
                    fs.readFile(fPath, "base64",(err,data)=>{
                        if(!fs.existsSync(route)){
                            fs.mkdirSync(route)
                            fs.writeFileSync(fileRoute, data)
                        }else{
                            fs.writeFileSync(fileRoute, data)
                        }
                    })
                    
                }
                else {
                    myReadfile(fPath)
                }
            })
        })
    })

})

test.get('/getActivity', async(req, res) => {
    let sql = `SELECT * FROM activity_details WHERE ac_publish = '1' ORDER BY ac_begin_time`
    query(sql).then(result => {
        res.send(initRES(200, "查询成功", result))
    })
})

test.post('/signUp', async(req, res) => {
    console.log(req.body)
    let date = new Date();
    req.body.ac_participate_times = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    req.body.ac_participate_id = uuid.v1();
    let sql = `INSERT INTO ac_participate SET ?`
    let sql_search = `SELECT * FROM activity_details WHERE guid = ? `
    let sql_sign = `UPDATE activity_details SET ac_sign_up_ready = ?`
    query(sql_search, req.body.ac_guid).then(result => {
        if(result[0].ac_sign_up_ready != result[0].ac_sign_up){
            var sign_up_nums = Number(result[0].ac_sign_up_ready) + 1;
            query(sql, req.body).then(result => {
                query(sql_sign,sign_up_nums).then(() => {
                    res.send(initRES(200,"报名成功"))
                })
            })
        }else{
            res.send(initRES(200,"报名失败，报名人数已达上限！"))
        }
    })
    
})

module.exports = test