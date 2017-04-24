$(document).ready(onReady);

// Global variables
var objectToPush = {};
var noPeriod = true;

function onReady () {
  console.log( 'JQ' );
  // event listeners
  $('#math-operation-nav').on('click', 'button', mathOperationSelector);
  $('#input-keys').on('click', '.number-pad', numberSelector);
  $('#input-keys').on('click', '.operator', operatorSelector);
  $('#equals').on('click', equalsSelector);
  $('#clears').on('click', '#clear', clearInputFields);
  $('#clears').on('click', '#backspace', deleteNumber);

  clearInputFields();
} // end onReady

// create objectToSend from input field 1 and 2 and selected operation
// this function was used for the base mode. I created new functions for the hard mode
function mathOperationSelector () {
  console.log($('#input-1').val());
  console.log($('#input-2').val());
  console.log('in mathOperationSelector:', $(this).data('operator'));

  var objectToSend = {
    input1: $('#input-1').val(),
    input2: $('#input-2').val(),
    operationType: $(this).data('operator')
  };
  console.log(objectToSend);

  // send to server at '/calc'
  $.ajax({
    url: '/calc',
    type: 'POST',
    data: objectToSend,
    success: function (response) {
      // console.log('Back from server with:', response);
      getResult();
    } // end success
  }); // end ajax POST
} // end mathOperationSelector

// receive result from server at '/result'
function getResult () {
  $.ajax({
    url: '/result',
    type: 'GET',
    success: function (response) {
      // base mode code below
      // $('#answer').empty();
      // $('#answer').append(response.result);
      clearInputFields();
      $('#screen').val(response.result);
    } // end success
  }); // end ajax GET
} // end getResult

// clear the #screen
function clearInputFields () {
  // base mode code below
  // $('#input-1').val('');
  // $('#input-2').val('');
  $('#screen').val('');
  noPeriod = true;
} // end clearInputFields

// record number button presses and append to the screen
function numberSelector () {
  // console.log('In number selector:', $(this).data('number'));
  // prevent multiple periods
  if (($(this).data('number')).toString() === '.' && noPeriod ) {
    noPeriod = false;
  } else if (($(this).data('number')).toString() === '.' && !noPeriod) {
    return;
  }
  // add the number of period to the #screen
  $('#screen').val($('#screen').val() + ($(this).data('number')).toString());
} // end numberSelector

// capture the first number and the mathmatical operator
function operatorSelector () {
  // console.log('In operator selector:', $(this).data('operator'));
  objectToPush.input1 = parseFloat($('#screen').val());
  objectToPush.operationType = $(this).data('operator');
  // clear the #screen
  $('#screen').val('');
  // reset period checking to allow next number to have a period
  noPeriod = true;
} // end operatorSelector

// capture the second number and send the object to the server for calculations
function equalsSelector () {
  objectToPush.input2 = parseFloat($('#screen').val());
  // console.log('In equals selector:', objectToPush);
  // send to server at '/calc'
  $.ajax({
    url: '/calc',
    type: 'POST',
    data: objectToPush,
    success: function (response) {
      // console.log('Back from server with:', response);
      getResult();
    } // end success
  }); // end ajax POST
} // end equalsSelector

// removes the last number from the string on the screen
function deleteNumber () {
  // check if deleting the '.'
  if ( $('#screen').val().substring( $('#screen').val().length - 1 , $('#screen').val().length ) === '.' ) {
    noPeriod = true;
  }
  var newScreen = $('#screen').val().substring(0, ($('#screen').val()).length - 1);
  $('#screen').val(newScreen);
}
