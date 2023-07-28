<script>
    import { createEventDispatcher, getContext, setContext, onMount } from 'svelte'
    import { project, selectedZone } from '../../stores/projectStore.js'
    import { mouse } from '../../stores/mouseStore.js'
  
    export let circle = undefined
    export let id
    export let visible
    export let latLng
    export let radius
    export let options

    let L
    let isDragging = false
    let isResizing = false
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

        if (e.originalEvent.ctrlKey) {
            isDragging = false
            isResizing = true
        }
    }

    function onMouseup(e) {
        dispatch('mouseup', e)
        posOnMouseup = $mouse
        isDragging = false

        if ((posOnMousedown[0] !== posOnMouseup[0] || posOnMousedown[1] !== posOnMouseup[1]) && !isResizing) {
            saveLocation(e.latlng)
        }

        isResizing = false
    }

    function handleControlKeydown(e) {
        if (e.key === 'Control') {
            L.DomUtil.addClass(circle._path, 'resize')
        }
    }

    function handleControlKeyup(e) {
        if (e.key === 'Control') {
            L.DomUtil.removeClass(circle._path, 'resize')
        }
    }

    function onMouseover(e) {
        focus()

        L.DomEvent.on(document, 'keydown', handleControlKeydown)
        L.DomEvent.on(document, 'keyup', handleControlKeyup)
    }

    function onMouseout(e) {
        if ($selectedZone !== id) unfocus()

        L.DomEvent.off(document, 'keydown', handleControlKeydown)
        L.DomEvent.off(document, 'keyup', handleControlKeyup)
    }

    function focus() {
        circle.setStyle({ fillOpacity: 0.6 })
    }

    function unfocus() {
        circle.setStyle({ fillOpacity: 0.2 })
    }

    function createCircle() {
        circle = L.circle(latLng, { ...options, radius })
        .on('click', (e) => L.DomEvent.stopPropagation(e))
        .on('mouseover', onMouseover)
        .on('mouseout', onMouseout)
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
        if ((posOnMousedown[0] !== $mouse[0] || posOnMousedown[1] !== $mouse[1]) && !isResizing) {
            if (L) L.DomUtil.addClass(circle._path, 'drag')
            latLng = $mouse
        }
    } else {
        if (L && circle) L.DomUtil.removeClass(circle._path, 'drag')
    }

    $: if (isResizing) {
        const centerLocation = circle.getLatLng()
        const mouseLocation = L.latLng($mouse)

        // Resizes using the distance between the center of the circle and the mouse with a 5m min.
        $project.zones[$selectedZone].radius = (centerLocation.distanceTo(mouseLocation) + 5).toFixed(2)
    }

    // Highlights the zone even when selected from the inspector.
    $: if (L && circle) {
        if ($selectedZone === id) {
            focus()
        } else {
            unfocus()
        }
    }
</script>

{#if L && visible}
    <div use:createCircle>
        {#if circle}
            <slot />
        {/if}
    </div>
{/if}

<style>
    :global(.resize) {
        cursor: nesw-resize;
    }

    :global(.drag) {
        cursor: move;
    }
</style>