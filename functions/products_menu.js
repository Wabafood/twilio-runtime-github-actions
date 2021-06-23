exports.handler = function(context, event, callback) {
  console.log("PRODUCTS =>", event.products);
  var products = JSON.parse(event.products);
  var list = "";

  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  for (var i = 0; i < products.length; i++) {
    list += "*" + (i+1) + "* - " + products[i].name + " - R$ " + 
    Number(products[i].price).toLocaleString("pt-BR", options) + "\n\n";
  };

  var result = {
    "list": list
  };

  callback(null, result);	
};