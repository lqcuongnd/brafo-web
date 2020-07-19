// route for user here

var express = require('express')
var database = require('../my_modules/db')
var userRouter = express.Router()
var bodyParser = require('body-parser')
let apis = require('../my_modules/apis')
const exceljs = require('exceljs');

let cookieParser = require('cookie-parser')

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })

userRouter.use(bodyParser.urlencoded({ extended: false }))
//userRouter.use(bodyParser())

userRouter.use(function (req, res, next) {
    res.locals.userValue = null
    next()
})
userRouter.use(cookieParser())

//MẶC ĐỊNH ROUTE ĐÃ LÀ /taikhoan RỒI


userRouter.get('/', async function (req, res, next) {
    console.log("GET: BAO CAO")

    if (req.cookies.auth != undefined) {

        let user = req.cookies.auth.user

        let jwt = req.cookies.auth.jwt
        // console.log(jwt)

        res.render('baocao/quanlybaocao', { user: user })
    }
    else {
        console.log('chưa đăng nhập')
        res.render('pages/login')
    }
})
userRouter.get('/reportsExceljs.xlsx', async (req, res) => {
    console.log('ex')
    let jwt = req.cookies.auth.jwt
    var workbook = new exceljs.Workbook();
    let sheet = workbook.addWorksheet('BC');
    sheet.getCell('A1').value = 'Báo cáo tháng 7';
    sheet.getCell('A2').value = 'Tổng số báo cáo gửi về hệ thống: ' + await apis.getCount(jwt);
    // sheet.getCell('A3').value = 'Tổng số báo cáo đã xử lý: ' + await apis.getCountXuLy(jwt);
    // sheet.getCell('A4').value = 'Tổng số báo cáo đang xử lý: ' + await apis.getCountDangXuLy(jwt);
    // sheet.getCell('A5').value = 'Tổng số báo cáo đã tiếp nhận: ' + await apis.getCountDaTiepNhan(jwt);

    sheet.getCell('A6').value = 'Các lỗi trong tháng: '
    // sheet.getCell('A7').value = 'Tổng số báo cáo đang xử lý: ' + await apis.getCountDangXuLy(jwt);

    let types = await apis.getTypes()

    let i = 8
    for (type in types) {
        sheet.getCell('A' + i).value = type.name
        sheet.getCell('B' + i).value = await apis.countByType(jwt, type.name)
    }

    for (let i = 2; ; i++) {

        let result = sheet.getCell('F' + i).value;
        if (result == null) continue;

        let val;

        if (typeof result == 'number') {
            val = result;
        } else {
            val = result.result;
        }

        sheet.getCell('I' + i).value = val;
        // sheet.getCell('I' + i).font = sheet.getCell('F' + i).font;

        if (sheet.lastRow == sheet.getRow(i)) break;
    }
    workbook.views = [
        {
            x: 0, y: 0, width: 26000, height: 16000,
            firstSheet: 0, activeTab: 0, visibility: 'visible',
        }
    ];

    await workbook.xlsx.writeFile('reportsExceljs.xlsx').then(console.log('Xong rùi hihi!'));

    var fileSystem = require('fs');
    var path = require('path');

    var filePath = path.join('./reportsExceljs.xlsx');
    var stat = fileSystem.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'document/xlsx',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
})
//=====================================================================
userRouter.get('/getexportsexceljs', async (req, res) => {
    // var x = await exceljs.exports();
    res.redirect('/reportsExceljs.xlsx');
    console.log(x);
});

userRouter.get('/export', async function (req, res, next) {
    console.log("GET: EXPORT")

    if (req.cookies.auth != undefined) {

        let user = req.cookies.auth.user

        let jwt = req.cookies.auth.jwt

        res.redirect('/baocao/reportsExceljs.xlsx');
    }
    else {
        console.log('chưa đăng nhập')
        res.render('pages/login')
    }
})

userRouter.get('/:t', async function (req, res, next) {
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
        res.render('baocao/quanlybaocao', { reportList: list, title: tt, t: test.info })
    }
})

userRouter.post('/capnhatbaocao', async function (req, res, next) {
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