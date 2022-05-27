<script>
    import { createEventDispatcher, getContext, setContext, onMount } from 'svelte'
    
    let classNames = undefined
    export { classNames as class }
  
    export let circle = undefined

    export let latLng
    export let options

    let L

    const dispatch = createEventDispatcher()

    onMount(async () => {
        const leaflet = await import('leaflet')
        L = leaflet.default
    })
   
    const layerGroup = getContext('layerGroup')()
    setContext('layer', () => circle)
      
    function createCircle() {
        circle = L.circle(latLng, options)
        .on('click', (e) => { 
            dispatch('click', e)
            L.DomEvent.stopPropagation(e)
        })
        .on('mouseover', (e) => circle.setStyle({ fillOpacity: 0.6 }))
        .on('mouseout', (e) => circle.setStyle({ fillOpacity: 0.2 }))
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
</script>

{#if L}
    <div use:createCircle class={classNames}>
        {#if circle}
            <slot />
        {/if}
    </div>
{/if}
