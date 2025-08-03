const cartBtn = document.getElementById("cartBtn");

cartBtn.addEventListener("click", () => {
  cartBtn.classList.add("clicked");
  cartBtn.querySelector(".icon").textContent = "✅";
  cartBtn.querySelector(".label").textContent = "Додано!";

  setTimeout(() => {
    cartBtn.classList.remove("clicked");
    cartBtn.querySelector(".icon").textContent = "🛒";
    cartBtn.querySelector(".label").textContent = "Додати в кошик";
  }, 3000); // Повертає назад через 3 секунди
});
