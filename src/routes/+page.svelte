<script lang="ts">
  import { onMount } from 'svelte';
  let { data } = $props();

  let profilEingerichtet = $state(false);
  let persona = $state('');
  let fitnessLevel = $state(3);
  let ueberspringen = $state(false);

  const personaEmoji: Record<string, string> = {
    geniessen: '🌿',
    sportlich: '🏃',
    entdecker: '📸',
    gemutlich: '🧓'
  };

  const personaLabel: Record<string, string> = {
    geniessen: 'Geniesser',
    sportlich: 'Sportlich',
    entdecker: 'Entdecker',
    gemutlich: 'Gemütlich'
  };

  onMount(() => {
    profilEingerichtet = localStorage.getItem('profil_eingerichtet') === 'true';
    persona = localStorage.getItem('persona') || '';
    fitnessLevel = parseInt(localStorage.getItem('fitnessLevel') || '3');
    ueberspringen = localStorage.getItem('onboarding_skip') === 'true';
  });

  function skip() {
    localStorage.setItem('onboarding_skip', 'true');
    ueberspringen = true;
  }

  // Touren passend zur Persona filtern
  const passendeTouren = $derived(
    data.touren
      .filter((t: any) => {
        if (!persona) return true;

        if (persona === 'gemutlich') {
          return t.schwierigkeit === 'Einfach';
        }

        if (persona === 'geniessen') {
          return fitnessLevel <= 2
            ? t.schwierigkeit === 'Einfach'
            : t.schwierigkeit === 'Einfach' || t.schwierigkeit === 'Mittel';
        }

        if (persona === 'entdecker') {
          return fitnessLevel <= 2
            ? t.schwierigkeit === 'Einfach'
            : t.schwierigkeit === 'Einfach' || t.schwierigkeit === 'Mittel';
        }

        if (persona === 'sportlich') {
          return fitnessLevel <= 2
            ? t.schwierigkeit === 'Einfach' || t.schwierigkeit === 'Mittel'
            : t.schwierigkeit === 'Mittel' || t.schwierigkeit === 'Schwer';
        }

        return true;
      })
      .slice(0, 3)
  );

  const letzteTouren = $derived(data.touren.slice(0, 3));
</script>

{#if !profilEingerichtet && !ueberspringen}
  <div class="onboarding-banner">
    <div class="onboarding-icon">🥾</div>
    <h2>Willkommen bei TrailBuddy!</h2>
    <p>Richte dein Profil ein damit wir dir passende Wandertouren empfehlen können. Du kannst dies jederzeit auch später unter <strong>Profil</strong> im Menü anpassen.</p>
    <a href="/profil" class="btn-profil">Profil einrichten</a>
    <button class="btn-skip" onclick={skip}>Überspringen</button>
  </div>

{:else}
  <div class="header">
    {#if persona}
    <h1>👋 Willkommen!</h1>
    <p class="subtitle">Hier sind passende Touren für dich</p>
  {:else}
    <h1>👋 Willkommen</h1>
    <p class="subtitle">Finde deine perfekte Wandertour</p>
  {/if}
  </div>

  {#if persona}
    <div class="section-header">
      <h2>Passende Touren</h2>
      <a href="/touren">Alle anzeigen →</a>
    </div>
    {#each passendeTouren as tour}
      <a href="/touren/{tour._id}">
        <div class="tour-card">
          <h3>{tour.name}</h3>
          <p>📍 {tour.region} · ⏱ {tour.dauer} Min · 🏔 {tour.hoehenmeter}hm</p>
          <span class="badge">{tour.schwierigkeit}</span>
        </div>
      </a>
    {/each}
  {:else}
    <div class="section-header">
      <h2>Zuletzt hinzugefügt</h2>
      <a href="/touren">Alle anzeigen →</a>
    </div>
    {#each letzteTouren as tour}
      <a href="/touren/{tour._id}">
        <div class="tour-card">
          <h3>{tour.name}</h3>
          <p>📍 {tour.region} · ⏱ {tour.dauer} Min · 🏔 {tour.hoehenmeter}hm</p>
          <span class="badge">{tour.schwierigkeit}</span>
        </div>
      </a>
    {/each}
  {/if}
{/if}

<nav class="bottom-nav">
  <a href="/" class="active">🏠<span>Home</span></a>
  <a href="/touren">🔍<span>Suche</span></a>
  <a href="/tagebuch">📔<span>Tagebuch</span></a>
  <a href="/profil">👤<span>Profil</span></a>
</nav>

<style>
  .onboarding-banner {
    text-align: center;
    padding: 2rem 1rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    margin-top: 1rem;
  }

  .onboarding-icon { font-size: 3rem; margin-bottom: 0.5rem; }

  .onboarding-banner h2 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
    color: #1b4332;
  }

  .onboarding-banner p {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 1.5rem;
    line-height: 1.5;
  }

  .btn-profil {
    display: block;
    background: #2d6a4f;
    color: white;
    padding: 14px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .btn-profil:hover { background: #1b4332; }

  .btn-skip {
    background: none;
    border: none;
    color: #999;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 8px;
    text-decoration: underline;
  }

  .header { margin-bottom: 24px; }
  h1 { margin: 0 0 4px 0; font-size: 24px; }
  .subtitle { margin: 0; color: #666; font-size: 0.9rem; }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .section-header h2 { margin: 0; font-size: 18px; }
  .section-header a { color: #2d6a4f; text-decoration: none; font-size: 14px; }

  a { text-decoration: none; color: inherit; }

  .tour-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-left: 4px solid #2d6a4f;
  }

  h3 { margin: 0 0 6px 0; font-size: 16px; }
  p { margin: 0 0 8px 0; color: #666; font-size: 13px; }

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