const apiKey = '25e38454a0f2af6bc314bc8b76dc55b1';
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=59.9343&lon=30.3351&units=metric&appid=${apiKey}&lang=ru`;

const currentWeatherContainer = document.getElementById('current-weather');
const weeklyForecastContainer = document.getElementById('weekly-forecast');

async function fetchWeatherData() {
    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const weatherData = await response.json();
        displayCurrentWeather(weatherData.list[0]); // Display the first forecast as current weather
        displayWeeklyForecast(weatherData.list);
    } catch (error) {
        currentWeatherContainer.innerHTML = `<p>Ошибка загрузки данных о текущей погоде.</p>`;
        weeklyForecastContainer.innerHTML = `<p>Ошибка загрузки прогноза погоды.</p>`;
        console.error(error);
    }
}

function displayCurrentWeather(current) {
    currentWeatherContainer.innerHTML = `
        <div class="weather-block">
            <p class="temp">${Math.round(current.main.temp)}°C</p>
            <p class="description">${current.weather[0].description}</p>
            <p class="details">Ощущается как: ${Math.round(current.main.feels_like)}°C</p>
        </div>
    `;
}

function displayWeeklyForecast(forecastList) {
    // Group forecasts by day
    const dailyForecasts = forecastList.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('ru-RU');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(forecast);
        return acc;
    }, {});

    weeklyForecastContainer.innerHTML = Object.entries(dailyForecasts).map(([date, forecasts]) => {
        const dayTemp = forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length;
        const dayDescription = forecasts[0].weather[0].description;

        return `
            <div class="forecast-day">
                <p class="date">${date}</p>
                <p class="temp">Средняя температура: ${Math.round(dayTemp)}°C</p>
                <p class="description">${dayDescription}</p>
            </div>
        `;
    }).join('');
}

fetchWeatherData();