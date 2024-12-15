const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];
const spinDurationBase = 3000;
const reels = ['reel1', 'reel2', 'reel3', 'reel4', 'reel5'];

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
    const visibleSymbols = 6;
    const extraSymbols = 9;
    const totalSymbols = reel.children.length;

    const stopPosition = -(symbolHeight * (stopIndex + extraSymbols)); // Конечная позиция

    return new Promise(resolve => {
        reel.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        reel.style.transform = `translateY(${stopPosition}px)`;

        setTimeout(() => {
            reel.style.transition = 'none';

            const newSymbols = generateReelSymbols(extraSymbols);
            for (let i = 0; i < extraSymbols; i++) {
                const div = document.createElement('div');
                div.className = 'symbol';
                div.textContent = newSymbols[i];
                reel.appendChild(div);
            }

            reel.style.transform = `translateY(${-symbolHeight * extraSymbols}px)`;
            resolve();
        }, duration);
    });
}

function checkWin(results) {
    const message = document.getElementById('message');

    if (results.every(symbol => symbol === results[0])) {
        message.textContent = `🎉 Jackpot! ${results[0]} x5!`;
        return;
    }

    if (results[0] === results[1] && results[1] === results[2]) {
        message.textContent = `✨ Big Win! ${results[1]} x3 in the center!`;
        return;
    }

    for (let i = 0; i < results.length - 1; i++) {
        if (results[i] === results[i + 1]) {
            message.textContent = `👍 Small Win! ${results[i]} x2!`;
            return;
        }
    }

    message.textContent = "😞 Try again!";
}

async function spinReels() {
    const message = document.getElementById('message');
    message.textContent = "🎰 Spinning...";

    const reelSymbols = reels.map(() => generateReelSymbols(30));
    const results = [...Array(reels.length)].map(() => getRandomSymbol());

    reels.forEach((reelId, index) => populateReel(reelId, [...generateReelSymbols(5), ...reelSymbols[index]]));

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
