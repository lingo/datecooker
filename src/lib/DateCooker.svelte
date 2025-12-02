<script>
  import Selector from "./DateSelector.svelte";
  import Btn from "./DateButton.svelte";
  import Elt from "./DateElement.svelte";
  import SvgIcon from "./SvgIcon.svelte";
  import { getPartsFromDate, States, buildDateFromParts } from "./util";
  import { useTimeout, createBlinkEffect } from "./hooks.svelte.js";

  let { value = $bindable() } = $props();

  let values = $state(getPartsFromDate(value));
  let state = $state(States.OFF);
  let selected = $state(-1);
  let isPowerOn = $state(false);
  let storedVal = $state(0);

  const isLocked = $derived(state === States.LOCK);

  const viewModel = $derived.by(() => {
    // map value index to row,col positions and box-radius corner indicator
    const rowColMap = [
      { row: 1, column: 1, size: "4em", corner: 0 },
      { row: 1, column: 3, size: "3em", corner: 1 },
      { row: 2, column: 2, size: "6em", corner: 4 },
      { row: 3, column: 1, size: "4em", corner: 3 },
      { row: 3, column: 3, size: "3em", corner: 2 },
    ];

    return rowColMap.map((pos, i) => ({
      ...pos,
      id: i,
      value: values[i],
      checked: selected === i,
      color:
        selected === i && state === States.ADJUSTING
          ? blinkEffect.isOn
            ? "red"
            : "black"
          : undefined,
    }));
  });

  const lockTimeout = useTimeout(() => setState(States.WAIT_SELECT), 2000);
  const deselectTimeout = useTimeout(() => setState(States.WAIT_SELECT), 6000);

  const MAX_BLINKS = 8;
  const BLINK_DELAY_MSEC = 500;

  const blinkEffect = createBlinkEffect(
    () => {
      value = buildDateFromParts(values);
      setState(States.SELECTED);
    },
    BLINK_DELAY_MSEC,
    MAX_BLINKS,
  );

  function handleStateTransition(oldState, newState) {
    if (newState === States.ADJUSTING) {
      blinkEffect.start();

      if (newState != oldState) {
        storedVal = values[selected];
      }
    } else {
      blinkEffect.stop();
    }

    if (newState === States.WAIT_SELECT || newState === States.LOCK) {
      deselectTimeout.cancel();
      selected = -1;
    }

    if (newState === States.SELECTED) {
      deselectTimeout.start();
    }
  }

  function setState(newState) {
    if (newState === undefined) {
      throw new Error("Unknown state");
    }

    handleStateTransition(state, newState);
    state = newState;
  }

  const updateVal = (delta) => () => {
    if (isLocked) {
      return;
    }

    if (selected == -1) {
      return;
    } else {
      setState(States.ADJUSTING);
      deselectTimeout.start();
      values[selected] = Math.max(1, values[selected] + delta);
    }
  };

  const select = (index) => () => {
    if (isLocked || !isPowerOn) {
      return;
    }
    if (state === States.ADJUSTING) {
      // restore previous, as interrupted
      values[selected] = storedVal;
    }
    setState(States.SELECTED);
    selected = index;
    storedVal = values[selected];
  };

  const power = () => {
    isPowerOn = !isPowerOn;

    if (!isLocked) {
      setState(States.WAIT_SELECT);
    }
  };

  const lockDown = () => {
    if (state !== States.LOCK) {
      setState(States.LOCK);
    } else {
      lockTimeout.start();
    }
  };
</script>

<div class="datecooker">
  <div class="elements">
    {#each viewModel as pos}
      <Elt {...pos} --color={pos.color} />
    {/each}
  </div>

  <div class="selectors">
    {#each viewModel as sel}
      <Selector onclick={select(sel.id)} {...sel} />
    {/each}
  </div>

  <div class="controls">
    <Btn
      onpointerdown={lockDown}
      onpointerup={lockTimeout.cancel()}
      checked={isLocked}><SvgIcon name="lock" /></Btn
    >
    <Btn onclick={updateVal(-1)} --margin-left="-0.5em" --pad="0.75rem">-</Btn>
    <Btn onclick={updateVal(+1)}>+</Btn>
    <Btn onclick={power} checked={isPowerOn}><SvgIcon name="power" /></Btn>
  </div>
</div>

<style>
  .datecooker {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .elements {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    place-items: center;
    margin-bottom: 3rem;
  }

  .selectors {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  .controls {
    display: flex;
    justify-content: center;
    font-size: 1.25rem;
  }
</style>
