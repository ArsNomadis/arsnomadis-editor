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
        position: fixed;
        bottom: 18px;
        left: 18px;
        background-color: white;
        border-style: none;
        border-radius: 8px;
        width: 80px;
        height: 30px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    }
</style>