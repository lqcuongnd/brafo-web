const axios = require('axios');
const root = 'http://112.109.93.135:1996/'

module.exports = {

    orgInfo: async function () {
        try {
         const response = await axios.get(root + 'orgs')
         // console.log(response.data.url);
         let dt = response.data
         // console.log(response.data[0]);
         console.log(response.data[0].info);
         return response.data[0]
       } catch (error) {
         console.log(error.response.body);
       }
     }
     
     
}