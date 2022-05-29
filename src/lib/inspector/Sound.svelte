<script>
    import { selectedSound } from '../../stores/projectStore.js'
    import { slide } from 'svelte/transition'

    export let uuid = ''

    let selected = false
    
    $: selected = (uuid && $selectedSound === uuid)
</script>

<div class="entry" class:selected on:click="{() => { $selectedSound = uuid }}">
    {uuid}
</div>

{#if selected}
    <div class="settings selected" in:slide>
    </div>
{/if}

<style>
    div {
        width: auto;
        background-color: white;
        margin: 8px;
        padding-left: 12px;
        border-radius: 8px;
    }

    .entry {
        height: 45px;
        display: flex;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        font-size: small;
        box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);
    }

    .settings {
        height: 150px;
    }

    .selected {
        border: 1px;
        border-style: solid;
        border-color: rgba(255,0,0,0.6);
    }
</style>