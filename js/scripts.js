const apiKey = 'c80158c04c637b99e2bd02a7242b843c';

function displayDate() {
    const dateElement = document.getElementById("date");
    const now = new Date();
    const options = { day: 'numeric', month: 'long' };
    dateElement.textContent = now.toLocaleDateString('ru-RU', options).toUpperCase();
}

function displayTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    timeElement.textContent = now.toLocaleTimeString('ru-RU', timeOptions);
}

setInterval(displayTime, 1000);
displayDate();

function displayNews(articles, containerId) {
    const newsContainer = document.getElementById(containerId);
    newsContainer.innerHTML = "";

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>Новостей не найдено.</p>";
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement("a");
        newsItem.classList.add("news-item");
        newsItem.href = article.url;
        newsItem.target = "_blank";
        newsItem.innerHTML = `
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>${article.description || "Описание не доступно."}</p>
            </div>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function fetchTopHeadlines(country, containerId) {
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&lang=${country === 'us' ? 'en' : 'ru'}&max=10&apikey=${apiKey}`;
    const loader = document.getElementById("loader");

    // Show loader if it exists
    if (loader) loader.style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Hide loader if it exists
            if (loader) loader.style.display = "none";
            displayNews(data.articles, containerId);
        })
        .catch(error => {
            // Hide loader if it exists
            if (loader) loader.style.display = "none";
            console.error(`Error fetching ${country.toUpperCase()} news:`, error);
        });
}

async function fetchWeather() {
    const weatherDataElement = document.getElementById("weather-data");
    const weatherIconElement = document.getElementById("weather-icon");
    const apiKey = "25e38454a0f2af6bc314bc8b76dc55b1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Saint Petersburg&appid=${apiKey}&units=metric&lang=ru`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка при получении данных о погоде");
        const data = await response.json();

        const temperature = `${Math.round(data.main.temp)}°C`;
        const feelsLike = `Ощущается как: ${Math.round(data.main.feels_like)}°C`;
        const tempMin = `${Math.round(data.main.temp_min)}°C`;
        const tempMax = `${Math.round(data.main.temp_max)}°C`;
        const windSpeed = `Ветер: ${Math.round(data.wind.speed)} м/с`;
        const pressure = `Давление: ${Math.round(data.main.pressure)} мм рт. ст.`;
        const humidity = `Влажность: ${data.main.humidity}%`;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        weatherIconElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIconElement.alt = description;

        weatherDataElement.innerHTML = `
            <div class="main-weather">
                <div class="temp-details">
                    <p class="main-temperature">${temperature}</p>
                    <div class="min-max">
                        <p>Мин: ${tempMin}</p>
                        <p>Макс: ${tempMax}</p>
                    </div>
                    <p class="feels-like">${feelsLike}</p>
                </div>
            </div>
        `;

        const weatherInfoArray = [windSpeed, pressure, humidity, description];
        let weatherIndex = 0;
        const additionalInfoElement = document.getElementById("additional-weather-info");

        setInterval(() => {
            additionalInfoElement.textContent = weatherInfoArray[weatherIndex];
            weatherIndex = (weatherIndex + 1) % weatherInfoArray.length;
        }, 3000);
    } catch (error) {
        console.error("Ошибка при получении погоды:", error);
        weatherDataElement.textContent = "Не удалось загрузить погоду";
    }
}

document.getElementById("back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
    fetchWeather();
    fetchTopHeadlines('us', 'news-container-us');
    fetchTopHeadlines('ru', 'news-container-ru');
});
