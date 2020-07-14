// route for user here

var express = require('express')
var database = require('../my_modules/db')
var userRouter = express.Router()
var bodyParser = require('body-parser')
let apis = require('../my_modules/apis')

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })

userRouter.use(bodyParser.urlencoded({ extended: false }))
    //userRouter.use(bodyParser())

userRouter.use(function(req, res, next) {
    res.locals.userValue = null
    next()
})

//MẶC ĐỊNH ROUTE ĐÃ LÀ /taikhoan RỒI


userRouter.get('/', async function(req, res, next) {
    if (user == null) {
        link = '/baocao'
        res.redirect('/dangnhap')
    } else {

        let test = await apis.orgInfo()
        console.log(test.info)

        var a = new Date()
        console.log(a)

        console.log('GET baocao ... ')

        let reports = await database.getAllReports()
        let list = []
        reports.forEach(doc => {
            list.push(doc)
        })

        list.sort((a, b) => (a.get('ThoiGian') < b.get('ThoiGian')) ? 1 : -1)
        let tt = ''
        console.log(list.length + ' báo cáo')
        res.render('baocao/quanlybaocao', { reportList: list, title: tt, t: test.info.website})
    }
})

userRouter.get('/:t', async function(req, res, next) {
    let test = await apis.orgInfo()

    if (user == null) {
        link = '/baocao'
        res.redirect('/dangnhap')
    } else {
        var l = req.params.t
        var loai = (l == 'daxuly') ? 'Đã xử lý' : (l == 'dangxuly') ? 'Đang xử lý' : 'Chưa xử lý'

        let tt = 'Quản lý Báo cáo ' + loai

        console.log('GET baocao ' + loai)

        let reports = await database.getAllReports()
        let list = []
        reports.forEach(doc => {
            if (doc.get('TrangThai') == loai)
                list.push(doc)
        })

        list.sort((a, b) => (a.get('ThoiGian') < b.get('ThoiGian')) ? 1 : -1)

        console.log(list.length + ' báo cáo')
        res.render('baocao/quanlybaocao', { reportList: list, title: tt, t: test.info})
    }
})

userRouter.post('/capnhatbaocao', async function(req, res, next) {
    if (user == null) {
        link = '/capnhatbaocao'
        res.redirect('/dangnhap')
    } else {
        let ma = req.body.Ma
        let c = req.body.ChuThich
        let ktv = user.get('Ten')
        let tt = req.body.TrangThai

        let ct = c + '\n'

        let data = {
            ChuThich: ct,
            MaKTV: ktv,
            TrangThai: tt,
        }

        await database.editReport(ma, data)

        res.redirect('/baocao')
    }
})

module.exports = userRouter