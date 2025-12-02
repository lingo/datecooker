import { onDestroy } from 'svelte';

export function useTimeout(callback, delay) {
  let timerId = 0;

  const timer = {
    start() {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        clearTimeout(timerId);
        callback();
      }, delay);
    },
    cancel() {
      clearTimeout(timerId);
    }
  };

  onDestroy(() => timer.cancel());
  return timer;
}

export function createBlinkEffect(onComplete, interval = 500, maxBlinks = 8) {
  let timerId = 0;
  let blinkCount = 0;
  let isBlinkOn = $state(true);

  function stop() {
    if (timerId) {
      clearInterval(timerId);
      timerId = 0;
    }
    blinkCount = 0;
    isBlinkOn = true;
  }

  function start() {
    stop();

    timerId = setInterval(() => {
      if (++blinkCount >= maxBlinks) {
        stop();
        onComplete();
      } else {
        isBlinkOn = !isBlinkOn;
      }
    }, interval);
  }

  onDestroy(stop);

  return {
    get isOn() { return isBlinkOn; },
    start,
    stop
  };
}