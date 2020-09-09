$(document).ready(function() {
  
  $('.new-tweet textarea').on('keyup', function() {

    let counter = 140 - $(this).val().length;
    $(this).siblings('div').children('.counter').text(counter).css('color', 'black');
    if (counter < 0) {
      $(this).siblings('div').children('.counter').css('color', 'red');
    }
  });
});