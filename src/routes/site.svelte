<!-- Site.svelte -->
<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import ErrorPopup from './popup.svelte';
    import Overlay from './overlay.svelte';
    import InteractScreen from './interact.svelte';
  
    const dispatch = createEventDispatcher();
  
    let interBubble: HTMLDivElement | null = null;
    export let music: HTMLAudioElement | null = null;
  
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
  
    let isMuted = false; // State to track if music is muted
  
    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    }
  
    onMount(() => {
      window.addEventListener('mousemove', (evt) => {
        tgX = evt.clientX;
        tgY = evt.clientY;
      });
      move();
    });
  
    // Utility function to split text into characters, handling <br> for subtext
    function splitText(text: string): (string | 'br')[] {
      const result: (string | 'br')[] = [];
      let buffer = '';
  
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '<' && text.slice(i, i + 4) === '<br>') {
          if (buffer) {
            result.push(...buffer.split(''));
            buffer = '';
          }
          result.push('br');
          i += 3; // Skip over 'br>'
        } else {
          buffer += text[i];
        }
      }
  
      if (buffer) {
        result.push(...buffer.split(''));
      }
  
      return result;
    }
  
    // Text content
    const mainText = "Hi, I'm Error";
    const subText = "I'll keep it quick; I'm a backend dev. I love functional simplicity.<br>Enjoy the glowy orbs";
  
    // Function to toggle mute state
    function toggleMute() {
      console.log('Toggle mute');
      isMuted = !isMuted;
      if (music) {
        music.muted = isMuted;
      }
    }
  
    // Reactive statement to observe changes in isMuted
    $: console.log(`isMuted is now: ${isMuted}`);
  </script>
  
  <style>
    @import '/static/site.css';
  </style>
  
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
  />

  <div class="takes-redirector"
  >
    <p
      aria-hidden="true"
  onmousedown={() => window.location.href = "/takes/list"}
    >View my takes</p>
  </div>

  <div class="text-container">

    <div class="main-text">
      {#each splitText(mainText) as char, index}
        <span
          class="char"
          style="animation-delay: {index * 50}ms;"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      {/each}
    </div>
    <div
      class="sub-text"
      aria-label="I'll keep it quick; I'm a backend dev. I love functional simplicity. Enjoy the glowy orbs"
    >
      {#each splitText(subText) as char, index}
        {#if char === 'br'}
          <br />
        {:else if char === ' '}
          <span class="char" style="animation-delay: {(index * 17)}ms;" aria-hidden="true">
            &nbsp;
          </span>
        {:else}
          <span
            class="char"
            style="animation-delay: {(index * 17)}ms;"
            aria-hidden="true"
          >
            {char}
          </span>
        {/if}
      {/each}
    </div>
    <a
      href="https://github.com/Err0r430"
      target="_blank"
      aria-label="GitHub"
      class="github-icon"
    >
      <i class="fab fa-github"></i>
    </a>
  </div>
  
  <div class="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -8"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
    <div class="gradients-container">
      <div class="g1"></div>
      <div class="g2"></div>
      <div class="g3"></div>
      <div class="g4"></div>
      <div class="g5"></div>
      <!-- Bind this to interBubble -->
      <div bind:this={interBubble} class="interactive"></div>
    </div>
  </div>
  
  <!-- Mute Button -->
  <button
    type="button"
    class="mute-button"
    onclick={toggleMute}
    aria-label={isMuted ? "Unmute" : "Mute"}
  >
    {#if isMuted}
      <i class="fas fa-volume-mute"></i>
    {:else}
      <i class="fas fa-volume-up"></i>
    {/if}
  </button>