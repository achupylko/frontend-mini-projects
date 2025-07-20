// Відкриття та закриття модалки
const openBtn = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const backdrop = document.getElementById('modal-backdrop');

openBtn.addEventListener('click', () => {
    document.body.classList.add('modal-open');
});

closeBtn.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
});

// Закриття по кліку на backdrop
backdrop.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
});
