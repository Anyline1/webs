
const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("night");
    themeToggleButton.classList.toggle("night");

    if (document.body.classList.contains("night")) {
        themeToggleButton.style.backgroundColor = "#1e1e1e";
    } else {
        themeToggleButton.style.backgroundColor = "#FFD700";
    }
});
