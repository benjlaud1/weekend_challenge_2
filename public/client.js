$(document).ready(onReady);

function onReady () {
  console.log( 'JQ' );
  // event listeners
  $('#math-operation-nav').on('click', 'button', mathOperationSelector);

} // end onReady

// create objectToSend from input field 1 and 2 and selected operation
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
      console.log('Back from server with:', response);
      getResult();
    } // end success
  }); // end ajax POST
} // end mathOperationSelector

// receive from server at '/result'
function getResult () {
  $.ajax({
    url: '/result',
    type: 'GET',
    success: function (response) {
      $('#answer').empty();
      $('#answer').append(response.result);
      clearInputFields();
    } // end success
  }); // end ajax GET
} // end getResult

function clearInputFields () {
  $('#input-1').val('');
  $('#input-2').val('');
}
