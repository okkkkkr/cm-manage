const express = require('express');
const login = express.Router();
const {verify} = require('../../utils/middleware')

const sign = require('./service')

login.post('/login', verify, sign.login)

module.exports = login