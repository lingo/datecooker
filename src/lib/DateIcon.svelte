<script>
  const { corner, filled=true } = $props();

  const getBorderRadius = (corner) => {
      return new Array(4)
        .fill("var(--rad, 2rem)")
        .map((v, x) => x == corner ? '0' : v)
        .join(' ');
  };
</script>

<i class="dateicon" style={`border-radius: ${getBorderRadius(corner)}`}></i>

<style type="text/css">

.dateicon {
  display: inline-block;
  min-width: var(--size, 0.6rem);
  min-height: var(--size, 0.6rem);
  background: var(--fill, white);
  border: 1px solid var(--stroke, #fff);
  padding: var(--size, 0.6rem);
}

</style>
