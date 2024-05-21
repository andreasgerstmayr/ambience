<script lang="ts">
  import { type SlideImage } from '$lib/types';
  import Meta from './ImageMeta.svelte';

  export let images: SlideImage[];
</script>

<div class="images">
  {#if images.length == 1}
    <div class="image" style:background-image={`url(${images[0].src})`}>
      <Meta image={images[0]} />
    </div>
  {:else}
    <div class="image left" style:background-image={`url(${images[0].src})`}>
      <Meta image={images[0]} />
    </div>
    <div class="image right" style:background-image={`url(${images[1].src})`} style:right="0">
      <Meta image={images[1]} />
    </div>
  {/if}
</div>

<style>
  .images {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .image {
    position: absolute;
    width: 100%;
    height: 100%;

    background-size: cover;
    background-position: center;
  }

  .image.left {
    width: 50%;
    border-right: 8px solid #000;
  }
  .image.right {
    width: 50%;
    border-left: 8px solid #000;
  }
</style>
