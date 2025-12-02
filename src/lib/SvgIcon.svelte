<script>
    const { name } = $props();
</script>

{#if name === "lock"}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        ><g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            ><path
                d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
            /><path
                d="M11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4"
            /></g
        ></svg
    >
{:else if name === "power"}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 16 16"
        ><path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5m-2 1.8a.5.5 0 0 1-.3.7 5.5 5.5 0 0 0-3 6.2 5.5 5.5 0 0 0 1.8 3 5.5 5.5 0 1 0 5.8-9.2.5.5 0 1 1 .4-1 6.5 6.5 0 0 1 3.1 3.1 6.5 6.5 0 0 1-1.7 8 6.5 6.5 0 0 1-8.2 0 6.5 6.5 0 0 1-2.2-3.7 6.5 6.5 0 0 1 .5-4.3 6.5 6.5 0 0 1 3.1-3 .5.5 0 0 1 .7.2z"
            clip-rule="evenodd"
        /></svg
    >
{/if}
