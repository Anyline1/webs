document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeButton = document.querySelector('.modal-content .close');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const userDisplay = document.getElementById('user');

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        loginModal.style.display = 'none';
        errorMessage.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            errorMessage.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === 'q' && password === 'q') {
            localStorage.setItem('username', username);

            window.location.href = 'html/welcome.html';
        } else if (username === 'q' && password === 'q') {
            localStorage.setItem('username', username);

            window.location.href = 'html/casino.html';
        } else {
            errorMessage.style.display = 'block';
        }
    });
});
