//Note: when testing, run python -m SimpleHTTPServer
//Chrome browser location only works if making call from server, NOT file
//on window load, get location
//use API calls to get and parse information as arguments in functions?
//swap between F and C on button press
//if temp > set colour of bg
//API key: 4ecd95152125036caf092f9322ecc291 (don't expose API keys normally)
//JSON format

//icon image associated with weather -> can use your own

//var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=";
//var apiKey = "&APPID=4ecd95152125036caf092f9322ecc291";
//?lat=35&lon=139

// weather icons: https://erikflowers.github.io/weather-icons/
//weather api list: https://erikflowers.github.io/weather-icons/api-list.html
//animate SVG: http://webdesign.tutsplus.com/tutorials/how-to-animate-festive-svg-icons-with-css--webdesign-17658

//key for OpenWeatherApi, normally do not expose keys
var APPID = "4ecd95152125036caf092f9322ecc291";
var tempInC;
var tempInF;
var loc;
var country;
var icon;
var humidity;
var wind;
var direction;
var weather;

//on load
window.onload = function() {
  tempInC = document.getElementById("temperatureInC");
  tempInF = document.getElementById("temperatureInF");
  loc = document.getElementById("location");
  country = document.getElementById("country");
  //icon = document.getElementById("icon");
  humidity =  document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");
  clouds =  document.getElementById("cloudiness");
  icon =  document.getElementById("weatherIcon");

  //pass in params, ex ZIP code or lat/lon
  //pass in weather conditions
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  } else {
    alert("Geolocation is not supported for this browser/OS version yet. Sadface~ >w<");
    console.log('Geolocation is not supported for this browser/OS version yet. Sadface~ >w<');
  }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

var tempDiv = document.getElementById('temperatureDiv');
//var button = document.getElementById('button');
var divF = document.getElementById('divF');
divF.style.display = 'none';

tempDiv.onclick = function() {
    var divC = document.getElementById('divC');
    if (divC.style.display !== 'none') {
        divC.style.display = 'none';
        divF.style.display = 'block';
    }
    else {
        divC.style.display = 'block';
        divF.style.display = 'none';
    }
};

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
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);

};

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
      weather.country = data.sys.country;
      weather.tempInC = kToC(data.main.temp);
      weather.tempInF = kToF(data.main.temp);
      weather.clouds = data.clouds.all;
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
  country.innerHTML = weather.country;
  tempInC.innerHTML = weather.tempInC;
  tempInF.innerHTML = weather.tempInF;
  clouds.innerHTML = weather.clouds;
  //icon.src = "img/codes/" + weather.icon + ".png";
  document.getElementById("weatherIcon").className = "";
  document.getElementById("weatherIcon").className = "wi wi-owm-" + weather.icon;
}
