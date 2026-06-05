<script lang="ts">
  let { data } = $props();

  let aktiveSchwierigkeit = $state('Alle');
  let aktiveRegion = $state('Alle');
  let aktiveDauer = $state('Alle');

  const schwierigkeiten = ['Alle', 'Einfach', 'Mittel', 'Schwer'];
  const regionen = $derived(['Alle', ...new Set(data.touren.map((t: any) => t.region))]);
  const dauern = ['Alle', '1–2h', '2–4h', '4h+'];

  let gefilterteTouren = $derived(
    data.touren.filter((t: any) => {
      const schwierigkeitOk = aktiveSchwierigkeit === 'Alle' || t.schwierigkeit === aktiveSchwierigkeit;
      const regionOk = aktiveRegion === 'Alle' || t.region === aktiveRegion;
      const dauerOk =
        aktiveDauer === 'Alle' ||
        (aktiveDauer === '1–2h' && t.dauer > 60 && t.dauer <= 120) ||
        (aktiveDauer === '2–4h' && t.dauer > 120 && t.dauer <= 240) ||
        (aktiveDauer === '4h+' && t.dauer > 240);
      return schwierigkeitOk && regionOk && dauerOk;
    })
  );
</script>

<div style="padding-bottom: 70px">

<h1>🥾 Touren finden</h1>

<div class="filter-section">
  <p class="filter-label">Schwierigkeit</p>
  <div class="chips">
    {#each schwierigkeiten as s}
      <button
        class="chip"
        class:aktiv={aktiveSchwierigkeit === s}
        onclick={() => aktiveSchwierigkeit = s}
      >
        {s}
      </button>
    {/each}
  </div>

  <p class="filter-label">Dauer</p>
  <div class="chips">
    {#each dauern as d}
      <button
        class="chip"
        class:aktiv={aktiveDauer === d}
        onclick={() => aktiveDauer = d}
      >
        {d}
      </button>
    {/each}
  </div>

  <p class="filter-label">Region</p>
  <div class="chips">
    {#each regionen as r}
      <button
        class="chip"
        class:aktiv={aktiveRegion === r}
        onclick={() => aktiveRegion = r}
      >
        {r}
      </button>
    {/each}
  </div>
</div>

<p class="treffer">{gefilterteTouren.length} Touren gefunden</p>

{#if gefilterteTouren.length === 0}
  <p class="keine">Keine Touren für diese Filter.</p>
{:else}
  {#each gefilterteTouren as tour}
    <a href="/touren/{tour._id}">
      <div class="tour-card">
        <h2>{tour.name}</h2>
        <p>📍 {tour.region} · ⏱ {tour.dauer} Min · 🏔 {tour.hoehenmeter}hm</p>
        <span class="badge">{tour.schwierigkeit}</span>
      </div>
    </a>
  {/each}
{/if}

</div>

<nav class="bottom-nav">
  <a href="/">🏠<span>Home</span></a>
  <a href="/touren" class="active">🔍<span>Suche</span></a>
  <a href="/tagebuch">📔<span>Tagebuch</span></a>
  <a href="/profil">👤<span>Profil</span></a>
</nav>

<style>
  .filter-section {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .filter-label {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    margin: 0 0 8px 0;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .chip {
    background: #f0f0f0;
    border: none;
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 14px;
    cursor: pointer;
  }

  .chip.aktiv {
    background: #2d6a4f;
    color: white;
  }

  .treffer {
    color: #666;
    font-size: 14px;
    margin-bottom: 12px;
  }

  .keine {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 2rem 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .tour-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-left: 4px solid #2d6a4f;
  }

  h2 { margin: 0 0 6px 0; font-size: 18px; }
  p { margin: 0 0 8px 0; color: #666; font-size: 14px; }

  .badge {
    background: #d8f3dc;
    color: #2d6a4f;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 12px;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    display: flex;
    background: white;
    border-top: 1px solid #eee;
    z-index: 100;
  }

  .bottom-nav a {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.6rem 0;
    text-decoration: none;
    color: #888;
    font-size: 0.7rem;
    gap: 2px;
  }

  .bottom-nav a.active { color: #2d6a4f; font-weight: 600; }
</style>