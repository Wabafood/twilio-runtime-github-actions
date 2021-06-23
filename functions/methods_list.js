exports.handler = function(context, event, callback) {
  var methods = JSON.parse(event.methods);
  var list = "";

  for  (var i = 0; i < methods.length; i++) {
    list += "*" + (i+1) + "* - " + methods[i].name + "\n"
  }
  var result = {"list":list};
  callback(null, result);
};