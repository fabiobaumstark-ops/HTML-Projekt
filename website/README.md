# F1 Garage – unsere Formel-1-Fan-Website

Schulprojekt INF, TGM 11, Josef-Durler-Schule Rastatt.

## Dateien

| Datei | Wofür |
|---|---|
| `index.html` | Aufbau der Seite (head, body mit header, nav, section, footer) |
| `style.css` | Aussehen: Farben, Bento-Grid, Animationen, Handy-Ansicht |
| `script.js` | Interaktion: Team-Grid, Modal, Timeline, Galerie, DE/EN-Umschalter |
| `car3d.js` | Baut aus einfachen 3D-Formen ein F1-Auto, passend zum Baujahr |
| `lib/three.min.js` | Die 3D-Bibliothek three.js (MIT-Lizenz), liegt im Ordner, damit alles auch ohne Internet läuft |
| `img/` | Hier kommen später eure eigenen Bilder rein |

## In Visual Studio Code öffnen

1. VS Code starten, dann **Datei → Ordner öffnen…** und den Ordner `website` auswählen.
2. Links in der Liste auf `index.html` klicken, um den Code zu sehen.
3. Seite im Browser ansehen:
   - **Einfach:** Im Datei-Explorer von Windows doppelt auf `index.html` klicken. Sie öffnet sich im Browser (laut Lehrer: am besten Firefox).
   - **Komfortabel:** In VS Code links auf **Erweiterungen** (vier Quadrate) gehen, **Live Server** installieren, dann unten rechts auf **Go Live** klicken. Jetzt lädt der Browser bei jedem Speichern automatisch neu.

## Sitemap

```
index.html
├── Header      Logo + DE/EN-Umschalter
├── Nav         Start · Teams · Über uns
├── Section #home   Begrüßung mit Button
├── Section #teams  Bento-Grid mit allen 11 Teams + „Legenden“
│   │               (90 Autos, darunter alle 68 Weltmeister-Autos seit 1958)
│   └── Klick auf ein Team → Modal (Detailansicht)
│       ├── Team-Infos (Sitz, Gründung, Titel)
│       ├── Timeline: aktuelles Auto + historische Autos
│       ├── 3D-Modell des Autos (mit Maus oder Finger drehbar)
│       ├── Technische Daten (Jahr, Motor, Leistung, Fahrer)
│       └── Galerie (Klick wechselt das Auto)
├── Section #about  Über uns mit Platz für Passbilder
└── Footer      "Designed by …"
```

## Design-Ideen

- **Farben:** dunkler Hintergrund wie Asphalt (`#0f0f13`), F1-Rot (`#e10600`) als Akzent, jede Karte in ihrer Teamfarbe.
- **Bento-Grid:** große Kacheln für Ferrari und Red Bull, breite und kleine für den Rest (CSS-Grid mit `grid-column: span 2` und `grid-auto-flow: dense`).
- **Animationen:** Karten fliegen beim Laden nacheinander ein, heben sich beim Hover, drücken sich beim Klick ein. Das Modal zoomt weich auf.
- **Bedienung:** Modal schließt mit X, Klick daneben oder Escape-Taste. Menü bleibt beim Scrollen oben.

## So funktionieren die 3D-Modelle

`car3d.js` baut jedes Auto per Programmcode. Die Karosserie besteht aus vielen Querschnitten (wie die Spanten eines Bootes), die zu einer glatten Hülle verbunden werden. Flügel haben echte Flügelprofile, der Lack glänzt und spiegelt ein unsichtbares Fotostudio. Am Baujahr erkennt das Programm die Epoche und ändert die Form:

| Baujahr | Form |
|---|---|
| bis 1967 | Zigarre ohne Flügel |
| 1968–1982 | Keilform, großer Heckflügel, Airbox |
| 1983–1993 | flach und breit (Turbo-Zeit) |
| 1994–2008 | hohe Nase |
| 2009–2021 | lang, breiter Frontflügel, ab 2018 Halo |
| ab 2022 | große Räder, Halo |

Die Lackierung steht in `script.js` beim Auto: `color` (Hauptfarbe) und `accent` (Flügel). Ein neues Auto in der Liste bekommt also automatisch ein 3D-Modell. Kann ein Browser kein 3D, zeigt die Seite die einfache Zeichnung.

## So geht es weiter

1. **Eure Namen und Fotos** in `index.html` eintragen (sucht nach „Vorname Nachname“ und „Foto“).
2. **Echte Auto-Bilder:** Bild in `img/` legen und in `script.js` beim Auto eine Zeile ergänzen, z. B. `img: "img/sf26.jpg",`. Achtet darauf, dass ihr die Bilder benutzen dürft (z. B. Wikimedia Commons) und schreibt die Quelle dazu.
3. **Mehr Autos:** bei einem Team in `script.js` in der Liste `cars` einfach ein weiteres Auto ergänzen. Es erscheint dann automatisch in der Zeitleiste und Galerie.
4. **Daten prüfen:** Die Zahlen (PS, Fahrer, Titel) sind gerundet. Bitte vor der Präsentation nochmal nachschauen.
5. **Ideen für mehr JS:** Dark/Light-Modus, Quiz „Welches Auto ist das?“, Countdown bis zum nächsten Rennen.
