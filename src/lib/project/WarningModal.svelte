<script>
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'
    
    export let message = ''

    const dispatch = createEventDispatcher()

    function handleCancel() {
        dispatch('cancel')
    }

    function handleOk() {
        dispatch('ok')
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="background" on:click={handleCancel}/>
<div in:fade class="modal">
    <p>{message}</p>
    <div class="buttons">
        <button on:click={handleOk}> ok </button>
        <button on:click={handleCancel}> cancel </button>
    </div>
</div>

<style>
    .background {
        position: fixed;
        top: -18px;
        left: -18px;
        right: -18px;
        bottom: -18px;
        background-color: rgba(255, 0, 0, 0.05);
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        padding: 1rem;
        transform: translate(-50%, -50%);
        background-color: white;
        border-radius: 12px;
        border-style: none;
        display: flex;
        flex-direction: column;
        box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
    }

    .buttons {
        margin-top: 0.5rem;
    }

    button {
        background-color: white;
        border: 1px solid;
        border-radius: 8px;
    }

    button:hover {
        color: rgb(252, 201, 199);
    }
</style>