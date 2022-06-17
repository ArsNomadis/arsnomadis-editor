<script>
    import { project, selectedZone } from '../../stores/projectStore.js'
    import { slide } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'
    import ZoneSettings from './ZoneSettings.svelte'

    export let id = ''

    let selected = false
    let div
    let name = ''
    
    $: selected = ($selectedZone === id)
    
    $: if ($selectedZone === id) {
        $project.zones[$selectedZone].name = name
    }

    const dispatch = createEventDispatcher()

    $: if (selected) {
        dispatch('shouldScroll', (div.offsetTop - 8))
    }
</script>

<div class="entry" bind:this={div} on:click="{() => { $selectedZone = id }}">
    <input bind:value={name} placeholder="Untitled">
</div>

{#if selected}
    <div class="settings selected" in:slide>
        <ZoneSettings />
    </div>
{/if}

<style>
    div {
        width: auto;
        background-color: white;
        margin: 8px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 8px;
    }

    .entry {
        height: 45px;
        display: flex;
        align-items: center;
        box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);
    }

    input {
        border-style: none;
        width: 100%;
        outline: none;
    }

    .settings {
        padding: 6px;
    }
</style>