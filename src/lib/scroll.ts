export function smoothScrollToTarget(
  targetId: string,
  headerOffset: number = 72,
  duration: number = 800
) {
  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`Element with id '${targetId}' not found.`);
    return;
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    const rect = target.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - headerOffset,
      behavior: 'auto', // jump instantly
    });
    return;
  }

  const startY = window.scrollY;
  let startTime: number | null = null;

  // Easing function: easeInOutCubic for a smooth, natural feel
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease = easeInOutCubic(progress);

    // Recalculate target position dynamically to account for layout shifts
    // rect.top is relative to viewport, so we add current scrollY to get absolute document position
    const rect = target.getBoundingClientRect();
    const targetAbsoluteY = window.scrollY + rect.top - headerOffset;
    
    // The distance from the ORIGINAL start to the CURRENT absolute target
    const distanceToTravel = targetAbsoluteY - startY;

    // Calculate next Y based on the original start and updated distance
    const nextY = startY + (distanceToTravel * ease);

    window.scrollTo(0, nextY);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Final adjustment to make sure we are exactly on target
      const finalRect = target.getBoundingClientRect();
      const finalY = window.scrollY + finalRect.top - headerOffset;
      window.scrollTo(0, finalY);
    }
  };

  requestAnimationFrame(animation);
}
