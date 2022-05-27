<script>
    import Inspector from '$lib/inspector/Inspector.svelte'
    import Map from '$lib/map/Map.svelte'
    import ExportButton from '$lib/project/ExportButton.svelte';
</script>

<Map/>
<Inspector/>
<ExportButton />

<style>
    :global(body) {
        position: relative;
        margin: 0%;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
    }
</style>


