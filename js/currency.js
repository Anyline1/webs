async function fetchCurrencyRates() {
    const usdElement = document.getElementById("usd-rate");
    const eurElement = document.getElementById("eur-rate");
    const cnyElement = document.getElementById("cny-rate");
    const extraCurrencyElement = document.getElementById("extra-currency");

    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
        if (!response.ok) throw new Error("Ошибка при получении курсов валют");
        const data = await response.json();

        const rates = data.rates;

        usdElement.textContent = `USD: ${(1 / rates.USD).toFixed(2)} ₽`;
        eurElement.textContent = `EUR: ${(1 / rates.EUR).toFixed(2)} ₽`;
        cnyElement.textContent = `CNY: ${(1 / rates.CNY).toFixed(2)} ₽`;

        const topCurrencies = Object.entries(rates)
            .filter(([key]) => !['USD', 'EUR', 'CNY'].includes(key))
            .sort(([, rateA], [, rateB]) => rateA - rateB)
            .slice(0, 10);

        let currentIndex = 0;

        function updateExtraCurrency() {
            const [currency, rate] = topCurrencies[currentIndex];
            extraCurrencyElement.textContent = `${currency}: ${(1 / rate).toFixed(2)} ₽`;
            currentIndex = (currentIndex + 1) % topCurrencies.length;
        }

        updateExtraCurrency();
        setInterval(updateExtraCurrency, 3000);

    } catch (error) {
        console.error("Ошибка при получении курсов валют:", error);
        usdElement.textContent = "USD: ошибка";
        eurElement.textContent = "EUR: ошибка";
        cnyElement.textContent = "CNY: ошибка";
        extraCurrencyElement.textContent = "Ошибка загрузки";
    }
}

document.addEventListener("DOMContentLoaded", fetchCurrencyRates);
