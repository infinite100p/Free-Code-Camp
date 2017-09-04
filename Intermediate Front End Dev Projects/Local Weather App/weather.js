

// return temperature and weather conditions for user's current location

var temp = document.getElementById("temp");
temp.innerHTML = "";
var tempStr = document.getElementById("temp").innerHTML;


/************************************* MAIN CODE *****************************************/

displayTemp();


// display the temperature at user's current location

function displayTemp() {
  getLocation().then(function(loc) {
    $.get(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        loc[0] +
        "&lon=" +
        loc[1]
    ).then(function(data) {
      $("#temp").html(celsiusToFahrenheit(data.main.temp) + "&deg;F");
      metricListener(data);

      displayLocation(data); // display user's current location
      displayWeather(data); // display weather condition at current location
      
      setBackground($("#temp").html()); // set appropriate background image based on temperature 

      
      // $('#img-status').css('background-image', data.weather[0].icon); // display weather icon
    });
  });
}

// For high temp > 50F, display sunny background image 
// Otherwise, display snowy background image
function setBackground(tempStr) {
  var img;
  
    if (toNum(tempStr) > 50) {
      img = 'sunny.jpeg';

    } 
    else if (toNum(tempStr) < 50)  {
      img = "snow.jpeg";
    }
    
      $('body').css('background-image', 'url(' + img + ')');  
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

// display user's current location
function displayLocation(data) {
  $('#location').html(data.name + ", " + data.sys.country);
}

// display weather condition at current location
function displayWeather(data) {
  $('#icon').html("<img src= " + data.weather[0].icon + " />" );
  $('#weather').append(data.weather[0].main);
}

// convert from tempStr to number
// (remove degree of metric unit)
function toNum(tempStr) {
  return parseInt(tempStr.slice(0, tempStr.length - 2));
}

// convert temperature from Celsius to Fahrenheit (2-digits)
function celsiusToFahrenheit(temp) {
  return Math.ceil(temp * 1.8 + 32);
}

/************************************* QUESTIONS *****************************************/

// setBackground('2mooononnoiF'); // why is this 2??



/* Why doesn't the code below work (for setBackground function) */

  // switch(tempStr) {
   //  case (toNum(tempStr) > 50):
   //    img = 'sunny.jpeg';
   //      break;    
   //  case (toNum(tempStr) < 50):
   //    img = 'snow.jpeg';
   //      break;
   // }


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