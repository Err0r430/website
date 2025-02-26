<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { takes, ETakes, TooltipPosition } from './takeData';
	import '$css/takes.css';
	import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

	let { data } = $props();
	const slug = data.slug;
	const sanitizedSlug = slug && slug.length > 20 ? 'unknown' : slug;
	let takeData = takes[sanitizedSlug as ETakes] || takes[ETakes.unknown];

	let tooltipVisible = $state(false);
	let tooltipText = $state("Default tooltip text woah!"); 
	const tooltipX = new Tween(0, { duration: 300, easing: cubicOut });
	const tooltipY = new Tween(0, { duration: 300, easing: cubicOut });
	let tooltipEl: HTMLElement;

	// Defaults for tooltip placement relative to the cursor.
	let tooltipPosition: TooltipPosition = TooltipPosition.BottomLeft;
	let tooltipOffset = 10;

	function handleMouseMove(event: MouseEvent) {
		const tooltipWidth = tooltipEl ? tooltipEl.offsetWidth : 0;
		const tooltipHeight = tooltipEl ? tooltipEl.offsetHeight : 0;
		switch (tooltipPosition) {
			case TooltipPosition.BottomLeft:
				tooltipX.target = event.clientX - tooltipWidth;
				tooltipY.target = event.clientY + tooltipOffset;
				break;
			case TooltipPosition.BottomRight:
				tooltipX.target = event.clientX;
				tooltipY.target = event.clientY + tooltipOffset;
				break;
			case TooltipPosition.TopLeft:
				tooltipX.target = event.clientX - tooltipWidth;
				tooltipY.target = event.clientY - tooltipHeight - tooltipOffset;
				break;
			case TooltipPosition.TopRight:
				tooltipX.target = event.clientX + tooltipOffset;
				tooltipY.target = event.clientY - tooltipHeight - tooltipOffset;
				break;
		}
	}

	onMount(() => {
		if (browser) window.addEventListener('mousemove', handleMouseMove);
	});
	onDestroy(() => {
		if (browser) window.removeEventListener('mousemove', handleMouseMove);
	});

	function showTooltip(text: string, args?: { position?: TooltipPosition; offset?: number }) {
		tooltipText = text;
		tooltipVisible = true;
		tooltipPosition = args?.position ?? TooltipPosition.BottomLeft;
		tooltipOffset = args?.offset ?? 10;
	}

	function hideTooltip() {
		tooltipVisible = false;
	}
</script>

<section>
	<div class="icon-container">
		<i class="fa fa-home home-icon" aria-hidden="true"
			onmouseenter={() => showTooltip("Take me home", { position: TooltipPosition.BottomLeft })}
			onmouseleave={hideTooltip}
			onmousedown={() => window.location.href = "/?bypass=true"}
			>
		</i>
	</div>

	<div class="path-container">
		<span
			class="dim no-select"
			data-sveltekit-reload
			onclick={() => { window.location.href = "/takes/list"; }}
			aria-hidden="true"
			onmouseenter={() => showTooltip("Show me all the takes...", { position: TooltipPosition.BottomRight, offset: 20 })}
			onmouseleave={hideTooltip}
		>
			takes
		</span> <!-- There is a whitepsace here between words dont del me please ty :D-->
		<span class="thin">/</span> {slug}
	</div>

	<div class="take-container-header">
		This is my take on&nbsp;<span class="take-title-text" aria-hidden="true"
			onmouseenter={() => showTooltip(takeData.description, { position: TooltipPosition.BottomRight, offset: 20 })}
			onmouseleave={hideTooltip}>
			{takeData.title}
		</span>
	</div>
	<div class="take-container">
		{#each takeData.points as point}
			<p>{point}</p>
		{/each}
	</div>
	<div class="tooltip-wrapper">
		<div class="tooltip {tooltipVisible ? 'visible' : ''}" bind:this={tooltipEl}
			style="left: {tooltipX.current}px; top: {tooltipY.current}px;">
			{tooltipText}
		</div>
	</div>
</section>
