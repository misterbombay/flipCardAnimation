<script>
  const cards = document.querySelectorAll(".counter-card");

  const runCounter = (el, target) => {
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
      current += 1;
      el.textContent = current;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const card = entry.target;

          setTimeout(() => {
            card.classList.add("is-visible");

            const counter = card.querySelector(".counter-number");
            const valueEl = card.querySelector(".value");
            const target = parseInt(counter.dataset.value, 10);

            if (!counter.dataset.animated) {
              runCounter(valueEl, target);
              counter.dataset.animated = "true";
            }
          }, index * 150); // stagger

          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach(card => observer.observe(card));
</script>
