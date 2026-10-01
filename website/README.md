# F1 Garage – unsere Formel-1-Fan-Website

Schulprojekt INF, TGM 11, Josef-Durler-Schule Rastatt.

## Dateien

| Datei | Wofür |
|---|---|
| `index.html` | Aufbau der Seite (head, body mit header, nav, section, footer) |
| `style.css` | Aussehen: Farben, Bento-Grid, Animationen, Handy-Ansicht |
| `script.js` | Interaktion: Team-Grid, Modal, Timeline, Galerie, DE/EN-Umschalter |
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
├── Section #teams  Bento-Grid mit allen 11 Teams
│   └── Klick auf Ferrari oder Red Bull → Modal (Detailansicht)
│       ├── Team-Infos (Sitz, Gründung, Titel)
│       ├── Timeline: aktuelles Auto + historische Autos
│       ├── Technische Daten (Jahr, Motor, Leistung, Fahrer)
│       └── Galerie (Klick wechselt das Auto)
├── Section #about  Über uns mit Platz für Passbilder
└── Footer      "Designed by …"
```

## Design-Ideen

- **Farben:** dunkler Hintergrund wie Asphalt (`#0f0f13`), F1-Rot (`#e10600`) als Akzent, jede Karte in ihrer Teamfarbe.
- **Bento-Grid:** große Kacheln für Teams mit Details, kleine für den Rest (CSS-Grid mit `grid-column: span 2`).
- **Animationen:** Karten fliegen beim Laden nacheinander ein, heben sich beim Hover, drücken sich beim Klick ein. Das Modal zoomt weich auf.
- **Bedienung:** Modal schließt mit X, Klick daneben oder Escape-Taste. Menü bleibt beim Scrollen oben.

## So geht es weiter

1. **Eure Namen und Fotos** in `index.html` eintragen (sucht nach „Vorname Nachname“ und „Foto“).
2. **Echte Auto-Bilder:** Bild in `img/` legen und in `script.js` beim Auto eine Zeile ergänzen, z. B. `img: "img/sf26.jpg",`. Achtet darauf, dass ihr die Bilder benutzen dürft (z. B. Wikimedia Commons) und schreibt die Quelle dazu.
3. **Weitere Teams:** bei einem Team in `script.js` `info` und `cars` ergänzen, genau wie bei Ferrari. Die Karte wird dann automatisch groß und klickbar.
4. **Daten prüfen:** Die Zahlen (PS, Fahrer, Titel) sind gerundet. Bitte vor der Präsentation nochmal nachschauen.
5. **Ideen für mehr JS:** Dark/Light-Modus, Quiz „Welches Auto ist das?“, Countdown bis zum nächsten Rennen.
