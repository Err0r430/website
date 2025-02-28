<!-- src/lib/TooltipFollower.svelte -->
<script lang="ts">
    import { onMount, onDestroy, afterUpdate } from 'svelte';
    import { spring } from 'svelte/motion';
  
    // Props
    export let text: string;
    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right';
    export let yPadding: number = 10;
    
    // State
    let container: HTMLElement;
    let tooltip: HTMLElement;
    let isHovering = false;
    let isVisible = false;
    let opacity = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    // Use spring for smoother motion
    const coords = spring(
      { x: 0, y: 0 }, 
      {
        stiffness: 0.15,
        damping: 0.7
      }
    );
  
    // Global mouse tracker
    function trackMouse(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // If visible, update the tooltip position
      if (isVisible) {
        updatePosition();
      }
      
      // Check if mouse is over the container
      if (container) {
        const rect = container.getBoundingClientRect();
        isHovering = (
          mouseX >= rect.left && 
          mouseX <= rect.right && 
          mouseY >= rect.top && 
          mouseY <= rect.bottom
        );
        
        // Start fade in/out based on hover state
        if (isHovering && !isVisible) {
          showTooltip();
        } else if (!isHovering && isVisible) {
          hideTooltip();
        }
      }
    }
    
    // Calculate tooltip position relative to cursor
    function updatePosition() {
      if (!tooltip) return;
      
      const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      
      let x: number;
      let y: number;
      
      switch (position) {
        case 'top-left':
          x = mouseX - width - 15;
          y = mouseY - height - yPadding;
          break;
        case 'top-right':
          x = mouseX + 15;
          y = mouseY - height - yPadding;
          break;
        case 'bottom-left':
          x = mouseX - width - 15;
          y = mouseY + yPadding;
          break;
        case 'bottom-right':
        default:
          x = mouseX + 15;
          y = mouseY + yPadding;
          break;
      }
      
      coords.set({ x, y });
    }
    
    // Show tooltip with fade-in
    function showTooltip() {
      isVisible = true;
      fadeIn();
    }
    
    // Hide tooltip with fade-out
    function hideTooltip() {
      fadeOut();
    }
    
    // Animation frames for fade in/out
    let animationFrame: number | null = null;
    
    function fadeIn() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      const step = () => {
        opacity = Math.min(opacity + 0.04, 1);
        if (opacity < 1) {
          animationFrame = requestAnimationFrame(step);
        } else {
          animationFrame = null;
        }
      };
      
      animationFrame = requestAnimationFrame(step);
    }
    
    function fadeOut() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      const step = () => {
        opacity = Math.max(opacity - 0.04, 0);
        if (opacity > 0) {
          animationFrame = requestAnimationFrame(step);
        } else {
          isVisible = false;
          animationFrame = null;
        }
      };
      
      animationFrame = requestAnimationFrame(step);
    }
    
    // Set up event listeners
    onMount(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', trackMouse);
      }
    });
    
    // Clean up
    onDestroy(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', trackMouse);
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    });
    
    // When tooltip becomes visible, update its position immediately
    afterUpdate(() => {
      if (isVisible && tooltip) {
        updatePosition();
      }
    });
  </script>
  
  <div bind:this={container} class="tooltip-container">
    <slot />
    
    {#if isVisible}
      <div 
        bind:this={tooltip} 
        class="tooltip"
        style="
          transform: translate3d({$coords.x}px, {$coords.y}px, 0);
          opacity: {opacity};
        "
      >
        {text}
      </div>
    {/if}
  </div>
  
  <style>
    .tooltip-container {
      display: inline-block;
      position: relative;
    }
    
    .tooltip {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      padding: 8px 12px;
      max-width: 300px;
      border-radius: 8px;
      font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 500;
      font-size: 13px;
      line-height: 1.4;
      color: rgba(255, 255, 255, 0.95);
      pointer-events: none;
      will-change: transform, opacity;
      transition: opacity 0.3s ease;
      /* macOS-style frosted glass effect */
      background: rgba(50, 50, 50, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border: 0.5px solid rgba(255, 255, 255, 0.15);
    }
    
    /* Apply dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .tooltip {
        background: rgba(70, 70, 70, 0.75);
      }
    }
  </style>