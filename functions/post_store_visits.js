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
  const url = 'https://' + event.api_endpoint + '/store-visits'
  //const { first_name, last_name, phone, store_id } = event
  const body = { "store_id": event.store_id }
  
  //console.log('BODY =>', body)

  axios.post(url, body, newheader)
  .then(response => {
      console.log('NAME =>', response.data)
      callback(null, response.data)
  })
  .catch(error => callback(error))
}