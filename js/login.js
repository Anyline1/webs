document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeButton = document.querySelector('.modal-content .close');

    loginButton.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
        loginModal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });
});
