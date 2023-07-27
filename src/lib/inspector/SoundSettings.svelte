<script>
    import { project, selectedZone } from '../../stores/projectStore.js'
    import ToggleSwitch from './ToggleSwitch.svelte'
    import { warning } from '../../stores/warningStore.js'
    import Delete from 'svelte-material-icons/Delete.svelte'

    export let id;

    function warn() {
        $warning = {
            message: 'Warning! Deleting this sound is irreversible.',
            callback: (status) => {
                if (status === 'ok') {
                    project.removeSound($selectedZone, id)
                }

                $warning = null
            }
        }
    }
</script>

<div class="settings">
    <div class="parameters">
        <label for="filename"> Filename </label>
        <input id="filename" bind:value={$project.zones[$selectedZone].sounds[id].filename}
            placeholder="untitled.wav"
            spellcheck="false"
        >

        <label for="play"> Play Event </label>
        <select id="play" bind:value={$project.zones[$selectedZone].sounds[id].playEvent}>
            <option value="enter"> Enter </option>
            <option value="exit"> Exit </option>
            <option value="button"> Button </option>

            {#if $project.zones[$selectedZone].sounds.length >= 2}
                {#each $project.zones[$selectedZone].sounds as s}
                    {#if s.uuid !== $project.zones[$selectedZone].sounds[id].uuid}
                        <option value={`after_${s.uuid}`}> After {s.filename} </option>
                    {/if}
                {/each}
            {/if}
        </select>

        <label for="stop"> Stop Event </label>
        <select id="stop" bind:value={$project.zones[$selectedZone].sounds[id].stopEvent}>
            <option value="exit"> Exit </option>
            <option value="none"> None </option>
            <option value="enter_new_zone"> Enter New Zone </option>
        </select>

        <label for="condition"> Zone Condition </label>
        <select id="condition" bind:value={$project.zones[$selectedZone].sounds[id].zoneCondition}>
            <option value="any"> Any </option>
            <option value="never_visited"> Never Visited </option>
            <option value="already_visited"> Already Visited </option>
        </select>

        <label for="fadein"> Fade In </label>
        <input id="fadein" type=number bind:value={$project.zones[$selectedZone].sounds[id].fadein} min="0">

        <label for="fadeout"> Fade Out </label>
        <input id="fadeout" type=number bind:value={$project.zones[$selectedZone].sounds[id].fadeout} min="0">

        <label for="loop"> Loop </label>
        <ToggleSwitch id="loop" bind:checked={$project.zones[$selectedZone].sounds[id].loop} />
        
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="delete" on:click={warn}>
        <Delete size="1rem" color="rgb(252, 201, 199)"/>
    </div>
</div>

<style>
    .settings {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .parameters {
        display: grid;
        grid-template-columns: 1fr 1.6fr;
        grid-gap: 0.5rem;
        align-items: center;
        height: auto;
        padding: 12px;
        margin-top: 0.5rem;
        border-radius: 8px;
        box-shadow: inset 0px 0px 4px rgba(0,0,0,0.2);
    }

    .delete {
        place-self: center;
        display: flex;
        cursor: pointer;
    }
</style>