//Note: when testing, run python -m SimpleHTTPServer
//Chrome browser location only works if making call from server, NOT file
//on window load, get location
//use API calls to get and parse information as arguments in functions?
//swap between F and C on button press
//if temp > set colour of bg
//API key: 4ecd95152125036caf092f9322ecc291 (don't expose API keys normally)
//JSON format

//If using IP API, won't need to request browser permission for geolocation?
//callback with lat/lon passed?
//on load, get geolocation of user
// window.onload = function getGeoLatLong() {

//icon image associated with weather -> can use your own

//var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=";
//var apiKey = "&APPID=4ecd95152125036caf092f9322ecc291";
//?lat=35&lon=139

//var weatherJSON = apiLink + location + apiKey;
//console.log("weatherJSON");


var APPID = "4ecd95152125036caf092f9322ecc291";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var weather;
// var lat;
// var lon;

// function updateByLatLon(lat, lon){
//   var url = "http://api.openweathermap.org/data/2.5/weather" + "?lat=" + lat + "&lon=" + lon + "&APPID=" + APPID;
  //send request function that takes in url
//   sendRequest(url);
// }

//on load
window.onload = function() {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity =  document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

  //pass in params, ex ZIP code or lat/lon
  //updateByLatLon(30, 129);
  //pass in weather conditions
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  } else {
    alert("Geolocation is not supported for this browser/OS version yet. Sadface~ >w<");
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  }
  //if (navigator.geolocation){
    //console.log("find meeeee");
    navigator.geolocation.getCurrentPosition(success, error, options);
  //} else {
    //var lat = window.prompt("Please enable geolocation, or enter your latitude. Latitude:");
    //var lon =  window.prompt("Longitude:");
    //updateByLatLon(lat, lon);
    //alert("Your browser does not support geolocation! >x<");
  //}

}


var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(position) {
  var crd = position.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  var lat = crd.latitude;
  var lon = crd.longitude;
  updateByGeolocation(lat, lon);
  //console.log(position.coords.latitude);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);

};

// function showPosition(position){
//   var lat = position.coords.latitude;
//   var lon = position.coords.longitude;
//   updateByGeolocation(lat, lon);
//   console.log(position.coords.latitude);
// }


function updateByGeolocation(lat, lon){
  var url = "http://api.openweathermap.org/data/2.5/weather" + "?lat=" + lat + "&lon=" + lon + "&APPID=" + APPID;
  //send request function that takes in url
  sendRequest(url);
}

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  //callback, do somethng when get info back
  xmlhttp.onreadystatechange = function(){
    //if received a package back (status: 4) , and successful (status: 200)
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //comes in as JSON, then parse the response text using built-in JSON parsing in JS
      var data = JSON.parse(xmlhttp.responseText);
      //weather object
      var weather = {};
      weather.icon = data.weather[0].id;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.direction = degreesToDirection(data.wind.deg);
      weather.loc = data.name;
      weather.temp = kToC(data.main.temp);
      //after object created, pass into function
      update(weather);
      console.log(weather);
      //then update app
    }
  };
  //send it out
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

//kelvin to celsius
function kToC(k){
  return Math.round(k - 273.15);
}
//kelvin to fahrenheit
function kToF(k){
  return Math.round(k*(9/5)-459.67);
}
function degreesToDirection(degrees){
  var range =  360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = ["N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "NE"];
  for (i in angles){
    if (degrees >=  low && degrees < high){
      return angles[i];
    }
    low = (low + range) % 360;
    high = (high + range) % 360;
  }
  return "N";
}
function update(weather){
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "img/codes/" + weather.icon + ".png";
}
