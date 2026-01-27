document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".stat-card");

  function formatValue(value, type, decimals) {
    if (type === "percent") {
      return `${value.toFixed(decimals)}%`;
    }
    return Math.round(value).toLocaleString("en-IN");
  }

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const type = counter.dataset.type || "number";
    const decimals = Number(counter.dataset.decimals || 0);

    let start = 0;
    let current = 0;

    // duration depends on number size → smaller ends faster
    const duration =
      target < 100 ? 800 :
      target < 1000 ? 1000 :
      target < 100000 ? 1400 :
      1800;

    function update(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = target * eased;

      counter.innerText = formatValue(current, type, decimals);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // ensure final value is exact
        counter.innerText = formatValue(target, type, decimals);
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add("show");

          const counter = card.querySelector(".counter");
          if (counter && !counter.classList.contains("counted")) {
            counter.classList.add("counted");
            animateCounter(counter);
          }

          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.4 }
  );

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`; // stagger
    observer.observe(card);
  });
});
