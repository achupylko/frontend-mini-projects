const toast = document.getElementById("toast");
const showToastBtn = document.getElementById("showToastBtn");

showToastBtn.addEventListener("click", () => {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // повідомлення зникає через 3 секунди
});
