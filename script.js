// To do: have geolocation automatically at the beggining

let day = document.querySelector("#dia");
let hour = document.querySelector("#horas");

let now = new Date();

let currentWeekDay = now.getDay();
let currentDate = now.getDate();
let currentMonth = now.getMonth();

let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentWeekDayExt = weekdays[currentWeekDay];
let currentMonthExt = months[currentMonth];

day.innerHTML = `${currentWeekDayExt} ${currentDate} ${currentMonthExt}`;

let currentHour = now.getHours();
let currentMin = now.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}

hour.innerHTML = `${currentHour}h${currentMin}`;

// Display searched city - substituted by new code that uses API

// let searchEng = document.querySelector("#search-form");
// searchEng.addEventListener("submit", display);

// function display(event) {
// event.preventDefault();
// let userCity = document.querySelector("#city-input");
// let city = document.querySelector("#cidade");
// city.innerHTML = userCity.value;
// }

// Allow to change temperature measure

let farenheit = document.querySelector("#change-far");
farenheit.addEventListener("click", changeMeasureFar);

function changeMeasureFar() {
  let currentDegrees = document.querySelector("#degrees");
  currentDegrees.innerHTML = "80º";
}

let celcius = document.querySelector("#change-cel");
celcius.addEventListener("click", changeMeasureCel);

function changeMeasureCel() {
  let currentDegrees = document.querySelector("#degrees");
  currentDegrees.innerHTML = "27º";
}

// Get weather data from API

function displayWeatherData(response) {
  console.log(response.data);
  document.querySelector("#cidade").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function citySearch(city) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherData);
}

function citySubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}

let searchEng = document.querySelector("#search-form");
searchEng.addEventListener("submit", citySubmission);

// Add geolocation button

function getPosition(position) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherData);
}

function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let geoButton = document.querySelector("#geo");
geoButton.addEventListener("click", userLocation);

//
