import * as ELEMENTS from 'elements.js';
import {Http} from 'http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from 'weather-data.js';

const APPID = 'd2bacb88baffdbf357d800091e27aef4';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function searchWeather() {
    const cityName = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if (cityName.length == 0) {
        return alert('please enter a city name');
    }
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName} &units=metric&appid=${APPID}`;

    Http.fetchData(URL)
         .then(responseData => {
            const WEATHER_DATA = new WeatherData(cityName, responseData.weather[0].description.toUpperCase());
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;
            updateWeather(WEATHER_PROXY);
         })
         .catch(err => alert(err));
}

function updateWeather(WeatherData) {
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = WeatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESC.textContent = WeatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = WeatherData.temperature;

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}