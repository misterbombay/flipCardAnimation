<script>
  const buttons = document.querySelectorAll(".open-accordion");
  const wrapper = document.getElementById("accordionWrapper");
  const allAccordions = document.querySelectorAll(".accordion-content");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      // Show main wrapper if hidden
      const bsCollapse = new bootstrap.Collapse(wrapper, {
        toggle: false
      });
      bsCollapse.show();

      // Hide all accordion items
      allAccordions.forEach(acc => acc.classList.add("d-none"));

      // Show selected accordion item
      document.getElementById(targetId).classList.remove("d-none");

      // Smooth scroll to accordion
      wrapper.scrollIntoView({ behavior: "smooth" });
    });
  });
</script>
