function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dailyForecast);
}
function showWeather(response) {
  
  let currentTemperatute = Math.round(response.data.main.temp);
  let dayTemperature = document.querySelector("#current-temperature");
  if (currentTemperatute > 0) {
    dayTemperature.innerHTML = `+${currentTemperatute}`;
  } else {
    dayTemperature.innerHTML = currentTemperatute;
  }
  let dayMinTemp = document.querySelector("#day-min-temperature");
  let minTemp = Math.round(response.data.main.temp_min);
  if (minTemp > 0) {
    dayMinTemp.innerHTML = `+${minTemp}°`;
  } else {
    dayMinTemp.innerHTML = `${minTemp}°`;
  }
  let dayMaxTemp = document.querySelector("#day-max-temperature");
  let maxTemp = Math.round(response.data.main.temp_max);
  if (maxTemp > 0) {
    dayMaxTemp.innerHTML = `+${maxTemp}°`;
  } else {
    dayMaxTemp.innerHTML = `${maxTemp}°`;
  }
  let location = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `📍 ${location}`;
  let weatherCondition = document.querySelector("#weathet-condition");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `humidity: ${response.data.main.humidity}%`;
  let currentPressure = document.querySelector("#pressure");
  currentPressure.innerHTML = `pressure, mm: ${response.data.main.pressure}`;
  let currentWind = document.querySelector("#wind-power");
  currentWind.innerHTML = `wind: ${response.data.wind.speed} m/s`;
  let currentVisibility = document.querySelector("#visibility");
  let visibilityOfDay = (response.data.visibility / 1000).toFixed(1);
  currentVisibility.innerHTML = `Visibility:
  ${visibilityOfDay}km`;
  let weatherImage = document.querySelector("#current-image");
  weatherImage.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-search-city");
  let currentCity = document.querySelector("#current-city");
  if (cityInput.value) {
    let city = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
  } else {
    currentCity.innerHTML = `Please, choose city`;
  }
}
function handlePosition(position) {
  let lat = position.coords.latitude.toFixed(4);
  let lon = position.coords.longitude.toFixed(4);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function checkLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  return days[day];
}

function dailyForecast(response) {
let forecast = response.data.daily;
let rowWeather = document.querySelector("#row-weather");
let forecastHtml = "";


forecast.forEach(function(day, index) {
  if (index > 0) {
if (index < 6) {
forecastHtml = forecastHtml + `<div class="card col-lg-2 col-sm-3 col-6 forecast-card">
          <h3 class="card-title announce-heading">${formatDay(day.dt)}</h3>
          <div class="card-body">
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="image-daily-forecast"/>
            <p class="card-text">
               ${Math.round(day.temp.max)}° <span class="forecast-card-min-temperature">   ${  Math.round(day.temp.min)}°</span>
            </p>
          </div>
        </div>`
  }
  }
  

  
})
rowWeather.innerHTML = forecastHtml;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDate = new Date();
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
let currentTime = document.querySelector("#current-time");
if (minutes < 10) {
  currentTime.innerHTML = `${day} ${hour}:0${minutes}`;
} else {
  currentTime.innerHTML = `${day} ${hour}:${minutes}`;
}
let searchCityForm = document.querySelector("#searching-city-form");
searchCityForm.addEventListener("submit", searchCity);
let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", checkLocation);
let city = "London";
let apiKey = "81dd766b9316768af2b5be5120d2c81d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather);