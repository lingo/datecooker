<script>
  const { value = 0, id, row, size, column } = $props();
</script>

<output style:--size={size} style:grid-row={row} style:grid-column={column}>{value}</output>

<style>
  output {
    font-size: 1.5rem;
    display: inline-flex;
    aspect-ratio: 1 / 1;
    border: 5px double white;
    border-radius: 100%;
    width: auto;
    height: var(--size, 4em);
    align-items: center;
    justify-content: center;

    color: var(--color, white);
  }
</style>
