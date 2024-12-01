const apiKey = ''; 
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=55.7558&lon=37.6173&exclude=minutely,hourly&units=metric&appid=${apiKey}&lang=ru`;

const currentWeatherContainer = document.getElementById('current-weather');
const weeklyForecastContainer = document.getElementById('weekly-forecast');

async function fetchWeatherData() {
    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const weatherData = await response.json();
        displayCurrentWeather(weatherData.current);
        displayWeeklyForecast(weatherData.daily);
    } catch (error) {
        currentWeatherContainer.innerHTML = `<p>Ошибка загрузки данных о текущей погоде.</p>`;
        weeklyForecastContainer.innerHTML = `<p>Ошибка загрузки прогноза погоды.</p>`;
        console.error(error);
    }
}

function displayCurrentWeather(current) {
    currentWeatherContainer.innerHTML = `
        <div class="weather-block">
            <p class="temp">${Math.round(current.temp)}°C</p>
            <p class="description">${current.weather[0].description}</p>
            <p class="details">Ощущается как: ${Math.round(current.feels_like)}°C</p>
        </div>
    `;
}

function displayWeeklyForecast(daily) {
    weeklyForecastContainer.innerHTML = daily.slice(0, 7).map(day => {
        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short', day: 'numeric', month: 'numeric' };
        return `
            <div class="forecast-day">
                <p class="date">${date.toLocaleDateString('ru-RU', options)}</p>
                <p class="temp">Днём: ${Math.round(day.temp.day)}°C</p>
                <p class="temp">Ночью: ${Math.round(day.temp.night)}°C</p>
                <p class="description">${day.weather[0].description}</p>
            </div>
        `;
    }).join('');
}

fetchWeatherData();