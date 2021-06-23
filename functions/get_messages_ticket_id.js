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
  const baseUrl = 'https://' + event.api_endpoint + '/stores/'+ 
        event.store_id + '/messages/' + event.template + '?customer_id='+ event.customer_id + 
        '&ticket_id=' + event.ticket_id
  axios.get(baseUrl, newheader)
  .then(response => {
      callback(null, response.data)
  })
  .catch(error => callback(error))
};  