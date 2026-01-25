const cards = document.querySelectorAll(".flip-card");

cards.forEach(card => {
  let timer;

  const activateCard = () => {
    // Close other cards
    cards.forEach(c => {
      if (c !== card) {
        c.classList.remove("active");
        c.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle current card
    const isActive = card.classList.contains("active");

    clearTimeout(timer);

    if (isActive) {
      card.classList.remove("active");
      card.setAttribute("aria-expanded", "false");
      return;
    }

    card.classList.add("active");
    card.setAttribute("aria-expanded", "true");

    // Auto reset after 30s
    timer = setTimeout(() => {
      card.classList.remove("active");
      card.setAttribute("aria-expanded", "false");
    }, 30000);
  };

  card.addEventListener("click", activateCard);

  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateCard();
    }
  });
});
