<script>
    import { project, selectedZone } from '../../stores/projectStore.js'
    import ToggleSwitch from './ToggleSwitch.svelte'
    import SoundSettings from './SoundSettings.svelte'
</script>

<div class="settings">
    <div class="parameters">
        <label for="visible"> Visible </label>
        <ToggleSwitch id="visible" bind:checked={$project.zones[$selectedZone].visible} />
    
        <label for="radius"> Radius </label>
        <input id="radius" type=number bind:value={$project.zones[$selectedZone].radius} min="0">
    
        <label for="lat">Latitude</label>
        <input id="lat" type=number bind:value={$project.zones[$selectedZone].location[0]} step="0.00001">
    
        <label for="lng">Longitude</label>
        <input id="lng" type=number bind:value={$project.zones[$selectedZone].location[1]} step="0.00001">
    </div>

    {#each $project.zones[$selectedZone].sounds as sound, i}
        <SoundSettings id={i} />
    {/each}

    <button on:click={() => project.addSound($selectedZone)}>Add Sound</button>
</div>

<style>
    .settings {
        display: flex;
        flex-direction: column;
    }

    .parameters {
        display: grid;
        grid-template-columns: 1fr 1.6fr;
        grid-gap: 0.5rem;
        align-items: center;
        height: auto;
        padding: 12px;
        border-radius: 8px;
        box-shadow: inset 0px 0px 4px rgba(0,0,0,0.2);
    }

    button {
        align-self: center;
        margin-top: 0.5rem;
        background-color: white;
        border: 1px solid;
        border-radius: 8px;
        width: 100%;
        height: 30px;
    }

    button:hover {
        color: rgb(252, 201, 199);
    }
</style>