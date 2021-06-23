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
    
  const baseUrl = 'https://' + event.api_endpoint + '/accepted-payments?store_id=' + event.store_id + '&payment_method_id=' + event.payment_method_id
    axios.get(baseUrl, newheader)
    .then(response => {
      callback(null, response.data)
    })
    .catch(error => callback(error))
};