const params = new URLSearchParams(window.location.search);
const username = params.get('username');
document.getElementById('user').textContent = username || 'Гость';

const blogPosts = [
    {
        title: "Lorem Ipsum Dolor",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula metus nec quam vehicula, a faucibus nisl sagittis.",
        date: "2024-11-24"
    },
    {
        title: "Vestibulum Euismod",
        content: "Vestibulum euismod eros euismod, fermentum massa sed, suscipit ligula. Nam sit amet dolor et libero auctor faucibus.",
        date: "2024-11-23"
    },
    {
        title: "Curabitur Malesuada",
        content: "Curabitur malesuada tellus sit amet ex scelerisque, a tincidunt mauris sollicitudin. Proin a enim eu eros gravida vulputate.",
        date: "2024-11-22"
    },
    {
        title: "Pellentesque Habitant",
        content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi.",
        date: "2024-11-21"
    }
];

const postsContainer = document.getElementById('posts');

function renderPosts() {
    postsContainer.innerHTML = '';
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <time>${post.date}</time>
            <p>${post.content}</p>
        `;

        postsContainer.appendChild(postElement);
    });
}

renderPosts();

const form = document.getElementById('new-post-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;

    if (title && content && date) {
        blogPosts.unshift({ title, content, date });
        renderPosts();

        form.reset();
    }
});
