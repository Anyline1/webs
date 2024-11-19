const toggleButton = document.querySelector('.theme-toggle');
const themeLink = document.getElementById('theme-style');

toggleButton.addEventListener('click', () => {
    console.log('Button clicked!');
    if (themeLink.getAttribute('href') === 'css/style.css') {
        themeLink.setAttribute('href', 'css/night.css');
        console.log('Switched to night.css');
    } else {
        themeLink.setAttribute('href', 'css/style.css');
        console.log('Switched to style.css');
    }
});
