<script>
    import { onMount } from 'svelte';
    export let handleClick = () => {};

    // State variable to toggle the visibility of the text
    let showText = false;

    onMount(() => {
        // Start the timer when the component is mounted
        setTimeout(() => {
            showText = true;
            console.log("Showing text");
        }, 4000);
    });
</script>

<section>
    <div class="errorpopup-container">
        <!-- Title bar container -->
        <div class="titlebar">
            <div class="app-name">
                <!-- Name of the app that's crashing -->
                <img src="/favicon.png" alt="Crash icon" class="crash-icon">
                website.exe
            </div>
            <div class="popup-buttons">
                <!-- Buttons for the popup -->
                <img src="/images/minimize_popup.png" alt="Minimize icon" class="popup-icon minimize-icon">
                <img src="/images/maximize_popup.png" alt="Maximize icon" class="popup-icon maximize-icon">
                <img src="/images/close_popup.png" alt="Close icon" class="popup-icon close-icon">
            </div>
        </div>

        <div class="popup-content">
            <!-- Content of the popup -->
            <h3>An error has occurred</h3>
            <p>Windows is checking for a solution to your problem...</p>
            <div class="progress-bar">
                <div class="progress-segment"></div>
            </div>
        </div>

        <div class="popup-footer">
            <button class="footer-button" on:click={() => { handleClick() }}>Close</button>
        </div>
    </div>

    <div class="fade-container">
        {#if showText}
        <div class="fade-down-text">
            (Psssst this is the part where you click close)
        </div>
        {/if}
    </div>
</section>