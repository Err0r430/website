<script>
    import Site from "../site.svelte";
</script>

<style>
    /* Add this to handle edge cases */
    :global(html), :global(body) {
        overflow: hidden !important;
    }

    section {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block; /* Ensures no flex/grid weirdness */
        position: relative; /* For absolute children */
    }
</style>

<section>
    <Site />
</section>