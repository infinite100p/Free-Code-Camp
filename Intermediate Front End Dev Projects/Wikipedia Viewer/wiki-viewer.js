/**
  * Wikipedia Viewer
  * @author Tina Su - inspirationaltwist
  * @version 1.2
*/

const SENTENCE_LIMIT = 3; // number of words to display
var MAX_QUERY = 100; // maximum # of wiki entries that I want from the API
var QUERY_LIMIT; // number of words to display
var search = $("#search");
var selected = $("select option:selected").text();

/************************************* MAIN CODE *****************************************/

$(document).ready(function() {
  displayWikiEntries(); // display wiki entries on 'Enter'
  applyFilter(); // update results displayed
  getRandom(); // get random wiki title and content
});

// get JSON data
function getJSONData(limit) {
  return $.getJSON(`https://en.wikipedia.org/w/api.php?action=opensearch&search= 
        ${search.val()} &limit=${MAX_QUERY}&prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=`);
}

// get JSON data and display Wiki entries
// return total entry count
function display() {
  selected = $("select option:selected").text();
  QUERY_LIMIT = parseInt(selected);

  getJSONData(QUERY_LIMIT).then(function(wikiEntry) {
    var wikiTitles = wikiEntry[1];
    var wikiContent = wikiEntry[2];
    var wikiLinks = wikiEntry[3];

    var length = wikiTitles.length;
    var num;

    $("#searchResults").html("");

    /* If total possible wiki topics is less than the current query limit, then set
    the query limit equal to this total. This ensures that the number of entries retreived
    doesn't exceed the total and prevents iterating past the maximum bound in the data array.
    */
    if (length < QUERY_LIMIT || (selected === "50+" && length > 50)) {
      QUERY_LIMIT = length;
    }

    console.log("what:" + selected);
    /* Display the wiki entries and their total count */

    for (var i = 0; i < QUERY_LIMIT; i++) {
      $("#searchResults").append(`<div class="wikiEntry"> <p> <b> ${wikiTitles[
        i
      ]} </b> </p>
                 <p> ${wikiContent[i]} </p> <p> <a href=" ${wikiLinks[
        i
      ]} "> Tell me more</span></a></div>`);
      num = i;
      console.log(num + 1);
    }
    $("#searchResults").prepend(
      `<p> Showing ${$(".wikiEntry").length} of ${length} entries. </p>`
    );
  });
}

/** Display list of Wiki results based on search bar value when user hits enter */
function displayWikiEntries() {
  search.keypress(function(e) {
    if (search.val() && e.which === 13) {
      console.log("success");
      display();
      // console.log('Length: ' + $('.wikiEntry').length);
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
