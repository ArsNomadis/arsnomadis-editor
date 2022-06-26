<script>
    import { project } from '../../stores/projectStore.js'

    function importProject(event) {
        const file = event.target.files[0]

        importFile(file).then((data) => {
            $project = data
        }).catch((err) => {
            console.error('Failed to load JSON data with err', err)
        })
    }

    function importFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = event => resolve(JSON.parse(event.target.result))
            reader.onerror = error => reject(error)
            reader.readAsText(file)
        })
    } 
</script>

<label>
    <div>Import</div>
    <input type=file accept="application/json" on:change={importProject}>
</label>

<style>
    input {
        display: none;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: white;
        border-style: none;
        border-radius: 8px;
        width: 80px;
        height: 30px;
    }
</style>