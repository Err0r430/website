<script>
    import { onMount, onDestroy } from 'svelte'
    import { fade } from 'svelte/transition'
  
    /**
     * @type {string}
     */
    let previousOverflow
  
    onMount(() => {
      // Disable scroll on mount
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    })
  
    onDestroy(() => {
      // Restore scroll on teardown
      document.body.style.overflow = previousOverflow
    })
  </script>
  
  <section class="overlay" in:fade={{ duration: 300 }}>
    <!-- Overlay content goes here -->
  </section>
  
  <style>
    .overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.61);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>