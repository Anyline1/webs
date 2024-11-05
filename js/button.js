// Получаем кнопку и проверяем, какая тема сохранена в localStorage
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleButton.textContent = 'Светлая тема';
} else {
    themeToggleButton.textContent = 'Темная тема';
}

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = 'Светлая тема';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggleButton.textContent = 'Темная тема';
        localStorage.setItem('theme', 'light');
    }
});
