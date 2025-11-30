<script>
  import DateCooker from './lib/DateCooker.svelte'

  let theDate = $state(new Date());
</script>

<main>
  <h1>Date cooker</h1>


  <div class="card">
    <DateCooker bind:value={theDate}/>

    <hr>

    <p>My cooker uses this interface to control the stove elements, now you can enjoy using it to pick a date!</p>
    <div style="font-size: 1.5rem">Date set to: <br>{theDate.toLocaleString()}</div>
  </div>
</main>

<style>
</style>
