<script>
    import { project, selectedZone } from '../../stores/projectStore.js'
    import ToggleSwitch from './ToggleSwitch.svelte'
</script>

<div>
    <label for="visible"> Visible </label>
    <ToggleSwitch id="visible" bind:checked={$project.zones[$selectedZone].visible} />

    <label for="radius"> Radius </label>
    <input id="radius" type=number bind:value={$project.zones[$selectedZone].radius} min="0">

    <label for="lat">Latitude</label>
    <input id="lat" type=number bind:value={$project.zones[$selectedZone].location[0]} step="0.00001">

    <label for="lng">Longitude</label>
    <input id="lng" type=number bind:value={$project.zones[$selectedZone].location[1]} step="0.00001">
</div>

<style>
    div {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 0.5rem;
        align-items: center;
        height: auto;
        padding: 12px;
        border-radius: 8px;
        box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);
    }
</style>