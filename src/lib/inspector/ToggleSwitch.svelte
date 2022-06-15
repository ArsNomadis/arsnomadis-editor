<script>
    export let checked
    export let id
</script>

<label>
    <input id={id} type="checkbox" bind:checked />
    <span />
</label>

<style>
    label {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 17px;
    }

    label input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.2s;
        border-radius: 17px;
    }

    span:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.2s;
        border-radius: 50%;
    }

    input:checked + span {
        background-color: rgb(252, 201, 199);
    }

    input:checked + span {
        box-shadow: 0 0 1px rgb(252, 201, 199);
    }

    input:checked + span:before {
        transform: translateX(13px);
    }
</style>