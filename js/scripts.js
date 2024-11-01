document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=12e094c1f64143ccbe4952b0e8b4b6ee';
    const newsContainer = document.getElementById("news-container");
    const loader = document.getElementById("loader");

    const fetchNews = async () => {
        loader.style.display = "block";
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();

            loader.style.display = "none";
            if (data.articles && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                newsContainer.innerHTML = "<p>Новости не найдены.</p>";
            }
        } catch (error) {
            loader.style.display = "none";
            newsContainer.innerHTML = `<p>Произошла ошибка при загрузке новостей: ${error.message}</p>`;
            console.error("Ошибка:", error);
        }
    };

    const displayNews = (articles) => {
        articles.forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || "Описание недоступно."}</p>
                <a href="${article.url}" target="_blank">Читать далее</a>
            `;

            newsContainer.appendChild(newsItem);
        });
    };

    fetchNews();
});
