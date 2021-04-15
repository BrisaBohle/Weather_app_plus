//Day//
let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];
let h3 = document.querySelector(".h3");
let currentTime = new Date();
let day = days[currentTime.getDay()];
h3.innerHTML = `${day}`;

//Time//

let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = document.querySelector(".hours-minutes");
time.innerHTML = `${hours}:${minutes}`;

//Display//

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  setTemperature(response.data.main.temp);
  getForecast(response.data.coord);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  }
function getForecast(coordinates){
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  window.axios.get(apiUrl).then(displayForecast);
  
}
//Search City input//

function searchCity(city) {
  let key = "5077d3232d041e2158e79942007bee5b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  window.axios.get(url).then(displayWeather);
}

//Search Current Location//

function searchLocation(position) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  window.axios.get(url).then(displayWeather);
}

//Set Temperature//

let assignNumber = document.querySelector("#temperature");
let unitSymbol = document.querySelector("#unit-shift");
let celciusTemperature = Number(assignNumber.innerHTML);

function setTemperature(celcius) {

 let toFahrenheit = checkBox.checked;
  celcius = Math.round(celcius);
  if (toFahrenheit) {
    let fahrenheitTemp = Math.round((celcius * 9) / 5 + 32);
    assignNumber.innerHTML = `${fahrenheitTemp}`;
    unitSymbol.innerHTML = `°F`;

    if(forecast != null) {
      forecast.forEach(function (forecastDay, index) {
        if (index < 4){
          forecastMin = Math.round(forecastDay.temp.min);
          forecastMax = Math.round(forecastDay.temp.max);
          let fahrenheitTempMin = Math.round((forecastMin * 9) / 5 + 32);
          let fahrenheitTempMax = Math.round((forecastMax * 9) / 5 + 32);
          document.querySelector("#week-degress-min-" + index).innerHTML = fahrenheitTempMin;
          document.querySelector("#week-degress-max-" + index).innerHTML = fahrenheitTempMax;
        }
      });
    }

  } else {
    assignNumber.innerHTML = `${celcius}`;
    unitSymbol.innerHTML = `°C`;
    if(forecast != null) {
      forecast.forEach(function (forecastDay, index) {
        if (index < 4){
          forecastMin = Math.round(forecastDay.temp.min);
          forecastMax = Math.round(forecastDay.temp.max);
          document.querySelector("#week-degress-min-" + index).innerHTML = forecastMin;
          document.querySelector("#week-degress-max-" + index).innerHTML = forecastMax;
        }
      });
    }
  }
  celciusTemperature = celcius; 
}

//Listner//

function submitFormListner(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getLocationListner(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function swichUnitListner(event) {
  event.preventDefault();
  setTemperature(celciusTemperature);
}

//Events//
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitFormListner);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getLocationListner);

let checkBox = document.querySelector("#flexSwitchCheckDefault");
checkBox.addEventListener("change", swichUnitListner);

//Forecast//
function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
let forecast = null;
let weekForecast = null;
function displayForecast (response) {
  let forecastElement =document.querySelector("#forecast");
  forecast = response.data.daily;
  let forecastMin = null;
  let forecastMax = null;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4){
      forecastMin = Math.round(forecastDay.temp.min);
      forecastMax = Math.round(forecastDay.temp.max);
      forecastHTML = forecastHTML + `
        <div class="col-3">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img class="week-icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" id="icon" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-min" id="week-degress-min-${index}">${forecastMin}</span><span id="unit-week-min-${index}">°C</span>
          <span class="weather-forecast-temperature-max" id="week-degress-max-${index}">${forecastMax}</span><span id="unit-week-max-${index}">°C</span>
        </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  let weekUnit = document.querySelectorAll("#unit-week");
  console.log (forecastMax, forecastMin, weekUnit);
}

searchCity("São Paulo");