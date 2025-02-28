<!-- Example usage in a route file (e.g., src/routes/+page.svelte) -->
<script lang="ts">
  import TooltipFollower from '$lib/TooltipFollower.svelte';
  import GPTTooltip from '$lib/Tooltip.svelte';
  import { tooltip, TooltipPosition } from '$lib/tooltip/tooltipStore';
  import Tooltip from '$lib/tooltip/Tooltip.svelte';
  
  // Optional: import the position constants if you created the types file
  // import { TOOLTIP_POSITIONS } from '$lib/tooltip-types';
</script>

<Tooltip />

<div class="container">
  
  <h1>Claude Tooltip Examples</h1>
  
  <div class="examples">
    <TooltipFollower text="This is a fancy button!" position="top-right" yPadding={15}>
      <button class="my-button">Hover me</button>
    </TooltipFollower>
    
    <TooltipFollower text="Click to save your changes" position="bottom-left">
      <div class="save-icon">💾</div>
    </TooltipFollower>
    
    <TooltipFollower text="Adjust volume settings">
      <span class="settings-link">Volume settings</span>
    </TooltipFollower>

    <h1>GPT's tooltips</h1>
    <GPTTooltip text="Top right!!!" position="top-right" paddingY={10}>
      <button>Hover me!</button>
    </GPTTooltip>
    <GPTTooltip text="Top left" position="top-left" paddingY={0}>
      <button>Hover me PLEASE!</button>
    </GPTTooltip>
    <GPTTooltip text="Bottom left" position="bottom-left" paddingY={0}>
      <button>Hover me PLEASE!</button>
    </GPTTooltip>

    <h1>My tooltips 😎</h1>
    
    <div aria-hidden="true" on:mouseenter={() => tooltip.show("This is my thing", { position: TooltipPosition.TopRight, offset: 15 })}
        on:mouseleave={tooltip.hide}
        class="cleaned"
        >
      Normal text
    </div>

    <div aria-hidden="true" on:mouseenter={() => tooltip.show("I program for a living", { position: TooltipPosition.BottomLeft, offset: 15 })}
      on:mouseleave={tooltip.hide}
      class="cleaned clicky"
      >
    Clicky text
  </div>
  <button
    aria-hidden="true" on:mouseenter={() => tooltip.show("It better be fucking good", { position: TooltipPosition.TopLeft, offset: 20 })}
    on:mouseleave={tooltip.hide}
    class="my-button"
    >
    Tactile button
  </button>

  </div>
</div>

<style>
  .cleaned {
    color: white;
    font-family: "SF Pro Regular", sans-serif;
    font-size: 1.2rem;
    letter-spacing: 2px;
  }

  .clicky {
    cursor: pointer;
  }

  h1 {
    font-family: 'SF Pro Bold', sans-serif;
    color: #eff0e8;
    letter-spacing: 3px;
    font-size: 4rem;
  }
  .container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* Use grid layout to allow a maximum of 5 elements per row */
  .examples {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    margin-top: 2rem;
  }
  
  /* Make header span all columns */
  .examples > h1 {
    grid-column: span 5;
  }
  
  .my-button {
    padding: 8px 16px;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .save-icon {
    font-size: 24px;
    cursor: pointer;
  }
  
  .settings-link {
    color: #007aff;
    text-decoration: underline;
    cursor: pointer;
  }
</style>