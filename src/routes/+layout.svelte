<script>
  import BottomNav from '$lib/components/BottomNav.svelte';
</script>

<main>
  <slot />
</main>

<BottomNav />

<style>
  main {
    padding: 16px;
    padding-bottom: 80px; /* Platz für BottomNav */
    max-width: 430px;     /* Mobile-Breite */
    margin: 0 auto;
  }
</style>
