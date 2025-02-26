<script>
    import { onMount } from 'svelte';
    import ErrorPopup from './popup.svelte';
    import Overlay from './overlay.svelte';
    import Site from './site.svelte';
    import InteractScreen from './interact.svelte';

    let isLoading = true;
    let hasSeenPopup = false;

    /**
     * @type {HTMLAudioElement}
     */
    let music;
    /**
     * @type {HTMLAudioElement}
     */
    let errorSound;

    let showOverlay = false;
    let showPopup = false;

    let isReady = false;

    const handleAudioEnd = (/** @type {{ target: any; }} */ event) => {
        const audio = event.target;
        audio.currentTime = 0;
        audio.play();
    };

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('bypass') === 'true') {
            isReady = true;
            hasSeenPopup = true;
        }
        isLoading = false;
    });

    function closePopup() {
        console.log('Closing popup');
        showPopup = false;
        showOverlay = false;
        hasSeenPopup = true;
        music.volume = 0.5;
        music.currentTime = 5;
        music.play();
    }

    function runSequence() {
        setTimeout(() => {
            triggerShowOverlay();
            triggerShowPopup();
        }, 800);
    }

    function triggerShowOverlay() {
        showOverlay = true;
    }

    function triggerShowPopup() {
        errorSound.volume = 0.1;
        errorSound.play();
        setTimeout(() => {
            console.log('Showing popup');
            showPopup = true;
        }, 500);
    }

    function handleInteractClick() {
        isReady = true;
        runSequence();
    }
</script>

<audio bind:this={errorSound} src="/error.mp3" preload="auto"></audio>
<audio bind:this={music} src="/music.mp3" preload="auto" on:ended={handleAudioEnd}></audio>

{#if isLoading}
    <div style="display: none;"></div>
{:else if !isReady}
    <InteractScreen handleClick={handleInteractClick} />
{:else}
    {#if hasSeenPopup}
        <Site {music} />
    {:else}
        <InteractScreen handleClick={handleInteractClick} />
    {/if}

    {#if showOverlay}
        <Overlay />
    {/if}

    {#if showPopup}
        <ErrorPopup handleClick={closePopup} />
    {/if}
{/if}