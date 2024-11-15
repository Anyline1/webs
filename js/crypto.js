async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
        const data = await response.json();

        const prices = `
            Bitcoin: $${data.bitcoin.usd} | 
            Ethereum: $${data.ethereum.usd} | 
            Cardano: $${data.cardano.usd}
        `;

        document.getElementById('crypto-marquee').textContent = prices;
    } catch (error) {
        console.error('Ошибка при получении данных о криптовалютах:', error);
        document.getElementById('crypto-marquee').textContent = 'Ошибка загрузки данных о криптовалютах';
    }
}

fetchCryptoPrices();
setInterval(fetchCryptoPrices, 300000);
