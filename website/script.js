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
// Alle Teams der Saison 2026 mit ihren Autos.
// size: "big" = große Kachel, "wide" = breite Kachel, ohne = kleine Kachel.
// Hinweis: Die Zahlen sind gerundet – bitte vor der Präsentation nochmal prüfen!
const teams = [
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    short: "SF",
    color: "#e8002d",
    size: "big",
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
    size: "big",
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
  {
    id: "mclaren",
    name: "McLaren",
    short: "MCL",
    color: "#ff8000",
    size: "wide",
    info: {
      base: "Woking, England",
      founded: "1963",
      titles: "10",
      de: "Gegründet vom Neuseeländer Bruce McLaren. Nach vielen schwachen Jahren ist McLaren wieder ganz vorne dabei.",
      en: "Founded by New Zealander Bruce McLaren. After many weak years, McLaren is back at the front."
    },
    cars: [
      {
        name: "MCL40", year: 2026,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lando Norris, Oscar Piastri",
        de: "Das aktuelle McLaren-Auto nach den neuen Regeln von 2026.",
        en: "The current McLaren car built for the new 2026 rules."
      },
      {
        name: "MCL38", year: 2024,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lando Norris, Oscar Piastri",
        de: "Holte 2024 den ersten Konstrukteurs-Titel für McLaren seit 1998.",
        en: "Won McLaren's first constructors' title since 1998."
      },
      {
        name: "MP4/4", year: 1988,
        engine: "Honda 1,5 L V6 Turbo",
        power: "ca. 650 PS",
        drivers: "Ayrton Senna, Alain Prost",
        de: "Legendär: 15 Siege in 16 Rennen. Ayrton Senna wurde damit zum ersten Mal Weltmeister.",
        en: "A legend: 15 wins in 16 races. Ayrton Senna won his first world title with it."
      },
      {
        name: "M23", year: 1974,
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 470 PS",
        drivers: "Emerson Fittipaldi, Denny Hulme",
        de: "Brachte McLaren den ersten Titel. 1976 wurde James Hunt damit Weltmeister.",
        en: "Brought McLaren its first title. James Hunt became world champion with it in 1976."
      }
    ]
  },
  {
    id: "mercedes",
    name: "Mercedes",
    short: "MER",
    color: "#27f4d2",
    size: "wide",
    info: {
      base: "Brackley, England",
      founded: "2010 (1954)",
      titles: "8",
      de: "Die „Silberpfeile“ gewannen von 2014 bis 2021 acht Konstrukteurs-Titel in Folge.",
      en: "The “Silver Arrows” won eight constructors' titles in a row from 2014 to 2021."
    },
    cars: [
      {
        name: "W17", year: 2026,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "George Russell, Kimi Antonelli",
        de: "Das aktuelle Mercedes-Auto nach den neuen Regeln von 2026.",
        en: "The current Mercedes car built for the new 2026 rules."
      },
      {
        name: "W11", year: 2020,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lewis Hamilton, Valtteri Bottas",
        de: "Gilt als eines der schnellsten F1-Autos überhaupt. Hamilton holte damit seinen 7. Titel.",
        en: "Seen as one of the fastest F1 cars ever. Hamilton won his 7th title with it."
      },
      {
        name: "W05", year: 2014,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 850 PS",
        drivers: "Lewis Hamilton, Nico Rosberg",
        de: "Das erste Auto der Hybrid-Ära und der Start der Mercedes-Siegesserie.",
        en: "The first car of the hybrid era and the start of Mercedes' winning streak."
      },
      {
        name: "W196", year: 1954,
        engine: "Mercedes 2,5 L Reihen-8",
        power: "ca. 290 PS",
        drivers: "Juan Manuel Fangio, Karl Kling",
        de: "Der erste Silberpfeil der Formel 1. Fangio wurde damit 1954 und 1955 Weltmeister.",
        en: "The first Formula 1 Silver Arrow. Fangio won the 1954 and 1955 titles with it."
      }
    ]
  },
  {
    id: "aston",
    name: "Aston Martin",
    short: "AMR",
    color: "#229971",
    info: {
      base: "Silverstone, England",
      founded: "2021 (1959)",
      titles: "0",
      de: "Die britische Sportwagenmarke ist seit 2021 mit eigenem Team dabei. Seit 2026 arbeitet dort Star-Designer Adrian Newey.",
      en: "The British sports car brand has had its own team since 2021. Star designer Adrian Newey works there since 2026."
    },
    cars: [
      {
        name: "AMR26", year: 2026,
        engine: "Honda 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Fernando Alonso, Lance Stroll",
        de: "Das erste Aston Martin mit Honda-Motor und von Adrian Newey entworfen.",
        en: "The first Aston Martin with a Honda engine, designed by Adrian Newey."
      },
      {
        name: "AMR23", year: 2023,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Fernando Alonso, Lance Stroll",
        de: "Fernando Alonso fuhr damit 8 Mal aufs Podium.",
        en: "Fernando Alonso finished on the podium 8 times with this car."
      },
      {
        name: "DBR4", year: 1959,
        engine: "Aston Martin 2,5 L Reihen-6",
        power: "ca. 250 PS",
        drivers: "Roy Salvadori, Carroll Shelby",
        de: "Der erste Versuch von Aston Martin in der Formel 1, damals ohne großen Erfolg.",
        en: "Aston Martin's first attempt at Formula 1, without much success at the time."
      }
    ]
  },
  {
    id: "alpine",
    name: "Alpine",
    short: "ALP",
    color: "#ff87bc",
    info: {
      base: "Enstone, England",
      founded: "2021 (Renault)",
      titles: "2 (als Renault / as Renault)",
      de: "Das Team gehört zu Renault. Unter dem Namen Renault wurde Fernando Alonso 2005 und 2006 Weltmeister.",
      en: "The team belongs to Renault. Under the Renault name, Fernando Alonso won the 2005 and 2006 titles."
    },
    cars: [
      {
        name: "A526", year: 2026,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Pierre Gasly, Franco Colapinto",
        de: "Seit 2026 fährt Alpine mit Mercedes-Motoren statt mit eigenen Renault-Motoren.",
        en: "Since 2026 Alpine uses Mercedes engines instead of its own Renault engines."
      },
      {
        name: "A521", year: 2021,
        engine: "Renault 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Fernando Alonso, Esteban Ocon",
        de: "Esteban Ocon gewann damit überraschend den Großen Preis von Ungarn.",
        en: "Esteban Ocon won the Hungarian Grand Prix with it as a big surprise."
      },
      {
        name: "Renault R25", year: 2005,
        engine: "Renault 3,0 L V10",
        power: "ca. 900 PS",
        drivers: "Fernando Alonso, Giancarlo Fisichella",
        de: "Fernando Alonso wurde damit mit 24 Jahren jüngster Weltmeister seiner Zeit.",
        en: "Fernando Alonso became the youngest world champion of his time with it, aged 24."
      }
    ]
  },
  {
    id: "williams",
    name: "Williams",
    short: "WIL",
    color: "#64c4ff",
    size: "wide",
    info: {
      base: "Grove, England",
      founded: "1977",
      titles: "9",
      de: "Gegründet von Frank Williams. In den 80er- und 90er-Jahren war Williams eines der besten Teams.",
      en: "Founded by Frank Williams. In the 80s and 90s Williams was one of the best teams."
    },
    cars: [
      {
        name: "FW48", year: 2026,
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Alexander Albon, Carlos Sainz",
        de: "Das aktuelle Williams-Auto nach den neuen Regeln von 2026.",
        en: "The current Williams car built for the new 2026 rules."
      },
      {
        name: "FW18", year: 1996,
        engine: "Renault 3,0 L V10",
        power: "ca. 750 PS",
        drivers: "Damon Hill, Jacques Villeneuve",
        de: "Damon Hill wurde damit Weltmeister, Williams gewann 12 von 16 Rennen.",
        en: "Damon Hill became world champion, Williams won 12 of 16 races."
      },
      {
        name: "FW14B", year: 1992,
        engine: "Renault 3,5 L V10",
        power: "ca. 760 PS",
        drivers: "Nigel Mansell, Riccardo Patrese",
        de: "Hatte eine computergesteuerte „aktive Federung“ – richtig viel Mechatronik!",
        en: "Had computer-controlled “active suspension” – lots of mechatronics!"
      },
      {
        name: "FW07", year: 1980,
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 480 PS",
        drivers: "Alan Jones, Carlos Reutemann",
        de: "Brachte Williams den ersten Titel mit Alan Jones.",
        en: "Brought Williams its first title with Alan Jones."
      }
    ]
  },
  {
    id: "rb",
    name: "Racing Bulls",
    short: "VCARB",
    color: "#6692ff",
    info: {
      base: "Faenza, Italien / Italy",
      founded: "2006 (Toro Rosso)",
      titles: "0",
      de: "Das Schwesterteam von Red Bull. Hier starten junge Fahrer, bevor sie ins große Team kommen.",
      en: "Red Bull's sister team. Young drivers start here before moving up to the main team."
    },
    cars: [
      {
        name: "VCARB 03", year: 2026,
        engine: "Red Bull Ford 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Liam Lawson, Arvid Lindblad",
        de: "Fährt wie Red Bull mit dem neuen eigenen Motor von Red Bull und Ford.",
        en: "Like Red Bull, it uses the new in-house engine from Red Bull and Ford."
      },
      {
        name: "AlphaTauri AT01", year: 2020,
        engine: "Honda 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Pierre Gasly, Daniil Kwjat",
        de: "Pierre Gasly gewann damit sensationell den Großen Preis von Italien in Monza.",
        en: "Pierre Gasly sensationally won the Italian Grand Prix at Monza with it."
      },
      {
        name: "Toro Rosso STR3", year: 2008,
        engine: "Ferrari 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Sébastien Bourdais",
        de: "Sebastian Vettel holte damit in Monza seinen ersten Sieg – mit 21 Jahren.",
        en: "Sebastian Vettel took his first win with it at Monza – aged 21."
      }
    ]
  },
  {
    id: "haas",
    name: "Haas",
    short: "HAAS",
    color: "#b6babd",
    info: {
      base: "Kannapolis, USA",
      founded: "2016",
      titles: "0",
      de: "Ein amerikanisches Team, gegründet vom Unternehmer Gene Haas. Es arbeitet eng mit Ferrari zusammen.",
      en: "An American team founded by businessman Gene Haas. It works closely with Ferrari."
    },
    cars: [
      {
        name: "VF-26", year: 2026,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Esteban Ocon, Oliver Bearman",
        de: "Das aktuelle Haas-Auto nach den neuen Regeln von 2026.",
        en: "The current Haas car built for the new 2026 rules."
      },
      {
        name: "VF-18", year: 2018,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Romain Grosjean, Kevin Magnussen",
        de: "Das bisher beste Jahr von Haas: Platz 5 bei den Konstrukteuren.",
        en: "Haas' best year so far: 5th in the constructors' championship."
      },
      {
        name: "VF-16", year: 2016,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 900 PS",
        drivers: "Romain Grosjean, Esteban Gutiérrez",
        de: "Das erste Haas-Auto holte schon im allerersten Rennen Punkte.",
        en: "The first Haas car already scored points in its very first race."
      }
    ]
  },
  {
    id: "audi",
    name: "Audi",
    short: "AUDI",
    color: "#f50537",
    info: {
      base: "Hinwil, Schweiz / Switzerland",
      founded: "2026 (Sauber 1993)",
      titles: "0",
      de: "Seit 2026 ist Audi als Werksteam mit eigenem Motor dabei. Vorher hieß das Team Sauber.",
      en: "Since 2026 Audi has been a works team with its own engine. Before that, the team was called Sauber."
    },
    cars: [
      {
        name: "R26", year: 2026,
        engine: "Audi 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Nico Hülkenberg, Gabriel Bortoleto",
        de: "Das erste Formel-1-Auto von Audi – mit einem Motor aus Neuburg an der Donau.",
        en: "Audi's first Formula 1 car – with an engine built in Neuburg, Germany."
      },
      {
        name: "Sauber C45", year: 2025,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Nico Hülkenberg, Gabriel Bortoleto",
        de: "Nico Hülkenberg fuhr damit in Silverstone endlich sein erstes Podium.",
        en: "Nico Hülkenberg finally scored his first podium with it at Silverstone."
      },
      {
        name: "BMW Sauber F1.08", year: 2008,
        engine: "BMW 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Robert Kubica, Nick Heidfeld",
        de: "Robert Kubica gewann damit den Großen Preis von Kanada.",
        en: "Robert Kubica won the Canadian Grand Prix with it."
      }
    ]
  },
  {
    id: "cadillac",
    name: "Cadillac",
    short: "CAD",
    color: "#d4af37",
    info: {
      base: "Fishers, USA / Silverstone, England",
      founded: "2026",
      titles: "0",
      de: "Das neueste Team der Formel 1. Die amerikanische Automarke startet 2026 zum ersten Mal.",
      en: "The newest team in Formula 1. The American car brand races for the first time in 2026."
    },
    cars: [
      {
        name: "Cadillac F1", year: 2026,
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Sergio Pérez, Valtteri Bottas",
        de: "Das allererste Cadillac-Auto. Später will Cadillac einen eigenen Motor bauen.",
        en: "The very first Cadillac car. Later Cadillac wants to build its own engine."
      }
    ]
  }
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
    card.className = "team-card" + (team.size ? " " + team.size : "");
    card.style.setProperty("--team", team.color);
    card.style.animationDelay = (i * 0.07) + "s"; // Karten erscheinen nacheinander

    card.innerHTML = `
      <span class="short">${team.short}</span>
      <h3>${team.name}</h3>
      <p>${texts[lang].more}</p>
    `;

    card.addEventListener("click", function () {
      openModal(team);
    });
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
