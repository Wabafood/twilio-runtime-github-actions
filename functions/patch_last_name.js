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
  const { last_name } = event
  const body = { last_name }
  const url = 'https://' + event.api_endpoint + '/customers/'+ event.customer_id
  console.log('URL =>', url)
  console.log('BODY =>', body)

  axios.patch(url, body, newheader)
  .then(response => {
    console.log('NAME =>', response.data)
    callback(null, response.data)
  })
  .catch(error => callback(error))
};