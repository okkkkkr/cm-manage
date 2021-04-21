const mysql = require('mysql')
const { dbmysql } = require('./database.ini')
const { debug } = require('./config')

function connection (){
  return mysql.createConnection({
    host: dbmysql.host,
    port: dbmysql.port,
    user: dbmysql.user,
    password: dbmysql.password,
    database: dbmysql.database
  })
}

function query(sql, data) {
  const conn = connection()
  return new Promise((resovle, reject) => {
    debug && console.log('sql语句：' + JSON.stringify(sql))
    try {
      conn.query(sql, data, function (error, results, fields) {
        if (error) {
          reject(error)
          debug && console.log('数据库操作失败:' + JSON.stringify(error))
          return
        }
        else {
          resovle(results)
          debug && console.log('数据库操作成功:' + JSON.stringify(results))
        }
      });
    } catch (e) {
      reject(e)
    }
    finally {
      conn.end()
    }
  })
}

module.exports = { query }