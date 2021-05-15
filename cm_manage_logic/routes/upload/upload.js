const express = require('express')
const upload = express.Router();
const load = require('./service');
const multer = require("multer");
const {FILE_PATH} = require('../../config');
const fs = require("fs");
const path = require('path');
const imagePath = path.join(FILE_PATH, '/public/images');
const filesPath = path.join(FILE_PATH, '/public/files');

// 单图上传
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

// 单文件上传
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let storagePath = filesPath + '/' + req.body._id;
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


const uploadImage = multer({storage: imageStorage})
const uploadFile = multer({storage: fileStorage})

upload.post('/image', uploadImage.single("file") ,load.uploadImage, load.getUnitInfo) //单图上传
upload.post('/acImage', uploadImage.single("file") ,load.uploadAcImage) //活动单图上传
upload.post('/files', uploadFile.single("file") ,load.uploadFiles) //单文件上传
upload.post('/delImage' ,load.delImage, load.getUnitInfo) //图片删除
upload.post('/delFiles' ,load.delFiles) //文件删除

module.exports = upload