<script>
    import { project } from '../../stores/projectStore.js'
    import Sound from "./Sound.svelte";
</script>

<div>
    {#each $project.sounds as sound}
        <Sound uuid={sound.uuid}/>
    {/each}
</div>

<style>
    div {
        background-color: white;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        margin: 18px;
        width: 320px;
        height: auto;
        border-radius: 0.8rem;
        box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }
</style>