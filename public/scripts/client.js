/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready( () => {
  console.log("everything is ready!");
  const createTweetElement = function (tweetObj) {
    const $tweet = `
      <article class="tweet">
        <header>
          <div>
            <img src="${tweetObj.user.avatars}"> 
            <p>${tweetObj.user.name}</p>
          </div>
          <a class="handle">${tweetObj.user.handle}</a>
        </header>
        <main>
          <p>${tweetObj.content.text}</p>
        </main>
        <footer>
          <p>${tweetObj.created_at}</p>
          <p>little logos</p>
        </footer>
      </article>`
    return $tweet;
  };
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {  // loops through tweets
      let $tweet = createTweetElement(tweet);  // calls createTweetElement for each tweet
      $('#tweets-container').append($tweet);  // takes return value and appends it to the tweets container
    }
  };
  // Test / driver code (temporary). 
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  renderTweets(data);
  
  $('.new-tweet form').submit( function(evt) {
    evt.preventDefault();
    //console.log(evt);
    console.log(typeof($(this).serialize()));
    $.post('/tweets', $( this ).serialize()).done( function(data) {
      $('#tweet-text').empty();
      console.log('tweet posted!');
    })
  })
  
})
