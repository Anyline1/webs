const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels() {
    const reel1 = getRandomSymbol();
    const reel2 = getRandomSymbol();
    const reel3 = getRandomSymbol();
    const reel4 = getRandomSymbol();
    const reel5 = getRandomSymbol();

    document.getElementById("reel1").textContent = reel1;
    document.getElementById("reel2").textContent = reel2;
    document.getElementById("reel3").textContent = reel3;
    document.getElementById("reel4").textContent = reel4;
    document.getElementById("reel4").textContent = reel5;

    checkWin(reel1, reel2, reel3, reel4, reel5);
}

const payoutTable = {
    "🍒🍒🍒🍒🍒": "🎉 Jackpot! Five cherries!",
    "🍋🍋🍋🍋🍋": "🍋 Lemon Madness! Five lemons!",
    "🔔🔔🔔🔔🔔": "🔔 Ring the Bells! Five bells!",
    "⭐⭐⭐⭐⭐": "⭐ Starry Sky! Five stars!",
    "7️⃣7️⃣7️⃣7️⃣7️⃣": "💰 Lucky Sevens! Five 7's!",
    "🍒🍒🍒": "😊 Triple Cherry! Three cherries!",
    "🍋🍋🍋": "🍋 Triple Lemon! Three lemons!",
    "🔔🔔🔔": "🔔 Triple Bell! Three bells!",
    "⭐⭐⭐": "⭐ Triple Star! Three stars!",
    "7️⃣7️⃣7️⃣": "💰 Triple 7's! Good Luck!"
};

function checkWin(r1, r2, r3, r4, r5) {
    const message = document.getElementById("message");

    const combination = r1 + r2 + r3 + r4 + r5;

    if (payoutTable[combination]) {
        message.textContent = payoutTable[combination];
        return;
    }

    const reels = [r1, r2, r3, r4, r5];
    const symbolCounts = {};

    reels.forEach((symbol) => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });

    for (const [key, value] of Object.entries(payoutTable)) {
        const uniqueSymbols = [...new Set(key.split(""))];
        if (uniqueSymbols.length === 1 && symbolCounts[uniqueSymbols[0]] >= 3) {
            message.textContent = `😊 Partial Win! ${value}`;
            return;
        }
    }

    message.textContent = "😞 Try again!";
}


document.getElementById("spinButton").addEventListener("click", spinReels);
