/* GLOBAL VARIABLES */
var quote = document.getElementById("quote");
var btn = document.getElementsByClassName("btn");
var archive = []; // array of quotes that have already been displayed


// generate random number between 1 and n
function randomNum(n) {
    return Math.floor(Math.random() * n + 1);
}

/* EVENT HANDLERS */

// event handler for 'Generate New Quote' button
btn[1].addEventListener("click", function(e) {
    init(e, "next");
    changeBackgroundColor();
});

// event handler for 'Previous Quote' button
btn[0].addEventListener("click", function(e) {
    init(e, "previous");
    changeBackgroundColor();
});

// send GET request and retrieve JSON data
function init(e, order) {
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40');


    myRequest.onload = function() {
        var myData = JSON.parse(myRequest.responseText);
        if (order === "next") {
            renderHTML(myData, e, "next");
        }

        if (order === "previous") {
            renderHTML(myData, e, "previous");
        }
    }

    myRequest.send();
}

// set background color of body to a random color of a lighter shade
function changeBackgroundColor() {
    const BGCOLOR = "rgba(" + randomNum(255) + "," + randomNum(255) + "," + randomNum(255) + "," + 0.2 + ")";
    document.body.style.backgroundColor = BGCOLOR;
}

// position of currently displayed quote in archive
var pos;

// display a random new quote if user clicks 'Generate New Quote'
// display previously viewed quote if user clicks 'Previous Quote'
function renderHTML(data, e, order) {
    var htmlString = "";
    var index;

    if (order === "next") {
        if ($('p')[0]) {
            $('p')[0].parentNode.removeChild($('p')[0]);
        }
        console.log($('p'));
        // $('p').style.display = "none";
        index = randomNum(40);
        htmlString = data[index].content;
        htmlString += "<br> \&mdash; " + data[index].title + "</br>";
        archive.push(htmlString);
        pos = archive.length - 1;
    }
    if (order === "previous") {
        if (archive.length === 0 || archive.length === 1) {
            htmlString = "";
        } else {
            // htmlString = archive[archive.length - 2];
            if (pos > 0) {
                htmlString = archive[pos - 1];
            }
            pos -= 1;
            console.log(htmlString);
        }
    }

    quote.innerHTML = "<i class='fa fa-quote-left fa-lg'></i>" + "<i class='fa fa-quote-right fa-lg'></i>" + htmlString;

}