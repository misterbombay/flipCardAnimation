<script>
  const counterCardElements = document.querySelectorAll(".counter-card");

  const startCountAnimation = (valueElement, targetValue) => {
    let currentValue = 0;
    const animationDuration = 1500;
    const stepInterval = Math.max(Math.floor(animationDuration / targetValue), 20);

    const counterTimer = setInterval(() => {
      currentValue += 1;
      valueElement.textContent = currentValue;
      if (currentValue >= targetValue) {
        valueElement.textContent = targetValue;
        clearInterval(counterTimer);
      }
    }, stepInterval);
  };

  const counterSectionObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          const currentCard = entry.target;

          setTimeout(() => {
            currentCard.classList.add("is-visible");

            const counterWrapper = currentCard.querySelector(".counter-number");
            const numberValueEl = currentCard.querySelector(".value");
            const finalValue = parseInt(counterWrapper.dataset.value, 10);

            if (!counterWrapper.dataset.counted) {
              startCountAnimation(numberValueEl, finalValue);
              counterWrapper.dataset.counted = "true";
            }
          }, idx * 150); // stagger reveal

          obs.unobserve(currentCard); // run once
        }
      });
    },
    { threshold: 0.3 }
  );

  counterCardElements.forEach(card =>
    counterSectionObserver.observe(card)
  );
</script>
