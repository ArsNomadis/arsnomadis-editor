<script>
    import { createEventDispatcher, getContext, setContext, onMount } from 'svelte'
    import { project, selectedZone } from '../../stores/projectStore.js'
    import { mouse } from '../../stores/mouseStore.js'

    let classNames = undefined
    export { classNames as class }
  
    export let circle = undefined
    
    export let visible
    export let latLng
    export let radius
    export let options

    let L
    let isDragging = false
    let posOnMousedown
    let posOnMouseup

    const dispatch = createEventDispatcher()

    onMount(async () => {
        const leaflet = await import('leaflet')
        L = leaflet.default
    })
   
    const layerGroup = getContext('layerGroup')()
    setContext('layer', () => circle)

    function saveLocation(location) {
        if ($selectedZone !== null) {
            project.moveZone($selectedZone, [location.lat, location.lng])
        }
    }

    function onMousedown(e) {
        dispatch('mousedown', e)
        circle.bringToFront()
        posOnMousedown = $mouse
        isDragging = true
    }

    function onMouseup(e) {
        dispatch('mouseup', e)
        posOnMouseup = $mouse
        isDragging = false

        if (posOnMousedown[0] !== posOnMouseup[0] || posOnMousedown[1] !== posOnMouseup[1]) {
            saveLocation(e.latlng)
        }
    }

    function createCircle() {
        circle = L.circle(latLng, { ...options, radius })
        .on('mouseover', (e) => circle.setStyle({ fillOpacity: 0.6 }))
        .on('mouseout', (e) => circle.setStyle({ fillOpacity: 0.2 }))
        .on('click', (e) => L.DomEvent.stopPropagation(e))
        .on('mousedown', onMousedown)
        .on('mouseup', onMouseup)
        .addTo(layerGroup)
  
        return {
            destroy() {
                if (circle) {
                    circle.remove()
                    circle = undefined
                }
            },
        }
    }

    $: if (circle) {
        circle.setRadius(radius)
    }

    $: if (circle) {
        circle.setLatLng(latLng)
    }

    $: if (isDragging) {
        if (posOnMousedown[0] !== $mouse[0] || posOnMousedown[1] !== $mouse[1]) {
            latLng = $mouse
        }
    }
</script>

{#if L && visible}
    <div use:createCircle class={classNames}>
        {#if circle}
            <slot />
        {/if}
    </div>
{/if}
