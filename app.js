var express = require('express')
var app = express()

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
var port = 2902
var store = require('store')
let user
const userRoute = require('./routes/taikhoan')
const roomRoute = require('./routes/phong')
const csvcRoute = require('./routes/csvc')
const loiRoute = require('./routes/loi')
const trangthaiRoute = require('./routes/trangthai')
const baocaoRoute = require('./routes/baocao')
const dangnhapRoute = require('./routes/dangnhap')
var database = require('./my_modules/db')
var session = require('express-session')
let cookieParser = require('cookie-parser');
const exceljs = require('exceljs');
let apis = require('./my_modules/apis')
global.user = null
global.link = null

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')
// Thư mục views nằm cùng cấp với file app.js
app.set('views', './views')
app.use(express.static('public'))
//app.use(cookieParser())
//NẠP CÁC ROUTER TRONG THƯ MỤC ROUTES
// Dùng userRoute cho tất cả các route bắt đầu bằng '/taikhoan'
app.use('/taikhoan', userRoute)
app.use('/phong', roomRoute)
app.use('/csvc', csvcRoute)
app.use('/loi', loiRoute)
app.use('/trangthai', trangthaiRoute)
app.use('/baocao', baocaoRoute)
app.use('/dangnhap', dangnhapRoute)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())



var server = require("http").Server(app);
var io = require("socket.io")(server);



app.get('/', async (req, res) => {
    console.log("GET: HOME")

    if (req.cookies.auth != undefined) {
        let user = req.cookies.auth.user
        res.render('pages/index', { user: user })
    }
    else {
        console.log('Chưa đăng nhập, chuyển hướng trang đăng nhập')
        res.redirect('/dangnhap')
    }

})

app.get('/chat', async (req, res) => {
    console.log("GET: CHAT")

    if (req.cookies.auth != undefined) {
        let user = req.cookies.auth.user
        res.render('pages/chat', { user: user })
    }
    else {
        console.log('Chưa đăng nhập, chuyển hướng trang đăng nhập')
        res.redirect('/dangnhap')
    }

})

app.get('/download', function (req, res) {
    var file = __dirname + '/reports.xlsx';
    res.download(file); // Set disposition and send it.
});

app.get('/export', async function (req, res) {

    console.log('ex')
    let jwt = req.cookies.auth.jwt
    var workbook = new exceljs.Workbook();
    let sheet = workbook.addWorksheet('BC');
    sheet.getCell('A1').value = 'Báo cáo tháng 7';
    // sheet.getCell('A2').value = 'Tổng số báo cáo gửi về hệ thống: ' + await apis.getCount(jwt);
    // console.log('count: ' + await apis.getCount(jwt))
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

    await workbook.xlsx.writeFile(__dirname + '/routes/reports.xlsx').then(console.log('Xong rùi hihi!'));


    res.redirect('/download')

})
app.get('/dangxuat', (req, res) => {
    user = null
    res.clearCookie('jwt');
    res.clearCookie('auth');
    // req.cookies.set('auth', {expires: Date.now()});
    res.redirect('/dangnhap')
})

// app.listen(process.env.PORT || port, function() {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
// })
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env)
})

app.get('/test', (req, res) => {
    res.render('pages/test')
})


// app.get('/downloadreport', function (req, res) {

//     console.log('download')
//     var file = __dirname + 'reportsExceljs.xlsx';

//     var filename = path.basename(file);
//     var mimetype = mime.lookup(file);

//     res.setHeader('Content-disposition', 'attachment; filename=' + filename);
//     res.setHeader('Content-type', mimetype);

//     var filestream = fs.createReadStream(file);
//     filestream.pipe(res);
// });

app.get('/getexports', async function (req, res) {
    //upload
    console.log('download')
    var workbook = new exceljs.Workbook();
    workbook.views = [
        {
            x: 0, y: 0, width: 19000, height: 12000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ]

    var sheet = workbook.addWorksheet('report');
    sheet.getCell('A1').value = 'Báo cáo tháng 7'

    sheet.getCell('A2').value = 'Tổng số báo cáo gửi về hệ thống: 12';
    // console.log('count: ' + await apis.getCount(jwt))
    sheet.getCell('A3').value = 'Tổng số báo cáo đã xử lý: 4';
    sheet.getCell('A4').value = 'Tổng số báo cáo đang xử lý: 6';
    sheet.getCell('A5').value = 'Tổng số báo cáo đã tiếp nhận: 2';

    // for (let i = offset; ; i++) {

    //     let result = sheet.getCell('F' + i).value;
    //     if (result == null) continue;

    //     let val;

    //     if (typeof result == 'number') {
    //         val = result;
    //     } else {
    //         val = result.result;
    //     }

    //     sheet.getCell('I' + i).value = val;
    //     sheet.getCell('I' + i).font = sheet.getCell('F' + i).font;

    //     if (sheet.lastRow == sheet.getRow(i)) break;
    // }
    // workbook.removeWorksheet('My Sheet');

    // var sheet = workbook.addWorksheet('Reports', { properties: { tabColor: { argb: '03b6fc' } } });  //0000FF

    await workbook.xlsx.writeFile('reports.xlsx').then(function () {
        console.log("saved");
        res.redirect('/download');
        return workbook;
    })
})

