<script>
    import { mouse } from '../../stores/mouseStore'
    import { createEventDispatcher, onMount, setContext } from 'svelte'
    import 'leaflet/dist/leaflet.css'    

    export let height = '100%'
    export let width = '100%'
    export let view = undefined
    export let zoom = undefined

    let L

    let mapProp = undefined
    export { mapProp as map }

    export const invalidateSize = () => map?.invalidateSize()
    
    const dispatch = createEventDispatcher()
  
    let map
    $: mapProp = map
      
    export const getMap = () => map
    setContext('layerGroup', getMap)
    setContext('layer', getMap)
    setContext('map', getMap)

    onMount(async () => {
        const leaflet = await import('leaflet')
        L = leaflet.default

        // Prevents Control+click from opening contextmenu (used for resizing circles)
        document.addEventListener('contextmenu', (e) => e.preventDefault())
    })

    function createLeaflet(node) {
        map = L.map(node, { doubleClickZoom: false })
        .on('zoom', (e) => dispatch('zoom', e))
        .on('click', (e) => {
            dispatch('click', e)
        })

        map.setView(view, zoom)
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
            subdomains: 'abcd',
            maxZoom: 20,
        }).addTo(map)

        return {
            destroy() {
                map.remove()
                map = undefined
            },
        }
    }
      
    $: if (map) {
        map.setView(view, zoom)
    }

    $: if (map) {
        map.on('mousemove', (e) => {
            $mouse = [e.latlng.lat, e.latlng.lng]
        })
    }
</script>

{#if L}
    <div style="height:{height}; width:{width}" use:createLeaflet>
        {#if map}
            <slot {map} />
        {/if}
    </div>
{/if}

<style>
    :global(.leaflet-control-container) {
        position: static;
    }
</style>
