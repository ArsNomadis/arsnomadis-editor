<script>
    import { project } from '../../stores/projectStore.js'

    function downloadProjectAsJSON() {
        const a = document.createElement('a');
		const file = new Blob([JSON.stringify($project, null, 2)], { type: 'application/json' });
		
        a.href = URL.createObjectURL(file);
		a.download = `soundwalk-${Date.now()}.json`;
	    a.click();
    }
</script>

<button on:click={downloadProjectAsJSON}>
	Export
</button>

<style>
    button {
        background-color: white;
        border-style: none;
        border-radius: 8px;
        width: 80px;
        height: 30px;
        cursor: pointer;
    }
</style>