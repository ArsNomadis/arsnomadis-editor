<script>
    import { project, selectedZone } from '../../stores/projectStore.js'
    import { slide } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'
    import { warning } from '../../stores/warningStore.js'
    import ZoneSettings from './ZoneSettings.svelte'
    import Delete from 'svelte-material-icons/Delete.svelte'

    export let id = ''

    let selected = false
    let div

    $: selected = ($selectedZone === id)

    const dispatch = createEventDispatcher()

    $: if (selected) {
        dispatch('shouldScroll', (div.offsetTop - 8))
    }

    function warn() {
        $warning = {
            message: 'Warning! Deleting this zone is irreversible.',
            callback: (status) => {
                if (status === 'ok') {
                    project.removeZone(id)
                }

                $warning = null
            }
        }
    }
</script>

<div
    class="entry"
    tabindex="0"
    role="button"
    bind:this={div}
    on:click="{() => { $selectedZone = id }}"
    on:keypress="{() => { $selectedZone = id }}"
>
    <input bind:value={$project.zones[id].name} placeholder="Untitled" spellcheck="false">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="delete"tabindex="0" role="button" on:click={warn}>
        <Delete size="1.5rem" color={selected ? 'grey' : 'lightgrey'}/>
    </div>
</div>

{#if selected}
    <div class="settings selected" in:slide>
        <ZoneSettings />
    </div>
{/if}

<style>
    div {
        width: auto;
        background-color: white;
        margin: 8px;
        padding-left: 12px;
        border-radius: 8px;
    }

    .entry {
        height: 45px;
        display: flex;
        align-items: center;
        box-shadow: inset 0px 0px 10px rgba(0,0,0,0.2);
    }

    input {
        border-style: none;
        width: 100%;
        outline: none;
    }

    .settings {
        padding: 6px;
    }

    .delete {
        display: flex;
        cursor: pointer;
    }
</style>