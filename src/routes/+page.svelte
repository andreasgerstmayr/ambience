<script lang="ts">
  import Slideshow from '$lib/components/slideshow/Slideshow.svelte';
  import Clock from '$lib/components/Clock.svelte';
  import type { Config } from '$lib/types';
  import '../app.css';

  export let data: Config;
</script>

<Slideshow slides={data.slides} duration={data.duration} />
<Clock />
