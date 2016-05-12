var restbus = require('restbus');

port = process.env.PORT || 3000;

restbus.listen(port, function() {
  console.log('restbus is now listening on port ' + port);
});