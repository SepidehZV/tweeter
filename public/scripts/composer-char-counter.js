$(document).ready(function() {
  
  $('#tweet-text').on('keyup', function() {

    let counter = 140 - $(this).val().length;
    $(this).siblings(1).children(0).children(1).last().text(counter);
    if (counter < 0) {
      $(this).siblings(1).children(0).children(1).last().css('color', 'red');
    }
    
  });
});