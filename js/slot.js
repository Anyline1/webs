const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels() {
    const reel1 = getRandomSymbol();
    const reel2 = getRandomSymbol();
    const reel3 = getRandomSymbol();

    document.getElementById("reel1").textContent = reel1;
    document.getElementById("reel2").textContent = reel2;
    document.getElementById("reel3").textContent = reel3;

    checkWin(reel1, reel2, reel3);
}

function checkWin(r1, r2, r3) {
    const message = document.getElementById("message");

    if (r1 === r2 && r2 === r3) {
        message.textContent = `🎉 Jackpot! You got ${r1} ${r2} ${r3}!`;
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        message.textContent = `😊 Nice! Two matching symbols: ${r1}, ${r2}, ${r3}.`;
    } else {
        message.textContent = "😞 Try again!";
    }
}

document.getElementById("spinButton").addEventListener("click", spinReels);
