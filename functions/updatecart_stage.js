exports.handler = function(context, event, callback) {
  var cart;
  
  if (event.empty_cart === 'true') {
    // empty cart 
    cart = {"items": [], "items_cost": 0, "ticket_discount": 0};
    callback(null, cart)
  }
  
  if (event.create_cart === 'true') {
    // empty cart 
    cart = {"items": [], "items_cost": 0, "ticket_discount": 0};
  }
  else {
    // update cart
    try{
      cart = JSON.parse(event.cart);
    } catch (error) {
      cart = {"items": [], "items_cost": 0, "ticket_discount": 0};
    }
  }

  // check if product in cart
  index_to_update = cart.items.findIndex( item => item.product_id === event.product_id);
                                      
  if (index_to_update > -1) {
      // item found in cart
    if (event.quantity === '0') {
      // remove from cart
      cart.items.splice(index_to_update,1); 
    }
    else {
      // update quantity in cart
      product_note = event.product_note.replace(/\n/g,", ");
      cart.items[index_to_update].notes = product_note;
      cart.items[index_to_update].units = event.quantity;
      cart.items[index_to_update].cost = event.quantity * event.product_unit_price;                             
    }
  }
  else {
    // check if quantity is larger than 0
    if (event.quantity > 0) {
      // add new 
      product_note = event.product_note.replace(/\n/g,", ");
      let item = { 
        "product_id": event.product_id, 
        "product": event.product_name, 
        "units": event.quantity, 
        "unit_price": event.product_unit_price, 
        "cost": event.quantity * event.product_unit_price,
        "notes": product_note 
      };
      cart.items.push(item);
    }
  }

  // update cart items cost
  let items_cost = 0;
  cart.items.forEach(function(item, i) { items_cost += item.cost;}); 

  cart.items_cost = items_cost.toFixed(2);
  
  // update discount
  let ticket_discount = 0;
  if (event.first_order == 1) {
      ticket_discount = items_cost * event.discount * 0.01;
  };
  cart.ticket_discount = ticket_discount.toFixed(2);

  callback(null, cart);
};