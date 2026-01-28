<script>
  const section = document.querySelector(".split-section");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("is-visible");
        observer.disconnect(); // 🔒 lock final state
      }
    },
    {
      threshold: 0.3, // triggers when 30% visible
    }
  );

  observer.observe(section);
</script>
