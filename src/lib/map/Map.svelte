<script>
    import Leaflet from './Leaflet.svelte'
    import Circle from './Circle.svelte'
    import { project, selectedZone } from '../../stores/projectStore.js'

    let map
    const initialView = $project.initialLocation
    const defaultRadius = 40

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

    function handleCircleClick(index) {
        $selectedZone = index
    }

    function handleMapClick(event) {
        project.addZone({
            latLng: [event.detail.latlng.lat, event.detail.latlng.lng],
            radius: defaultRadius,
        })

        $selectedZone = null
    }
</script>

<svelte:window on:resize={resizeMap} />

<div>
    <Leaflet bind:map view={initialView} zoom={18} on:click={handleMapClick}>
        {#each $project.zones as zone, i (zone.uuid)}
            <Circle
                latLng={zone.location}
                radius={zone.radius}
                options={defaultCircleOptions}
                on:click={() => handleCircleClick(i)}
            />
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