/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready( () => {
  console.log("everything is ready!");
  console.log($('.new-tweet'));
  $('.new-tweet').hide();


  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const createTweetElement = function (tweetObj) {
    const time = moment.utc(tweetObj.created_at).fromNow();
    const $tweet = `
      <article class="tweet">
        <header>
          <div>
            <img src="${escape(tweetObj.user.avatars)}"> 
            <p>${escape(tweetObj.user.name)}</p>
          </div>
          <a class="handle">${escape(tweetObj.user.handle)}</a>
        </header>
        <main>
          <p>${escape(tweetObj.content.text)}</p>
        </main>
        <footer>
          <p>${escape(time)}</p>
          <span class="icons"> <i class="fas fa-flag"> </i> <i class="fas fa-recycle"> </i> <i class="fas fa-heart"> </i> </span>
        </footer>
      </article>`
    return $tweet;
  };
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {  // loops through tweets
      let $tweet = createTweetElement(tweet);  // calls createTweetElement for each tweet
      $('#tweets-container').prepend($tweet);  // takes return value and appends it to the tweets container
    }
  };
  
  
  $('.new-tweet form').submit( function(evt) {
    evt.preventDefault();
    if ($('#tweet-text').val().length === 0) {
      const error = '⚠️ Your tweet is empty. Please write some text ⚠️';
      $('#error-message').text(error).css({"border": "2px solid red", "margin": "1.2em", "text": "center"}).hide().slideDown();
    } else if ($('#tweet-text').val().length > 140) {
      const error = '⚠️ You have reached your maximum limit of characters allowed ⚠️';
      $('#error-message').text(error).css({"border": "2px solid red", "margin": "1.2em", "text": "center"}).hide().slideDown();
    } else {
      $.post('/tweets', $( this ).serialize()).done( function(data) {
        $('#tweet-text').val('');
        $('.counter').val(140).css('color', 'black');
        console.log('tweet posted!');
        loadTweets();
      }) 
      
    }
    
  });
  
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (response) {
      console.log('get request was successful');
      renderTweets(response);
    });
  };
  loadTweets();
  $('#compose-tweet').click( function(evt) {
    console.log("the button clicked!");
    $('.new-tweet').toggle();
    
  })
  
});
