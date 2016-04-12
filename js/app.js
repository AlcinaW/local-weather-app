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

var apiLink = "http://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&APPID=4ecd95152125036caf092f9322ecc291";

//var weatherJSON = apiLink + location + apiKey;
//console.log("weatherJSON");


var xmlhttp = new XMLHttpRequest();
var url = "http://ip-api.com/json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //var myArr = JSON.parse(xmlhttp.responseText);
        //myFunction(myArr);
        var response = JSON.parse(xmlhttp.responseText);
        console.log(response);
        document.getElementById("ipLat").innerHTML = response.lat;
        document.getElementById("ipLon").innerHTML = response.lon;
        document.getElementById("output").innerHTML = response.city + ", " + response.region + ", " + response.countryCode;
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


// Function to work with Location API to get Longitude, Latitude, City and State to bed used with the weather API
var getLocation = function (response) {
	var lat = response.lat;
	var lon = response.lon;
	url = apiLink + "lat=" + lat + "&lon=" + lon + "&units=" + apiKey;
	getWeather(url);
}

function get




//function updateWeather(weather){
	//update innerHTML with info from API
//}
// window.onload = function(){
//set in innerHTML
// 	update(weather);
// }

//JSON sendRequest