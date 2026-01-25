const flipCard = document.getElementById("flipCard");
  let resetTimer;

  flipCard.addEventListener("click", () => {
    // Prevent re-trigger
    if (flipCard.classList.contains("active")) return;

    flipCard.classList.add("active");

    // Auto reset after 30 seconds
    resetTimer = setTimeout(() => {
      flipCard.classList.remove("active");
    }, 3000);
  });
