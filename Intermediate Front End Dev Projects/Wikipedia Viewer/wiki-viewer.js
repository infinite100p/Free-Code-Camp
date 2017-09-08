/**
  * Wikipedia Viewer
  * @author Tina Su - inspirationaltwist
  * @version 1.2
*/

<<<<<<< HEAD
const SENTENCE_LIMIT = 3; // number of words to display
var QUERY_LIMIT = parseInt($("select option:selected").text()); // number of words to display
var search = $("#search");

/************************************* MAIN CODE *****************************************/

$(document).ready(function() {
  displayWikiEntries(); // display wiki entries on 'Enter'
  applyFilter(); // update results displayed
  getRandom(); // get random wiki title and content
});

// get JSON data
function getJSONData(limit) {
  return $.getJSON(`https://en.wikipedia.org/w/api.php?action=opensearch&search= 
        ${search.val()} &limit= ${limit} &prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=`);
}

// get JSON data and display Wiki entries
function display() {
  QUERY_LIMIT = parseInt($("select option:selected").text());

  getJSONData(QUERY_LIMIT).then(function(wikiEntry) {
    var wikiTitles = wikiEntry[1];
    var wikiContent = wikiEntry[2];
    var wikiLinks = wikiEntry[3];

    var length = wikiTitles.length;
    var num;

    $("#searchResults").html("");

    for (var i = 0; i < length; i++) {
      $("#searchResults").append(`<div class="wikiEntry"> <p> <b> ${wikiTitles[
        i
      ]} </b> </p>
               <p> ${wikiContent[i]} </p> <p> <a href=" ${wikiLinks[
        i
      ]} "> Tell me more</span></a></div>`);
      num = i;
      console.log(num + 1);
    }
  });
}

/** Display list of Wiki results based on search bar value when user hits enter */
=======
const SENTENCE_LIMIT = 3;       // number of words to display
var QUERY_LIMIT = 5;     // number of words to display
var search = $('#search');

/************************************* MAIN CODE *****************************************/

getRandom();
displayWikiEntries();


/** Display list of Wiki results based on user input */
>>>>>>> fc33036944f52903913b88c7ce5f56270bab63f9
function displayWikiEntries() {
  search.keypress(function(e) {
    if (search.val() && e.which === 13) {
      console.log("success");
<<<<<<< HEAD
      display();
    }
  });
}

// auto refresh search results when user selects another dropdown option
// entries displayed = query limit selected
function applyFilter() {
  $("select").change(function() {
    display();
  });
}
=======

      QUERY_LIMIT = parseInt($('select option:selected').text());

      $.getJSON(`https://en.wikipedia.org/w/api.php?action=opensearch&search= 
        ${search.val()} &limit= ${QUERY_LIMIT} &prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=`).then(
        function(wikiEntry) {
          var wikiTitles = wikiEntry[1];
          var wikiContent = wikiEntry[2];
          var wikiLinks = wikiEntry[3];

          var length = wikiTitles.length;
          var num;

          $('#searchResults').html("");

          for (var i=0; i < length; i++) {
            $('#searchResults').append(`<div class="wikiEntry"> <p> <b> ${wikiTitles[i]} </b> </p>
               <p> ${wikiContent[i]} </p> <p> <a href=" ${wikiLinks[i]} "> Tell me more</span></a></div>`);
            num = i;
            console.log(num+1);
          }
          
        })
    }
  })
}

>>>>>>> fc33036944f52903913b88c7ce5f56270bab63f9

/** Display title and content of random Wiki entry when user clicks on button */
function getRandom() {
  $("#btn-random").on("click", function() {
    getTitle().then(function(wikiTitle) {
      // var url = `https://en.wikipedia.org/wiki/ ${wikiTitle}`;
      var url = "https://en.wikipedia.org/wiki/" + wikiTitle;
      $.getJSON(
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
          wikiTitle +
          "&origin=*&gsrsearch="
      ).then(function(wikiEntry) {
        var title = wikiEntry[0];
        var content = wikiEntry[2];
        // $("#content").addClass('highlight');
        $("#content").html(
          `<h4> ${title} </h4> ${clipContent(
            content
          )} <p> <a href=${url} target="_blank"> Read more...</a>`
        );
        // $('#random').css('background-color', '#F5FBF2');
      });
    });
  });
}

/** Parse JSON data, retrieve random wiki entry, and store its title for future reference
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

/**
  * Clip the content and add "..." if its length > 20 words
  * @return {String} the shortened content
 */
function clipContent(content) {
  // var words = content.split(' '); // array of words
  if (content.length > SENTENCE_LIMIT) {
    return content.slice(0, SENTENCE_LIMIT).join(" ") + "...";
  } else {
    return arrToStr(content);
  }
}

/**
  * Convert array to string
  * @return {String} string of words in array without commas
 */
function arrToStr(arr) {
  return arr.join(" ").replace(",", " ");
}
<<<<<<< HEAD
=======

// console.log(clipContent("hey there mister, are you okay?"));
// console.log(typeof ["yo"].slice(0, SENTENCE_LIMIT + 1).join(","));


/************************************* QUESTIONS *****************************************/


/* Parameter name in clipContent() MUST be "content". Otherwise deferred error is fired. Why?


  Can't interpolate function parameter, wikiTitle...?

  var url = `https://en.wikipedia.org/wiki/ ${wikiTitle}`;


*/


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
>>>>>>> fc33036944f52903913b88c7ce5f56270bab63f9
