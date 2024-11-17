document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.news-search');
    const searchInput = searchForm.querySelector('input[name="query"]');
    const newsContainers = document.querySelectorAll('.news-items');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            alert('Введите текст для поиска!');
            return;
        }

        let resultsFound = false;

        newsContainers.forEach(container => {
            const newsItems = container.querySelectorAll('.news-item');

            newsItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();

                if (title.includes(query) || description.includes(query)) {
                    item.style.display = 'block';
                    resultsFound = true;
                } else {
                    item.style.display = 'none';
                }
            });
        });

        if (!resultsFound) {
            alert('Результаты поиска не найдены.');
        }
    });
});
