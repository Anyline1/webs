async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 20,
                page: 1
            }
        });
        const data = await response.json();

        const prices = data.map(coin => `${coin.name}: $${coin.current_price}`).join(' | ');
        document.getElementById('crypto-marquee').textContent = prices;
    } catch (error) {
        console.error('Ошибка при получении данных о криптовалютах:', error);
        document.getElementById('crypto-marquee').textContent = 'Ошибка загрузки данных о криптовалютах';
    }
}

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 300000);
