const express = require('express')
const test = express.Router();
const fs = require("fs");
const path = require('path');

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

module.exports = test