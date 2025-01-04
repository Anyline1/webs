const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];
const spinDurationBase = 3000;
const reels = ['reel1', 'reel2', 'reel3', 'reel4', 'reel5'];
let balance = 1000;

function updateBalance(amount) {
    balance += amount;
    document.getElementById('balance').textContent = balance;
}
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateReelSymbolsWithTarget(targetSymbol, total = 30) {

    const symbolsCopy = Array.from({ length: total }, () => getRandomSymbol());
    const randomIndex = Math.floor(Math.random() * total);
    symbolsCopy[randomIndex] = targetSymbol;
    return symbolsCopy;
}

function populateReel(reelId, symbols) {
    const reel = document.getElementById(reelId).querySelector('.symbols');
    reel.innerHTML = '';

    symbols.forEach(symbol => {
        const div = document.createElement('div');
        div.className = 'symbol';
        div.textContent = symbol;
        reel.appendChild(div);
    });
}

function spinReel(reelId, targetSymbol, stopIndex, duration) {
    const reel = document.getElementById(reelId).querySelector('.symbols');
    const symbolHeight = 60;
    const visibleSymbols = 3;
    const centerIndex = Math.floor(visibleSymbols / 2);
    const stopPosition = -(symbolHeight * (stopIndex - centerIndex));

    return new Promise(resolve => {
        reel.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        reel.style.transform = `translateY(${stopPosition}px)`;

        setTimeout(() => {
            reel.style.transition = 'none';
            resolve();
        }, duration);
    });
}


function checkWinWithBet(results) {
    const message = document.getElementById('message');
    const winningCombination = document.getElementById('winningCombination');
    const betAmount = parseInt(document.getElementById('betAmount').value, 10);

    if (balance < betAmount) {
        message.textContent = "❌ Недостаточно средств для ставки!";
        return;
    }

    updateBalance(-betAmount);

    if (results.every(symbol => symbol === results[0])) {
        const jackpotWin = betAmount * 10;
        updateBalance(jackpotWin);
        message.textContent = `🎉 Джекпот! ${results[0]} x5! Вы выиграли ${jackpotWin} 💰!`;
        winningCombination.textContent = `${results[0]} x5`;
        return;
    }

    if (results[0] === results[1] && results[1] === results[2]) {
        const bigWin = betAmount * 5;
        updateBalance(bigWin);
        message.textContent = `✨ Большой выигрыш! ${results[1]} x3 in the center! Вы выиграли ${bigWin} 💰!`;
        winningCombination.textContent = `${results[1]} x3`;
        return;
    }

    if (results[2] === results[3] && results[3] === results[4]) {
        message.textContent = `✨ Большой выигрыш! ${results[2]} x3 в конце!`;
        winningCombination.textContent = `${results[2]} x3 (конец)`;
        return;
    }

    for (let i = 0; i < results.length - 2; i++) {
        if (results[i] === results[i + 1] && results[i + 1] === results[i + 2]) {
            message.textContent = `🎊 Выигрыш! ${results[i]} x3 подряд!`;
            winningCombination.textContent = `${results[i]} x3 подряд`;
            return;
        }
    }

    if (results[0] === results[4]) {
        message.textContent = `✨ Выигрыш! ${results[0]} x2 на краях!`;
        winningCombination.textContent = `${results[0]} x2 (края)`;
        return;
    }

    if (results.filter(symbol => symbol === "7️⃣").length >= 3) {
        message.textContent = `🔥 Выигрыш! "7️⃣" x3 или больше!`;
        winningCombination.textContent = `"7️⃣" x3+`;
        return;
    }

    if (results.includes("⭐") && results.includes("🔔") && results.includes("🍋")) {
        message.textContent = `🌟 Удачная последовательность! ⭐🔔🍋!`;
        winningCombination.textContent = `⭐🔔🍋`;
        return;
    }

    if (new Set(results).size === results.length) {
        message.textContent = `🌈 Все символы разные! Выигрыш!`;
        winningCombination.textContent = `Все разные!`;
        return;
    }

    if (results[1] === results[2] || results[2] === results[3]) {
        message.textContent = `🎉 Центральная пара! ${results[2]} x2!`;
        winningCombination.textContent = `${results[2]} x2 (центр)`;
        return;
    }

    for (let i = 0; i < results.length - 1; i++) {
        if (results[i] === results[i + 1]) {
            const smallWin = betAmount * 2;
            updateBalance(smallWin);
            message.textContent = `👍 Малый выигрыш! ${results[i]} x2! Вы выиграли ${smallWin} 💰!`;
            winningCombination.textContent = `${results[i]} x2`;
            return;
        }
    }

    message.textContent = "😞 Попробуй снова!";
    winningCombination.textContent = "-";
}

async function spinReels() {
    const message = document.getElementById('message');
    message.textContent = "🎰 Вращение...";

    const betAmount = parseInt(document.getElementById('betAmount').value, 10);
    if (balance < betAmount) {
        message.textContent = "❌ Недостаточно средств для ставки!";
        return;
    }

    const results = reels.map(() => getRandomSymbol());

    const reelSymbols = reels.map((_, index) =>
        generateReelSymbolsWithTarget(results[index], 30)
    );

    reels.forEach((reelId, index) => populateReel(reelId, reelSymbols[index]));

    const stopIndices = results.map((symbol, index) =>
        reelSymbols[index].indexOf(symbol)
    );

    const spinPromises = reels.map((reelId, index) => {
        const randomDuration = spinDurationBase + Math.random() * 500;
        return spinReel(reelId, results[index], stopIndices[index], randomDuration);
    });

    await Promise.all(spinPromises);

    checkWinWithBet(results);
}

document.getElementById('spinButton').addEventListener('click', () => {
    spinReels();
});
