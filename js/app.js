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

//var weatherJSON = apiLink + location + apiKey;
//console.log("weatherJSON");

function updateByLatLon(lat, lon){

}

var APPID = "4ecd95152125036caf092f9322ecc291";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function update(weather){
  wind.innerHTML =  weather.wind;
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

  var weather = {};
  weather.wind = 3.5;
  weather.direction = "N";
  weather.humidity = 35;
  weather.location =  "Toronto";
  weather.temp = 45;
  weather.icon = 200;

  //pass in weather conditions
  update(weather);
}
