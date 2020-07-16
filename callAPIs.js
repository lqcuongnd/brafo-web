// var request = require('request');

// request('http://112.109.93.135:4000/orgs', async function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Print the google web page.
//      }
//      else {
//         console.log(response)
//      }
// })

const axios = require('axios');
(async () => {
  try {
    const response = await axios.get('http://112.109.93.135:1996/orgs')
    // console.log(response.data.url);
    let dt = response.data
    // console.log(response.data[0]);
    console.log(response.data[0].info.website);
  } catch (error) {
    console.log(error.response.body);
  }
})();





// const config = {
//   headers: { Authorization: `Bearer token` }
// };

// const bodyParameters = {
//   "identifier": "1424801030013",
//   "password": "cuong@123"
// };

// axios.post(
//   'http://112.109.93.135:1996/auth/local',
//   bodyParameters,
//   config
// ).then(console.log).catch(console.log);


