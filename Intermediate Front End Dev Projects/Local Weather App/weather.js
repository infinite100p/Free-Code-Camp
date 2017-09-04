
// return temperature and weather conditions for user's current location

var temp = document.getElementById("temp");
temp.innerHTML = "";
var tempStr = document.getElementById("temp").innerHTML;


/************************************* MAIN CODE *****************************************/

displayTemp();


// display the temperature at user's current location

function displayTemp() {
  getLocation().then(function(loc) {
    // var x = await getLocation();
    $.get(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        loc[0] +
        "&lon=" +
        loc[1]
    ).then(function(data) {
      $("#temp").html(celsiusToFahrenheit(data.main.temp) + "&deg;F");
      metricListener(data);

        // $('#location').html(data.name + ", " + data.sys.country);


      displayLocation(data);
      displayWeather(data);
      
      setBackground($("#temp").html());
      
      // console.log($("#temp").html());
      // $('#img-status').css('background-image', data.weather[0].icon);
      console.log(loc);
    });
  });
}


// set appropriate background image based on temperature 
function setBackground(tempStr) {
  var img;
  
    if (toNum(tempStr) > 50) {
      // img = "https://images.unsplash.com/photo-1484766280341-87861644c80d";
      // img = 'sunny.jpeg';
      $('body').addClass('sunny');

    } 
    else if (toNum(tempStr) < 50)  {
      // img = "snow.jpeg";
      $('body').addClass('cold');      
    }
    
      // $('.test').css('background-image', 'url(' + img + ')');
      // $('body').addClass('test');

  // switch(tempStr) {
  //   case "59&deg;F":
  //       img = "https://images.unsplash.com/photo-1484766280341-87861644c80d";
  //       break;
  //  }
  
  // console.log(img);
}

// display user's current location
function displayLocation(data) {
  $('#location').html(data.name + ", " + data.sys.country);
}

// display weather condition at current location
function displayWeather(data) {
  $('#icon').html("<img src= " + data.weather[0].icon + " />" );
  $('#weather').append(data.weather[0].main);
}




  // setBackground('2mooononnoiF'); // why is this 2??
  // setBackground('10&deg;F');
  console.log(toNum('2m30797ooononnoiF'));




// console.log(typeof(toNum('10&deg;F')));


  // $('.test').attr("style", "background-image: url(' + img + ')");
// $('body').addClass('test');

  // return img;


// console.log(toNum("60&deg;F"));
// console.log(setBackground("60&deg;F"))




// $('.test').css('background-size', $('window').height());

// convert from tempStr to number
// (remove degree of metric unit)
function toNum(tempStr) {
  return parseInt(tempStr.slice(0, tempStr.length - 2));
}


// store user's current location in array if available [latitude, longitude]
// otherwise, throw an error

function getLocation() {
  var loc = [];
  var res;

  return new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        loc.push(position.coords.latitude);
        loc.push(position.coords.longitude);
        resolve(loc);
      });
    } else {
      reject(Error("error"));
    }
  });
}


/************************************* EVENT HANDLERS *****************************************/

function metricListener(data) {
  $("#switch").click(function() {
    switchMetric(data);
    // init("switchMetricUnit");
  })
};

// document.getElementById('test').setAttribute("style", "background-image: url('https://is1-ssl.mzstatic.com/image/pf/us/r30/Purple3/v4/50/4a/df/504adfa5-0137-ee14-3fe2-fff5de4a6a7e/mzl.rbsnmyea.png')");

// $('body').addClass('test');
// $('#img-status').addClass('test');

var weatherIcons = {
  test: "https://is1-ssl.mzstatic.com/image/pf/us/r30/Purple3/v4/50/4a/df/504adfa5-0137-ee14-3fe2-fff5de4a6a7e/mzl.rbsnmyea.png",
  
  sunny: "https://images.unsplash.com/photo-1484766280341-87861644c80d",
  
  cold: "https://s-media-cache-ak0.pinimg.com/originals/09/6e/97/096e973023df1543114b0c3107b32109.gif"
}

// $('#img-status').prepend('<img  src=' + weatherIcons.sunny + ' />')

// $('#img-status img').attr('src', weatherIcons.sunny);

// $('body').css("background-image", "url(" + weatherIcons.sunny + ")");

// $('body').css('background-size', '100%');
// $('body').css('background-repeat', 'no-repeat');



// console.log(tempStr);

// $('body').addClass('resize');

// $('body').css('style', "background-image: url(' + weatherIcons.sunny + ')");

// $('#img-status img').attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgGtSpgjYRCwFD5sRbAvSpqxM0TqgSWXXpqOySgzY33pRihZ5c__T0aA')

// $('#img-status').prepend('<img src="https://is1-ssl.mzstatic.com/image/pf/us/r30/Purple3/v4/50/4a/df/504adfa5-0137-ee14-3fe2-fff5de4a6a7e/mzl.rbsnmyea.png" />')

// object of image urls


// $("#img-status").prepend($(".sunny"));

// $('.sunny').css('display', 'block');

// display temperature in alternate metric unit
// if temperature is displayed in Fahrenheit, convert to Celsius (and vice versa)

function switchMetric(data) {
  // document.getElementById('switch').addEventListener("click", function() {

  if (tempStr === "" || tempStr.slice(tempStr.length - 1) === "F") {
    // $('#temp').html((data.main.temp) + "&deg;C");
    temp.innerHTML = Math.ceil(data.main.temp) + "&deg;C";
    tempStr = Math.ceil(data.main.temp) + "&deg;C"; // tempStr is "" without this line...why?
  } else {
    // if (temp.innerHTML.slice(temp.innerHTML.length - 1) === "C") {
    if (tempStr.slice(tempStr.length - 1) === "C") {
      // $('#temp').html(celsiusToFahrenheit(data.main.temp) + "&deg;F");
      temp.innerHTML = celsiusToFahrenheit(data.main.temp) + "&deg;F";
      tempStr = celsiusToFahrenheit(data.main.temp) + "&deg;F"; // tempStr is "" without this line...why?
    }
  }
}

/************************************* HELPER FUNCTIONS *****************************************/

// convert temperature from Celsius to Fahrenheit (2-digits)
function celsiusToFahrenheit(temp) {
  return Math.ceil(temp * 1.8 + 32);
}


/************************************* PREVIOUS CODE *****************************************/


// retrieve and display user's current location when button is clicked
// btn.addEventListener("click", function(e) {
// function init(btnType) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       latitude = position.coords.latitude;
//       longitude = position.coords.longitude;
//       // pos = position.coords.latitude + ", " + position.coords.longitude;
//     });
//   }

//   //send GET request and retrieve JSON data
//   var myRequest = new XMLHttpRequest();
//   // myRequest.open("GET","https://api.apixu.com/v1/current.json?key=27a529582f7748c286d43716172708&q=pos");
//   myRequest.open(
//     "GET",
//     "https://fcc-weather-api.glitch.me/api/current?lat=" +
//       latitude +
//       "&lon=" +
//       longitude
//   );

//   myRequest.onload = function() {
//     var myData = JSON.parse(myRequest.responseText);

//     // if (btnType === "loc") {
//     //   showLocation(myData);
//     // }
//     if (btnType === "switchMetricUnit") {
//       switchMetric(myData);
//     }
//     temp.innerHTML = celsiusToFahrenheit(data.main.temp) + "&deg;F";
//   };

//   myRequest.send();
//   console.log(tempStr);
  // console.log(tempStr.length);
  // console.log(tempStr.slice(tempStr.length - 1));
// }

// temp, celsiusToFahrenheit());



// function showLocation(data) {
//   // document.getElementById('loc').addEventListener("click", function() {
//   $("#pos").html(
//     "Temperature at longitude: " +
//       data.coord.lon +
//       " & latitude: " +
//       data.coord.lat +
//       " is " +
//       data.main.temp +
//       " degrees Celsius."
//   );
// }

// async function test() {

// }

//         var promise = new Promise(function(resolve, reject) {
//           resolve(loc);

//           res = promise;
//   })
//   })};
//   // console.log(loc);

//     return res;

// setInterval(function(){
//   console.log(longitude)}, 1000);

// $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude,
//      function(location) {
//          $('#temp').html(celsiusToFahrenheit(data.main.temp) + "&deg;F");
// })

//          $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude).then(
//               function(data) {
//                 getLocation();
//                   $('#temp').html(celsiusToFahrenheit(data.main.temp) + "&deg;F");
//          })

// function repeat() {
//   $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude,
//        setInterval(function(data) {
//          console.log("ya");
//         }, 1000));
//   // setInterval(repeat(), 1000);
// }
// repeat();

// console.log("test");

// temp.innerHTML = "yo";

// window.addEventListener('load',
//   function() {
//    // temp.innerHTML = "yo";
//   // init2();
//   });

//   function renderHTML(data, btnType) {

//     // switchMetric(data);

//     // console.log("longitude: " + data.coord.lon + "<br> latitude: " + data.coord.lat);
//     console.log("yo");

//     console.log(data);
//     // $('#pos').html("longitude: " + longitude + "<br> latitude: " + latitude);
//   }

// document.getElementById("loc").addEventListener("click", function() {
//   init("loc");
// });