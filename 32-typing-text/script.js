const typedText = document.getElementById("typed-text");
const phrases = [
  "Привіт, я Артем!",
  "Я фронтенд розробник",
  "Я люблю HTML & CSS",
  "Анімації — це круто!",
];
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetween = 1500;

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, letterIndex--);
  } else {
    typedText.textContent = currentPhrase.substring(0, letterIndex++);
  }

  if (!isDeleting && letterIndex === currentPhrase.length + 1) {
    isDeleting = true;
    setTimeout(typeLoop, delayBetween);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeLoop, 500);
  } else {
    setTimeout(typeLoop, isDeleting ? erasingSpeed : typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", typeLoop);
