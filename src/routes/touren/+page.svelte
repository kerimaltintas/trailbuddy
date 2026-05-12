<script lang="ts">
  let { data } = $props();

  let aktiveSchwierigkeit = $state('Alle');
  let aktiveRegion = $state('Alle');

  const schwierigkeiten = ['Alle', 'Einfach', 'Mittel', 'Schwer'];
  const regionen = $derived(['Alle', ...new Set(data.touren.map((t: any) => t.region))]);

  let gefilterteTouren = $derived(
    data.touren.filter((t: any) => {
      const schwierigkeitOk = aktiveSchwierigkeit === 'Alle' || t.schwierigkeit === aktiveSchwierigkeit;
      const regionOk = aktiveRegion === 'Alle' || t.region === aktiveRegion;
      return schwierigkeitOk && regionOk;
    })
  );
</script>

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
  <p>Keine Touren für diese Filter.</p>
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

  h2 {
    margin: 0 0 6px 0;
    font-size: 18px;
  }

  p {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 14px;
  }

  .badge {
    background: #d8f3dc;
    color: #2d6a4f;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 12px;
  }
</style>