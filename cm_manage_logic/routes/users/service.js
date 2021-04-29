const {
    query
} = require('../../db');
var uuid = require('node-uuid');
var {
    initRES
} = require('../../public/javascripts/res-model');
var {
    encrypt
} = require('../../utils/secret')

// Create
//新增社区方
exports.createCommunity = async (req, res) => {
    let unitInfo = req.body;
    console.log(unitInfo);
    const guid = uuid.v1();
    console.log(guid)
    let data = {
        guid: guid,
        cm_name: unitInfo.unitName,
        cm_account: unitInfo.unitAccount,
        cm_phone: unitInfo.unitPhone,
        cm_address: unitInfo.unitAddress,
        cm_introduce: unitInfo.introduce || "",
        cm_image: unitInfo.image || "",
        cm_logo: unitInfo.logo || "",
        cm_power: "11111"
    }

    // 密码加密
    let password = await encrypt(unitInfo.pass)

    let account = {
        account: unitInfo.unitAccount,
        password: password,
        belong: guid,
        role: 'cm'
    }

    let sql = 'INSERT INTO community SET ?;'
    let sql_ac = 'INSERT INTO account SET ?;'
    // res.send(initRES(200, '创建成功'));
    query(sql, data).then(result => {
        query(sql_ac, account).then(result => {
            res.send(initRES(200, '创建成功'));
        })
    }).catch(err => {
        res.send(initRES(500, '后台错误'));
    })
}

//新增承办方
exports.createHost = async (req, res) => {
    let unitInfo = req.body;
    console.log(unitInfo);
    const guid = uuid.v1();
    console.log(guid)
    let data = {
        guid: guid,
        ht_name: unitInfo.unitName,
        ht_account: unitInfo.unitAccount,
        ht_phone: unitInfo.unitPhone,
        ht_address: unitInfo.unitAddress,
        ht_introduce: unitInfo.introduce || "",
        ht_image: unitInfo.image || "",
        ht_logo: unitInfo.logo || "",
        ht_power: "11111"
    }

    let password = await encrypt(unitInfo.pass)

    let account = {
        account: unitInfo.unitAccount,
        password: password,
        belong: guid,
        role: 'ht'
    }
    let sql = 'INSERT INTO host SET ?;'
    let sql_ac = 'INSERT INTO account SET ?;'
    // res.send(initRES(200, '创建成功'));
    query(sql, data).then(result => {
        query(sql_ac, account).then(result => {
            res.send(initRES(200, '创建成功'));
        })
    }).catch(err => {
        res.send(initRES(500, '后台错误'));
    })
}

//新增管理员
exports.createAdmin = async (req, res) => {
    let unitInfo = req.body;
    console.log(unitInfo);
    let data = {
        admin_id: unitInfo.admin_id,
        admin_name: unitInfo.admin_name,
        admin_age: unitInfo.admin_age,
        admin_sex: unitInfo.admin_sex,
        admin_place: unitInfo.admin_place,
        admin_phone: unitInfo.admin_phone,
        admin_card: unitInfo.admin_card
    }

    let password = await encrypt(unitInfo.pass)

    let account = {
        account: unitInfo.admin_id,
        password: password,
        belong: unitInfo.admin_id,
        role: 'ad'
    }
    let sql = 'INSERT INTO admin SET ?;'
    let sql_ac = 'INSERT INTO account SET ?;'
    // res.send(initRES(200, '创建成功'));
    query(sql, data).then(result => {
        query(sql_ac, account).then(result => {
            res.send(initRES(200, '创建成功'));
        })
    }).catch(err => {
        res.send(initRES(500, '后台错误'));
    })
}


// Read
// 分页查询社区方列表
exports.getCmList = async (req, res) => {
    let pageNum = req.params.pageNum;
    let pageSize = req.params.pageSize;
    var sql = '';
    if (pageNum == '1') {
        sql = `SELECT * FROM community LIMIT ${pageSize}`;

    } else {
        let pos1 = (Number(pageNum) - 1) * Number(pageSize)
        let pos2 = Number(pageSize);
        sql = `SELECT * FROM community LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql)
        .then(result1 => {
            let sql_all = `SELECT * FROM community`
            query(sql_all).then(result2 => {
                let RES = Object.assign({}, initRES(200, '查询成功', result1), {
                    total: result2.length
                })
                res.send(RES);
            })

        })
        .catch(err => {
            res.send(initRES(500, '后台错误', result1));
        })
}

// 分页查询承办方列表
exports.getHtList = async (req, res) => {
    let pageNum = req.params.pageNum;
    let pageSize = req.params.pageSize;
    var sql = '';
    if (pageNum == '1') {
        sql = `SELECT * FROM host LIMIT ${pageSize}`;

    } else {
        let pos1 = (Number(pageNum) - 1) * Number(pageSize)
        let pos2 = Number(pageSize);
        sql = `SELECT * FROM host LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql)
        .then(result1 => {
            let sql_all = `SELECT * FROM host`
            query(sql_all).then(result2 => {
                let RES = Object.assign({}, initRES(200, '查询成功', result1), {
                    total: result2.length
                })
                res.send(RES);
            })

        })
        .catch(err => {
            res.send(initRES(500, '后台错误', result1));
        })
}

// 分页查询管理员列表
exports.getAdList = async (req, res) => {
    let pageNum = req.params.pageNum;
    let pageSize = req.params.pageSize;
    var sql = '';
    if (pageNum == '1') {
        sql = `SELECT * FROM admin LIMIT ${pageSize}`;

    } else {
        let pos1 = (Number(pageNum) - 1) * Number(pageSize)
        let pos2 = Number(pageSize);
        sql = `SELECT * FROM admin LIMIT ${pos1} , ${pos2} `
    }
    // console.log(data)
    query(sql)
        .then(result1 => {
            let sql_all = `SELECT * FROM admin`
            query(sql_all).then(result2 => {
                let RES = Object.assign({}, initRES(200, '查询成功', result1), {
                    total: result2.length
                })
                res.send(RES);
            })

        })
        .catch(err => {
            res.send(initRES(500, '后台错误', result1));
        })
}


// 根据GUID查询个体用户
exports.getUnitByGuid = async (req, res) => {
    let guid = req.body.guid;
    let tableName = req.body.tableName
    var sql = `SELECT * FROM ${tableName} WHERE guid = ?`;
    // console.log(data)
    query(sql, [guid])
        .then(result => {
            if (result.length == 0) {
                res.send(initRES(401, "无此个体用户！"))
            } else {
                res.send(initRES(200, "查询成功", result[0]))
            }
        })
        .catch(err => {
            res.send(initRES(500, '后台错误', result));
        })
}

exports.getManagerById = async (req, res) => {
    let account = req.body.account;
    let tableName = req.body.tableName
    var sql = `SELECT * FROM ${tableName} WHERE _id = ?`;
    // console.log(data)
    query(sql, [account])
        .then(result => {
            if (result.length == 0) {
                res.send(initRES(401, "无此账号信息！"))
            } else {
                res.send(initRES(200, "查询成功", result[0]))
            }
        })
        .catch(err => {
            res.send(initRES(500, '后台错误', result));
        })
}

// UPDATE
exports.updateInfo = async (req, res) => {
    var tableName = req.body.role == 'cm' ? 'community' : 'host';
    var data = {};
    var sql = '';
    if (req.body.role == 'cm') {
        data = {
            cm_phone: req.body.phone,
            cm_address: req.body.location,
            cm_introduce: req.body.introduce
        }
        sql = `UPDATE ${tableName} SET ? WHERE guid = '${req.body.guid}'`;
    } else {
        data = {
            ht_phone: req.body.phone,
            ht_address: req.body.location,
            ht_introduce: req.body.introduce
        }
        sql = `UPDATE ${tableName} SET ? WHERE guid = '${req.body.guid}'`;
    }
    query(sql, data).then(result => {
        let sql_search = `SELECT * FROM ${tableName} WHERE guid = '${req.body.guid}'`
        query(sql_search).then(result2 => {
            res.send(initRES(200, "信息已更新！", result2[0]));
        })
        
    })
}