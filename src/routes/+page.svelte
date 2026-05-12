<script lang="ts">
  let { data } = $props();
  let touren = data.touren;

  let fitnessLevel = $state(
    typeof localStorage !== 'undefined' 
      ? parseInt(localStorage.getItem('fitnessLevel') || '3') 
      : 3
  );

  const fitnessLabels = ['', 'Einsteiger', 'Leicht', 'Mittel', 'Fortgeschritten', 'Profi'];

  function fitnessAendern(e: Event) {
    fitnessLevel = parseInt((e.target as HTMLInputElement).value);
    localStorage.setItem('fitnessLevel', String(fitnessLevel));
  }
</script>

<div class="header">
  <h1>👋 Willkommen</h1>
  <p class="subtitle">Finde deine perfekte Wandertour</p>
</div>

<div class="fitness-box">
  <p class="box-label">Dein Fitnessstand</p>
  <input 
    type="range" 
    min="1" 
    max="5" 
    value={fitnessLevel}
    oninput={fitnessAendern}
    class="slider"
  />
  <div class="fitness-info">
    <span>Einsteiger</span>
    <span class="fitness-current">{fitnessLabels[fitnessLevel]}</span>
    <span>Profi</span>
  </div>
</div>

<div class="section-header">
  <h2>Zuletzt angesehen</h2>
  <a href="/touren">Alle anzeigen →</a>
</div>

{#each touren as tour}
  <a href="/touren/{tour._id}">
    <div class="tour-card">
      <h3>{tour.name}</h3>
      <p>📍 {tour.region} · ⏱ {tour.dauer} Min · 🏔 {tour.hoehenmeter}hm</p>
      <span class="badge">{tour.schwierigkeit}</span>
    </div>
  </a>
{/each}

<style>
  .header {
    margin-bottom: 24px;
  }

  h1 {
    margin: 0 0 4px 0;
    font-size: 26px;
  }

  .subtitle {
    margin: 0;
    color: #666;
  }

  .fitness-box {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .box-label {
    font-weight: 600;
    margin: 0 0 12px 0;
    color: #2d6a4f;
  }

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

  .fitness-current {
    font-weight: 600;
    color: #2d6a4f;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .section-header h2 {
    margin: 0;
    font-size: 18px;
  }

  .section-header a {
    color: #2d6a4f;
    text-decoration: none;
    font-size: 14px;
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

  h3 {
    margin: 0 0 6px 0;
    font-size: 16px;
  }

  p {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 13px;
  }

  .badge {
    background: #d8f3dc;
    color: #2d6a4f;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 12px;
  }
</style>