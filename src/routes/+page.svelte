<!-- MainComponent.svelte -->
<script>
    import { onMount } from 'svelte';
    import ErrorPopup from './popup.svelte';
    import DummySite from './dummy.svelte';
    import Overlay from './overlay.svelte';
    import Site from './site.svelte';
    import InteractScreen from './interact.svelte'; // Import the interact screen component

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

    let isReady = false; // New state variable to track readiness

    const handleAudioEnd = (/** @type {{ target: any; }} */ event) => {
        const audio = event.target;
        audio.currentTime = 0;
        audio.play();
    };

    onMount(() => {
        isLoading = false; // Set loading to false after mount
    });

    function closePopup() {
        console.log('Closing popup');
        showPopup = false;
        showOverlay = false;
        hasSeenPopup = true;
        music.volume = 0.5;
        music.play();
    }

    function runSequence() {
        // Show overlay after 2 seconds
        setTimeout(() => {
            triggerShowOverlay();
            triggerShowPopup();
        }, 2000);
    }

    function triggerShowOverlay() {
        showOverlay = true;
    }

    function triggerShowPopup() {
        errorSound.play();
        setTimeout(() => {
            console.log('Showing popup');
            showPopup = true;
        }, 500);
    }

    function handleInteractClick() {
        isReady = true; // User has interacted, proceed to load the app
        runSequence(); // Start the existing sequence
    }
</script>

<audio bind:this={errorSound} src="/error.mp3" preload="auto"></audio>
<audio bind:this={music} src="/music.mp3" preload="auto" on:ended={handleAudioEnd}></audio>

{#if isLoading}
    <!-- Prevents flash while checking localStorage -->
    <div style="display: none;"></div>
{:else if !isReady}
    <!-- Show the interact screen if not ready -->
    <InteractScreen handleClick={handleInteractClick} />
{:else}
    <!-- Main application content -->
    {#if hasSeenPopup}
        <Site />
    {:else}
        <DummySite />
    {/if}

    {#if showOverlay}
        <Overlay />
    {/if}

    {#if showPopup}
        <ErrorPopup handleClick={closePopup} />
    {/if}
{/if}