window.onload = function results () {
    saveCitySearch(userInput, userInputNoSpaces); // Call saveCitySearch with userInput and userInputNoSpaces as parameters
    getWeather(userInputNoSpaces); // Call getWeather function
    displaySearchHistory() // Call displaySearchHistory function
}

// Creatiing function getWeather that does an API call for current weather for city (i.e. userInput)
function getWeather(userInputNoSpaces) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + userInputNoSpaces + "&units=imperial&appid=" + apiKey, 
        success: function (data) {
            console.log(data);
            
            var currentDate = data.dt; // Create var currentDate with value equal to unix timestamp in reponse data
            currentCity.text(userInput + " " + moment.unix(currentDate).format("ddd. MM/DD/YY")); // Set currentCity element text equal to currentDate format specified with moment.js

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

// Creating function called saveCitySearch with userInput and userInputNoSpaces as parameters
function saveCitySearch(userInput, userInputNoSpaces) {
    // Parse any JSON previously stored in allSearches
    var existingSearches = JSON.parse(localStorage.getItem("allSearches"));
    if(existingSearches === null) existingSearches = []; 
    var searchHistoryEntry = {
        City: userInput,
        CityNoSpaces: userInputNoSpaces
    };
    localStorage.setItem("seachHistoryEntry", JSON.stringify(searchHistoryEntry));
    // Save allSeaches back to local storage
    existingSearches.push(searchHistoryEntry);
    localStorage.setItem("allSearches", JSON.stringify(existingSearches));
}

// Creating function called displaySearchHistory 
function displaySearchHistory() {

    // Create var savedCities with value equal to JSON.parse of allSearches from local storage
    var savedCities = JSON.parse(localStorage.getItem("allSearches"));

    // Creating button for each item/object in savedCities array, setting var recentCity text equal to userInput, and appending to searchHistory element in HTML document
    for (var i = 0; i < savedCities.length; i++) {
        var recentCity = $("<button>");
        recentCity.attr("class", "btn btn-light btn-outline-secondary text-dark");
        recentCity.attr("type", "button");
        recentCity.text(savedCities[i].userInput);
        searchHistory.append(recentCity);
      }
}