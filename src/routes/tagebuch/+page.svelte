<script lang="ts">
  import { onMount } from 'svelte';

  let eintraege: any[] = $state([]);
  let loading = $state(true);
  let showForm = $state(false);
  let successMsg = $state('');

  let tourName = $state('');
  let datum = $state(new Date().toISOString().split('T')[0]);
  let notiz = $state('');
  let bewertung = $state(3);

  onMount(async () => {
    await ladeEintraege();
  });

  async function ladeEintraege() {
    loading = true;
    const res = await fetch('/api/eintraege');
    eintraege = await res.json();
    loading = false;
  }

  async function eintragSpeichern() {
    if (!tourName.trim()) return;
    const res = await fetch('/api/eintraege', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tourName, datum, notiz, bewertung })
    });
    if (res.ok) {
      successMsg = 'Eintrag gespeichert! ✓';
      tourName = '';
      notiz = '';
      bewertung = 3;
      showForm = false;
      await ladeEintraege();
      setTimeout(() => successMsg = '', 3000);
    }
  }

  async function eintragLoeschen(id: string) {
    await fetch(`/api/eintraege/${id}`, { method: 'DELETE' });
    await ladeEintraege();
  }

  function sterne(n: number) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }
</script>

<main class="container">
  <h1>📔 Mein Wandertagebuch</h1>

  {#if successMsg}
    <div class="success-banner">{successMsg}</div>
  {/if}

  <button class="btn-primary" onclick={() => showForm = !showForm}>
    {showForm ? '✕ Abbrechen' : '+ Neuer Eintrag'}
  </button>

  {#if showForm}
    <div class="form-card">
      <h2>Neue Tour festhalten</h2>

      <label>
        Tour / Ort *
        <input type="text" bind:value={tourName} placeholder="z.B. Uetliberg Rundweg" />
      </label>

      <label>
        Datum
        <input type="date" bind:value={datum} />
      </label>

      <label>
        Bewertung
        <div class="stern-auswahl">
          {#each [1,2,3,4,5] as n}
            <button
              class="stern {bewertung >= n ? 'aktiv' : ''}"
              onclick={() => bewertung = n}
            >★</button>
          {/each}
        </div>
      </label>

      <label>
        Notizen / Erinnerungen
        <textarea bind:value={notiz} rows="3" placeholder="Wie war die Tour? Was hast du gesehen?"></textarea>
      </label>

      <button class="btn-primary" onclick={eintragSpeichern}>
        💾 Eintrag speichern
      </button>
    </div>
  {/if}

  {#if loading}
    <p class="muted">Lade Einträge…</p>
  {:else if eintraege.length === 0}
    <div class="leer-state">
      <p>🥾 Noch keine Touren festgehalten.</p>
      <p class="muted">Klicke auf «Neuer Eintrag», um deine erste Wanderung zu dokumentieren.</p>
    </div>
  {:else}
    <div class="eintraege-liste">
      {#each eintraege as eintrag}
        <div class="eintrag-card">
          <div class="eintrag-header">
            <div>
              <strong>{eintrag.tourName}</strong>
              <span class="sterne">{sterne(eintrag.bewertung ?? 0)}</span>
            </div>
            <span class="datum">{new Date(eintrag.datum).toLocaleDateString('de-CH')}</span>
          </div>
          {#if eintrag.notiz}
            <p class="notiz">"{eintrag.notiz}"</p>
          {/if}
          <button class="btn-delete" onclick={() => eintragLoeschen(eintrag._id)}>
            Löschen
          </button>
        </div>
      {/each}
    </div>
  {/if}
</main>

<nav class="bottom-nav">
  <a href="/">🏠<span>Home</span></a>
  <a href="/touren">🔍<span>Suche</span></a>
  <a href="/tagebuch" class="active">📔<span>Tagebuch</span></a>
  <a href="/profil">👤<span>Profil</span></a>
</nav>

<style>
  .container { padding: 1rem 1rem 80px; max-width: 600px; margin: 0 auto; }
  h1 { font-size: 1.4rem; margin-bottom: 1rem; }
  h2 { font-size: 1.1rem; margin-bottom: 1rem; }

  .success-banner {
    background: #d4edda; color: #155724;
    padding: 0.75rem 1rem; border-radius: 8px;
    margin-bottom: 1rem; font-size: 0.9rem;
  }

  .btn-primary {
    background: #2d6a4f; color: white;
    border: none; padding: 0.6rem 1.2rem;
    border-radius: 8px; font-size: 0.9rem;
    cursor: pointer; margin-bottom: 1rem;
  }
  .btn-primary:hover { background: #1b4332; }

  .btn-delete {
    background: none; border: 1px solid #ccc;
    color: #666; padding: 0.3rem 0.7rem;
    border-radius: 6px; font-size: 0.8rem;
    cursor: pointer; margin-top: 0.5rem;
  }
  .btn-delete:hover { border-color: #e74c3c; color: #e74c3c; }

  .form-card {
    background: #f8f9fa; border: 1px solid #dee2e6;
    border-radius: 12px; padding: 1.2rem;
    margin-bottom: 1.5rem;
  }

  label {
    display: block; font-size: 0.85rem;
    font-weight: 600; color: #555;
    margin-bottom: 0.8rem;
  }
  input, textarea {
    display: block; width: 100%;
    padding: 0.5rem 0.75rem; margin-top: 0.25rem;
    border: 1px solid #dee2e6; border-radius: 8px;
    font-size: 0.9rem; box-sizing: border-box;
  }
  textarea { resize: vertical; }

  .stern-auswahl { display: flex; gap: 4px; margin-top: 0.25rem; }
  .stern {
    background: none; border: none;
    font-size: 1.4rem; cursor: pointer;
    color: #dee2e6; padding: 0;
  }
  .stern.aktiv { color: #f4a261; }

  .eintraege-liste { display: flex; flex-direction: column; gap: 0.75rem; }

  .eintrag-card {
    background: white; border: 1px solid #dee2e6;
    border-radius: 12px; padding: 1rem;
  }

  .eintrag-header {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 0.4rem;
  }

  .sterne { color: #f4a261; font-size: 0.85rem; margin-left: 6px; }
  .datum { font-size: 0.8rem; color: #888; }
  .notiz { font-style: italic; color: #555; font-size: 0.9rem; margin: 0.3rem 0; }
  .muted { color: #888; font-size: 0.9rem; }

  .leer-state {
    text-align: center; padding: 2rem;
    border: 2px dashed #dee2e6; border-radius: 12px;
  }

  .bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0;
    display: flex; background: white;
    border-top: 1px solid #eee; z-index: 100;
  }
  .bottom-nav a {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; padding: 0.6rem 0;
    text-decoration: none; color: #888; font-size: 0.7rem;
  }
  .bottom-nav a.active { color: #2d6a4f; }
</style>