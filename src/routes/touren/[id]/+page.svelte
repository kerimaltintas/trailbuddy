<script lang="ts">
  let { data } = $props();

  const fitnessLevel = typeof localStorage !== 'undefined'
    ? parseInt(localStorage.getItem('fitnessLevel') || '3')
    : 3;

  const match = $derived(Math.max(0, 100 - Math.abs(fitnessLevel - data.tour.fitnessLevel) * 20));

  let showForm = $state(false);
  let bewertung = $state(3);
  let notiz = $state('');
  let datum = $state(new Date().toISOString().split('T')[0]);
  let gespeichert = $state(false);
  let laden = $state(false);

  async function eintragSpeichern() {
    laden = true;
    const res = await fetch('/api/eintraege', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tourName: data.tour.name,
        tourId: data.tour._id,
        datum,
        notiz,
        bewertung
      })
    });
    laden = false;
    if (res.ok) {
      gespeichert = true;
      showForm = false;
    }
  }
</script>

<div style="padding-bottom: 70px">

  <a href="/touren" class="back">← Zurück</a>

  <div class="detail">
    <h1>{data.tour.name}</h1>
    <p class="region">📍 {data.tour.region}</p>

    <div class="stats">
      <div class="stat">
        <span class="label">Dauer</span>
        <span class="value">⏱ {data.tour.dauer} Min</span>
      </div>
      <div class="stat">
        <span class="label">Distanz</span>
        <span class="value">📏 {data.tour.distanz} km</span>
      </div>
      <div class="stat">
        <span class="label">Höhenmeter</span>
        <span class="value">🏔 {data.tour.hoehenmeter} hm</span>
      </div>
      <div class="stat">
        <span class="label">Schwierigkeit</span>
        <span class="value">{data.tour.schwierigkeit}</span>
      </div>
    </div>

    <div class="match-box">
      <p class="match-label">Fitness-Match</p>
      <div class="match-bar">
        <div class="match-fill" style="width: {match}%"></div>
      </div>
      <p class="match-percent">{match}% passend für dein Level</p>
    </div>

    <p class="beschreibung">{data.tour.beschreibung}</p>

    {#if gespeichert}
      <div class="success">
        ✅ Tour im Tagebuch gespeichert!
      </div>
    {:else if showForm}
      <div class="tagebuch-form">
        <h3>Tour festhalten</h3>

        <label>
          Datum
          <input type="date" bind:value={datum} />
        </label>

        <label>
          Bewertung
          <div class="sterne">
            {#each [1,2,3,4,5] as n}
              <button
                class="stern {bewertung >= n ? 'aktiv' : ''}"
                onclick={() => bewertung = n}
              >★</button>
            {/each}
          </div>
        </label>

        <label>
          Notiz (optional)
          <textarea bind:value={notiz} rows="2" placeholder="Wie war die Tour?"></textarea>
        </label>

        <div class="form-buttons">
          <button onclick={() => showForm = false} class="btn-abbrechen">Abbrechen</button>
          <button onclick={eintragSpeichern} class="btn-speichern" disabled={laden}>
            {laden ? 'Speichert…' : '💾 Speichern'}
          </button>
        </div>
      </div>
    {:else}
      <button onclick={() => showForm = true} class="start-btn">
        ✓ Tour als erledigt markieren
      </button>
    {/if}
  </div>

</div>

<nav class="bottom-nav">
  <a href="/">🏠<span>Home</span></a>
  <a href="/touren" class="active">🔍<span>Suche</span></a>
  <a href="/tagebuch">📔<span>Tagebuch</span></a>
  <a href="/profil">👤<span>Profil</span></a>
</nav>

<style>
  .back {
    display: inline-block;
    margin-bottom: 16px;
    color: #2d6a4f;
    text-decoration: none;
    font-weight: 500;
  }

  .detail {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  }

  h1 { margin: 0 0 4px 0; font-size: 24px; }
  .region { color: #666; margin: 0 0 20px 0; }

  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .stat {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label { font-size: 11px; color: #999; text-transform: uppercase; }
  .value { font-size: 15px; font-weight: 600; }

  .match-box {
    background: #d8f3dc;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .match-label { margin: 0 0 8px 0; font-weight: 600; color: #2d6a4f; }

  .match-bar {
    background: #b7e4c7;
    border-radius: 20px;
    height: 10px;
    margin-bottom: 6px;
  }

  .match-fill {
    background: #2d6a4f;
    height: 10px;
    border-radius: 20px;
    transition: width 0.5s ease;
  }

  .match-percent { margin: 0; font-size: 13px; color: #2d6a4f; }
  .beschreibung { color: #444; line-height: 1.6; margin-bottom: 24px; }

  .start-btn {
    width: 100%;
    background: #2d6a4f;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .start-btn:hover { background: #1b4332; }

  .success {
    background: #d8f3dc;
    color: #2d6a4f;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    font-weight: 600;
  }

  .tagebuch-form {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 16px;
  }

  .tagebuch-form h3 { margin: 0 0 12px; font-size: 1rem; color: #2d6a4f; }

  .tagebuch-form label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
    margin-bottom: 10px;
  }

  .tagebuch-form input[type="date"],
  .tagebuch-form textarea {
    display: block;
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 0.9rem;
    box-sizing: border-box;
    font-family: inherit;
  }

  .sterne { display: flex; gap: 4px; margin-top: 4px; }
  .stern {
    background: none;
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
    color: #dee2e6;
    padding: 0;
  }
  .stern.aktiv { color: #f4a261; }

  .form-buttons { display: flex; gap: 8px; margin-top: 12px; }

  .btn-abbrechen {
    flex: 1;
    padding: 10px;
    background: none;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .btn-speichern {
    flex: 2;
    padding: 10px;
    background: #2d6a4f;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
  }
  .btn-speichern:disabled { background: #aaa; }

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