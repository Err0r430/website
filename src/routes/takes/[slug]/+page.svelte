<script lang="ts">
	import { onMount } from 'svelte';
	import { takes, ETakes } from './takeData';
	import '$css/takes.css';
	import Tooltip from '$lib/tooltip/Tooltip.svelte';
    import { tooltip, TooltipPosition } from '$lib/tooltip/tooltipStore';
    import { browser } from '$app/environment';

	let { data } = $props();
	const slug = data.slug;
	const sanitizedSlug = slug && slug.length > 20 ? 'unknown' : slug;
	let takeData = takes[sanitizedSlug as ETakes] || takes[ETakes.unknown];
	
	// Style mode variables
	let styleModeActive = false;
	let mainContent: HTMLElement;
	let videoWrapper: HTMLElement;
	
	// Initialize 
	onMount(() => {
		// Check localStorage for saved state
		if (browser) {
			const storedValue = localStorage.getItem('takesStyleModeActive') === 'true';
			styleModeActive = storedValue;
			
			// Apply state immediately
			if (styleModeActive) {
				mainContent.style.height = '70vh';
				videoWrapper.style.height = '30vh';
				videoWrapper.style.visibility = 'visible';
				videoWrapper.style.opacity = '1';
				
				// Start video
				const video = videoWrapper.querySelector('video');
				if (video) {
					video.play().catch(e => console.error('Error playing video:', e));
				}
			}
		}
	});
	
	// Toggle style mode
	function toggleStyleMode() {
		styleModeActive = !styleModeActive;
		
		// Save to localStorage
		if (browser) {
			localStorage.setItem('takesStyleModeActive', styleModeActive.toString());
		}
		
		if (styleModeActive) {
			// Apply split screen style
			mainContent.style.height = '70vh';
			videoWrapper.style.height = '30vh';
			videoWrapper.style.visibility = 'visible';
			videoWrapper.style.opacity = '1';
			
			// Start video
			const video = videoWrapper.querySelector('video');
			if (video) {
				video.play().catch(e => console.error('Error playing video:', e));
			}
		} else {
			// Revert to normal
			mainContent.style.height = '100vh';
			videoWrapper.style.height = '0';
			videoWrapper.style.visibility = 'hidden';
			videoWrapper.style.opacity = '0';
			
			// Stop video for performance
			const video = videoWrapper.querySelector('video');
			if (video) {
				video.pause();
				video.currentTime = 0;
			}
		}
	}
</script>

<Tooltip />

<div class="page-container">
	<section bind:this={mainContent}>
		<div class="icon-container">
			<i class="fa fa-home home-icon" aria-hidden="true"
				onmouseenter={() => tooltip.show("Take me home", { position: TooltipPosition.BottomLeft })}
				onmouseleave={tooltip.hide}
				onmousedown={() => window.location.href = "/?bypass=true"}
			></i>
			<i class="fa fa-binoculars binoculars-icon" aria-hidden="true"
				onmouseenter={() => tooltip.show("Bored? This should fix that.", { position: TooltipPosition.BottomLeft })}
				onmouseleave={tooltip.hide}
				onmousedown={toggleStyleMode}
			></i>
		</div>

		<div class="path-container">
			<span
				class="dim no-select underline"
				onclick={() => { window.location.href = "/takes/list"; }}
				aria-hidden="true"
				onmouseenter={() =>
					tooltip.show(slug === "list" ? "You are already here. This wont do anything" : "Show me all the takes...", {
						position: TooltipPosition.BottomRight,
						offset: 20
					})
				}
				onmouseleave={tooltip.hide}
			>
				takes
			</span> <!-- There is a whitepsace here between words dont del me please ty :D-->
			{#if slug !== "list"}
			<span class="thin">/</span> {slug}
			{/if}
		</div>

		<div class="take-container-header">
			{#if slug !== "list"}
			This is my take on&nbsp;<span class="take-title-text" aria-hidden="true"
				onmouseenter={() => tooltip.show(takeData.description, { position: TooltipPosition.BottomRight, offset: 20 })}
				onmouseleave={tooltip.hide}>
				{takeData.title}
			</span>
			{/if}
			{#if slug === "list"}
				<span class="underline"
				onmouseenter={() => tooltip.show(takeData.description, { position: TooltipPosition.BottomRight, offset: 20 })}
				onmouseleave={tooltip.hide}
				aria-hidden="true"
				>These</span>&nbsp;are all the topics I have a take on.
			{/if}
		</div>

		<div class="take-container">
			{#if slug !== "list"}
				<div class="take-content-wrapper">
					{#each takeData.points as point, i}
						<div class="take-point-card" style="--delay: {i * 0.1}s">
							<p>{point}</p>
						</div>
					{/each}
				</div>
			{/if}
			
			{#if slug === "list"}
				<div class="grid-take-container no-select">
					{#each Object.entries(takes) as [enumKey, take], i}
						{#if take !== takes[ETakes.unknown] && take !== takes[ETakes.list]}
							<div 
								class="take-card no-select"
								style="--delay: {i * 0.05}s"
								onmouseenter={() => tooltip.show(take.description, { position: TooltipPosition.BottomRight, offset: 20 })}
								onmouseleave={tooltip.hide}
								aria-hidden="true"
								onclick={() => window.location.href = `/takes/${enumKey.toLowerCase()}`}
							>
								<span class="take-card-title">{take.title}</span>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<div class="video-wrapper" bind:this={videoWrapper}>
		<video autoplay loop muted playsinline>
			<source src="/video.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>
	</div>
</div>