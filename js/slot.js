const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];
const spinDuration = 300;
const reels = ['reel1', 'reel2', 'reel3', 'reel4', 'reel5'];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateReelSymbols() {
    return [...Array(30)].map(() => getRandomSymbol()); 
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

function spinReel(reelId, targetSymbol, stopIndex, delay) {
    const reel = document.getElementById(reelId).querySelector('.symbols');
    const symbolHeight = 60;
    const totalSymbols = 30;

    const stopPosition = -(symbolHeight * (stopIndex + 1));

    return new Promise(resolve => {
        setTimeout(() => {
            let startTime = performance.now();

            function animate(now) {
                const elapsedTime = now - startTime;

                const progress = Math.min(elapsedTime / spinDuration, 1);
                const easeOut = Math.pow(progress - 1, 3) + 1;
                const currentPosition = easeOut * stopPosition;

                reel.style.transform = `translateY(${currentPosition}px)`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            }

            requestAnimationFrame(animate);
        }, delay);
    });
}

function checkWin(results) {
    const message = document.getElementById('message');

    if (results.every(symbol => symbol === results[0])) {
        message.textContent = `🎉 Jackpot! ${results[0]} x5!`;
    } else {
        message.textContent = "😞 Try again!";
    }
}

async function spinReels() {
    const message = document.getElementById('message');
    message.textContent = "🎰 Spinning...";

    const reelSymbols = reels.map(() => generateReelSymbols());
    const results = [...Array(5)].map(() => getRandomSymbol());

    reels.forEach((reelId, index) => populateReel(reelId, reelSymbols[index]));

    const stopIndices = results.map(symbol => reelSymbols[0].indexOf(symbol));

    for (let i = 0; i < reels.length; i++) {
        await spinReel(reels[i], results[i], stopIndices[i], i * 10);
    }

    checkWin(results);
}

document.getElementById('spinButton').addEventListener('click', () => {
    spinReels();
});
