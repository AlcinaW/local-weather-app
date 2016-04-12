//Note: when testing, run python -m SimpleHTTPServer 
//on window load, get location 
//use API calls to get and parse information as arguments in functions?
//swap between F and C on button press 
//if temp > set colour of bg
//API key: 4ecd95152125036caf092f9322ecc291 (don't expose API keys normally)
//JSON format 

//ip API: http://ip-api.com/docs/api:json

//icon image associated with weather -> can use your own

//callback with lat/lon passed?
//on load, get geolocation of user 
window.onload = function getGeoLatLong() {
	var startPos;
	var geoOptions = { 
		//if can't get data, timeout 
		timeout: 10 * 1000,
		//can use old location set instead of checking every time
		maximumAge: 5 * 60 * 1000
	};
	//get latitude and longitude, output to page 
	var geoSuccess = function(position){
		startPos = position;
		console.log(startPos);
		document.getElementById("startLat").innerHTML = startPos.coords.latitude;
		console.log(startPos.coords.latitude);
		document.getElementById("startLon").innerHTML = startPos.coords.longitude;
		console.log(startPos.coords.longitude);
	};
	//in case of error, return error
	var geoError =  function(error){
		console.log("Error has occured. Error code:" + error.code + " - " +  error.message);
	};
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};


//check for geolocation enabled/supported
if (navigator.geolocation){
	console.log("Geolocation is supported~");
} else {
	console.log("Awww, geolocation is not supported for this browser yet.");
}

//ip API: http://ip-api.com/docs/api:json
//function getIpApi(navigator.geolocation){
  //callback that tells next function to run
	//getWeather(callback);
//}

//var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=";
//var apiKey = "&APPID=4ecd95152125036caf092f9322ecc291";

//var weatherJSON = apiLink + location + apiKey;
//console.log("weatherJSON");


//function updateWeather(weather){
	//update innerHTML with info from API
//}
// window.onload = function(){
//set in innerHTML
// 	update(weather);
// }

//JSON sendRequest