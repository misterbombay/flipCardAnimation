<script>
  const icons = document.querySelectorAll('.floating-icon');
  const container = document.querySelector('.icon-bg');

  function randomPosition(icon) {
    const containerRect = container.getBoundingClientRect();
    const iconSize = icon.offsetWidth;

    const x = Math.random() * (containerRect.width - iconSize);
    const y = Math.random() * (containerRect.height - iconSize);

    return { x, y };
  }

  function animateIcon(icon) {
    const { x, y } = randomPosition(icon);
    const duration = 10000 + Math.random() * 10000; // 10s–20s

    icon.style.transitionDuration = `${duration}ms`;
    icon.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => animateIcon(icon), duration);
  }

  icons.forEach(icon => {
    // Start at random position
    const { x, y } = randomPosition(icon);
    icon.style.transform = `translate(${x}px, ${y}px)`;

    // Delay each icon slightly
    setTimeout(() => animateIcon(icon), Math.random() * 2000);
  });
</script>
