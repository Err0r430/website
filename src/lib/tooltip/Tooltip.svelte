<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tooltip } from './tooltipStore';
	import { browser } from '$app/environment';
	let tooltipEl: HTMLElement;
	let visible: boolean, text: string;
	const unsubscribe = tooltip.subscribe(state => {
		visible = state.visible;
		text = state.text;
	});
	onMount(() => {
		tooltip.setTooltipEl(tooltipEl);
		if (browser) window.addEventListener('mousemove', tooltip.handleMouseMove);
	});
	onDestroy(() => {
		if (browser) window.removeEventListener('mousemove', tooltip.handleMouseMove);
		unsubscribe();
	});
</script>

<style>
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
		background: rgba(50, 50, 50, 0.75);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		border: 0.5px solid rgba(255, 255, 255, 0.15);
		opacity: 0;
	}
	
	.tooltip.visible {
		opacity: 1;
	}
	
	@media (prefers-color-scheme: dark) {
		.tooltip {
			background: rgba(70, 70, 70, 0.75);
		}
	}
</style>

<div
	class="tooltip {visible ? 'visible' : ''}"
	bind:this={tooltipEl}
	style="left: {tooltip.tooltipX.current}px; top: {tooltip.tooltipY.current}px;">
	{text}
</div>