const express = require('express')
const upload = express.Router();
const load = require('./service');

upload.post('/upload/image', load.uploadImage)

module.exports = upload