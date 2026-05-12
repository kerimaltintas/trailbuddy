<script lang="ts">
  const personas = [
    { id: 'familie', label: 'Familie', emoji: '👨‍👩‍👧', beschreibung: 'Gemütliche Touren für alle' },
    { id: 'aktiv', label: 'Aktiv', emoji: '🏃', beschreibung: 'Sportliche Herausforderungen' },
    { id: 'tourist', label: 'Tourist', emoji: '📸', beschreibung: 'Schöne Aussichten & Sehenswürdigkeiten' },
    { id: 'senior', label: 'Senior', emoji: '🧓', beschreibung: 'Ruhige & sichere Wege' },
  ];

  let aktivePersona = $state(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('persona') || ''
      : ''
  );

  let gespeichert = $state(false);

  function personaWaehlen(id: string) {
    aktivePersona = id;
    localStorage.setItem('persona', id);
    gespeichert = true;
    setTimeout(() => gespeichert = false, 2000);
  }
</script>

<h1>👤 Profil</h1>

<div class="section">
  <p class="section-label">Wähle deine Persona</p>

  <div class="personas">
    {#each personas as persona}
      <button 
        class="persona-card"
        class:aktiv={aktivePersona === persona.id}
        onclick={() => personaWaehlen(persona.id)}
      >
        <span class="emoji">{persona.emoji}</span>
        <span class="persona-label">{persona.label}</span>
        <span class="persona-desc">{persona.beschreibung}</span>
      </button>
    {/each}
  </div>
</div>

{#if gespeichert}
  <div class="success">✅ Profil gespeichert!</div>
{/if}

<div class="section">
  <p class="section-label">Fitness-Apps verbinden</p>

  <div class="app-list">
    <div class="app-item">
      <span>🍎 Apple Health</span>
      <button class="connect-btn">Verbinden</button>
    </div>
    <div class="app-item">
      <span>🟠 Strava</span>
      <button class="connect-btn">Verbinden</button>
    </div>
    <div class="app-item">
      <span>⌚ Garmin</span>
      <button class="connect-btn">Verbinden</button>
    </div>
  </div>
</div>

<div class="section">
  <a href="/touren" class="touren-btn">
    🥾 Passende Touren anzeigen
  </a>
</div>

<style>
  h1 {
    margin-bottom: 24px;
  }

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
  }

  .persona-card.aktiv {
    border-color: #2d6a4f;
    background: #d8f3dc;
  }

  .emoji {
    font-size: 28px;
  }

  .persona-label {
    font-weight: 600;
    font-size: 14px;
  }

  .persona-desc {
    font-size: 11px;
    color: #666;
  }

  .success {
    background: #d8f3dc;
    color: #2d6a4f;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 16px;
    font-weight: 600;
    text-align: center;
  }

  .app-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

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
    cursor: pointer;
    font-size: 13px;
  }

  .connect-btn:hover {
    background: #2d6a4f;
    color: white;
  }

  .touren-btn {
    display: block;
    background: #2d6a4f;
    color: white;
    text-align: center;
    padding: 16px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
  }
</style>