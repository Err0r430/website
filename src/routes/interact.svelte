
<script>
    export let handleClick = () => {};
</script>

<style>
    @import url("/interact.css");
</style>

<div
    class="black-screen"
    aria-label="BlackScreen"
>
    <div class="captcha-container">
        <div class="captcha-content">
            <img src="/captcha.png" alt="Captcha image" class="captcha-image">
            <p class="captcha-text">Please enter the text shown above.</p>
            <input
                type="text"
                class="captcha-input"
                placeholder="Enter captcha here"
                on:keydown={(e) => {
                    if (e.key === 'Enter') {
                        handleClick();
                        // Optionally, prevent the default form submission behavior
                        e.preventDefault();
                    }
                }}
                aria-label="Captcha input"
            />
        </div>
    </div>
</div>