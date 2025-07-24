const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('overlay');
const sideMenu = document.getElementById('side-menu');

// Функція відкриття/закриття меню
function toggleMenu() {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    sideMenu.classList.toggle('active');
}

// Відкриття/закриття по кліку на іконку
hamburger.addEventListener('click', toggleMenu);
// Закриття по overlay
overlay.addEventListener('click', toggleMenu);
