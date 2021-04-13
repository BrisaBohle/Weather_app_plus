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

//Search input-City//

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  setTemperature(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(iconElement);
}

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
  } else {
    assignNumber.innerHTML = `${celcius}`;
    unitSymbol.innerHTML = `°C`;
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

searchCity("Oslo");
