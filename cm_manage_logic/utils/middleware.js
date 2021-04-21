const jwt = require('jsonwebtoken')
const { TOKEN_KEY } = require('../config')
var {initRES} = require('../public/javascripts/res-model')

exports.verify = async(req, res, next) => {
    const token = req.headers.authorization || "";
    if(token){
        let tokenInfo = jwt.verify(token, TOKEN_KEY);
        if(req.body.account == tokenInfo.account && tokenInfo.password == req.body.password){
            let {account, belong} = tokenInfo
            res.send(initRES(200, '身份验证通过', {account, belong}))
        }else{
            next();
        }
    }else{
        next();
    }
}