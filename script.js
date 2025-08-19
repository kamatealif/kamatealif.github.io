// Mouse Follower with Lagging Inner Circle (single implementation)
  const mouseFollower = document.getElementById('mouseFollower');
  const innerFollower = document.getElementById('innerFollower');
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let followerX = mouseX, followerY = mouseY;
  let innerX = mouseX, innerY = mouseY;


  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseFollower.classList.add('visible');
  });

  // Add hover effect for interactive elements
  const hoverSelectors = ['a', 'button', '.card', '.contact-item'];
  hoverSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        mouseFollower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        mouseFollower.classList.remove('hovering');
      });
    });
  });


    // Simple follower: both rings and dot move together, no animation
    // Add delay to the inner ring and more delay to the dot
    let ringX = mouseX, ringY = mouseY;
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.25;
      followerY += (mouseY - followerY) * 0.25;
      mouseFollower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;

      // Inner ring (pseudo-element) follows with a slight delay
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      mouseFollower.style.setProperty('--inner-ring-x', `${ringX - followerX}px`);
      mouseFollower.style.setProperty('--inner-ring-y', `${ringY - followerY}px`);

      // Dot follows with more delay
      innerX += (mouseX - innerX) * 0.08;
      innerY += (mouseY - innerY) * 0.08;
      innerFollower.style.transform = `translate(${innerX - followerX}px, ${innerY - followerY}px)`;

      requestAnimationFrame(animateFollower);
    }
    animateFollower();

  document.addEventListener('mouseleave', () => {
    mouseFollower.classList.remove('visible');
  });