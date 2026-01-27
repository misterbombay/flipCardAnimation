<script>
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".stat-card");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 200; // lower = faster
    let count = 0;

    const update = () => {
      const increment = target / speed;
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;

          card.classList.add("show");

          // animate counter inside this card
          const counter = card.querySelector(".counter");
          if (!counter.classList.contains("counted")) {
            counter.classList.add("counted");
            animateCounter(counter);
          }

          observer.unobserve(card);
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  cards.forEach((card, index) => {
    // stagger effect
    card.style.transitionDelay = `${index * 150}ms`;
    observer.observe(card);
  });
});
</script>
