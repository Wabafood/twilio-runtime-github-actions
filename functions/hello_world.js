exports.handler = function(context, event, callback) {
  const result = { 
    message : "Hello World Rafa!"
  }      
  callback(null, result);   
};