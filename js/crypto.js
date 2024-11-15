async function fetchCryptoPrices() {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1';
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data)) {
            const prices = data.map(coin => `${coin.name}: $${coin.current_price}`).join(' | ');
            document.getElementById('crypto-marquee').textContent = prices;
        } else {
            throw new Error('Unexpected data format');
        }
    } catch (error) {
        console.error('Ошибка при получении данных о криптовалютах:', error);
        document.getElementById('crypto-marquee').textContent = 'Ошибка загрузки данных о криптовалютах';
    }
}

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 300000);
