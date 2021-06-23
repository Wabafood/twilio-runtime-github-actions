// Make a write request to an external API using urlencoded data (application/x-www-form-urlencoded)
// Add axios 0.20.0 as a dependency under Functions Global Config, Dependencies
const axios = require('axios');
// Add qs 6.9.4 as a dependency under Functions Global Config, Dependencies
const qs = require('qs');
exports.handler = function (context, event, callback) {
  const instance = axios.create({
    baseURL: 'https://' + event.api_endpoint,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let data = qs.stringify({
    reference_id: event.reference_id,
    proof_of_payment_url: event.payment_url,
  });
  instance
    .post('/payment-notifications/pix', data)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return callback(null, response.data);
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
};