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
        event.store_id + '/available-categories/' + event.category_id + 
        '/products?pageSize=20'
  axios.get(baseUrl, newheader)
  .then(response => {
        products = response.data.content;
        var list = "";
        var options_count = [];
        const options = {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
          };
          for  (var i = 0; i < products.length; i++) {
            list += "*" + (i+1) + "* - " + products[i].name + " - *R$ " + 
                Number(products[i].price).toLocaleString("pt-BR", options) + "*\n\n";
            if (typeof products[i].options === 'undefined') {
              options_count[i] = 0    
            }
            else {
              options_count[i] = products[i].options.length
            }  
          }
        
        var result = {"list":list, "product_length":products.length, "products": products, "options_count": options_count};
        callback(null, result);	           
      
  })
  .catch(error => callback(error))
};