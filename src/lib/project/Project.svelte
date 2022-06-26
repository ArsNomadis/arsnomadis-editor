<script>
    import ExportButton from './ExportButton.svelte'
    import ImportButton from './ImportButton.svelte'
</script>

<div class="container">
    <ImportButton/>
    <ExportButton/>
</div>

<style>
    .container {
        display: flex;
        background-color: white;
        width: 100%;
        border-radius: 0.8rem;
        box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        justify-content: space-evenly;
    }
</style>