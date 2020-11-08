// VARIABLE DECLARATIONS
// var searchButton = $('.btn');
var searchButton = $("#button-addon2");
var userInput;
var userInputNoSpaces;
var userCityInput;
var userCityInputNoSpaces;
var apiKey = "42577eee140aa265525ab9ec590d2394";

// Declarations for current weather div elements
var currentCity = $('#current-city');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWind = $('#current-wind-speed');
var currentUV = $('#current-uv-index');
var cityLongitude;
var cityLatitude;

// Declarations for 5-day forecast div elements
var forecastDay1 = $("#forecast-day-1");
var iconDay1 = $("#icon-day-1");
var tempDay1 = $("#temp-day-1");
var humidityDay1 = $("#humidity-day-1");

var forecastDay2 = $("#forecast-day-2");
var iconDay2 = $("#icon-day-2");
var tempDay2 = $("#temp-day-2");
var humidityDay2 = $("#humidity-day-2");

var forecastDay3 = $("#forecast-day-3");
var iconDay3 = $("#icon-day-3");
var tempDay3 = $("#temp-day-3");
var humidityDay3 = $("#humidity-day-3");

var forecastDay4 = $("#forecast-day-4");
var iconDay4 = $("#icon-day-4");
var tempDay4 = $("#temp-day-4");
var humidityDay4 = $("#humidity-day-4");

var forecastDay5 = $("#forecast-day-5");
var iconDay5 = $("#icon-day-5");
var tempDay5 = $("#temp-day-5");
var humidityDay5 = $("#humidity-day-5");

// Declarations for location-search and past-searches div elements
var searchHistory = $("#past-searches");

// Clear city search history on button click
$("#clear-search-history").on("click", function() {
    localStorage.clear();
    $(".search-history-button").detach();
})

// Adding 'on click' event listener to search button on homepage
searchButton.on('click', function () {
    // Storing value of input field in var userInput
    userInput = $(this).parent().siblings(".search-city").val();
    // Save value of userInput in local storage
    localStorage.setItem("userCityInput", userInput);
    // If the value of userInput has any spaces, replace the space with '+' and store value in var userInputNoSpaces
    userInputNoSpaces = userInput.replace(/\s/g, '+');
    // Save value of userInputNoSpaces to local storage
    localStorage.setItem("userCityInputNoSpaces", userInputNoSpaces);

    userCityInput = userInput; // Set value of userCityInput equal to userInput
    userCityInputNoSpaces = userInputNoSpaces; // Set value of userCityInputNoSpaces equal to userInputNoSpaces
    getWeather(userCityInput, userCityInputNoSpaces); // Call function get weather with userCityInput and userCityInputNoSpaces as parameters
    saveCitySearch(userCityInput, userCityInputNoSpaces);
    
    // if (window.location.pathname = '../index.html') {
    //     window.location.href = './Develop/search-results.html'; // When user clicks on search button, change current html to search-results.html
    //     // window.onload = function results () {
    //     //     userCityInput = localStorage.getItem("userCityInput");
    //     //     console.log(userCityInput);
    //     //     userCityInputNoSpaces = localStorage.getItem("userCityInputNoSpaces");
    //     //     console.log(userCityInputNoSpaces);
    //     //     getWeather(userCityInputNoSpaces); // Call getWeather function
    //     // }
    //     // saveCitySearch(userCityInput, userCityInputNoSpaces); // Call saveCitySearch with userInput and userInputNoSpaces as parameters
    // } else {
    //     // userCityInput = userInput;
    //     // userCityInputNoSpaces = userInputNoSpaces;
    //     // saveCitySearch(userCityInput, userCityInputNoSpaces);
    //     getWeather(userCityInputNoSpaces);
    // }
})

// window.onload = function results () {
//     userCityInput = localStorage.getItem("userCityInput");
//     console.log(userCityInput);
//     userCityInputNoSpaces = localStorage.getItem("userCityInputNoSpaces");
//     console.log(userCityInputNoSpaces);
//     // saveCitySearch(userCityInput, userCityInputNoSpaces); // Call saveCitySearch with userInput and userInputNoSpaces as parameters
//     getWeather(userCityInputNoSpaces); // Call getWeather function
// }

// Creating function getWeather that does an API call for current weather for city input by user -- userCityInput and userCityInputNoSpaces are parameters 
function getWeather(userCityInput, userCityInputNoSpaces) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" +  userCityInputNoSpaces + "&units=imperial&appid=" + apiKey, 
        success: function (data) {
            console.log(data);
            
            var currentDate = data.dt; // Create var currentDate with value equal to unix timestamp in reponse data
            currentCity.text(userCityInput + ", " + moment.unix(currentDate).format("ddd. MM/DD/YY")); // Set currentCity element text equal to currentDate format specified with moment.js

            var iconCode = data.weather[0].icon; // Create var iconCode with value equal to weather icon code in response data
            var currentIcon = $("<img>"); // Create var currentIcon with value equal to new HTML img tag
            currentIcon.attr("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png"); // Set currentIcon img element src equal to openweathermap images url + value of iconCode
            currentIcon.attr("alt", "Weather Icon"); // Setting alt attribute for currentIcon image element to 'Weather Icon'
            currentCity.append(currentIcon); // Appending currentIcon element to currentCity element in HTML document
    
            currentTemp.text("Temperature: " + data.main.temp + "\xB0 F"); // Set currentTemp element text equal to main temp in response data with degrees symbol
            currentHumidity.text("Humidity: " + data.main.humidity + "%"); // Set currentHumidity element text equal to main humidity in response data
            currentWind.text("Wind Speed: " + data.wind.speed + " MPH"); // Set currentWind element text equal to wind speed in response data
            // currentUV.text("UV Index: " + )
            cityLongitude = data.coord.lon; // Set value of var cityLongitude equal to longidtude coordinate for city in response data
            cityLatitude = data.coord.lat; // Set value of cityLatitude equal to latitude coordinate for city in response data
            UV_Index(cityLatitude, cityLongitude); // Call function UV_Index with cityLatitude and CityLongitude as parameters
            get_five_day_forecast(cityLatitude, cityLongitude); // Call get_five_day_forecast with cityLatitude and CityLongitude as parameters
        } 
    })
}

// Creating function UV_Index with cityLatitude and CityLongitude as parameters
function UV_Index(cityLatitude, cityLongitude){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=" + apiKey,
        success: function (data) {
            console.log(data);
            
            // Create var indexValue with value equal to value (UV Index) in response data
            var indexValue = data.value;
            currentUV.text("UV Index: " + indexValue + " "); // Set currentUV element text equal to var indexValue
            var statusUV = $("<mark>"); // Create var statusUV with value equal to new HTML mark tag element
            currentUV.append(statusUV); // Appending statusUV element to currentUV element in HTML document

            // If/Else If/Else statements setting text background color of statusUV element based on value of indexValue (i.e. UV Index) and stating if indexValue is low, moderate, high, or severe
            if (indexValue <= 2) {
                statusUV.text("Low");
                statusUV.css("background-color", "greenyellow")
            } else if (indexValue <=5) {
                statusUV.text("Moderate");
                statusUV.css("background-color", "yellow")
            } else if (indexValue <=7) {
                statusUV.text("High");
                statusUV.css("background-color", "orange")
            } else {
                statusUV.text("Severe");
                statusUV.css("background-color", "red")
            }
        }
    })
}

// Creating function get_five_day_forecast with cityLatitude and cityLongitude as parameters
function get_five_day_forecast(cityLatitude, cityLongitude) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + apiKey,
        success: function (data) {
            console.log(data);

            // Creating var date1 and setting value equal unix timestamp in response data
            var date1 = data.daily[1].dt;
            // Setting forecastDay1 element text content equal to date1 format specified with moment.js
            forecastDay1.text(moment.unix(date1).format("ddd. MM/DD/YY"));
            // Setting src attribute for iconDay1 equal to openweathermap images url for weather icon code
            iconDay1.attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
            // Setting tempDay1 element text content equal to daily day temp in response data
            tempDay1.text("Temp: " + data.daily[1].temp.day + "\xB0 F");
            // Setting humidityDay1 element text content equal to daily humidity in response data
            humidityDay1.text("Humidity: " + data.daily[1].humidity + "%");

            // Repeating same steps above for days 2-5
            var date2 = data.daily[2].dt;
            forecastDay2.text(moment.unix(date2).format("ddd. MM/DD/YY"));
            iconDay2.attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
            tempDay2.text("Temp: " + data.daily[2].temp.day + "\xB0 F");
            humidityDay2.text("Humidity: " + data.daily[2].humidity + "%");

            var date3 = data.daily[3].dt;
            forecastDay3.text(moment.unix(date3).format("ddd. MM/DD/YY"));
            iconDay3.attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
            tempDay3.text("Temp: " + data.daily[3].temp.day + "\xB0 F");
            humidityDay3.text("Humidity: " + data.daily[3].humidity + "%");

            var date4 = data.daily[4].dt;
            forecastDay4.text(moment.unix(date4).format("ddd. MM/DD/YY"));
            iconDay4.attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
            tempDay4.text("Temp: " + data.daily[4].temp.day + "\xB0 F");
            humidityDay4.text("Humidity: " + data.daily[4].humidity + "%");

            var date5 = data.daily[5].dt;
            forecastDay5.text(moment.unix(date5).format("ddd. MM/DD/YY"));
            iconDay5.attr("src", "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png");
            tempDay5.text("Temp: " + data.daily[5].temp.day + "\xB0 F");
            humidityDay5.text("Humidity: " + data.daily[5].humidity + "%");
        }
    })
}

// Creating function called saveCitySearch with userCityInput and userCityInputNoSpaces as parameters
function saveCitySearch(userCityInput, userCityInputNoSpaces) {
    // Parse any JSON previously stored in allSearches
    var existingSearches = JSON.parse(localStorage.getItem("allSearches"));
    if(existingSearches === null) existingSearches = []; 
    if (userCityInput !== null & userCityInputNoSpaces !== null){
        var searchHistoryEntry = {
            City: userCityInput,
            CityNoSpaces: userCityInputNoSpaces
        };
        localStorage.setItem("seachHistoryEntry", JSON.stringify(searchHistoryEntry));
        // Save allSeaches back to local storage
        existingSearches.push(searchHistoryEntry);
        localStorage.setItem("allSearches", JSON.stringify(existingSearches));
    }
    displaySearchHistory() // Call displaySearchHistory function
}

// Creating function called displaySearchHistory 
function displaySearchHistory() {

    // Create var savedCities with value equal to JSON.parse of allSearches from local storage
    var savedCities = JSON.parse(localStorage.getItem("allSearches"));
    console.log(savedCities);
    $(".search-history-button").detach();
    // Creating button for each item/object in savedCities array, setting var recentCity text equal to userInput, and appending to searchHistory element in HTML document
    for (var i = 0; i < savedCities.length; i++) {
        var recentCity = $("<button>");
        recentCity.attr({
            class: "btn btn-light btn-outline-secondary text-dark search-history-button",
            type: "button",
            value: savedCities[i].CityNoSpaces
        })
        recentCity.text(savedCities[i].City);
        searchHistory.append(recentCity);
      }
}

// Add on click event listener to searchHistory div element for button with class search-history-button
searchHistory.on("click", ".search-history-button",function () {
    userCityInput = $(this).text(); // Set value of userCityInput equal to text value of button clicked
    userCityInputNoSpaces = $(this).val(); // Set value of userCityInputNoSpaces equal to value attribute of button clicked
    getWeather(userCityInput, userCityInputNoSpaces); // Call function getWeather with userCityInput and userCityInputNoSpaces as parameters
})
