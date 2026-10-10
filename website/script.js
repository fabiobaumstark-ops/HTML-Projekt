// ===== Unsere Autos der Saison 2026 =====
// Jedes Auto ist ein Objekt mit seinen Daten.
let autos = [
  { bild: "mclaren.png", team: "McLaren", name: "MCL40", motor: "Mercedes", fahrer: "Norris #1, Piastri #81", sitz: "Woking, GB", gruendung: 1963, farbe: "#ff8000" },
  { bild: "ferrari.png", team: "Ferrari", name: "SF-26", motor: "Ferrari", fahrer: "Leclerc #16, Hamilton #44", sitz: "Maranello, IT", gruendung: 1929, farbe: "#dc0000" },
  { bild: "redbull.png", team: "Red Bull Racing", name: "RB22", motor: "Red Bull Ford", fahrer: "Verstappen #3, Hadjar #6", sitz: "Milton Keynes, GB", gruendung: 2005, farbe: "#2b4bb5" },
  { bild: "mercedes.png", team: "Mercedes", name: "W17", motor: "Mercedes", fahrer: "Russell #63, Antonelli #12", sitz: "Brackley, GB", gruendung: 2010, farbe: "#00a19b" },
  { bild: "astonmartin.png", team: "Aston Martin", name: "AMR26", motor: "Honda", fahrer: "Alonso #14, Stroll #18", sitz: "Silverstone, GB", gruendung: 2021, farbe: "#0f7a58" },
  { bild: "williams.png", team: "Williams", name: "FW48", motor: "Mercedes", fahrer: "Albon #23, Sainz #55", sitz: "Grove, GB", gruendung: 1977, farbe: "#1868db" },
  { bild: "racingbulls.png", team: "Racing Bulls", name: "VCARB 03", motor: "Red Bull Ford", fahrer: "Lawson #30, Lindblad #41", sitz: "Faenza, IT", gruendung: 2006, farbe: "#5068e0" },
  { bild: "alpine.png", team: "Alpine", name: "A526", motor: "Mercedes", fahrer: "Gasly #10, Colapinto #43", sitz: "Enstone, GB", gruendung: 2021, farbe: "#e0429a" },
  { bild: "haas.png", team: "Haas", name: "VF-26", motor: "Ferrari", fahrer: "Ocon #31, Bearman #87", sitz: "Kannapolis, US", gruendung: 2016, farbe: "#9aa0a8" },
  { bild: "audi.png", team: "Audi", name: "R26", motor: "Audi", fahrer: "Hülkenberg #27, Bortoleto #5", sitz: "Hinwil, CH", gruendung: 2026, farbe: "#c4002f" },
  { bild: "cadillac.png", team: "Cadillac", name: "MAC-26", motor: "Ferrari", fahrer: "Pérez #11, Bottas #77", sitz: "Fishers, US", gruendung: 2026, farbe: "#b8963a" }
];

// Nummer des Autos, das gerade angezeigt wird (1 = Ferrari, wir zählen ab 0)
let aktuell = 1;


// ===== Ein Auto im Showroom anzeigen =====
function zeigeAuto(nummer) {
  aktuell = nummer;
  let auto = autos[nummer];

  document.getElementById("team").innerHTML = auto.team;
  document.getElementById("autoname").innerHTML = auto.name;
  document.getElementById("autobild").src = "img/autos/" + auto.bild;
  document.getElementById("autobild").alt = auto.team + " " + auto.name;
  document.getElementById("motor").innerHTML = auto.motor;
  document.getElementById("fahrer").innerHTML = auto.fahrer;
  document.getElementById("sitz").innerHTML = auto.sitz;
  document.getElementById("gruendung").innerHTML = auto.gruendung;

  // Bei echten Fotos die Quelle anzeigen, sonst nichts
  if (auto.quelle) {
    document.getElementById("quelle").innerHTML = auto.quelle;
  } else {
    document.getElementById("quelle").innerHTML = "";
  }

  // Teamfarbe als Linie unter dem Teamnamen
  document.getElementById("team").style.borderColor = auto.farbe;

  // ausgewählte Karte markieren
  let karten = document.getElementsByClassName("karte");
  for (let i = 0; i < karten.length; i++) {
    karten[i].classList.remove("gewaehlt");
  }
  karten[nummer].classList.add("gewaehlt");

  // nach oben zum Showroom scrollen
  document.getElementById("showroom").scrollIntoView();
}


// ===== Pfeile: nächstes und vorheriges Auto =====
function naechstesAuto() {
  let neu = aktuell + 1;
  if (neu >= autos.length) {
    neu = 0;              // nach dem letzten Auto wieder von vorne
  }
  zeigeAuto(neu);
}

function vorherigesAuto() {
  let neu = aktuell - 1;
  if (neu < 0) {
    neu = autos.length - 1;   // vor dem ersten Auto kommt das letzte
  }
  zeigeAuto(neu);
}


// ===== Sprache umschalten (Deutsch / Englisch) =====
// Jedes Element mit Text hat zwei Attribute: data-de und data-en.
function setzeSprache(sprache) {
  let elemente = document.querySelectorAll("[data-de]");
  for (let i = 0; i < elemente.length; i++) {
    elemente[i].innerHTML = elemente[i].getAttribute("data-" + sprache);
  }

  // Sprache der Seite ändern und den richtigen Knopf markieren
  document.documentElement.lang = sprache;
  if (sprache == "de") {
    document.getElementById("knopf-de").classList.add("aktiv");
    document.getElementById("knopf-en").classList.remove("aktiv");
  } else {
    document.getElementById("knopf-en").classList.add("aktiv");
    document.getElementById("knopf-de").classList.remove("aktiv");
  }
}


// Beim Laden der Seite die ausgewählte Karte markieren
document.getElementsByClassName("karte")[aktuell].classList.add("gewaehlt");
