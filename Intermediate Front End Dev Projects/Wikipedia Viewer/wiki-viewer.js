/**
  * Wikipedia Viewer
  * @author Tina Su - inspirationaltwist
  * @version 1.0
*/

/************************************* MAIN CODE *****************************************/

getRandomWiki();

/** Display title and content of random Wiki entry when user clicks on button */
function getRandomWiki() {
  $("#btn-random").on("click", function() {
    getTitle().then(function(wikiTitle) {
      $.getJSON(
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
          wikiTitle +
          "&origin=*&gsrsearch="
      ).then(function(wikiEntry) {
        $("#random").html(wikiEntry[0] + " - " + wikiEntry[2]);
      });
    });
  });
}

/** Get the title of a random wiki entry
  * @return {Deferred Object} stores the title of the randomly selected wiki entry
*/
function getTitle() {
  var defer = $.Deferred();

  $.get(
    "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&origin=*&gsrsearch="
  ).then(function(json) {
    var wikiTitle = json.query.random[0].title;
    if (json) {
      defer.resolve(wikiTitle);
    } else {
      defer.reject(wikiTitle);
    }
  });
  return defer;
}

/************************************* PREVIOUS CODE *****************************************/

// $('#btn-random').on("click", function() {

// $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&origin=*&gsrsearch=").then(function(data) {
//   // console.log(data.query.random[0].title);
//   $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + data.query.random[0].title + "&origin=*&gsrsearch=").then(function(data) {
//     $('#random').html(data[0] + " - " + data[2]);
//   })
// })});

// .success(

// function(data) {
// return new Promise(function(resolve, reject) {
//   resolve(data.query.random[0].title);
// })})};

// getTitle();

// $.get("https://en.wikipedia.org/wiki/Special:Random").then(function(data) {
//   $('#random').html(data);
// })

// why does url display before btn click??
// $('btn-random').on("click", displayRandom());

// // display random Wiki Entry
// function displayRandom() {
//   $('#random').html('https://en.wikipedia.org/wiki/Special:Random');
// }

// send GET request and retrieve JSON data
// function init() {
//   var request = new XMLHttpRequest();
//   request.open("GET", )
// }
