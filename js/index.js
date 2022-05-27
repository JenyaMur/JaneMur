let apiKey = "81dd766b9316768af2b5be5120d2c81d";

function showWeather(response) {
  console.log(response.data);
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
    dayMinTemp.innerHTML = `minTemp°`;
  }
  let dayMaxTemp = document.querySelector("#day-max-temperature");
  let maxTemp = Math.round(response.data.main.temp_max);
  if (maxTemp > 0) {
    dayMaxTemp.innerHTML = `+${maxTemp}°`;
  } else {
    dayMaxTemp.innerHTML = `maxTemp°`;
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

  function changeTempFahrenheit(event) {
    event.preventDefault();
    let farTemp = (response.data.main.temp * 1.8 + 32).toFixed(0);
    if (farTemp > 0) {
      currentTemp.innerHTML = "+" + farTemp;
    } else {
      currentTemp.innerHTML = farTemp;
    }
  }
  function changeTempCelsius(event) {
    event.preventDefault();
    currentTemp.innerHTML = temp;
    if (temp > 0) {
      currentTemp.innerHTML = "+" + temp.toFixed(0);
    } else {
      currentTemp.innerHTML = temp.toFixed(0);
    }
  }
  let degreeFahrenheit = document.querySelector("#degree-fahrenheit");
  let currentTemp = document.querySelector("#current-temperature");
  let temp = response.data.main.temp;
  degreeFahrenheit.addEventListener("click", changeTempFahrenheit);
  let degreeCelsius = document.querySelector("#degree-celsius");
  degreeCelsius.addEventListener("click", changeTempCelsius);
}
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
let currentTime = document.querySelector("#current-time");
if (minutes < 10) {
  currentTime.innerHTML = `${day} ${hour}:0${minutes}`;
} else {
  currentTime.innerHTML = `${day} ${hour}:${minutes}`;
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
let searchCityForm = document.querySelector("#searching-city-form");
searchCityForm.addEventListener("submit", searchCity);

function handlePosition(position) {
  let lat = position.coords.latitude.toFixed(4);
  let lon = position.coords.longitude.toFixed(4);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function checkLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let buttonCurrentLocation = document.querySelector("#current-location");
buttonCurrentLocation.addEventListener("click", checkLocation);
navigator.geolocation.getCurrentPosition(handlePosition);
