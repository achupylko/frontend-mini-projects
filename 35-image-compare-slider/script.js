const slider = document.querySelector(".slider");
const beforeImg = document.querySelector(".img--before");
const handle = document.querySelector(".handle");

function updateClip(value) {
  // value: 0..100 (%)
  // Обрізаємо верхнє зображення від правого краю
  const visible = `${value}%`;
  beforeImg.style.clipPath = `inset(0 calc(100% - ${visible}) 0 0)`;
  handle.style.setProperty("--x", `calc(${visible} - 0.5px)`); // вирівнювання лінії
}

slider.addEventListener("input", (e) => {
  updateClip(e.target.value);
});

// Стартове вирівнювання (на випадок, якщо HTML value змінюють)
updateClip(slider.value);
