<script lang="ts">
  import { onMount } from 'svelte';
  import { type Slide } from '$lib/types';
  import ImageSlide from './ImageSlide.svelte';

  export let slides: Slide[];
  export let duration: number;

  let index = 0;
  $: curPage = slides[index];
  $: nextPage = slides[(index + 1) % slides.length];

  let interval = 0;
  function play() {
    if (interval) return;

    interval = setInterval(() => {
      index = (index + 1) % slides.length;
    }, duration * 1000);
  }
  function pause() {
    if (!interval) return;

    clearInterval(interval);
    interval = 0;
  }
  function toggle() {
    if (interval) {
      pause();
    } else {
      play();
    }
  }

  onMount(() => {
    play();

    return () => {
      pause();
    };
  });

  function onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowLeft':
        pause();
        index--;
        break;

      case 'ArrowRight':
        pause();
        index++;
        break;

      case 'Space':
      case 'MediaPlayPause':
        toggle();
        break;

      case 'KeyS':
      case 'MediaStop':
        pause();
        break;

      case 'KeyP':
        play();
        break;
    }
  }
</script>

<ImageSlide images={nextPage.images} />
<ImageSlide images={curPage.images} />

<svelte:window on:keydown={onKeyDown} />
