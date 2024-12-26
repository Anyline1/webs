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

function generateReelSymbols(total = 30) {
    return [...Array(total)].map(() => getRandomSymbol());
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
    const stopPosition = -(symbolHeight * stopIndex);

    return new Promise(resolve => {
        reel.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        reel.style.transform = `translateY(${stopPosition}px)`;

        setTimeout(() => {
            reel.style.transition = 'none';
            resolve();
        }, duration);
    });
}

function checkWin(results) {
    const message = document.getElementById('message');
    const winningCombination = document.getElementById('winningCombination');

    if (results.every(symbol => symbol === results[0])) {
        message.textContent = `🎉 Джекпот! ${results[0]} x5!`;
        winningCombination.textContent = `${results[0]} x5`;
        return;
    }

    if (results[0] === results[1] && results[1] === results[2]) {
        message.textContent = `✨ Большой выигрыш! ${results[1]} x3 in the center!`;
        winningCombination.textContent = `${results[1]} x3`;
        return;
    }

    for (let i = 0; i < results.length - 1; i++) {
        if (results[i] === results[i + 1]) {
            message.textContent = `👍 Малый выигрыш! ${results[i]} x2!`;
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

    const reelSymbols = reels.map(() => generateReelSymbols(30));
    const results = reels.map(() => getRandomSymbol());

    reels.forEach((reelId, index) => populateReel(reelId, reelSymbols[index]));

    const stopIndices = results.map((symbol, index) => {
        const symbolIndex = reelSymbols[index].indexOf(symbol);
        return symbolIndex !== -1 ? symbolIndex : 0;
    });

    const spinPromises = reels.map((reelId, index) => {
        const randomDuration = spinDurationBase + Math.random() * 500;
        return spinReel(reelId, results[index], stopIndices[index], randomDuration);
    });

    await Promise.all(spinPromises);

    checkWin(results);
}

document.getElementById('spinButton').addEventListener('click', () => {
    spinReels();
});
