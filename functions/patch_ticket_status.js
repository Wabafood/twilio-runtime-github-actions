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
  const url = 'https://' + event.api_endpoint + '/tickets/' + event.ticket_id
  const { status } = event
  const body = { status }
  
  console.log('BODY =>', body)

  axios.patch(url, body, newheader)
  .then(response => {
      callback(null, response.data)
  })
  .catch(error => callback(error))
};