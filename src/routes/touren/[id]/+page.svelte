<script lang="ts">
  let { data } = $props();
  let tour = data.tour;

  // Fitness-Match berechnen
  const fitnessLevel = parseInt(localStorage.getItem('fitnessLevel') || '3');
  const diff = Math.abs(fitnessLevel - tour.fitnessLevel);
  const match = Math.max(0, 100 - diff * 20);

  let gestartet = $state(false);

  function tourStarten() {
    gestartet = true;
  }
</script>

<a href="/touren" class="back">← Zurück</a>

<div class="detail">
  <h1>{tour.name}</h1>
  <p class="region">📍 {tour.region}</p>

  <div class="stats">
    <div class="stat">
      <span class="label">Dauer</span>
      <span class="value">⏱ {tour.dauer} Min</span>
    </div>
    <div class="stat">
      <span class="label">Distanz</span>
      <span class="value">📏 {tour.distanz} km</span>
    </div>
    <div class="stat">
      <span class="label">Höhenmeter</span>
      <span class="value">🏔 {tour.hoehenmeter} hm</span>
    </div>
    <div class="stat">
      <span class="label">Schwierigkeit</span>
      <span class="value">{tour.schwierigkeit}</span>
    </div>
  </div>

  <div class="match-box">
    <p class="match-label">Fitness-Match</p>
    <div class="match-bar">
      <div class="match-fill" style="width: {match}%"></div>
    </div>
    <p class="match-percent">{match}% passend für dein Level</p>
  </div>

  <p class="beschreibung">{tour.beschreibung}</p>

  {#if gestartet}
    <div class="success">
      ✅ Tour wurde gestartet! Viel Spass auf dem Weg!
    </div>
  {:else}
    <button onclick={tourStarten} class="start-btn">
      🚀 Tour starten
    </button>
  {/if}
</div>

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

  h1 {
    margin: 0 0 4px 0;
    font-size: 24px;
  }

  .region {
    color: #666;
    margin: 0 0 20px 0;
  }

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

  .label {
    font-size: 11px;
    color: #999;
    text-transform: uppercase;
  }

  .value {
    font-size: 15px;
    font-weight: 600;
  }

  .match-box {
    background: #d8f3dc;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .match-label {
    margin: 0 0 8px 0;
    font-weight: 600;
    color: #2d6a4f;
  }

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

  .match-percent {
    margin: 0;
    font-size: 13px;
    color: #2d6a4f;
  }

  .beschreibung {
    color: #444;
    line-height: 1.6;
    margin-bottom: 24px;
  }

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

  .start-btn:hover {
    background: #1b4332;
  }

  .success {
    background: #d8f3dc;
    color: #2d6a4f;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    font-weight: 600;
  }
</style>