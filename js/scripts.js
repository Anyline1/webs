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
                <p>${article.description ? article.description.slice(0, 150) + '...' : "Описание не доступно."}</p>
            </div>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function fetchTopHeadlines(country, containerId) {
    const url = `https://gnews.io/api/v4/top-headlines?country=${country}&lang=${country === 'us' ? 'en' : 'ru'}&max=10&apikey=${apiKey}`;
    const loader = document.getElementById("loader");

    if (loader) loader.style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (loader) loader.style.display = "none";
            displayNews(data.articles, containerId);
        })
        .catch(error => {
            if (loader) loader.style.display = "none";
            console.error(`Error fetching ${country.toUpperCase()} news:`, error);
        });
}

async function fetchWeather() {
    const weatherDataElement = document.getElementById("weather-data");
    const additionalInfoElement = document.getElementById("additional-weather-info");
    const latitude = 59.935894;
    const longitude = 30.338745;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&windspeed_unit=ms&timezone=auto`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка при получении данных о погоде");
        const data = await response.json();

        const temperature = `${Math.round(data.current_weather.temperature)}°C`;
        const windSpeed = `Ветер: ${Math.round(data.current_weather.windspeed)} м/с`;
        const windDirection = `Направление ветра: ${data.current_weather.winddirection}°`;
        const isDay = data.current_weather.is_day === 1;
        const weatherIcon = isDay ? "☀️" : "🌙";

        const weatherInfoArray = [windSpeed, windDirection];

        let weatherIndex = 0;

        weatherDataElement.innerHTML = `
            <div class="main-weather">
                <span class="weather-icon">${weatherIcon}</span>
                <div class="temp-details">
                    <p class="main-temperature">${temperature}</p>
                    <p class="main-temperature">${windSpeed}</p>
                    <p class="main-temperature">${windDirection}</p>
                </div>
            </div>
        `;

        // setInterval(() => {
        //     weatherIndex = (weatherIndex + 1) % weatherInfoArray.length;
        //     additionalInfoElement.textContent = weatherInfoArray[weatherIndex];
        // }, 3000);

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

    const tabButtons = document.querySelectorAll('.tab-button');
    const newsItems = document.querySelectorAll('.news-items');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tab = button.getAttribute('data-tab');
            newsItems.forEach(item => {
                item.classList.toggle('active', item.id === `news-container-${tab}`);
            });
        });
    });

    document.querySelector('.tab-button[data-tab="ru"]').click();
});
