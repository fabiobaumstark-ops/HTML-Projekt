# Pit-Lane – unsere Formel-1-Website

HTML-Projekt INF, TGM 11, Josef-Durler-Schule Rastatt.

## Dateien

| Datei | Wofür |
|---|---|
| `index.html` | Aufbau der Seite (HTML) |
| `style.css` | Aussehen (CSS): Seite dunkel, Showroom weiß |
| `script.js` | Interaktion (JavaScript): Autos wechseln, Sprache wechseln |
| `img/autos/` | Bilder der 11 Autos |
| `img/` | Passbild (Platzhalter durch eigenes Foto ersetzen) |

## Check: Vorgaben aus dem Projektauftrag

| Vorgabe | Wo auf der Seite |
|---|---|
| `index.html` mit head und body | `index.html` |
| Header | Logo, Willkommensgruß, DE/EN-Knöpfe |
| Nav | Menü, bleibt beim Scrollen oben (`position: sticky`) |
| Section | Showroom, Alle Autos, Saison 2026, Über uns |
| Footer mit „Designed by Fabio Baumstark“ | ganz unten |
| Deutsch und Englisch | Funktion `setzeSprache()` in `script.js` |
| Passbild | Bereich „Über uns“ |
| Text, Hyperlink, Aufzählung, Liste, Textblöcke | Bereich „Saison 2026“ |
| Aussehen mit CSS (externe Datei) | `style.css`, mit CSS-Grid und Flexbox |
| Interaktiv mit JavaScript | Pfeile, Karten anklicken, Sprache wechseln |

## So funktioniert das JavaScript

- `autos` ist ein Array. Jedes Auto ist ein Objekt mit Team, Name, Motor, Fahrern usw.
- `zeigeAuto(nummer)` holt das Auto aus dem Array und schreibt seine Daten mit `getElementById(...).innerHTML` in die Seite.
- `naechstesAuto()` und `vorherigesAuto()` zählen die Nummer hoch oder runter. Nach dem letzten Auto geht es wieder von vorne los.
- `setzeSprache("en")` sucht alle Elemente mit `data-de` und schreibt den Text aus `data-en` hinein.

## Noch zu tun

1. Eigenes Passbild in `img/` legen und in `index.html` den Dateinamen ändern.
2. In Firefox testen.
3. Abgabe bis 16.12.2026: alle Dateien und die Präsentation als PDF in einer ZIP-Datei auf itsLearning.
