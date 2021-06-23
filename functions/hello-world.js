exports.handler = function(context, event, callback) {
    const result = {
        message : "Hello Waba!"
    }

    callback(null, result);
  };
