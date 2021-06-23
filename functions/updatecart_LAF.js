exports.handler = function(context, event, callback) {
  var cart;
  if (event.empty_cart === 'true') {
    // empty cart 
    cart = {"items": [], "items_cost": 0, "ticket_discount": 0, "ticket_items": [], "ticket_display": ""};
    callback(null, cart)
  }
  
  if (event.create_cart === 'true') {
    // empty cart 
    cart = {"items": [], "items_cost": 0, "ticket_discount": 0, "ticket_items": [], "ticket_display": ""};
  }
  else {
    // update cart
    try{
        cart = JSON.parse(event.cart);
    } catch (error) {
        cart = {"items": [], "items_cost": 0, "ticket_discount": 0, "ticket_items": [], "ticket_display": ""};
    }
  }
  // check if product in cart
  index_to_update = cart.items.findIndex( item => item.product_id === event.product_id);                                        
  if (index_to_update > -1) {
    // item found in cart
    if (event.quantity === '0') {
      // remove from cart
        cart.items.splice(index_to_update,1)
        var j = cart.items.length
        for  (var i = 1; i < j; i++) {
          if (cart.items[i].parent == index_to_update + 1) {
            cart.items.splice(i,1);
          }
      }
    }
  }
  // item NOT found in cart
  //else {
    // check if quantity is larger than 0
  if (event.quantity > 0) {
    // add new 
    
    // set parent_item
    if (event.product_id == event.product_parent) {
      var parent_item = 0;
    }
    else {
      // check index product parent
      index_parent = cart.items.findIndex( item => 
                                        item.product_id === event.product_parent);
      var parent_item = index_parent + 1;
    }              
    product_note = event.product_note.replace(/\n/g,", ");
    let item = { 
      "product_id": event.product_id, 
      "product": event.product_name, 
      "units": event.quantity, 
      "unit_price": event.product_unit_price, 
      "cost": event.quantity * event.product_unit_price,
      "notes": product_note,
      "parent": parent_item 
    };
    cart.items.push(item);
    console.log(item)
  }
  //}
  // update cart items cost
  let items_cost = 0;
  cart.items.forEach(function(item, i) { items_cost += item.cost;}); 

  cart.items_cost = items_cost.toFixed(2);
  
  // create ticket_items
  cart.ticket_items = [];
  for  (var i = 0; i < cart.items.length; i++) {
    cart.ticket_items[i] = {
      "product_id": cart.items[i].product_id,
      "quantity": cart.items[i].units,
      "unit_price": cart.items[i].unit_price,
      "notes": cart.items[i].notes,
      "cart_order": i + 1,
      "parent_item": cart.items[i].parent
    }; 
   }
  
  // create ticket_display
  cart.ticket_display = "";
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  for  (var i = 0; i < cart.items.length; i++) {
    if (cart.items[i].parent == 0) {
      cart.ticket_display += cart.items[i].units + "x " + cart.items[i].product + ": R$ " + Number(cart.items[i].cost).toLocaleString("pt-BR", options) + "\n";
      if (cart.items[i].notes != "") {
        cart.ticket_display += "_Obs: " + cart.items[i].notes + "_\n";
      }    
    } 
    else{
      cart.ticket_display += "_-->" + cart.items[i].product + ": R$ " + Number(cart.items[i].cost).toLocaleString("pt-BR", options) + "_\n";
      if (cart.items[i].notes != "") {
      cart.ticket_display += "_Obs: " + cart.items[i].notes + "_\n";
      }
    }    
          
  }    
  cart.ticket_display = cart.ticket_display.split(": R$ 0,00").join("")
  // update discount
  let ticket_discount = 0;
  if (event.first_order == 1) {
    ticket_discount = items_cost * event.discount * 0.01;
  };
  cart.ticket_discount = ticket_discount.toFixed(2);
  cart.items_count = cart.items.length;
  
  callback(null, cart);
};