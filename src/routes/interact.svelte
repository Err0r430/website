<script>
    export let handleClick = () => {};
</script>

<style>
    .black-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        text-align: center; /* Ensure multi-line text is centered */
    }

    .black-screen-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<button
    class="black-screen"
    aria-label="BlackScreen"
    on:click={handleClick}
    on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
    <span class="black-screen-content">
        Are you ready? <br />
        Click here to go through.
    </span>
</button>