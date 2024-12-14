const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateReelSymbols() {
    return [...Array(3)].map(() => getRandomSymbol());
}

function updateReel(reelId, resultSymbols) {
    const reel = document.getElementById(reelId).querySelector('.symbols');
    reel.innerHTML = '';

    const rows = [
        getRandomSymbol(),
        ...resultSymbols,
        getRandomSymbol()
    ];

    rows.forEach(symbol => {
        const div = document.createElement('div');
        div.className = 'symbol';
        div.textContent = symbol;
        reel.appendChild(div);
    });
}

function spinReels(results) {
    const reelIds = ['reel1', 'reel2', 'reel3', 'reel4', 'reel5'];

    reelIds.forEach((reelId, index) => {
        const reel = document.getElementById(reelId).querySelector('.symbols');
        reel.style.transform = 'translateY(0)';

        setTimeout(() => {
            updateReel(reelId, [results[index]]);
            reel.style.transform = 'translateY(-120px)';
        }, index * 200);
    });
}

function checkWin(results) {
    const message = document.getElementById('message');

    if (results.every(r => r === results[0])) {
        message.textContent = `🎉 Jackpot! ${results[0]} x5!`;
    } else {
        message.textContent = "😞 Try again!";
    }
}

document.getElementById('spinButton').addEventListener('click', () => {
    const results = [...Array(5)].map(() => getRandomSymbol());
    spinReels(results);

    setTimeout(() => {
        checkWin(results);
    }, 1200); 
});
