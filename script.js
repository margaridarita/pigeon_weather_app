// Give current date and time

let day = document.querySelector("#dia");

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

let hour = document.querySelector("#horas"); // display

let currentHour = now.getHours();
let currentMin = now.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}

hour.innerHTML = `${currentHour}h${currentMin}`;

// Allow to change temperature measure

function changeMeasureFar(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  farenheit.classList.add("active");
  let farTemp = (celTemp * 9) / 5 + 32;
  let currentDegrees = document.querySelector("#degrees");
  currentDegrees.innerHTML = Math.round(farTemp);
}

let farenheit = document.querySelector("#change-far");
farenheit.addEventListener("click", changeMeasureFar);

function changeMeasureCel(event) {
  event.preventDefault();
  farenheit.classList.remove("active");
  celcius.classList.add("active");
  let currentDegrees = document.querySelector("#degrees");
  currentDegrees.innerHTML = celTemp;
}

let celcius = document.querySelector("#change-cel");
celcius.addEventListener("click", changeMeasureCel);

let celTemp = null;

// Get weather data from API

function displayWeatherData(response) {
  console.log(response.data);
  document.querySelector("#cidade").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  celTemp = Math.round(response.data.main.temp);
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
  farenheit.classList.remove("active");
  celcius.classList.add("active");
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
