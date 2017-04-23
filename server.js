// requires
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );

// globals
var port = 3005;

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// setup server
app.listen( port, function () {
  console.log('server up on port:', port);
});

// base URL
app.get( '/', function (req, res) {
  console.log( 'Base url hit' );
  // send back base url
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});
