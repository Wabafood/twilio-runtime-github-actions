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
    const url = 'https://' + event.api_endpoint + '/tickets'
    //const { location_id, customer_id, items, delivery_address_id, notes, 
    //        items_cost, cpf_in_receipt, delivery_cost, discount, total_cost, 
    //        estimated_time } = event
    //const body = { location_id, customer_id, JSON.parse(items), 
    //                delivery_address_id, notes, 
    //                items_cost, cpf_in_receipt, delivery_cost, discount, 
    //                total_cost, estimated_time }
    
    var note;
    if (event.notes === "0") {
        note = "";
    }
    else {
        note = event.notes.replace(/\n/g,", ");
    }
    const body_takeout = { "store_id": event.store_id,
                    "customer_id": event.customer_id,
                    "items": JSON.parse(event.items),
                    "notes": note, 
                    "items_cost": event.items_cost, 
                    "cpf_in_receipt": event.cpf_in_receipt,
                    "delivery_cost": event.delivery_cost,
                    "discount": event.discount, 
                    "total_cost": event.total_cost,
                    "estimated_time": event.estimated_time,
                    "payment_method_id": event.payment_method_id
                    //"client_id": event.client_id
                }
    const body_delivery = { "store_id": event.store_id,
                    "customer_id": event.customer_id,
                    "items": JSON.parse(event.items),
                    "delivery_address_id": event.delivery_address_id,
                    "notes": note, 
                    "items_cost": event.items_cost, 
                    "cpf_in_receipt": event.cpf_in_receipt,
                    "delivery_cost": event.delivery_cost,
                    "discount": event.discount, 
                    "total_cost": event.total_cost,
                    "estimated_time": event.estimated_time,
                    "payment_method_id": event.payment_method_id
                    //"client_id": event.client_id
                }
    
    //console.log('BODY =>', body)

    if (event.delivery_address_id > 0) {
        axios.post(url, body_delivery, newheader)
        .then(response => {
            console.log('NAME =>', response.data)
            callback(null, response.data)
        })
        .catch(error => callback(error))
    }
    else {
        axios.post(url, body_takeout, newheader)
        .then(response => {
            console.log('NAME =>', response.data)
            callback(null, response.data)
        })
        .catch(error => callback(error))
    }
};