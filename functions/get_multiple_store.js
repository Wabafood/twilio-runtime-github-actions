const axios = require('axios')

exports.handler = function(context, event, callback) {
  var newheader = {
    headers: {
    'Twilio-flow-channel-address': event.store_waba_phone,
    'Authorization': `Bearer ` + event.keycloak_token,
    'Twilio-contact-channel-address': event.customer_phone,
    'Content-Type': `application/json`
    }
  }
  const baseUrl = 'https://' + event.api_endpoint + '/stores?waba_phone='
  
  axios.get(baseUrl + event.store_waba_phone, newheader)
  .then(response => {
      callback(null, response.data)
  })
  .catch(error => callback(error))
};