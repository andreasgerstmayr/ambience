<script lang="ts">
  import { type SlideImage } from '$lib/types';

  export let image: SlideImage;
</script>

<div class="meta">
  <span class="location">{image.location}</span><br />
  <span class="date"
    >{image.date.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</span
  >
</div>

<style>
  .meta {
    position: absolute;
    display: inline-block;

    top: 80%;
    left: 5%;

    color: #fff;
    text-shadow: 0px 0px 15px black;
  }

  .location {
    font-size: 46px;
  }

  .date {
    font-size: 36px;
  }
</style>
