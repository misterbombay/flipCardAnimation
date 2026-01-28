<script>
  document.querySelectorAll(".icon-wrapper").forEach(icon => {
    icon.addEventListener("click", () => {
      const currentCard = icon.closest(".info-card");

      // Close other cards
      document.querySelectorAll(".info-card").forEach(card => {
        if (card !== currentCard) {
          card.classList.remove("active");
        }
      });

      // Toggle current card
      currentCard.classList.toggle("active");
    });
  });
</script>
