var md5 = require('md5-node')
const {PWD_SALT} = require('../config')

function encrypt(data){
    return md5(PWD_SALT + data)
}

module.exports = {encrypt}