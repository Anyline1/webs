async function fetchCurrencyRates() {
    const usdElement = document.getElementById("usd-rate");
    const eurElement = document.getElementById("eur-rate");
    const cnyElement = document.getElementById("cny-rate");

    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
        if (!response.ok) throw new Error("Ошибка при получении курсов валют");
        const data = await response.json();

        const rates = data.rates;
        usdElement.textContent = `USD: ${(1 / rates.USD).toFixed(2)}`;
        eurElement.textContent = `EUR: ${(1 / rates.EUR).toFixed(2)}`;
        cnyElement.textContent = `CNY: ${(1 / rates.CNY).toFixed(2)}`;
    } catch (error) {
        console.error("Ошибка при получении курсов валют:", error);
        usdElement.textContent = "USD: ошибка";
        eurElement.textContent = "EUR: ошибка";
        cnyElement.textContent = "CNY: ошибка";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetchCurrencyRates();
});
