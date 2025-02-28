<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { takes, ETakes } from './takeData';
	import '$css/takes.css';
	import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
	import Tooltip from '$lib/tooltip/Tooltip.svelte';
    import { tooltip, TooltipPosition } from '$lib/tooltip/tooltipStore';

	let { data } = $props();
	const slug = data.slug;
	const sanitizedSlug = slug && slug.length > 20 ? 'unknown' : slug;
	let takeData = takes[sanitizedSlug as ETakes] || takes[ETakes.unknown];
</script>

<Tooltip />

<section>
	<div class="icon-container">
		<i class="fa fa-home home-icon" aria-hidden="true"
			onmouseenter={() => tooltip.show("Take me home", { position: TooltipPosition.BottomLeft })}
			onmouseleave={tooltip.hide}
			onmousedown={() => window.location.href = "/?bypass=true"}
			>
		</i>
	</div>

	<div class="path-container">
		<span
			class="dim no-select underline"
			data-sveltekit-reload
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

			{#each takeData.points as point}
				<p>{point}</p>
			{/each}

		{/if}
		{#if slug === "list"}
		<div class="grid-take-container no-select">
			{#each Object.entries(takes) as [enumKey, take]}
				{#if take !== takes[ETakes.unknown] && take !== takes[ETakes.list]}
					<p class="no-select"
					onmouseenter={() => tooltip.show(take.description, { position: TooltipPosition.BottomRight, offset: 20 })}
					onmouseleave={tooltip.hide}
					aria-hidden="true"
					onclick={() => window.location.href = `/takes/${enumKey.toLowerCase()}`}
					>
					{take.title}
					</p>
				{/if}
			{/each}
		</div>
		{/if}
	</div>



</section>
