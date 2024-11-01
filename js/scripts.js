const apiKey = 'c80158c04c637b99e2bd02a7242b843c';

function displayDateTime() {
    const dateTimeElement = document.getElementById("date-time");
    const now = new Date();
    dateTimeElement.textContent = now.toLocaleString();
}
setInterval(displayDateTime, 1000);

function displayNews(articles, containerId) {
    const newsContainer = document.getElementById(containerId);
    newsContainer.innerHTML = "";

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles found.</p>";
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function fetchTopHeadlinesUS() {
    const url = `https://gnews.io/api/v4/top-headlines?country=us&lang=en&max=10&apikey=${apiKey}`;
    document.getElementById("loader").style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none";
            displayNews(data.articles, "news-container-us");
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none";
            console.error("Error fetching US news:", error);
        });
}

function fetchTopHeadlinesRU() {
    const url = `https://gnews.io/api/v4/top-headlines?country=ru&lang=ru&max=10&apikey=${apiKey}`;
    document.getElementById("loader").style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none";
            displayNews(data.articles, "news-container-ru");
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none";
            console.error("Error fetching Russian news:", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchTopHeadlinesUS();
    fetchTopHeadlinesRU();
});
