const jwt = require('jsonwebtoken')
const {query} = require('../../db');
var {encrypt} = require('../../utils/secret')
var {initRES} = require('../../public/javascripts/res-model');
const {TOKEN_KEY, VALID_TIME} = require('../../config');
const login = require('./login');

exports.login = async(req, res) => {
    let loginInfo = req.body;
    let sql = `SELECT * FROM account WHERE account = ?`

    query(sql,[loginInfo.account]).then(result => {
        if(result.length == 0){
            res.send(initRES(401, "用户不存在"))
        }else{
            if(encrypt(loginInfo.password) == result[0].password){
                loginInfo['belong'] = result[0].belong
                const token = jwt.sign(loginInfo, TOKEN_KEY, {expiresIn: VALID_TIME});
                res.send(initRES(200, "登录成功",{account: result[0].account, belong: result[0].belong, role: result[0].role,token}))
            }else{
                res.send(initRES(401, "用户密码不正确"))
            }
        }
    })
}


