<script lang="ts">
  import { onMount } from 'svelte';

  let now = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div>
  <span
    >{now.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric'
    })}</span
  >
</div>

<style>
  div {
    position: absolute;
    display: inline-block;

    top: 80%;
    right: 5%;

    font-size: 56px;
    color: #fff;
    text-shadow: 0px 0px 15px black;
  }
</style>
