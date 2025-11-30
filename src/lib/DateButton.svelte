<script>
  let { children, checked=false, ...rest} = $props();
</script>

<button {...rest} class="datecooker-btn" class:b-on={checked}>{@render children?.()}</button>

<style>
button {
  position: relative;
  padding: var(--pad, 0.5em);
  left: var(--margin-left);
  right: var(--margin-right);
  
  &.b-on:after {
    content: ' ';
    background: red;
    filter: blur(2px);

    border-radius: 100%;

    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
