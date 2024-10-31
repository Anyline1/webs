document.addEventListener("DOMContentLoaded", function () {
        const apiKey = "12e094c1f64143ccbe4952b0e8b4b6ee";
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=ru&apiKey=${apiKey}`;
        const newsContainer = document.getElementById("news-container");
        const loader = document.getElementById("loader");

        async function fetchNews() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.articles && data.articles.length > 0) {
                    loader.style.display = "none";
                    displayNews(data.articles);
                } else {
                    loader.textContent = "Новости не найдены.";
                }
            } catch (error) {
                loader.textContent = "Произошла ошибка при загрузке новостей.";
                console.error("Ошибка:", error);
            }
        }

        function displayNews(articles) {
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
        }

        fetchNews();
    });

