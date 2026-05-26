// Simple animation / enhancement

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Loaded 🚀");

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "0.6s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, index * 150);
  });
});