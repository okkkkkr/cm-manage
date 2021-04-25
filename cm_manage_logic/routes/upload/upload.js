const express = require('express')
const upload = express.Router();
const load = require('./service');
const multer = require("multer");
const {FILE_PATH} = require('../../config');
const fs = require("fs");
const path = require('path');
const imagePath = path.join(FILE_PATH, '/public/images');
const filesPath = path.join(FILE_PATH, '/public/files');

// 单图上传（Logo）
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let storagePath = imagePath + '/' + req.body._id;
        if(!fs.existsSync(storagePath)){
            fs.mkdirSync(storagePath);
            cb(null, storagePath)
        }else{
            cb(null, storagePath)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadFile = multer({storage: imageStorage})

upload.post('/image', uploadFile.single("file") ,load.uploadImage, load.getUnitInfo) //单图上传
upload.post('/delFiles' ,load.delFiles, load.getUnitInfo) //文件删除

module.exports = upload