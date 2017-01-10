// code all by jpmcb, @jpmmcbride@gmail.com

//define request to be assigned to xmlhttprequest object & call ajax code onclick
var request = new XMLHttpRequest;
document.getElementById('quoteArea').onclick = callOut;



//------- Random color code -----------

function getRandomColor (){
  var letters = '0123456789ABCDEF';
  var color ='#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// ------ Create dynamic twitter button ----

function createButton () {
  var msg = document.getElementById("quote").innerHTML;
  var twitterBtn = document.querySelector(".twitter-share-button");
  var link = document.createElement("a");
  
  link.setAttribute("href", "https://twitter.com/share");
  link.setAttribute("class", "twitter-share-button");
  link.setAttribute("id", "twitter");
  link.setAttribute("data-text", msg);
  link.setAttribute("data-size", "large");
  
  twitterBtn.parentNode.replaceChild(link, twitterBtn);
  twttr.widgets.load();
  }
  
  ! function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  } (document, 'script', 'twitter-wjs');



// ------ AJAX random quote API code -------

function callOut() {
    request.onreadystatechange = changeQuote;
    request.open ('GET', 'http://quotes.stormconsultancy.co.uk/random.json', true);
    request.responseType = "json";
    request.send (null);
}

function changeQuote() {
  
  if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      
      $("#quote").fadeOut('slow', function(){
        $("#quote").html(request.response.quote + "<br><br> -- " + request.response.author + " --");
        $("#quote").fadeIn( 'slow' );
        createButton();
      } );
      
      // ------ background to random color ---------
      $("body").animate({
        backgroundColor: getRandomColor()
        }, 1500 );  
    }
  }
}