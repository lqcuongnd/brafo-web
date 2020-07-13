// var request = require('request');

// request('http://112.109.93.135:2902/orgs', async function (error, response, body) {
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
    const response = await axios.get('http://112.109.93.135:2902/orgs')
    // console.log(response.data.url);
    let dt = response.data
    // console.log(response.data[0]);
    console.log(response.data[0].info);
  } catch (error) {
    console.log(error.response.body);
  }
})();
