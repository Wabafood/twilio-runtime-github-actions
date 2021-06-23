exports.handler = function(context, event, callback) {
  var options = JSON.parse(event.options);
  var list = ""; 
  for  (var i = 0; i < options.length; i++) {
    list += options[i].name  
  } 
  var result = {"list":list, "total_options":i};
  callback(null, result);
};
