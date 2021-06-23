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
  const baseUrl = 'https://' + event.api_endpoint + '/stores/' + event.store_id + '/accepted-payments'
  axios.get(baseUrl, newheader)
  .then(response => {
      //console.log('NAME =>', response.data.content[0].location_name)
      callback(null, response.data)
  })
  .catch(error => callback(error))
};