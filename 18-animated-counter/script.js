// Додаємо анімацію появи через клас .visible і сам підрахунок
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 1400;
  const start = 0;
  const stepTime = 16;
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    counter.textContent = Math.floor(progress * (target - start) + start);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

// Коли секція входить в зону видимості (IntersectionObserver)
function handleScroll() {
  const section = document.querySelector('.counter-section');
  const rect = section.getBoundingClientRect();
  if (!hasAnimated && rect.top < window.innerHeight - 50) {
    hasAnimated = true;
    counters.forEach(counter => {
      counter.classList.add('visible'); // плавне з'явлення
      animateCounter(counter);
    });
  }
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
