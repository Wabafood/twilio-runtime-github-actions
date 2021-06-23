exports.handler = function(context, event, callback) {
  var name = event.profile_name;
  
  var name_check = name.replace(/[^\w\s]/gi, '')

  callback(null, name_check);
};