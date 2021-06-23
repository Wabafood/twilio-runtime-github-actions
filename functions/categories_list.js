exports.handler = function(context, event, callback) {
  var categories = JSON.parse(event.categories);
  var list = "";

  for  (var i = 0; i < categories.length; i++) {
    list += "*" + (i+1) + "* - " + categories[i].name + "\n"
  }
  var result = {"list":list};
  callback(null, result);
};