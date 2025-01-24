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
        isLoading = false; // Set loading to false after mount
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
        // Show overlay after 2 seconds
        setTimeout(() => {
            triggerShowOverlay();
            triggerShowPopup();
        }, 800);
    }

    function triggerShowOverlay() {
        showOverlay = true;
    }

    function triggerShowPopup() {
        errorSound.volume = 0.1
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
        <!-- Pass the music element to the Site component -->
        <Site {music} />
    {:else}
        <!-- Show the interact screen as the dummy site -->
        <InteractScreen handleClick={handleInteractClick} />
    {/if}

    {#if showOverlay}
        <Overlay />
    {/if}

    {#if showPopup}
        <ErrorPopup handleClick={closePopup} />
    {/if}
{/if}