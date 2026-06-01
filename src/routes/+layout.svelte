<script lang="ts">
</script>

<div class="app-shell">
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #f0f4f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 100vh;
  }

  .app-shell {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at top left, #d8f3dc 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, #b7e4c7 0%, transparent 50%),
      #f0f4f0;
  }

  main {
    padding: 24px 16px 80px;
    max-width: 430px;
    margin: 0 auto;
  }
</style>