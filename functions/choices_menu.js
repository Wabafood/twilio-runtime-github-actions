exports.handler = function(context, event, callback) {
  var choices = JSON.parse(event.choices);
  console.log("CHOICES =>", event.choices);
  var list = "";
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  for  (var i = 0; i < choices.length; i++) {
    list += "*" + (i+1) + "* - *" + choices[i].name + "* - R$ " + 
    Number(choices[i].price).toLocaleString("pt-BR", options) + "\n";
    
    if (choices[i].description !== null) {
      list += "_" + choices[i].description + "_\n"
    }	
  }
  var result = {"list":list, "total_choices":i};
  callback(null, result);
};
