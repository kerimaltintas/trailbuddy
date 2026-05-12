<script>
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/" class:active={$page.url.pathname === '/'}>
    🏠<span>Home</span>
  </a>
  <a href="/touren" class:active={$page.url.pathname === '/touren'}>
    🔍<span>Suche</span>
  </a>
  <a href="/profil" class:active={$page.url.pathname === '/profil'}>
    👤<span>Profil</span>
  </a>
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: white;
    border-top: 1px solid #eee;
    padding: 10px 0;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: gray;
    font-size: 12px;
    gap: 2px;
  }

  a.active {
    color: #2d6a4f;
    font-weight: bold;
  }
</style>