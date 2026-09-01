/**
 * Smoothly scrolls to a target element using a SmoothDamp (spring physics) algorithm.
 * This perfectly handles layout shifts mid-scroll and feels completely native.
 * 
 * @param targetId The ID of the target element.
 * @param headerOffset Offset to leave space for a sticky header (default: 72).
 */
export function smoothScrollToTarget(
  targetId: string,
  headerOffset: number = 72
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

  // SmoothDamp physics variables
  let currentY = window.scrollY;
  let velocity = 0;
  let lastTime: number | null = null;
  
  // Tuning parameter: approx time to reach the target (in seconds).
  const smoothTime = 0.5; 

  // CRITICAL FIX: Cache the target position to avoid Layout Thrashing.
  // Calling getBoundingClientRect() on every frame forces the browser to recalculate layout 60 times a second, causing massive lag.
  let targetAbsoluteY = window.scrollY + target.getBoundingClientRect().top - headerOffset;

  const updateTarget = () => {
    targetAbsoluteY = window.scrollY + target.getBoundingClientRect().top - headerOffset;
  };

  // Listen for layout shifts (e.g. lazy loaded images) dynamically but asynchronously
  const observer = new ResizeObserver(updateTarget);
  observer.observe(document.body);

  let isCanceled = false;
  const cleanup = () => {
    isCanceled = true;
    window.removeEventListener('wheel', cancelScroll);
    window.removeEventListener('touchstart', cancelScroll);
    observer.disconnect();
  };

  // Update original cancel to use cleanup
  const cancelScroll = cleanup;

  window.addEventListener('wheel', cancelScroll, { passive: true, once: true });
  window.addEventListener('touchstart', cancelScroll, { passive: true, once: true });

  let lastRecalcTime: number | null = null;

  const animation = (currentTime: number) => {
    if (isCanceled) return;

    // Fix for the initial jump/flicker: 
    // Don't calculate deltaTime based on performance.now() from when the button was clicked.
    // Wait for the FIRST actual animation frame to start the timer.
    if (lastTime === null || lastRecalcTime === null) {
      lastTime = currentTime;
      lastRecalcTime = currentTime;
      requestAnimationFrame(animation);
      return;
    }

    // Safety fallback: recalculate target every 250ms just in case ResizeObserver missed a shift
    if (currentTime - lastRecalcTime > 250) {
      updateTarget();
      lastRecalcTime = currentTime;
    }

    let deltaTime = (currentTime - lastTime) / 1000;
    if (deltaTime > 0.05) deltaTime = 0.05; 
    lastTime = currentTime;

    const omega = 2 / smoothTime;
    const x = omega * deltaTime;
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    
    const change = currentY - targetAbsoluteY;
    const temp = (velocity + omega * change) * deltaTime;
    
    velocity = (velocity - omega * temp) * exp;
    currentY = targetAbsoluteY + (change + temp) * exp;

    window.scrollTo(0, currentY);

    if (Math.abs(targetAbsoluteY - currentY) < 0.5 && Math.abs(velocity) < 10) {
      window.scrollTo(0, Math.round(targetAbsoluteY));
      cleanup();
      return;
    }

    requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
}

export function setupAnchorInterceptor() {
  // 1. Check if there's a hash on initial load and scroll to it smoothly
  if (typeof window !== 'undefined' && window.location.hash) {
    const targetId = window.location.hash.substring(1);
    // Give the page a tiny bit of time to render the DOM elements
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        smoothScrollToTarget(targetId);
      }
    }, 100);
  }

  // 2. Intercept clicks on anchor links
  const handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Check if it targets an anchor on the current page
    const pathname = window.location.pathname;
    let targetId = '';
    
    if (href.startsWith('#')) {
      targetId = href.substring(1);
    } else if (href.startsWith(pathname + '#')) {
      targetId = href.substring(pathname.length + 1);
    } else if (pathname === '/' && href.startsWith('/#')) {
      targetId = href.substring(2);
    }

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        window.history.pushState(null, '', '#' + targetId);
        smoothScrollToTarget(targetId);
      }
    }
  };

  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}
