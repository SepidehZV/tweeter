/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready( () => {
  console.log("everything is ready!");
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
          <p>little logos</p>
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
  // Test / driver code (temporary). 
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]
  // renderTweets(data);
  
  $('.new-tweet form').submit( function(evt) {
    evt.preventDefault();
    //console.log(evt);
    //console.log(typeof($(this).serialize()));
    //console.log($(this).serialize());
    //console.log($('#tweet-text').val().length);
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
    
  })
  // console.log($('nav a'));
  // $('nav a').click( function (evt) {
  //   const $newTweet = `
  //     <section class='new-tweet'>
  //       <p id='error-message'></p>
  //       <form method='POST' action='/tweets'>
  //         <label for='tweet-text'>What are you humming about?</label>
  //         <textarea name='text' id='tweet-text'></textarea>
  //         <div>
  //           <button type='submit'>Tweet</button>
  //           <output name='counter' class='counter' for='tweet-text'>140</output>
  //         </div>
  //       </form>
  //     </section> `
  //   $('.container').prepend($newTweet);
       
  // })
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (response) {
      console.log('get request was successful');
      renderTweets(response);
    });
  }
  loadTweets();
  
})
