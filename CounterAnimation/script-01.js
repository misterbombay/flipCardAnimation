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

    let startTime = null;

    // 🔹 SAME duration for all counters
    const duration = 1500; // ms (tweak if needed)

    function update(timestamp) {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;

      counter.innerText = formatValue(currentValue, type, decimals);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // ensure exact final value
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
    // stagger card appearance
    card.style.transitionDelay = `${index * 150}ms`;
    observer.observe(card);
  });
});
