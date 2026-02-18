<script>
  const pillars = document.querySelectorAll('.col');
  const iconContainer = document.querySelector('.icon-bg');
  const icons = document.querySelectorAll('.floating-icon');

  // Animate pillars one by one
  pillars.forEach((pillar, index) => {
    setTimeout(() => {
      pillar.classList.add('show');
    }, index * 400); // delay between pillars
  });

  // Calculate total animation time
  const totalPillarTime = (pillars.length - 1) * 400 + 800;

  setTimeout(() => {
    // Show icon container
    iconContainer.classList.remove('hidden');
    iconContainer.classList.add('active');

    // Start floating animation
    startFloatingIcons();
  }, totalPillarTime);


  // ======================
  // Floating animation code
  // ======================

  function getStartPosition(icon, container) {
    const rect = container.getBoundingClientRect();
    const size = icon.offsetWidth;
    const side = Math.floor(Math.random() * 4);

    switch (side) {
      case 0: return { x: Math.random() * rect.width, y: -size };
      case 1: return { x: rect.width + size, y: Math.random() * rect.height };
      case 2: return { x: Math.random() * rect.width, y: rect.height + size };
      case 3: return { x: -size, y: Math.random() * rect.height };
    }
  }

  function randomPosition(icon, container) {
    const rect = container.getBoundingClientRect();
    const size = icon.offsetWidth;

    return {
      x: Math.random() * (rect.width - size),
      y: Math.random() * (rect.height - size)
    };
  }

  function animateIcon(icon, container) {
    const { x, y } = randomPosition(icon, container);
    const duration = 10000 + Math.random() * 10000;

    icon.style.transition = `transform ${duration}ms linear`;
    icon.style.transform = `translate(${x}px, ${y}px)`;

    setTimeout(() => animateIcon(icon, container), duration);
  }

  function startFloatingIcons() {
    icons.forEach((icon) => {
      const start = getStartPosition(icon, iconContainer);
      const firstTarget = randomPosition(icon, iconContainer);
      const entryDuration = 3000 + Math.random() * 2000;

      icon.style.transition = 'none';
      icon.style.transform = `translate(${start.x}px, ${start.y}px)`;

      icon.getBoundingClientRect();

      icon.style.transition = `transform ${entryDuration}ms ease-out`;
      icon.style.transform = `translate(${firstTarget.x}px, ${firstTarget.y}px)`;

      setTimeout(() => animateIcon(icon, iconContainer), entryDuration);
    });
  }
</script>
