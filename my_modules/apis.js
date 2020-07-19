const axios = require('axios')
const baseUrl = 'http://112.109.93.135:1996/'
const token = '..your token..'

module.exports = {

    auth: async function (identifier, password) {
        const config = {
            method: 'post',
            url: baseUrl + 'auth/local',
            data: {
                "identifier": identifier,
                "password": password
            },
        }
        try {
            const response = await axios(config)
            return response.data
        } catch (error) {
            console.log(error.response.body)
        }
        //axios(config).then(console.log)
    },

    isAuthenticated: async function (jwt) {
        const config = {
            method: 'post',
            url: baseUrl + 'orgs',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            if(dt.hasOwnProperty("name")){
                if(dt.name == "Đại học Thủ Dầu Một"){
                    return true
                }
                else
                    return false
            }
            else{
                return false
            }
        } catch (error) {
            console.log(error.response.body)
        }
        //axios(config).then(console.log)
    },

    orgInfo: async function () {
        try {
            const response = await axios.get(baseUrl + 'orgs')
            // console.log(response.data.url)
            let dt = response.data
            // console.log(response.data[0])
            console.log(response.data[0].info)
            return response.data[0]
        } catch (error) {
            console.log(error.response.body)
        }
    },

    getUsers: async function (jwt, limit, start) {
        const config = {
            method: 'get',
            url: baseUrl + 'users',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            return response.data
        } catch (error) {
            console.log(error.response.body)
        }
        //axios(config).then(console.log)
    },

    addUser: async function (jwt, json) {
        const config = {
            method: 'post',
            url: baseUrl + 'auth/local/register',
            // headers: {'Authorization': 'Bearer '+ jwt},
            data: json,
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },

    addRoom: async function (jwt, json) {
        const config = {
            method: 'post',
            url: baseUrl + 'rooms',
            headers: {'Authorization': 'Bearer '+ jwt},
            data: json,
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },

    getCount: async function (jwt) {
        const config = {
            method: 'get',
            url: baseUrl + 'reports/count',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },

    getCountXuLy: async function (jwt) {
        const config = {
            method: 'get',
            url: baseUrl + 'reports/count?report_status.name=Đã xử lý',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },

    getCountDangXuLy: async function (jwt) {
        const config = {
            method: 'get',
            url: baseUrl + 'reports/count?report_status.name=Đang xử lý',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },

    getCountDaTiepNhan: async function (jwt) {
        const config = {
            method: 'get',
            url: baseUrl + 'reports/count?report_status.name=Đã tiếp nhận',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },


    getTypes: async function (jwt) {
        const config = {
            method: 'get',
            url: baseUrl + 'obj-types',
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },


    countByType: async function (jwt, type) {
        const config = {
            method: 'get',
            url: baseUrl + 'reports?report_type.name=' + type,
            headers: {'Authorization': 'Bearer '+ jwt}
        }
        try {
            const response = await axios(config)
            let dt = response.data
            console.log(dt)
        } catch (error) {
            console.log(error.response.body)
        }
    },


}