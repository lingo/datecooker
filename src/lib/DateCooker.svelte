<script>
  import Selector from "./DateSelector.svelte";
  import Btn from "./DateButton.svelte";
  import Elt from "./DateElement.svelte";
  import {getDateParts, States, buildDate} from './util.js';

  let { value = $bindable() } = $props();

  let values = $state(getDateParts(value));
  let state = $state(States.OFF);
  let selected = $state(-1);
  let isPowerOn = $state(false);
  let storedVal = $state(0);
  
  let blinkState = $state(true);

  const isLocked = $derived(state === States.LOCK);
  
  const viewModel = $derived(values.map((v, idx) => ({
    value: v,
    id: idx,
    state: (selected === idx) ? 'on' : 'off',
  })));

  const blinkColor = $derived.by(() => {
    return new Array(5).fill(0).map((_, i) => {
      return selected === i && state === States.ADJUSTING 
        ? (blinkState ? 'red' : 'black') 
        : undefined;
    })
  });

  const MAX_BLINKS = 8;
  let adjustingTimer = 0;
  let selectTimer = 0;
  let blinkCount = 0;

  function stopBlink(){
    if (adjustingTimer) {
      clearInterval(adjustingTimer);
      adjustingTimer = 0;
    }
    blinkCount = 0;
    blinkState = true;
  }

  function blinkSelection(){
    stopBlink();

    adjustingTimer = setInterval(() => {
      if (++blinkCount >= MAX_BLINKS) {
        stopBlink();
        value = buildDate(values);
        setState(States.SELECTED);
      } else {
        blinkState = !blinkState;
      }
    }, 500);
  }

  function beginUnselect() {
    clearTimeout(selectTimer);
    selectTimer = setTimeout(() => {
      clearTimeout(selectTimer);
      setState(States.WAIT_SELECT);
    }, 6000);
  }

  function setState(newState) {
    if (newState === undefined) {
      throw new Error('Unknown state');
    }

    if (newState === States.ADJUSTING) {
      blinkSelection();
      if (newState != state) {
        storedVal = values[selected];
      }
    } else {
      stopBlink();
    }

    if (newState === States.WAIT_SELECT || newState === States.LOCK) {
      selected = -1;
    }

    if (newState !== state && newState === States.SELECTED) {
      beginUnselect();
    }

    state = newState;
  };

  const updateVal = (delta) => () => {
    if (isLocked) {
      return;
    }
    
    if (selected == -1) {
      return;
    } else {
      setState(States.ADJUSTING);
      beginUnselect();
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
  }

  let lockTimer = 0;

  const lockDown = () => {
    if (state !== States.LOCK) {
      setState(States.LOCK);
    } else {
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => {
        setState(States.WAIT_SELECT);
      }, 3000);
    }
  }

  const lockUp = () => {
    clearTimeout(lockTimer);
  };
</script>

<div class="datecooker">
  <div class="elements">
    <Elt row="1" column="1" id={0} value={values[0]} --color={blinkColor[0]} />
    <Elt row="1" column="3" id={1} value={values[1]} --color={blinkColor[1]} />
    <Elt row="2" column="2" id={2} value={values[2]} --color={blinkColor[2]} />
    <Elt row="3" column="1" id={3} value={values[3]} --color={blinkColor[3]} />
    <Elt row="3" column="3" id={4} value={values[4]} --color={blinkColor[4]} />
  </div>

  <div class="selectors">
    {#each viewModel as sel}
      <Selector onclick={select(sel.id)} state={sel.state} id={sel.id} />
    {/each}
  </div>

  <div class="controls">
    <Btn onpointerdown={lockDown} onpointerup={lockUp} checked={isLocked}>🔒</Btn>
    <Btn onclick={updateVal(-1)} --margin-left="-0.5em" --pad="0.75rem">-</Btn>
    <Btn onclick={updateVal(+1)}>+</Btn>
    <Btn onclick={power} checked={isPowerOn}>⏼</Btn>
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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
