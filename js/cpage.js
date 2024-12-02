const majorCurrencies = [
    { name: 'USD', rate: '75.50' },
    { name: 'EUR', rate: '82.40' },
    { name: 'GBP', rate: '94.10' }
];

const extraCurrencies = [
    { name: 'JPY', rate: '0.65' },
    { name: 'AUD', rate: '48.20' },
    { name: 'CAD', rate: '54.30' }
];

function displayCurrencies(currencies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    if (!currencies.length) {
        container.innerHTML = '<p>Данные отсутствуют</p>';
        return;
    }

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';

    currencies.forEach(currency => {
        const item = document.createElement('li');
        item.style.marginBottom = '10px';
        item.textContent = `${currency.name}: ${currency.rate} RUB`;
        list.appendChild(item);
    });

    container.appendChild(list);
}

document.addEventListener('DOMContentLoaded', () => {
    displayCurrencies(majorCurrencies, 'major-currencies');
    displayCurrencies(extraCurrencies, 'extra-currencies');
});
