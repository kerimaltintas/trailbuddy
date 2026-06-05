# Projektdokumentation - TrailBuddy

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen](#4-erweiterungen)
5. [Projektorganisation](#5-projektorganisation)
6. [KI-Deklaration](#6-ki-deklaration)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

---

## 1. Ausgangslage

- **Problem:** Bestehende Wander-Apps wie SchweizMobil oder Komoot sind mit technischen Daten überladen und berücksichtigen den individuellen Fitnessstand der Nutzenden kaum. Zudem fehlt eine einfache Möglichkeit, absolvierte Wanderungen persönlich festzuhalten und zu bewerten.
- **Ziele:**
  - Wandertouren intuitiv nach Fitnessstand, Schwierigkeit und Region filtern
  - Personalisierte Tourenempfehlungen basierend auf Persona und Fitnessstand
  - Absolvierte Touren in einem digitalen Wandertagebuch dokumentieren
  - Emotionalen Mehrwert durch Erinnerungen und Bewertungen schaffen
- **Primäre Zielgruppe:** Hobbywanderer in der Schweiz, die eine schnelle und übersichtliche Touren-Übersicht suchen — unabhängig von ihrem Erfahrungsstand.
- **Weitere Stakeholder:** Wandervereine, Tourismusverbände Schweiz

---

## 2. Lösungsidee

- **Kernfunktionalität:**
  - Onboarding: Nutzer richten beim ersten Besuch ihr Profil ein (Persona + Fitnessstand)
  - Tourensuche: Filterung nach Schwierigkeit und Region mit sofortigem Feedback
  - Tourdetail: Fitness-Match zeigt wie gut eine Tour zum eigenen Level passt
  - Wandertagebuch: Absolvierte Touren mit Datum, Bewertung und Notiz festhalten
  - Profil: Persona und Fitnessstand jederzeit anpassbar

- **Annahmen:**
  - Nutzende sind bereit, beim ersten Besuch kurz ihr Profil einzurichten
  - Eine Persona-basierte Filterung liefert relevantere Ergebnisse als reine Schwierigkeitsfilter

- **Abgrenzung:**
  - Keine Echtzeit-GPS-Navigation
  - Keine Integration externer Fitness-Apps (als zukünftige Erweiterung geplant)
  - Kein User-Login / Authentifizierung

---

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define

- **Zielgruppenverständnis:**

  Proto-Persona: *Lena, 32, Hobbyläuferin aus Zürich*
  - Geht gerne am Wochenende wandern, hat aber wenig Zeit für aufwendige Recherche
  - Frustriert von komplexen Karten-Apps mit zu vielen technischen Details
  - Wünscht sich: schnelle Filterung, klare Schwierigkeitsangaben, persönliches Tagebuch

- **Wesentliche Erkenntnisse:**
  - SchweizMobil und Komoot sind funktional überladen für Gelegenheitswanderer
  - Kein bestehendes Tool kombiniert einfache Filterung mit einem persönlichen Wandertagebuch
  - Nutzende scheitern nicht nur an einem Parameter (z.B. Schwierigkeit), sondern an der Kombination mit Zeit und Region
  - Fehlende Emotionalität: bestehende Apps sind sehr funktional, der Aspekt des «Erinnerns» kommt zu kurz

- **HMW-Fragen:**
  - Wie könnten wir Wandernden helfen, Touren intuitiv nach ihrem Fitnessstand zu filtern?
  - Wie könnten wir Wandernden helfen, eine Route schnell nach verfügbarem Zeitbudget zu finden?
  - Wie könnten wir das Festhalten von Erlebnissen zu einem positiven Ritual nach der Wanderung machen?

---

### 3.2 Sketch

- **Variantenüberblick:** Im Rahmen des Crazy-8s-Prozesses wurden 8 verschiedene Konzeptvarianten skizziert.

- **Skizzen:** Siehe `docs/skizzen/` im Repository (Crazy-8s Übersicht + 3 ausgearbeitete Varianten)

  Die 8 Varianten im Überblick:
  1. **Fitness-Slider** — Slider auf der Startseite zur Selbsteinschätzung des Fitnessstands
  2. **Persona-Karte** — Auswahl einer vordefinierten Nutzergruppe
  3. **Zeitrad** — Kreisförmige Auswahl der verfügbaren Zeit
  4. **Filter-Chips** — Chips für Schwierigkeit, Dauer und Region kombinierbar
  5. **Onboarding-Quiz** — Schrittweise Befragung zur Personalisierung
  6. **Karte + Badge** — Kartenansicht mit Schwierigkeitsbadge und Fitness-Match
  7. **Fitness-Apps verbinden** — Integration externer Fitness-Daten
  8. **Home-Dashboard** — Übersichtsseite mit zuletzt gesehenen Touren

  Ausgearbeitete Varianten (Seite 2):
  - **Variante A (Fitness-Slider):** Slider auf Startseite mit direkt darunter liegender Tourenliste
  - **Variante B (Filter-Chips):** Chips für Schwierigkeit, Dauer, Region — mit Echtzeit-Trefferzahl
  - **Variante C (Karte + Badge):** Kartenansicht mit Routenverlauf, Schwierigkeitsbadge und Fitness-Match-Balken

---

### 3.3 Decide

- **Gewählte Variante & Begründung:**

  Gewählt wurde **Variante B (Filter-Chips)**, kombiniert mit dem Onboarding-Ansatz aus Variante 5.

  Entscheidungskriterien:
  - **Niedrige kognitive Last:** Filter-Chips sind ein bekanntes UI-Muster (z.B. Google Maps, Booking.com) — keine Erklärung nötig
  - **Kombination mehrerer Dimensionen:** Schwierigkeit, Region und Persona gleichzeitig filterbar, was dem erkannten Problemraum direkt entspricht
  - **Sofortiges Feedback:** Trefferzahl aktualisiert sich direkt beim Antippen — schafft Erfolgserlebnis
  - **Erweiterbarkeit:** Chip-Struktur lässt sich leicht um weitere Kriterien ergänzen

- **End-to-End-Ablauf:**
  1. Nutzer öffnet App → Onboarding-Banner mit Hinweis zur Profil-Einrichtung
  2. Profil einrichten: Persona wählen (Geniesser / Sportlich / Entdecker / Gemütlich) + Fitnessstand setzen → Speichern
  3. Home zeigt personalisierte Tourenempfehlungen basierend auf Persona + Fitnessstand
  4. Nutzer wechselt zu «Suche» → Filter nach Schwierigkeit und Region setzen
  5. Tour aus der Liste auswählen → Detailansicht mit Fitness-Match-Balken
  6. Tour als erledigt markieren → Formular mit Datum, Sternbewertung und Notiz
  7. Tagebuch zeigt alle absolvierten Touren mit Bewertung

- **Mockup:** _[Figma-URL einfügen]_

---

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

- **Informationsarchitektur:**
  - `/` — Home (Onboarding-Banner oder personalisierte Tourenempfehlungen)
  - `/touren` — Tourensuche mit Filter-Chips (Schwierigkeit + Region)
  - `/touren/[id]` — Tourdetail mit Stats, Fitness-Match und Tagebuch-Formular
  - `/tagebuch` — Wandertagebuch (Einträge erstellen, lesen, löschen)
  - `/profil` — Persona-Auswahl + Fitnessstand-Slider

- **User Interface Design:**

  | Screen | Beschreibung |
  |--------|-------------|
  | Home (Onboarding) | Banner mit Erklärung, Buttons «Profil einrichten» und «Überspringen» |
  | Home (eingerichtet) | Begrüssung, personalisierte Tourenempfehlungen basierend auf Persona + Fitnessstand |
  | Tourensuche | Filter-Chips für Schwierigkeit und Region, Echtzeit-Trefferzahl, Tourenkarten |
  | Tourdetail | Stats-Grid (Dauer, Distanz, Höhenmeter, Schwierigkeit), Fitness-Match-Balken, Tagebuch-Formular |
  | Tagebuch | Eintrags-Formular (Tournamen, Datum, Sternbewertung, Notiz), Liste aller Einträge |
  | Profil | Persona-Auswahl (4 Karten), Fitnessstand-Slider (1–5), Speichern-Button |

- **Designentscheidungen:**
  - Primärfarbe `#2d6a4f` (Grün) — passend zum Natur-/Wander-Thema
  - Mobile-First Layout (max. 430px) — App primär für Smartphones konzipiert
  - Bottom-Navigation für schnellen Wechsel zwischen den 4 Hauptbereichen
  - Grüner Hintergrund-Gradient für natürliche Atmosphäre

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:** SvelteKit (Svelte 5 mit Runes), TypeScript, CSS
- **Tooling:** VS Code, Netlify, MongoDB Atlas, MongoDB Compass, GitHub
- **Struktur & Komponenten:**
  - `src/routes/` — Pages: `/`, `/touren`, `/touren/[id]`, `/tagebuch`, `/profil`
  - `src/routes/api/` — REST-Endpoints:
    - `GET/POST /api/eintraege` — Tagebucheinträge laden und erstellen
    - `DELETE /api/eintraege/[id]` — Einzelnen Eintrag löschen
    - `GET/PUT /api/profil` — Profil laden und speichern
    - `GET /api/touren` — Alle Touren aus MongoDB laden
- **Daten & Schnittstellen:**
  - MongoDB Atlas (Cloud), Collections: `touren`, `eintraege`, `profile`
  - API-Routen als SvelteKit Server-Handler (GET, POST, PUT, DELETE)
  - Browser-ID via `crypto.randomUUID()` für Profil-Persistenz ohne Login
  - `localStorage` als Fallback für Fitnessstand und Persona
- **Deployment:** [https://trailbuddypt11.netlify.app](https://trailbuddypt11.netlify.app)
- **Besondere Entscheidungen:**
  - Kein User-Login implementiert — vereinfachter Scope, eindeutige Browser-ID als Ersatz
  - Persona-Filter kombiniert mit Fitnessstand für präzisere Tourenempfehlungen
  - `history.back()` statt festem Link für korrekte Rückkehr zur gefilterten Tourenliste

---

### 3.5 Validate

- **URL der getesteten Version:** [https://trailbuddypt11.netlify.app](https://trailbuddypt11.netlify.app) 
  *(Hinweis: Die aktuelle Version enthält bereits die aus dem Test abgeleiteten Verbesserungen — siehe Kap. 4.4)*

- **Ziele der Prüfung:**
  - Können Nutzer ohne Vorwissen intuitiv eine passende Wanderung anhand von Kriterien wie Dauer, Region und Schwierigkeit finden?
  - Enthält die Detailseite alle relevanten Informationen für eine Entscheidung? Sind diese verständlich und gut auffindbar?

- **Vorgehen:** Moderierter Usability-Test (Think-Aloud-Methode), On-site 1:1 mit Testleiter, ca. 10 Minuten Durchführung + 10 Minuten Interview pro Person. Protokollierung via Feedback Grid (während Test) und Issue Map (nach Test).

- **Stichprobe:**

  | Testperson | Code | Szenario | Profil |
  |-----------|------|----------|--------|
  | Erik Rutzer | TP-01 | Tour finden | Gelegentlicher Wanderer (~1×/Monat), kennt Komoot, kein Auto |
  | Ahmed Kashif | TP-02 | Tourdetails lesen | Regelmässiger Wanderer (~2×/Monat), nutzt ÖV, sucht normalerweise via Google |

- **Aufgaben/Szenarien:**

  **Szenario 1 — Tour finden (TP-01):**
  > «Sie suchen eine geeignete Wanderung für nächsten Samstag – nicht zu anspruchsvoll, ca. 2–3 Stunden. Finden Sie eine passende Tour.»

  **Szenario 2 — Tourdetails lesen (TP-02):**
  > «Sie haben eine Tour gefunden und möchten mehr darüber erfahren, bevor Sie sich entscheiden. Verschaffen Sie sich einen Überblick über die wichtigsten Infos der Tour.»


- **Zusammenfassung der Resultate:**
  Beide Testpersonen fanden den Prototyp visuell ansprechend und konnten grundlegende Abläufe verstehen. TP-01 fand erfolgreich eine passende Tour (ca. 90 Sekunden), bemängelte jedoch den fehlenden Dauerfilter und das schwer auffindbare Suchfeld. TP-02 vermisste auf der Detailseite ein Höhenprofil und die ÖV-Anbindung — beides war für ihn entscheidungsrelevant. Übergreifend war der Begriff «Fitness-Level» beiden Testpersonen unklar und wurde mit «Schwierigkeit» verwechselt.

- **Abgeleitete Verbesserungen:**

  | Priorität | Problem | Massnahme |
  |-----------|---------|-----------|
  | 🔴 Hoch   | Begriff «Fitness-Level» unklar | Personas umbennenen um Zielgruppe präziser anzusprechen |
  | 🔴 Hoch   | Keine saisonale Empfehlung | Empfohlene Jahreszeit auf Detailseite ergänzen |
  | 🔴 Hoch   | Kein Dauerfilter vorhanden | Schieberegler für Dauer als Filter ergänzen |
  | 🔴 Hoch   | Höhenprofil auf Detailseite fehlt | Höhenprofil in Detailseite integrieren |
  | 🟠 Mittel | Technische Kerndaten zu klein | Distanz, Dauer, Höhenmeter als prominente Icon-Leiste darstellen |
  | 🟠 Mittel | Button-Tap-Area zu klein | Tap-Area auf mindestens 44×44px ausweiten |
  | 🟡 Tief   | ÖV-Anbindung nicht ersichtlich | ÖV-Verbindungen ab nächstem Bahnhof auf Detailseite anzeigen |
  | 🟡 Tief   | Suchfeld nicht sichtbar beim ersten Blick | Suchfeld fix im Header platzieren, immer sichtbar |

---

## 4. Erweiterungen

### 4.1 Onboarding mit Profil-Einrichtung
- **Beschreibung & Nutzen:** Beim ersten Besuch erscheint ein Onboarding-Banner der den Nutzer zur Profil-Einrichtung führt. So werden personalisierte Empfehlungen von Anfang an ermöglicht. Der Nutzer kann das Onboarding überspringen und das Profil jederzeit später unter «Profil» im Menü einrichten.
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/+page.svelte` — Onboarding-Banner mit `localStorage`-Check (`profil_eingerichtet`)
  - **Frontend:** `src/routes/profil/+page.svelte` — Profil-Formular mit automatischer Weiterleitung nach Speichern
- **Referenz:** Kap. 3.4.1, Screen «Home (Onboarding)»
- **Aus Evaluation abgeleitet?:** Nein, aus Problemraumanalyse (fehlende Personalisierung in bestehenden Apps)

### 4.2 Persona-basierte Tourenfilterung
- **Beschreibung & Nutzen:** Die gewählte Persona kombiniert mit dem Fitnessstand filtert automatisch passende Touren auf der Homepage. Sportliche Nutzer mit hohem Fitnessstand sehen mittlere und schwere Touren, Gemütliche sehen ausschliesslich einfache Touren.
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/+page.svelte` — `passendeTouren`-Logik kombiniert Persona + Fitnessstand
- **Referenz:** Kap. 3.4.2, Daten & Schnittstellen
- **Aus Evaluation abgeleitet?:** Nein, aus Sketch & Decide Phase

### 4.3 Browser-ID für Profil-Persistenz ohne Login
- **Beschreibung & Nutzen:** Da kein User-Login implementiert wurde, wird beim ersten Besuch eine eindeutige Browser-ID via `crypto.randomUUID()` generiert. Das Profil wird pro Browser persistent in MongoDB gespeichert — ohne Registrierung. Beim nächsten Besuch wird das Profil automatisch wiederhergestellt.
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/profil/+page.svelte` — `getBrowserId()`-Funktion
  - **Backend:** `src/routes/api/profil/+server.ts` — `userId` als Query-Parameter und im Request-Body
  - **Datenbank:** MongoDB Collection `profile` mit `profilId`-Feld
- **Referenz:** Kap. 3.4.2, Besondere Entscheidungen
- **Aus Evaluation abgeleitet?:** Nein, bewusster Design-Entscheid für vereinfachten Scope

### 4.4 Personas überarbeitet (aus Evaluation abgeleitet)
- **Beschreibung & Nutzen:** Nach dem Usability-Test wurde festgestellt dass der Begriff «Fitness-Level» unklar war und mit «Schwierigkeit» verwechselt wurde. Die Personas wurden überarbeitet und klarer benannt (Geniesser, Sportlich, Entdecker, Gemütlich) um die Zielgruppe präziser anzusprechen und Verwechslungen zu vermeiden.
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/profil/+page.svelte` — Personas-Array mit neuen IDs und Beschreibungen
  - **Frontend:** `src/routes/+page.svelte` — Persona-Filter-Logik angepasst
- **Referenz:** Kap. 3.5, Issue «Begriff Fitness-Level unklar» (TP-01 + TP-02)
- **Aus Evaluation abgeleitet?:** Ja
---

## 5. Projektorganisation

- **Repository:** [https://github.com/kerimaltintas/trailbuddy](https://github.com/kerimaltintas/trailbuddy)
- **Struktur:**
```
src/
  routes/
    api/
      eintraege/     ← CRUD Tagebucheinträge (GET, POST, DELETE)
      profil/        ← Profil speichern/laden (GET, PUT)
      touren/        ← Touren aus MongoDB (GET)
    profil/          ← Profil-Page
    tagebuch/        ← Tagebuch-Page
    touren/
      [id]/          ← Tourdetail-Page
  +layout.svelte     ← Globales Layout + Hintergrund
  +page.svelte       ← Home-Page mit Onboarding
  +page.server.ts    ← Server-seitiges Laden der Touren
```
- **Commit-Praxis:** Sprechende Commits nach Schema `typ: Beschreibung` (feat, fix, docs, style)

---

## 6. KI-Deklaration

### 6.1 KI-Tools
- **Eingesetzte Tools:** Claude (claude.ai, Claude Sonnet 4.6)
- **Zweck & Umfang:**
  - Codevorschläge 
  - Debugging 
  - Ausformulierung der README-Dokumentation
  - Feature-Erweiterungen
- **Eigene Leistung:** Alle Design-Entscheidungen, Personas, HMW-Fragen, Papier-Skizzen, Figma-Mockups und Usability-Tests wurden eigenständig erarbeitet. KI-generierter Code wurde stets verstanden, angepasst und ins Projekt integriert. Die inhaltliche Ausrichtung und Projektidee stammen vollständig von mir.

### 6.2 Prompt-Vorgehen
Prompts wurden gezielt mit bestehendem Code als Kontext formuliert, damit Claude passgenaue Vorschläge machen konnte. Komplexe Aufgaben wie CRUD-API oder der Onboarding-Flow wurden in Teilschritte aufgeteilt. Jedes Ergebnis wurde lokal getestet bevor es committed wurde. KI wurde nie blind übernommen. Alle Vorschläge wurden verstanden und bei Bedarf angepasst.

### 6.3 Reflexion
KI war besonders hilfreich für repetitiven Boilerplate-Code (API-Routen, TypeScript-Typen) und schnelles Debugging. Grenzen zeigten sich bei projektspezifischen Eigenheiten (Netlify-Adapter, Svelte 5 Runes-Syntax). Die Verantwortung für Korrektheit, Urheberrecht und inhaltliche Qualität lag stets bei mir. KI hat die Entwicklung beschleunigt, aber nicht ersetzt.
