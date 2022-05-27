<script>
    import Inspector from '$lib/inspector/Inspector.svelte'
    import Map from '$lib/map/Map.svelte'
</script>

<Map/>
<Inspector/>

<style>
    :global(body) {
        position: relative;
        margin: 0%;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
    }
</style>


