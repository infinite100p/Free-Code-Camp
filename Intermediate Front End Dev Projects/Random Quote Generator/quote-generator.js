/* GLOBAL VARIABLES */
var quote = document.getElementById("quote");
var btn = document.getElementsByClassName("btn");
var archive = []; // array of quotes that have already been displayed
// position of currently displayed quote in archive
var pos;


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
        console.log(archive);
    }
    if (order === "previous") {
        if (archive.length === 0 || archive.length === 1 || pos <= 0) {
            htmlString = "";
        } else {
            htmlString = archive[pos - 1];
            pos -= 1;
        }
        console.log(htmlString);
    }

    quote.innerHTML = "<i class='fa fa-quote-left fa-lg'></i>" + "<i class='fa fa-quote-right fa-lg'></i>" + htmlString;

}

var arr = ["test"];

// $('.twitter-share-button').attr('href', 'https://twitter.com/share')
//   .attr('data-text', archive[pos]);



$('.twitter-share-button').attr('data-text', "Get a daily quote from Tina's quote generator here: ");


// WHY IS QUOTE NOT APPEARING IN TWEET SHARE?
$('.twitter-share-button').attr('data-text', archive[pos]);


console.log(archive);

// $('.twitter-share-button').attr('href', "https://twitter.com/intent/tweet?text=custom data woot");

// if (e.target.id === "nextQuote") {

// for (i = 0; i < data.length; i++) {
//   if (order === "next") {
//     htmlString = data[20].content;
//     archive.push(htmlString);
//     console.log(htmlString);
//   } 
//   if (order === "previous") {
//     htmlString = archive[archive.length - 2];
//     console.log(archive);
//   }
// }



// if ($('#quote').height() > 150) {
// $('#container').height += 500;

// $('button').top += 300 + "px";

// reposition(0);
// reposition(1);
// }

//   function reposition(n) {
//     var buttons = document.getElementsByClassName("btn");

//     if ($('#quote').height() > 150) {
//       document.getElementById("container").style.height += 100 + "px";
//       buttons[n].style.top = 350 + "px"; 
//     } 
//     if ($('#quote').height() < 150) {
//       buttons[n].style.top = 350 + "px";
//     }
//     console.log(quote.height);
//   }

//   } else { 
//     document.getElementById("container").style.height -= 300 + "px"; 

//     document.getElementById("btn").style.top -= 250 + "px"; 
//   }

//  console.log($('p').height());

// }



// var nextBtn = $('#next-btn');
// nextBtn.addEventListener("click", function() {
//     var myRequest = new XMLHttpRequest();
//   myRequest.open('GET', 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=' + randomNum(50));

//   const BGCOLOR = "rgba(" + randomNum(255) + "," + randomNum(255) + "," + randomNum(255) + "," + 0.2 + ")";
//   document.body.style.backgroundColor = BGCOLOR;
//   // myRequest.open('GET', 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40')

//   myRequest.onload = function() {
//       var myData = JSON.parse(myRequest.responseText);
//       renderHTML(myData);
//   }

//     myRequest.send();

//   getQuote("next");
// });

// // array that stores two values - 
// // id of previous quote and current quote
// // var archive = [];

// // returns the prev or next quote based on string
// function getQuote(str) {
//   if (str === "next") {
//     for (i = 0; i < data.length; i++) {
//       htmlString = data[i].content;
//       // archive.push[data[i].id];
//     }
//   }
//   if (str === "previous") {
//     for (i = 0; i < data.length; i++) {
//       htmlString = data[i-1].content;
//     }
//   }
// }




// myRequest.open('GET', 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=40')


// $(document).on('click', '.btn', renderHTML(myData, e));



//     if (e.target.id === "nextQuote") {
//       for (i = 0; i < myData.length; i++) {
//       htmlString = myData[i].content;
//   }
// }