/* =========================================================
   F1 Garage – script.js
   1. Texte auf Deutsch und Englisch
   2. Daten der Teams und Autos
   3. Team-Grid erzeugen
   4. Modal (Detailansicht) mit Timeline und Galerie
   5. Sprachumschalter
   ========================================================= */

// ---------- 1. TEXTE (Deutsch / Englisch) ----------
const texts = {
  de: {
    nav_home: "Start",
    nav_teams: "Teams",
    nav_about: "Über uns",
    hero_title: "Willkommen in der F1 Garage!",
    hero_text: "Entdecke die Teams der Formel 1, ihre aktuellen Autos und die Legenden aus der Vergangenheit.",
    hero_btn: "Zu den Teams",
    teams_title: "Die Teams",
    teams_hint: "Klicke auf ein Team, um mehr zu erfahren.",
    about_title: "Über uns",
    about_class: "TGM 11 – Josef-Durler-Schule Rastatt",
    about_text: "Wir sind große Formel-1-Fans und haben diese Seite als Schulprojekt im Fach Informatik gebaut.",
    footer_designed: "Designed by",
    footer_note: "Schulprojekt – keine offizielle Seite der Formel 1.",
    soon: "Bald verfügbar",
    more: "Mehr erfahren →",
    base: "Sitz",
    founded: "Gegründet",
    titles: "WM-Titel (Konstrukteure)",
    year: "Jahr",
    engine: "Motor",
    power: "Leistung",
    drivers: "Fahrer",
    cars_title: "Autos im Lauf der Zeit",
    gallery_title: "Galerie"
  },
  en: {
    nav_home: "Home",
    nav_teams: "Teams",
    nav_about: "About us",
    hero_title: "Welcome to the F1 Garage!",
    hero_text: "Discover the Formula 1 teams, their current cars and the legends of the past.",
    hero_btn: "See the teams",
    teams_title: "The Teams",
    teams_hint: "Click on a team to learn more.",
    about_title: "About us",
    about_class: "TGM 11 – Josef-Durler-Schule Rastatt",
    about_text: "We are huge Formula 1 fans and built this website as a school project in computer science.",
    footer_designed: "Designed by",
    footer_note: "School project – not an official Formula 1 website.",
    soon: "Coming soon",
    more: "Learn more →",
    base: "Base",
    founded: "Founded",
    titles: "Constructors' titles",
    year: "Year",
    engine: "Engine",
    power: "Power",
    drivers: "Drivers",
    cars_title: "Cars through the years",
    gallery_title: "Gallery"
  }
};

// ---------- 2. DATEN ----------
// Alle Teams der Saison 2026. Nur Ferrari und Red Bull haben schon Details.
// Tipp: Weitere Teams bekommen Details, indem ihr "cars" und "info" ergänzt.
// Hinweis: Die Zahlen sind gerundet – bitte vor der Präsentation nochmal prüfen!
const teams = [
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    short: "SF",
    color: "#e8002d",
    info: {
      base: "Maranello, Italien / Italy",
      founded: "1929",
      titles: "16",
      de: "Das älteste und erfolgreichste Team der Formel 1. Ferrari ist seit dem ersten Rennen 1950 dabei.",
      en: "The oldest and most successful team in Formula 1. Ferrari has raced since the very first race in 1950."
    },
    cars: [
      {
        name: "SF-26", year: 2026,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Charles Leclerc, Lewis Hamilton",
        de: "Das aktuelle Auto nach den neuen Regeln von 2026: fast die Hälfte der Leistung kommt aus dem Elektromotor.",
        en: "The current car built for the new 2026 rules: almost half of the power comes from the electric motor."
      },
      {
        name: "SF-24", year: 2024,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Charles Leclerc, Carlos Sainz",
        de: "Gewann 2024 unter anderem den Großen Preis von Monaco mit Charles Leclerc.",
        en: "Won several races in 2024, including the Monaco Grand Prix with Charles Leclerc."
      },
      {
        name: "F2004", year: 2004,
        engine: "Ferrari 3,0 L V10",
        power: "ca. 900 PS",
        drivers: "Michael Schumacher, Rubens Barrichello",
        de: "Eines der schnellsten Autos aller Zeiten. Michael Schumacher holte damit seinen 7. WM-Titel.",
        en: "One of the fastest cars of all time. Michael Schumacher won his 7th world title with it."
      },
      {
        name: "312T", year: 1975,
        engine: "Ferrari 3,0 L Boxer-12",
        power: "ca. 500 PS",
        drivers: "Niki Lauda, Clay Regazzoni",
        de: "Mit diesem Auto wurde Niki Lauda 1975 zum ersten Mal Weltmeister.",
        en: "Niki Lauda won his first world championship with this car in 1975."
      }
    ]
  },
  {
    id: "redbull",
    name: "Red Bull Racing",
    short: "RB",
    color: "#3671c6",
    info: {
      base: "Milton Keynes, England",
      founded: "2005",
      titles: "6",
      de: "Das Team aus England wurde mit Sebastian Vettel und Max Verstappen zu einem der erfolgreichsten Teams der letzten Jahre.",
      en: "The British team became one of the most successful teams of recent years with Sebastian Vettel and Max Verstappen."
    },
    cars: [
      {
        name: "RB22", year: 2026,
        engine: "Red Bull Ford 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Max Verstappen, Isack Hadjar",
        de: "Das erste Red-Bull-Auto mit einem eigenen Motor, gebaut zusammen mit Ford.",
        en: "The first Red Bull car with its own engine, built together with Ford."
      },
      {
        name: "RB19", year: 2023,
        engine: "Honda RBPT 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Max Verstappen, Sergio Pérez",
        de: "Das erfolgreichste F1-Auto der Geschichte: 21 Siege in 22 Rennen.",
        en: "The most successful F1 car in history: 21 wins in 22 races."
      },
      {
        name: "RB9", year: 2013,
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Mark Webber",
        de: "Sebastian Vettel gewann damit 9 Rennen in Folge und seinen 4. Titel.",
        en: "Sebastian Vettel won 9 races in a row and his 4th title with this car."
      },
      {
        name: "RB6", year: 2010,
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Mark Webber",
        de: "Das Auto, mit dem Sebastian Vettel seinen ersten WM-Titel holte.",
        en: "The car that brought Sebastian Vettel his first world title."
      }
    ]
  },
  // Die restlichen Teams (noch ohne Details)
  { id: "mclaren", name: "McLaren", short: "MCL", color: "#ff8000" },
  { id: "mercedes", name: "Mercedes", short: "MER", color: "#27f4d2" },
  { id: "aston", name: "Aston Martin", short: "AMR", color: "#229971" },
  { id: "alpine", name: "Alpine", short: "ALP", color: "#ff87bc" },
  { id: "williams", name: "Williams", short: "WIL", color: "#64c4ff" },
  { id: "rb", name: "Racing Bulls", short: "VCARB", color: "#6692ff" },
  { id: "haas", name: "Haas", short: "HAAS", color: "#b6babd" },
  { id: "audi", name: "Audi", short: "AUDI", color: "#f50537" },
  { id: "cadillac", name: "Cadillac", short: "CAD", color: "#d4af37" }
];

// Aktuelle Sprache (Startwert: Deutsch)
let lang = "de";
// Welches Team gerade im Modal offen ist
let openTeam = null;
let openCarIndex = 0;

// ---------- HILFSFUNKTION: Auto als Zeichnung (SVG) ----------
// Solange ihr keine eigenen Fotos habt, wird ein einfaches Auto
// in der Teamfarbe gezeichnet. Eigene Bilder: siehe README.
function carDrawing(color) {
  return `
  <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="40" width="22" height="40" rx="3" fill="#222"/>
    <path d="M40 72 L90 62 L170 56 L200 38 L230 38 L245 56 L330 60 L370 70 L372 80 L40 82 Z" fill="${color}"/>
    <path d="M200 38 L215 26 L232 38 Z" fill="#111"/>
    <rect x="350" y="76" width="35" height="6" rx="2" fill="#222"/>
    <circle cx="95" cy="84" r="22" fill="#111"/><circle cx="95" cy="84" r="9" fill="#555"/>
    <circle cx="320" cy="84" r="20" fill="#111"/><circle cx="320" cy="84" r="8" fill="#555"/>
  </svg>`;
}

// ---------- 3. TEAM-GRID ERZEUGEN ----------
function buildGrid() {
  const grid = document.getElementById("team-grid");
  grid.innerHTML = "";

  teams.forEach(function (team, i) {
    const card = document.createElement("div");
    const hasDetails = team.cars !== undefined;

    card.className = "team-card" + (hasDetails ? " big" : " soon");
    card.style.setProperty("--team", team.color);
    card.style.animationDelay = (i * 0.07) + "s"; // Karten erscheinen nacheinander

    card.innerHTML = `
      <span class="short">${team.short}</span>
      <h3>${team.name}</h3>
      <p>${hasDetails ? texts[lang].more : texts[lang].soon}</p>
    `;

    if (hasDetails) {
      card.addEventListener("click", function () {
        openModal(team);
      });
    }
    grid.appendChild(card);
  });
}

// ---------- 4. MODAL ----------
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

function openModal(team) {
  openTeam = team;
  openCarIndex = 0;
  modal.style.setProperty("--team", team.color);
  renderModal();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Seite dahinter nicht scrollen
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  openTeam = null;
}

function renderModal() {
  const t = texts[lang];
  const team = openTeam;

  // Timeline-Buttons (ein Button pro Auto)
  let timeline = "";
  team.cars.forEach(function (car, i) {
    timeline += `<button class="${i === openCarIndex ? "active" : ""}" data-index="${i}">${car.year} · ${car.name}</button>`;
  });

  // Galerie (alle Autos des Teams als kleine Bilder)
  let gallery = "";
  team.cars.forEach(function (car, i) {
    gallery += `<div class="thumb" data-index="${i}" title="${car.name}">${carImage(car, team)}</div>`;
  });

  modalContent.innerHTML = `
    <h2>${team.name}</h2>
    <p class="team-info">
      ${t.base}: ${team.info.base} · ${t.founded}: ${team.info.founded} · ${t.titles}: ${team.info.titles}<br>
      ${team.info[lang]}
    </p>

    <h3>${t.cars_title}</h3>
    <div class="timeline">${timeline}</div>
    <div id="car-view"></div>

    <h3>${t.gallery_title}</h3>
    <div class="gallery">${gallery}</div>
  `;

  renderCar();

  // Klick auf Timeline oder Galerie wechselt das Auto
  modalContent.querySelectorAll(".timeline button, .gallery .thumb").forEach(function (el) {
    el.addEventListener("click", function () {
      openCarIndex = Number(el.dataset.index);
      renderModal();
    });
  });
}

// Zeigt Bild + technische Daten des ausgewählten Autos
function renderCar() {
  const t = texts[lang];
  const car = openTeam.cars[openCarIndex];

  document.getElementById("car-view").innerHTML = `
    <div class="car-view">
      <div class="car-image">${carImage(car, openTeam)}</div>
      <table class="specs">
        <tr><th>${t.year}</th><td>${car.year}</td></tr>
        <tr><th>${t.engine}</th><td>${car.engine}</td></tr>
        <tr><th>${t.power}</th><td>${car.power}</td></tr>
        <tr><th>${t.drivers}</th><td>${car.drivers}</td></tr>
      </table>
      <p class="car-desc">${car[lang]}</p>
    </div>
  `;
}

// Eigenes Foto, falls vorhanden – sonst die Zeichnung
function carImage(car, team) {
  if (car.img) {
    return `<img src="${car.img}" alt="${car.name}">`;
  }
  return carDrawing(team.color);
}

// Modal schließen: X-Button, Klick neben die Box, Escape-Taste
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ---------- 5. SPRACHUMSCHALTER ----------
function setLanguage(newLang) {
  lang = newLang;
  document.documentElement.lang = lang;

  // Alle Elemente mit data-i18n bekommen den passenden Text
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = texts[lang][el.dataset.i18n];
  });

  buildGrid();
  if (openTeam) renderModal();
}

document.getElementById("lang-btn").addEventListener("click", function () {
  setLanguage(lang === "de" ? "en" : "de");
});

// Beim Laden der Seite das Grid aufbauen
buildGrid();
