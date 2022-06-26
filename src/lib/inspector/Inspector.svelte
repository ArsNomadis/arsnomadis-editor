<script>
    import { project } from '../../stores/projectStore.js'
    import Zone from './Zone.svelte'

    let div

    function scrollTo(position) {
        div.scrollTop = position.detail
    }
</script>

<div class="container" bind:this={div}>
    {#each $project.zones as zone, i (zone.uuid)}
        <Zone id={i} on:shouldScroll={scrollTo}/>
    {/each}

    {#if $project.zones.length === 0}
        <div class="about">
            <h1>Ars Nomadis Editor</h1>
            <p>
                📣 Web editor for
                <a href="https://www.arsnomadis.eu/projets/les-promenades-sonores/" target="_blank">
                    Ars Nomadis geolocated soundwalks.
                </a> The editor generates data to be used with Ars Nomadis custom hardware.
            </p>
            <p>
                <i>Click on the map to start creating a soundwalk or use the import button to open an existing project.</i>
            </p>
        </div>
    {/if} 
</div>

<style>
    .container {
        background-color: white;
        width: 100%;
        flex: auto;
        border-radius: 0.8rem;
        box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        overflow-y: scroll;
    }

    .about {
        margin: 1.5rem;
    }

    p {
        color: grey;
    }

    a {
        text-decoration: none;
        color: black;
    }
</style>