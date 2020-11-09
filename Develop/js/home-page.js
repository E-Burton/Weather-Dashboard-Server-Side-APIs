// VARIABLE DECLARATIONS
var searchButton = $("#button-addon2");
var userInput;
var userInputNoSpaces;

// Capitalize the first letter of each word as user types
$(document).ready(function () {  
    $(".search-city").keyup(function () {  
        $(".search-city").css('textTransform', 'capitalize');  
    }); 
}); 

// Adding 'on click' event listener to search button on homepage
searchButton.on('click', function () {
    // Storing value of input field in var userInput
    userInput = $(this).parent().siblings(".search-city").val();
    var userCityInputCap = capitalizeWords(userInput);
    // Save value of userInput in local storage
    localStorage.setItem("userCityInput", userCityInputCap);
    // If the value of userInput has any spaces, replace the space with '+' and store value in var userInputNoSpaces
    userInputNoSpaces = userInput.replace(/\s/g, '+');
    // Save value of userInputNoSpaces to local storage
    localStorage.setItem("userCityInputNoSpaces", userInputNoSpaces);
    window.location.href = "./Develop/search-results.html"
})

// Create function captializeWords to return string with the first letter of each word captialized
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}