exports.handler = function(context, event, callback) {

    const duration = event.duration || 1500; 

    setTimeout(
        function() {
            // console.log(duration);
            callback();          
        } , duration);
};