//Note: when testing, run python -m SimpleHTTPServer
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

function updateByLatLon(lat, lon){
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
      weather.direction = data.wind.deg;
      weather.loc = data.name;
      weather.temp = data.main.temp;
      //after object created, pass into function
      update(weather);
      //then update app
    }
  };
  //send it out
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function update(weather){
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "imgs/codes/" + weather.icon + ".png";
}

//on load
window.onload = function() {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity =  document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

  //pass in params, ex ZIP code or lat/lon
  updateByLatLon(35, 139);
  //pass in weather conditions
}
