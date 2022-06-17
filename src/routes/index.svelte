<script>
    import '../global.css'
    import Inspector from '$lib/inspector/Inspector.svelte'
    import Map from '$lib/map/Map.svelte'
    import ExportButton from '$lib/project/ExportButton.svelte'
    import WarningModal from '../lib/project/WarningModal.svelte'
    import { warning } from '../stores/warningStore.js'

    // Prevents unwanted exits.
    function beforeUnload(event) {
        event.returnValue = ''
        return ''
    }
</script>

<Map/>
<Inspector/>
<ExportButton />

{#if $warning}
    <WarningModal 
        message={$warning.message}
        on:ok={() => $warning.callback('ok')}
        on:cancel={() => $warning.callback('cancel')}  
    />
{/if}

<svelte:window on:beforeunload={beforeUnload}/>

