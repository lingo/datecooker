<script>
  import Icon from "./DateIcon.svelte";
  import Btn from "./DateButton.svelte";

  const cornerMap = {
    0: 0,
    1: 1,
    2: 4,
    3: 3,
    4: 2,
  };
  
  let { id, onclick, state:btnState='off' } = $props();

  let isSel = (i, val) => i === id ? val : undefined;
  let notSel = (i, val) => i === id ? undefined : val;
</script>

<div>
  <Btn {onclick} checked={btnState === 'on'} --pad="0.6rem"><Icon corner={cornerMap[id]} /></Btn>
</div>

<style>
div {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
