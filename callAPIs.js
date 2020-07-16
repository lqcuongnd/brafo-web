
let apis = require('./my_modules/apis')

let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmRhNGQ3M2ZhMTFkMTU0YTIxNDU0NyIsImlhdCI6MTU5NDg4MzcxMSwiZXhwIjoxNTk3NDc1NzExfQ.Y1ibZF6pCZljKcImYIb-_lJPX9c6pcjwaJvQ3v3bdVk'

let Excel = require('exceljs');

let insertUser = async () => {
    var workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./public/templates/import_users.xlsx')
        .then(async () => {
            let sheet = workbook.getWorksheet('users');
            for (let i = 1; ; i++) {
              let u = {
        "info": null,
        "password": "cuong@123",
        "createdAt": "2020-07-14T09:47:22.443Z",
        "updatedAt": "2020-07-16T01:27:53.335Z",
        "__v": 0,
                "confirmed": sheet.getCell('A' + i).value,
                "blocked": sheet.getCell('B' + i).value,
                "department": sheet.getCell('C' + i).value,
                "username": sheet.getCell('D' + i).value,
                "phoneNumber": '0' + sheet.getCell('E' + i).value,
                "fullname": sheet.getCell('F' + i).value,
                "email": sheet.getCell('G' + i).value + '@gmail.com',
                "role": {
                  "_id": "5eddc11cc49fd00b1b3c5c3a",
                  "name": "student",
                  "description": "Default role given to authenticated user.",
                  "type": "authenticated",
                  "createdAt": "2020-06-08T04:39:56.117Z",
                  "updatedAt": "2020-07-14T09:49:28.467Z",
                  "__v": 0,
                  "id": "5eddc11cc49fd00b1b3c5c3a"
              },
              "isMale": false
              }
              await apis.addUser(jwt, u)
              if (sheet.lastRow == sheet.getRow(i)) break;
          }

            workbook.views = [
                {
                    x: 0, y: 0, width: 26000, height: 16000,
                    firstSheet: 0, activeTab: 0, visibility: 'visible',
                }
            ];

        })
}

insertUser()