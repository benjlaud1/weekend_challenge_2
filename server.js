// requires
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );

// globals
var port = 3006;
var result = {

};

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

// calc URL
app.post('/calc', function (req, res) {
  console.log('calc url hit, passed:', req.body);
  result = makeCalculation(req.body);
  console.log('result:', result);
  res.sendStatus(200);
});

// return result
app.get('/result', function (req, res) {
  console.log('result url hit');
  // create return object
  var objectToReturn = {
    result: result
  };
  res.send(objectToReturn);
});

// function to make the calculations
function makeCalculation (mathObject) {
  var mathResult;
  // check to make sure only numbers were entered
  if ( isNaN(mathObject.input1) || isNaN(mathObject.input2) || mathObject.input1 === '' || mathObject.input2 === '' ) {
    return 'can not be calculated';
  } // end if
  switch (mathObject.operationType) {
    case '+':
      mathResult = parseFloat(mathObject.input1) + parseFloat(mathObject.input2);
      break;
    case '-':
      mathResult = parseFloat(mathObject.input1) - parseFloat(mathObject.input2);
      break;
    case '*':
      mathResult = parseFloat(mathObject.input1) * parseFloat(mathObject.input2);
      break;
    case '/':
      mathResult = parseFloat(mathObject.input1) / parseFloat(mathObject.input2);
      break;
    default:
      return 'can not be calculated';
  } // end switch
  console.log('mathResult', mathResult);
  return mathResult;
} // end makeCalculation
