<script>
    import '../global.css'
    import Inspector from '$lib/inspector/Inspector.svelte'
    import Map from '$lib/map/Map.svelte'
    import Project from '$lib/project/Project.svelte'
    import WarningModal from '../lib/project/WarningModal.svelte'
    import { warning } from '../stores/warningStore.js'

    // Prevents unwanted exits.
    function beforeUnload(event) {
        event.returnValue = ''
        return ''
    }
</script>

<svelte:head>
	<title>Ars Nomadis Editor</title>
</svelte:head>

<Map/>

<div class="container">
    <Inspector/>
    <Project/>
</div>


{#if $warning}
    <WarningModal 
        message={$warning.message}
        on:ok={() => $warning.callback('ok')}
        on:cancel={() => $warning.callback('cancel')}  
    />
{/if}

<svelte:window on:beforeunload={beforeUnload}/>

<style>
    .container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 380px;
        height: 100%;
        gap: 8px;
    }

    @media (max-width: 768px) {
        .container {
            height: 60%;
            align-self: flex-end;
            width: 100%;
            margin: 0%;
            flex-direction: column-reverse;
        }
    }
</style>