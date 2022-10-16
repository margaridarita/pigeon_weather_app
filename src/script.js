// Display current date and time

let day = document.querySelector("#dayDisplay");

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

let hour = document.querySelector("#hourDisplay");

let currentHour = now.getHours();
let currentMin = now.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}

hour.innerHTML = `${currentHour}h${currentMin}`;

// Get and display weather data from API

function getForecast(coordinates) {
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherData(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celTemp = Math.round(response.data.main.temp);
  document.querySelector("#degrees").innerHTML = celTemp;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coord);
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

// Set initial value

citySearch("Lisbon");

// Build forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecastdays = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastdays.forEach(function (forecastdays, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-date">${formatDay(forecastdays.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastdays.weather[0].icon
          }@2x.png"
          alt=""
          width="44"
        />
        <div class="forecast-temperatures">
          <span class="forecast-temperature-max"> ${Math.round(
            forecastdays.temp.max
          )}° </span>
          <span class="forecast-temperature-min"> ${Math.round(
            forecastdays.temp.min
          )}° </span>
        </div>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
