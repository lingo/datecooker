<script>
  import DateCooker from './lib/DateCooker.svelte'

  let theDate = $state(new Date());
</script>

<main>
  <h1>Date cooker</h1>

  <div class="card">
    <DateCooker bind:value={theDate}/>

    <hr>

    <div style="font-size: 1.5rem">Date set to: <br>{theDate.toLocaleString()}</div>
  </div>
</main>

<style>
</style>
