<script lang="ts">
  import { onMount } from 'svelte';

  const personas = [
    { id: 'geniessen', label: 'Geniesser', emoji: '🌿', beschreibung: 'Ruhige, schöne Touren' },
    { id: 'sportlich', label: 'Sportlich', emoji: '🏃', beschreibung: 'Sportliche Herausforderungen' },
    { id: 'entdecker', label: 'Entdecker', emoji: '📸', beschreibung: 'Neue Orte & Aussichten' },
    { id: 'gemutlich', label: 'Gemütlich', emoji: '🧓', beschreibung: 'Kurze & sichere Wege' },
  ];

  const fitnessLabels = ['', 'Einsteiger', 'Leicht', 'Mittel', 'Fortgeschritten', 'Profi'];

  let aktivePersona = $state('');
  let fitnessLevel = $state(3);
  let gespeichert = $state(false);

  function getBrowserId(): string {
    let id = localStorage.getItem('trailbuddy_user_id');
    if (!id) {
      id = 'user_' + crypto.randomUUID();
      localStorage.setItem('trailbuddy_user_id', id);
    }
    return id;
  }

  onMount(async () => {
    const userId = getBrowserId();
    fitnessLevel = parseInt(localStorage.getItem('fitnessLevel') || '3');
    const res = await fetch(`/api/profil?userId=${userId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.persona) aktivePersona = data.persona;
      if (data.fitnessLevel) fitnessLevel = data.fitnessLevel;
    }
  });

  async function speichern() {
    if (!aktivePersona) return;
    const userId = getBrowserId();
    localStorage.setItem('fitnessLevel', String(fitnessLevel));
    localStorage.setItem('persona', aktivePersona);
    localStorage.setItem('profil_eingerichtet', 'true');

    const res = await fetch('/api/profil', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona: aktivePersona, fitnessLevel, userId })
    });

    if (res.ok) {
      gespeichert = true;
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }
</script>

<h1>👤 Profil einrichten</h1>
<p class="subtitle">Damit wir dir passende Touren empfehlen können.</p>

<div class="section">
  <p class="section-label">Wer bist du?</p>
  <div class="personas">
    {#each personas as persona}
      <button
        class="persona-card"
        class:aktiv={aktivePersona === persona.id}
        onclick={() => aktivePersona = persona.id}
      >
        <span class="emoji">{persona.emoji}</span>
        <span class="persona-label">{persona.label}</span>
        <span class="persona-desc">{persona.beschreibung}</span>
      </button>
    {/each}
  </div>
</div>

<div class="section">
  <p class="section-label">Dein Fitnessstand</p>
  <input
    type="range"
    min="1"
    max="5"
    bind:value={fitnessLevel}
    class="slider"
  />
  <div class="fitness-info">
    <span>Einsteiger</span>
    <span class="fitness-current">{fitnessLabels[fitnessLevel]}</span>
    <span>Profi</span>
  </div>
</div>

{#if gespeichert}
  <div class="success">✅ Profil gespeichert! Weiterleitung…</div>
{:else}
  <button
    class="btn-speichern"
    onclick={speichern}
    disabled={!aktivePersona}
  >
    💾 Profil speichern & loslegen
  </button>
  {#if !aktivePersona}
    <p class="hinweis">Bitte wähle zuerst eine Persona aus.</p>
  {/if}
{/if}

<div class="section">
  <p class="section-label">Fitness-Apps verbinden</p>
  <p class="coming-soon-text">🚧 In einer zukünftigen Version verfügbar</p>
  <div class="app-list">
    <div class="app-item">
      <span>🍎 Apple Health</span>
      <button class="connect-btn" disabled>Bald verfügbar</button>
    </div>
    <div class="app-item">
      <span>🟠 Strava</span>
      <button class="connect-btn" disabled>Bald verfügbar</button>
    </div>
    <div class="app-item">
      <span>⌚ Garmin</span>
      <button class="connect-btn" disabled>Bald verfügbar</button>
    </div>
  </div>
</div>

<nav class="bottom-nav">
  <a href="/">🏠<span>Home</span></a>
  <a href="/touren">🔍<span>Suche</span></a>
  <a href="/tagebuch">📔<span>Tagebuch</span></a>
  <a href="/profil" class="active">👤<span>Profil</span></a>
</nav>

<style>
  h1 { margin-bottom: 4px; }
  .subtitle { color: #666; font-size: 0.9rem; margin: 0 0 24px; }

  .section {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .section-label {
    font-weight: 600;
    color: #2d6a4f;
    margin: 0 0 16px 0;
  }

  .personas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .persona-card {
    background: #f8f9fa;
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 16px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
    transition: all 0.15s;
  }

  .persona-card:hover { border-color: #b7e4c7; }
  .persona-card.aktiv {
    border-color: #2d6a4f;
    background: #d8f3dc;
  }

  .emoji { font-size: 28px; }
  .persona-label { font-weight: 600; font-size: 14px; }
  .persona-desc { font-size: 11px; color: #666; }

  .slider {
    width: 100%;
    accent-color: #2d6a4f;
    margin-bottom: 8px;
  }

  .fitness-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
  }

  .fitness-current { font-weight: 600; color: #2d6a4f; }

  .btn-speichern {
    width: 100%;
    padding: 16px;
    background: #2d6a4f;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 8px;
  }

  .btn-speichern:disabled {
    background: #aaa;
    cursor: not-allowed;
  }

  .btn-speichern:hover:not(:disabled) { background: #1b4332; }

  .hinweis {
    text-align: center;
    font-size: 0.8rem;
    color: #999;
    margin: 0 0 16px;
  }

  .success {
    background: #d8f3dc;
    color: #2d6a4f;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    font-weight: 600;
    text-align: center;
  }

  .coming-soon-text { font-size: 12px; color: #999; margin: 0 0 12px 0; }

  .app-list { display: flex; flex-direction: column; gap: 12px; }

  .app-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
  }

  .connect-btn {
    background: #f0f0f0;
    border: none;
    border-radius: 8px;
    padding: 6px 14px;
    cursor: not-allowed;
    font-size: 13px;
    color: #bbb;
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