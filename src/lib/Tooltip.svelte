<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let text: string;
  export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';
  export let paddingY: number = 0;
  export let delay: number = 200;

  let containerEl: HTMLElement;
  let tooltipEl: HTMLDivElement;

  let showTimeout: ReturnType<typeof setTimeout>;
  let animationFrameId: number | null = null;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const offset = 12;

  function createTooltipElement() {
    tooltipEl = document.createElement('div');
    tooltipEl.textContent = text;
    Object.assign(tooltipEl.style, {
      position: 'fixed',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.2s',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      padding: '8px 12px',
      color: '#f8f8f8',
      fontFamily: '"SF Pro Medium", sans-serif',
      fontSize: '14px',
      zIndex: '1000',
      willChange: 'transform, opacity'
    });
    document.body.appendChild(tooltipEl);
  }

  function computeTargetPosition(e: MouseEvent) {
    const { width, height } = tooltipEl.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;
    switch (position) {
      case 'top-left':
        x = e.clientX - width - offset;
        y = e.clientY - height - offset + paddingY;
        break;
      case 'top-right':
        x = e.clientX + offset;
        y = e.clientY - height - offset + paddingY;
        break;
      case 'bottom-left':
        x = e.clientX - width - offset;
        y = e.clientY + offset + paddingY;
        break;
      case 'bottom-right':
        x = e.clientX + offset;
        y = e.clientY + offset + paddingY;
        break;
    }
    targetX = x;
    targetY = y;
  }

  function animate() {
    const ease = 0.2;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    tooltipEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    if (Math.abs(currentX - targetX) > 0.5 || Math.abs(currentY - targetY) > 0.5) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      currentX = targetX;
      currentY = targetY;
      animationFrameId = null;
    }
  }

  function handleMouseEnter(e: MouseEvent) {
    computeTargetPosition(e);
    currentX = targetX;
    currentY = targetY;
    showTimeout = setTimeout(() => {
      tooltipEl.style.opacity = '1';
      if (!animationFrameId) animationFrameId = requestAnimationFrame(animate);
    }, delay);
  }

  function handleMouseMove(e: MouseEvent) {
    computeTargetPosition(e);
  }

  function handleMouseLeave() {
    clearTimeout(showTimeout);
    tooltipEl.style.opacity = '0';
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  onMount(() => {
    // Ensure we're in a browser environment.
    if (typeof window !== 'undefined') {
      createTooltipElement();
      containerEl.addEventListener('mouseenter', handleMouseEnter);
      containerEl.addEventListener('mousemove', handleMouseMove);
      containerEl.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  onDestroy(() => {
    clearTimeout(showTimeout);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (containerEl) {
      containerEl.removeEventListener('mouseenter', handleMouseEnter);
      containerEl.removeEventListener('mousemove', handleMouseMove);
      containerEl.removeEventListener('mouseleave', handleMouseLeave);
    }
    if (tooltipEl && tooltipEl.parentNode) tooltipEl.remove();
  });

  // Update tooltip text if the prop changes.
  $: if (tooltipEl) tooltipEl.textContent = text;
</script>

<div bind:this={containerEl}>
  <slot></slot>
</div>