const apiUrl = 'https://api.exchangerate-api.com/v4/latest/RUB';

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
        }
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function displayCurrencies(currencies, containerId, currencyKeys) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Очистка контейнера

    if (!currencies) {
        container.innerHTML = '<p>Не удалось загрузить данные</p>';
        return;
    }

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';

    currencyKeys.forEach(key => {
        if (currencies[key]) {
            const item = document.createElement('li');
            item.style.marginBottom = '10px';
            const rate = (1 / currencies[key]).toFixed(2);
            item.textContent = `${key}: ${rate} RUB`;
            list.appendChild(item);
        }
    });

    container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', async () => {
    const currencies = await fetchCurrencies();

    const majorCurrencyKeys = ['USD', 'EUR', 'GBP'];
    const extraCurrencyKeys = ['JPY', 'AUD', 'CAD'];

    displayCurrencies(currencies, 'major-currencies', majorCurrencyKeys);
    displayCurrencies(currencies, 'extra-currencies', extraCurrencyKeys);
});
