function addSearchFeature() {
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Поиск новостей...";
    searchInput.classList.add("news-search");
    searchInput.addEventListener("input", filterNews);

    const header = document.querySelector("header");
    header.appendChild(searchInput);
}

function filterNews(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newsItems = document.querySelectorAll(".news-item");

    newsItems.forEach(item => {
        const title = item.querySelector("h3").textContent.toLowerCase();
        const description = item.querySelector("p").textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

let latestArticleTimestamp = Date.now();

function checkForNewArticles() {
    const newsContainers = ["news-container-us", "news-container-ru"];
    newsContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container && container.childNodes.length > 0) {
            const article = container.childNodes[0];
            const articleTime = new Date(article.getAttribute("data-timestamp")).getTime();
            if (articleTime > latestArticleTimestamp) {
                latestArticleTimestamp = articleTime;
                notifyNewArticle();
            }
        }
    });
}

function notifyNewArticle() {
    const notification = document.createElement("div");
    notification.classList.add("new-article-notification");
    notification.textContent = "Появились новые новости!";
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
    addSearchFeature();
    setInterval(checkForNewArticles, 30000);
});
