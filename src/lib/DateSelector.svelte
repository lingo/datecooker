<script>
  import Icon from "./DateIcon.svelte";
  import Btn from "./DateButton.svelte";

  let { id, onclick, corner, checked = false } = $props();

  let isSel = (i, val) => (i === id ? val : undefined);
  let notSel = (i, val) => (i === id ? undefined : val);
</script>

<div>
  <Btn {onclick} {checked} --pad="0.6rem"
    ><Icon {corner} /></Btn
  >
</div>

<style>
  div {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
</style>
