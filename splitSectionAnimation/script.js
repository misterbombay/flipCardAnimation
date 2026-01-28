<script>
  const sections = document.querySelectorAll(".split-section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  sections.forEach(section => observer.observe(section));
</script>
