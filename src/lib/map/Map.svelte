<script>
    import Leaflet from './Leaflet.svelte'
    import Circle from './Circle.svelte'
    import { project } from '../../stores/projectStore.js'

    let map
    const initialView = $project.initialLocation

    const defaultCircleOptions = {
        stroke: false,
        color: 'red',
        bubblingMouseEvents: false,
        radius: 40,
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
            radius: defaultCircleOptions.radius,
        })
    }
</script>

<svelte:window on:resize={resizeMap} />

<div>
    <Leaflet bind:map view={initialView} zoom={18} on:click={handleMapClick}>
        {#each $project.zones as zone}
            <Circle latLng={zone.location} options={defaultCircleOptions} on:click={handleCircleClick} />
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