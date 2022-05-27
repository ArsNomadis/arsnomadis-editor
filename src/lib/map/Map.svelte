<script>
    import Leaflet from './Leaflet.svelte'
    import Circle from './Circle.svelte'
    import { project } from '../../stores/stores.js'

    let map
    const initialView = [ 48.107878, -1.651773 ]
    const circles = []

    const defaultCircleOptions = {
        stroke: false,
        color: 'red',
        bubblingMouseEvents: false,
    }

    function resizeMap() {
	    if(map) { 
            map.invalidateSize()
        }
    }

    function handleCircleClick(event) {
        console.log(event)
    }

    function handleMapClick(event) {
        project.addZone({
            latLng: [event.detail.latlng.lat, event.detail.latlng.lng],
            radius: 20,
        })
    }
</script>

<svelte:window on:resize={resizeMap} />

<div>
    <Leaflet bind:map view={$project.initialLocation} zoom={18} on:click={handleMapClick}>
        {#each $project.zones as zone}
            <Circle latLng={zone.location} on:click={handleCircleClick} />
        {/each}
    </Leaflet>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
    }
</style>