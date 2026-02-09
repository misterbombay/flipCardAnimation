<script>
  const icons = document.querySelectorAll('.floating-icon');
  const container = document.querySelector('.icon-bg');

  // Get random start position OUTSIDE container
  function getStartPosition(icon, container) {
    const rect = container.getBoundingClientRect();
    const size = icon.offsetWidth;
    const side = Math.floor(Math.random() * 4);

    switch (side) {
      case 0: return { x: Math.random() * rect.width, y: -size };                 // top
      case 1: return { x: rect.width + size, y: Math.random() * rect.height };    // right
      case 2: return { x: Math.random() * rect.width, y: rect.height + size };    // bottom
      case 3: return { x: -size, y: Math.random() * rect.height };                // left
    }
  }

  // Get random position INSIDE container
  function randomPosition(icon, container) {
    const rect = container.getBoundingClientRect();
    const size = icon.offsetWidth;

    return {
      x: Math.random() * (rect.width - size),
      y: Math.random() * (rect.height - size)
    };
  }

  // Infinite smooth movement
  function animateIcon(icon, container) {
    const { x, y } = randomPosition(icon, container);
    const duration = 10000 + Math.random() * 10000; // 10–20 sec

    icon.style.transition = `transform ${duration}ms linear`;
    icon.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => animateIcon(icon, container), duration);
  }

  // Init
  icons.forEach((icon) => {
    const start = getStartPosition(icon, container);
    const firstTarget = randomPosition(icon, container);
    const entryDuration = 3000 + Math.random() * 2000; // 3–5 sec

    // Start outside
    icon.style.transition = 'none';
    icon.style.transform = `translate(${start.x}px, ${start.y}px)`;

    // Force reflow
    icon.getBoundingClientRect();

    // Animate into view
    icon.style.transition = `transform ${entryDuration}ms ease-out`;
    icon.style.transform = `translate(${firstTarget.x}px, ${firstTarget.y}px)`;

    // Continue drifting
    setTimeout(() => animateIcon(icon, container), entryDuration);
  });
</script>
