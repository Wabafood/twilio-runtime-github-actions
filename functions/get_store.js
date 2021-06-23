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
  
  axios.get(baseUrl + event.waba_phone, newheader)
  .then(response => {
      //console.log('NAME =>', response.data.content[0].name)
      callback(null, response.data.content[event.store_pos])
  })
  .catch(error => callback(error))
};