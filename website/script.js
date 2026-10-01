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
    gallery_title: "Galerie",
    champ_hint: "🏆 = Konstrukteurs-Weltmeister",
    drag_hint: "Ziehen zum Drehen"
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
    gallery_title: "Gallery",
    champ_hint: "🏆 = Constructors' champion",
    drag_hint: "Drag to rotate"
  }
};

// ---------- 2. DATEN ----------
// Alle Teams der Saison 2026 mit ihren Autos.
// size: "big" = große Kachel, "wide" = breite Kachel, ohne = kleine Kachel.
// color/accent = Lackierung des 3D-Modells (Hauptfarbe / Flügel).
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
        name: "156", year: 1961, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 1,5 L V6",
        power: "ca. 190 PS",
        drivers: "Phil Hill, Wolfgang von Trips",
        de: "Wegen seiner Nase „Haifischmaul“ genannt. Phil Hill wurde damit Weltmeister.",
        en: "Nicknamed “Sharknose”. Phil Hill became world champion with it."
      },
      {
        name: "158", year: 1964, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 1,5 L V8",
        power: "ca. 210 PS",
        drivers: "John Surtees, Lorenzo Bandini",
        de: "John Surtees wurde damit Weltmeister – er ist bis heute der Einzige, der auf zwei und vier Rädern Weltmeister wurde.",
        en: "John Surtees became champion with it – still the only world champion on both two and four wheels."
      },
      {
        name: "312T2", year: 1976, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 3,0 L Boxer-12",
        power: "ca. 500 PS",
        drivers: "Niki Lauda, Clay Regazzoni",
        de: "Niki Lauda verunglückte damit am Nürburgring schwer und fuhr nur sechs Wochen später wieder.",
        en: "Niki Lauda had a terrible crash at the Nürburgring and was racing again just six weeks later."
      },
      {
        name: "312T2", year: 1977, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 3,0 L Boxer-12",
        power: "ca. 500 PS",
        drivers: "Niki Lauda, Carlos Reutemann",
        de: "Niki Lauda holte damit seinen zweiten Titel.",
        en: "Niki Lauda won his second title with it."
      },
      {
        name: "312T4", year: 1979, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 3,0 L Boxer-12",
        power: "ca. 515 PS",
        drivers: "Jody Scheckter, Gilles Villeneuve",
        de: "Jody Scheckter wurde damit Weltmeister – danach dauerte es 21 Jahre bis zum nächsten Ferrari-Fahrertitel.",
        en: "Jody Scheckter became champion – Ferrari then waited 21 years for its next drivers' title."
      },
      {
        name: "126C2", year: 1982, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 1,5 L V6 Turbo",
        power: "ca. 600 PS",
        drivers: "Gilles Villeneuve, Didier Pironi",
        de: "Ein trauriges Jahr: Gilles Villeneuve starb in Zolder, trotzdem gewann Ferrari den Titel.",
        en: "A sad year: Gilles Villeneuve died at Zolder, but Ferrari still won the title."
      },
      {
        name: "126C3", year: 1983, champion: true,
        color: "#d40000", accent: "#ffffff",
        engine: "Ferrari 1,5 L V6 Turbo",
        power: "ca. 650 PS",
        drivers: "René Arnoux, Patrick Tambay",
        de: "Einer der ersten Ferraris mit Chassis aus Kohlefaser.",
        en: "One of the first Ferraris with a carbon-fibre chassis."
      },
      {
        name: "F399", year: 1999, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 3,0 L V10",
        power: "ca. 800 PS",
        drivers: "Michael Schumacher, Eddie Irvine",
        de: "Schumacher brach sich ein Bein, also kämpfte Eddie Irvine bis zum Schluss um den Titel.",
        en: "Schumacher broke his leg, so Eddie Irvine fought for the title until the last race."
      },
      {
        name: "F1-2000", year: 2000, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 3,0 L V10",
        power: "ca. 810 PS",
        drivers: "Michael Schumacher, Rubens Barrichello",
        de: "Schumacher holte den ersten Ferrari-Fahrertitel seit 1979.",
        en: "Schumacher won Ferrari's first drivers' title since 1979."
      },
      {
        name: "F2001", year: 2001, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 3,0 L V10",
        power: "ca. 830 PS",
        drivers: "Michael Schumacher, Rubens Barrichello",
        de: "Schumacher wurde schon vier Rennen vor Schluss Weltmeister.",
        en: "Schumacher clinched the title with four races to go."
      },
      {
        name: "F2002", year: 2002, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 3,0 L V10",
        power: "ca. 850 PS",
        drivers: "Michael Schumacher, Rubens Barrichello",
        de: "Gewann 15 von 17 Rennen. Schumacher stand in jedem Rennen auf dem Podium.",
        en: "Won 15 of 17 races. Schumacher finished on the podium in every race."
      },
      {
        name: "F2003-GA", year: 2003, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 3,0 L V10",
        power: "ca. 870 PS",
        drivers: "Michael Schumacher, Rubens Barrichello",
        de: "Benannt nach Fiat-Chef Gianni Agnelli. Schumacher holte seinen 6. Titel.",
        en: "Named after Fiat boss Gianni Agnelli. Schumacher won his 6th title."
      },
      {
        name: "F2007", year: 2007, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Kimi Räikkönen, Felipe Massa",
        de: "Kimi Räikkönen wurde mit nur einem Punkt Vorsprung Weltmeister.",
        en: "Kimi Räikkönen won the title by just one point."
      },
      {
        name: "F2008", year: 2008, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Felipe Massa, Kimi Räikkönen",
        de: "Felipe Massa verlor den Fahrertitel in der letzten Kurve des letzten Rennens um einen Punkt.",
        en: "Felipe Massa lost the drivers' title by one point in the last corner of the last race."
      },
      {
        name: "SF-26", year: 2026,
        color: "#e8002d", accent: "#ffffff",
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Charles Leclerc, Lewis Hamilton",
        de: "Das aktuelle Auto nach den neuen Regeln von 2026: fast die Hälfte der Leistung kommt aus dem Elektromotor.",
        en: "The current car built for the new 2026 rules: almost half of the power comes from the electric motor."
      },
      {
        name: "SF-24", year: 2024,
        color: "#e8002d", accent: "#ffd700",
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Charles Leclerc, Carlos Sainz",
        de: "Gewann 2024 unter anderem den Großen Preis von Monaco mit Charles Leclerc.",
        en: "Won several races in 2024, including the Monaco Grand Prix with Charles Leclerc."
      },
      {
        name: "F2004", year: 2004, champion: true,
        color: "#e10000", accent: "#ffffff",
        engine: "Ferrari 3,0 L V10",
        power: "ca. 900 PS",
        drivers: "Michael Schumacher, Rubens Barrichello",
        de: "Eines der schnellsten Autos aller Zeiten. Michael Schumacher holte damit seinen 7. WM-Titel.",
        en: "One of the fastest cars of all time. Michael Schumacher won his 7th world title with it."
      },
      {
        name: "312T", year: 1975, champion: true,
        color: "#d40000", accent: "#ffffff",
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
        name: "RB7", year: 2011, champion: true,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Mark Webber",
        de: "Sebastian Vettel holte damit 15 Pole-Positions in einer Saison.",
        en: "Sebastian Vettel took 15 pole positions in one season with it."
      },
      {
        name: "RB8", year: 2012, champion: true,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Mark Webber",
        de: "Vettel wurde im letzten Rennen in Brasilien zum dritten Mal Weltmeister.",
        en: "Vettel won his third title at the final race in Brazil."
      },
      {
        name: "RB18", year: 2022, champion: true,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Honda RBPT 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Max Verstappen, Sergio Pérez",
        de: "Max Verstappen gewann damit 15 Rennen – damals ein Rekord.",
        en: "Max Verstappen won 15 races with it – a record at the time."
      },
      {
        name: "RB22", year: 2026,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Red Bull Ford 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Max Verstappen, Isack Hadjar",
        de: "Das erste Red-Bull-Auto mit einem eigenen Motor, gebaut zusammen mit Ford.",
        en: "The first Red Bull car with its own engine, built together with Ford."
      },
      {
        name: "RB19", year: 2023, champion: true,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Honda RBPT 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Max Verstappen, Sergio Pérez",
        de: "Das erfolgreichste F1-Auto der Geschichte: 21 Siege in 22 Rennen.",
        en: "The most successful F1 car in history: 21 wins in 22 races."
      },
      {
        name: "RB9", year: 2013, champion: true,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Mark Webber",
        de: "Sebastian Vettel gewann damit 9 Rennen in Folge und seinen 4. Titel.",
        en: "Sebastian Vettel won 9 races in a row and his 4th title with this car."
      },
      {
        name: "RB6", year: 2010, champion: true,
        color: "#1b2a55", accent: "#d4001f",
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Sebastian Vettel, Mark Webber",
        de: "Das Auto, mit dem Sebastian Vettel seinen ersten WM-Titel holte.",
        en: "The car that brought Sebastian Vettel his first world title."
      }
    ]
  },
  {
    id: "legends",
    name: "Legenden",
    name_en: "Legends",
    short: "LEG",
    color: "#2e8b57",
    size: "big",
    info: {
      base: "England, Frankreich / England, France",
      founded: "1958–1978",
      titles: "15",
      de: "Teams, die es heute nicht mehr gibt – aber die Weltmeister wurden: Vanwall, Cooper, BRM, Lotus, Brabham, Matra und Tyrrell.",
      en: "Teams that no longer exist but won world titles: Vanwall, Cooper, BRM, Lotus, Brabham, Matra and Tyrrell."
    },
    cars: [
      {
        name: "Vanwall VW5", year: 1958, champion: true,
        color: "#1d5a3a", accent: "#1d5a3a",
        engine: "Vanwall 2,5 L Reihen-4",
        power: "ca. 290 PS",
        drivers: "Stirling Moss, Tony Brooks",
        de: "Der allererste Konstrukteurs-Weltmeister der Formel 1.",
        en: "The very first constructors' champion in Formula 1."
      },
      {
        name: "Cooper T51", year: 1959, champion: true,
        color: "#1d5a3a", accent: "#ffffff",
        engine: "Coventry Climax 2,5 L Reihen-4",
        power: "ca. 240 PS",
        drivers: "Jack Brabham, Bruce McLaren",
        de: "Hatte den Motor hinter dem Fahrer – seitdem bauen alle Teams so.",
        en: "Had the engine behind the driver – every team has built cars that way ever since."
      },
      {
        name: "Cooper T53", year: 1960, champion: true,
        color: "#1d5a3a", accent: "#ffffff",
        engine: "Coventry Climax 2,5 L Reihen-4",
        power: "ca. 245 PS",
        drivers: "Jack Brabham, Bruce McLaren",
        de: "Jack Brabham holte damit seinen zweiten Titel.",
        en: "Jack Brabham won his second title with it."
      },
      {
        name: "BRM P57", year: 1962, champion: true,
        color: "#2f5d3a", accent: "#ff8c00",
        engine: "BRM 1,5 L V8",
        power: "ca. 190 PS",
        drivers: "Graham Hill, Richie Ginther",
        de: "Graham Hill wurde damit zum ersten Mal Weltmeister.",
        en: "Graham Hill won his first world title with it."
      },
      {
        name: "Lotus 25", year: 1963, champion: true,
        color: "#1d5a3a", accent: "#ffd400",
        engine: "Coventry Climax 1,5 L V8",
        power: "ca. 195 PS",
        drivers: "Jim Clark, Trevor Taylor",
        de: "Das erste F1-Auto mit einem Monocoque – Jim Clark gewann 7 von 10 Rennen.",
        en: "The first F1 car with a monocoque – Jim Clark won 7 of 10 races."
      },
      {
        name: "Lotus 33", year: 1965, champion: true,
        color: "#1d5a3a", accent: "#ffd400",
        engine: "Coventry Climax 1,5 L V8",
        power: "ca. 210 PS",
        drivers: "Jim Clark, Mike Spence",
        de: "Jim Clark holte seinen zweiten Titel.",
        en: "Jim Clark won his second title."
      },
      {
        name: "Brabham BT19", year: 1966, champion: true,
        color: "#1d5a3a", accent: "#ffd400",
        engine: "Repco 3,0 L V8",
        power: "ca. 310 PS",
        drivers: "Jack Brabham, Denny Hulme",
        de: "Jack Brabham wurde in seinem eigenen Auto Weltmeister – das schaffte sonst niemand.",
        en: "Jack Brabham became champion in a car of his own – nobody else has done that."
      },
      {
        name: "Brabham BT24", year: 1967, champion: true,
        color: "#1d5a3a", accent: "#ffd400",
        engine: "Repco 3,0 L V8",
        power: "ca. 330 PS",
        drivers: "Denny Hulme, Jack Brabham",
        de: "Denny Hulme wurde damit Weltmeister.",
        en: "Denny Hulme became world champion with it."
      },
      {
        name: "Lotus 49B", year: 1968, champion: true,
        color: "#c8102e", accent: "#ffffff",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 420 PS",
        drivers: "Graham Hill, Jackie Oliver",
        de: "Eines der ersten Autos mit Flügeln. Graham Hill holte seinen zweiten Titel.",
        en: "One of the first cars with wings. Graham Hill won his second title."
      },
      {
        name: "Matra MS80", year: 1969, champion: true,
        color: "#1f4fa0", accent: "#ffffff",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 430 PS",
        drivers: "Jackie Stewart, Jean-Pierre Beltoise",
        de: "Jackie Stewart holte damit seinen ersten Titel.",
        en: "Jackie Stewart won his first title with it."
      },
      {
        name: "Lotus 72C", year: 1970, champion: true,
        color: "#c8102e", accent: "#ffffff",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 440 PS",
        drivers: "Jochen Rindt, Emerson Fittipaldi",
        de: "Jochen Rindt verunglückte in Monza tödlich und wurde trotzdem Weltmeister.",
        en: "Jochen Rindt was killed at Monza but still became world champion."
      },
      {
        name: "Tyrrell 003", year: 1971, champion: true,
        color: "#1f4fa0", accent: "#ffffff",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 450 PS",
        drivers: "Jackie Stewart, François Cevert",
        de: "Jackie Stewart holte seinen zweiten Titel.",
        en: "Jackie Stewart won his second title."
      },
      {
        name: "Lotus 72D", year: 1972, champion: true,
        color: "#111111", accent: "#c9a227",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 450 PS",
        drivers: "Emerson Fittipaldi, Dave Walker",
        de: "Emerson Fittipaldi wurde mit 25 Jahren jüngster Weltmeister seiner Zeit.",
        en: "Emerson Fittipaldi became the youngest champion of his time, aged 25."
      },
      {
        name: "Lotus 72E", year: 1973, champion: true,
        color: "#111111", accent: "#c9a227",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 460 PS",
        drivers: "Emerson Fittipaldi, Ronnie Peterson",
        de: "Der Lotus 72 fuhr insgesamt sechs Jahre lang und gewann 20 Rennen.",
        en: "The Lotus 72 raced for six years and won 20 races in total."
      },
      {
        name: "Lotus 79", year: 1978, champion: true,
        color: "#111111", accent: "#c9a227",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 480 PS",
        drivers: "Mario Andretti, Ronnie Peterson",
        de: "Das erste richtige Ground-Effect-Auto: der Unterboden saugt das Auto auf die Straße.",
        en: "The first true ground-effect car: the floor sucks the car onto the track."
      },
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
        name: "MP4/2", year: 1984, champion: true,
        color: "#e00000", accent: "#ffffff",
        engine: "TAG-Porsche 1,5 L V6 Turbo",
        power: "ca. 750 PS",
        drivers: "Niki Lauda, Alain Prost",
        de: "Niki Lauda wurde mit einem halben Punkt Vorsprung vor Prost Weltmeister.",
        en: "Niki Lauda beat Alain Prost to the title by half a point."
      },
      {
        name: "MP4/2B", year: 1985, champion: true,
        color: "#e00000", accent: "#ffffff",
        engine: "TAG-Porsche 1,5 L V6 Turbo",
        power: "ca. 800 PS",
        drivers: "Alain Prost, Niki Lauda",
        de: "Alain Prost holte damit seinen ersten Titel.",
        en: "Alain Prost won his first title with it."
      },
      {
        name: "MP4/5", year: 1989, champion: true,
        color: "#e00000", accent: "#ffffff",
        engine: "Honda 3,5 L V10",
        power: "ca. 680 PS",
        drivers: "Ayrton Senna, Alain Prost",
        de: "Berühmt durch den Crash von Senna und Prost in Suzuka.",
        en: "Famous for the crash between Senna and Prost at Suzuka."
      },
      {
        name: "MP4/5B", year: 1990, champion: true,
        color: "#e00000", accent: "#ffffff",
        engine: "Honda 3,5 L V10",
        power: "ca. 690 PS",
        drivers: "Ayrton Senna, Gerhard Berger",
        de: "Ayrton Senna holte seinen zweiten Titel.",
        en: "Ayrton Senna won his second title."
      },
      {
        name: "MP4/6", year: 1991, champion: true,
        color: "#e00000", accent: "#ffffff",
        engine: "Honda 3,5 L V12",
        power: "ca. 735 PS",
        drivers: "Ayrton Senna, Gerhard Berger",
        de: "Sennas dritter und letzter WM-Titel.",
        en: "Senna's third and last world title."
      },
      {
        name: "MP4/13", year: 1998, champion: true,
        color: "#aab0b6", accent: "#1a1a1a",
        engine: "Mercedes 3,0 L V10",
        power: "ca. 780 PS",
        drivers: "Mika Häkkinen, David Coulthard",
        de: "Mika Häkkinen wurde damit zum ersten Mal Weltmeister.",
        en: "Mika Häkkinen won his first world title with it."
      },
      {
        name: "MCL39", year: 2025, champion: true,
        color: "#ff8000", accent: "#1a1a1a",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lando Norris, Oscar Piastri",
        de: "McLaren verteidigte damit den Konstrukteurs-Titel.",
        en: "McLaren defended the constructors' title with it."
      },
      {
        name: "MCL40", year: 2026,
        color: "#ff8000", accent: "#1a1a1a",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lando Norris, Oscar Piastri",
        de: "Das aktuelle McLaren-Auto nach den neuen Regeln von 2026.",
        en: "The current McLaren car built for the new 2026 rules."
      },
      {
        name: "MCL38", year: 2024, champion: true,
        color: "#ff8000", accent: "#1a1a1a",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lando Norris, Oscar Piastri",
        de: "Holte 2024 den ersten Konstrukteurs-Titel für McLaren seit 1998.",
        en: "Won McLaren's first constructors' title since 1998."
      },
      {
        name: "MP4/4", year: 1988, champion: true,
        color: "#e00000", accent: "#ffffff",
        engine: "Honda 1,5 L V6 Turbo",
        power: "ca. 650 PS",
        drivers: "Ayrton Senna, Alain Prost",
        de: "Legendär: 15 Siege in 16 Rennen. Ayrton Senna wurde damit zum ersten Mal Weltmeister.",
        en: "A legend: 15 wins in 16 races. Ayrton Senna won his first world title with it."
      },
      {
        name: "M23", year: 1974, champion: true,
        color: "#e00000", accent: "#ffffff",
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
      titles: "8 (+1 als Brawn / as Brawn)",
      de: "Die „Silberpfeile“ gewannen von 2014 bis 2021 acht Konstrukteurs-Titel in Folge.",
      en: "The “Silver Arrows” won eight constructors' titles in a row from 2014 to 2021."
    },
    cars: [
      {
        name: "Brawn BGP 001", year: 2009, champion: true,
        color: "#f2f2f2", accent: "#cedc00",
        engine: "Mercedes 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Jenson Button, Rubens Barrichello",
        de: "Das Vorgänger-Team von Mercedes gewann in seiner einzigen Saison beide Titel.",
        en: "Mercedes' predecessor team won both titles in its only season."
      },
      {
        name: "W06", year: 2015, champion: true,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 900 PS",
        drivers: "Lewis Hamilton, Nico Rosberg",
        de: "Lewis Hamilton holte seinen dritten Titel.",
        en: "Lewis Hamilton won his third title."
      },
      {
        name: "W07", year: 2016, champion: true,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 920 PS",
        drivers: "Nico Rosberg, Lewis Hamilton",
        de: "Nico Rosberg wurde Weltmeister und hörte danach sofort auf.",
        en: "Nico Rosberg became champion and retired straight away."
      },
      {
        name: "W08", year: 2017, champion: true,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 940 PS",
        drivers: "Lewis Hamilton, Valtteri Bottas",
        de: "Das erste Auto nach den Regeln für breitere, schnellere Autos.",
        en: "The first car built for the rules that made cars wider and faster."
      },
      {
        name: "W09", year: 2018, champion: true,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Lewis Hamilton, Valtteri Bottas",
        de: "Das erste Mercedes mit dem Halo-Kopfschutz.",
        en: "The first Mercedes with the halo head protection."
      },
      {
        name: "W10", year: 2019, champion: true,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Lewis Hamilton, Valtteri Bottas",
        de: "Lewis Hamilton holte seinen 6. Titel.",
        en: "Lewis Hamilton won his 6th title."
      },
      {
        name: "W12", year: 2021, champion: true,
        color: "#1c1c1c", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lewis Hamilton, Valtteri Bottas",
        de: "Der achte Konstrukteurs-Titel in Folge – den Fahrertitel holte Verstappen.",
        en: "The eighth constructors' title in a row – Verstappen won the drivers' title."
      },
      {
        name: "W17", year: 2026,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "George Russell, Kimi Antonelli",
        de: "Das aktuelle Mercedes-Auto nach den neuen Regeln von 2026.",
        en: "The current Mercedes car built for the new 2026 rules."
      },
      {
        name: "W11", year: 2020, champion: true,
        color: "#1c1c1c", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Lewis Hamilton, Valtteri Bottas",
        de: "Gilt als eines der schnellsten F1-Autos überhaupt. Hamilton holte damit seinen 7. Titel.",
        en: "Seen as one of the fastest F1 cars ever. Hamilton won his 7th title with it."
      },
      {
        name: "W05", year: 2014, champion: true,
        color: "#aab0b6", accent: "#27f4d2",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 850 PS",
        drivers: "Lewis Hamilton, Nico Rosberg",
        de: "Das erste Auto der Hybrid-Ära und der Start der Mercedes-Siegesserie.",
        en: "The first car of the hybrid era and the start of Mercedes' winning streak."
      },
      {
        name: "W196", year: 1954,
        color: "#9ea4ab", accent: "#9ea4ab",
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
        color: "#0b5c47", accent: "#cedc00",
        engine: "Honda 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Fernando Alonso, Lance Stroll",
        de: "Das erste Aston Martin mit Honda-Motor und von Adrian Newey entworfen.",
        en: "The first Aston Martin with a Honda engine, designed by Adrian Newey."
      },
      {
        name: "AMR23", year: 2023,
        color: "#0b5c47", accent: "#cedc00",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Fernando Alonso, Lance Stroll",
        de: "Fernando Alonso fuhr damit 8 Mal aufs Podium.",
        en: "Fernando Alonso finished on the podium 8 times with this car."
      },
      {
        name: "DBR4", year: 1959,
        color: "#1d5a3a", accent: "#1d5a3a",
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
      titles: "3 (als Benetton und Renault / as Benetton and Renault)",
      de: "Das Team gehört zu Renault. Unter dem Namen Renault wurde Fernando Alonso 2005 und 2006 Weltmeister.",
      en: "The team belongs to Renault. Under the Renault name, Fernando Alonso won the 2005 and 2006 titles."
    },
    cars: [
      {
        name: "Benetton B195", year: 1995, champion: true,
        color: "#1b4fa0", accent: "#3cb44b",
        engine: "Renault 3,0 L V10",
        power: "ca. 700 PS",
        drivers: "Michael Schumacher, Johnny Herbert",
        de: "Das Team hieß damals Benetton. Michael Schumacher holte seinen zweiten Titel.",
        en: "Back then the team was called Benetton. Michael Schumacher won his second title."
      },
      {
        name: "Renault R26", year: 2006, champion: true,
        color: "#1a4ca0", accent: "#ffd200",
        engine: "Renault 2,4 L V8",
        power: "ca. 750 PS",
        drivers: "Fernando Alonso, Giancarlo Fisichella",
        de: "Fernando Alonso gewann das Titelduell gegen Michael Schumacher.",
        en: "Fernando Alonso won the title fight against Michael Schumacher."
      },
      {
        name: "A526", year: 2026,
        color: "#0067b1", accent: "#ff87bc",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Pierre Gasly, Franco Colapinto",
        de: "Seit 2026 fährt Alpine mit Mercedes-Motoren statt mit eigenen Renault-Motoren.",
        en: "Since 2026 Alpine uses Mercedes engines instead of its own Renault engines."
      },
      {
        name: "A521", year: 2021,
        color: "#0d1c47", accent: "#ff2d55",
        engine: "Renault 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Fernando Alonso, Esteban Ocon",
        de: "Esteban Ocon gewann damit überraschend den Großen Preis von Ungarn.",
        en: "Esteban Ocon won the Hungarian Grand Prix with it as a big surprise."
      },
      {
        name: "Renault R25", year: 2005, champion: true,
        color: "#1a4ca0", accent: "#ffd200",
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
        name: "FW07C", year: 1981, champion: true,
        color: "#f2f2f2", accent: "#0a7a3a",
        engine: "Ford Cosworth 3,0 L V8",
        power: "ca. 490 PS",
        drivers: "Alan Jones, Carlos Reutemann",
        de: "Williams verteidigte damit den Konstrukteurs-Titel.",
        en: "Williams defended the constructors' title with it."
      },
      {
        name: "FW11", year: 1986, champion: true,
        color: "#f2f2f2", accent: "#1e3c8c",
        engine: "Honda 1,5 L V6 Turbo",
        power: "ca. 1000 PS",
        drivers: "Nigel Mansell, Nelson Piquet",
        de: "Im Qualifying hatte der Turbo über 1000 PS. Mansell verlor den Titel durch einen Reifenplatzer.",
        en: "In qualifying the turbo made over 1000 hp. Mansell lost the title after a tyre blew."
      },
      {
        name: "FW11B", year: 1987, champion: true,
        color: "#f2f2f2", accent: "#1e3c8c",
        engine: "Honda 1,5 L V6 Turbo",
        power: "ca. 1000 PS",
        drivers: "Nelson Piquet, Nigel Mansell",
        de: "Nelson Piquet holte seinen dritten Titel.",
        en: "Nelson Piquet won his third title."
      },
      {
        name: "FW15C", year: 1993, champion: true,
        color: "#f2f2f2", accent: "#1e3c8c",
        engine: "Renault 3,5 L V10",
        power: "ca. 780 PS",
        drivers: "Alain Prost, Damon Hill",
        de: "Voll mit Technik: aktive Federung, Traktionskontrolle und ABS. Prost holte seinen 4. Titel.",
        en: "Full of tech: active suspension, traction control and ABS. Prost won his 4th title."
      },
      {
        name: "FW16", year: 1994, champion: true,
        color: "#f2f2f2", accent: "#1e3c8c",
        engine: "Renault 3,5 L V10",
        power: "ca. 790 PS",
        drivers: "Ayrton Senna, Damon Hill",
        de: "Ayrton Senna verunglückte in diesem Auto in Imola tödlich.",
        en: "Ayrton Senna lost his life in this car at Imola."
      },
      {
        name: "FW19", year: 1997, champion: true,
        color: "#c8102e", accent: "#ffffff",
        engine: "Renault 3,0 L V10",
        power: "ca. 760 PS",
        drivers: "Jacques Villeneuve, Heinz-Harald Frentzen",
        de: "Jacques Villeneuve gewann das Titelduell gegen Michael Schumacher.",
        en: "Jacques Villeneuve won the title fight against Michael Schumacher."
      },
      {
        name: "FW48", year: 2026,
        color: "#0a2a6b", accent: "#64c4ff",
        engine: "Mercedes 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Alexander Albon, Carlos Sainz",
        de: "Das aktuelle Williams-Auto nach den neuen Regeln von 2026.",
        en: "The current Williams car built for the new 2026 rules."
      },
      {
        name: "FW18", year: 1996, champion: true,
        color: "#f2f2f2", accent: "#1e3c8c",
        engine: "Renault 3,0 L V10",
        power: "ca. 750 PS",
        drivers: "Damon Hill, Jacques Villeneuve",
        de: "Damon Hill wurde damit Weltmeister, Williams gewann 12 von 16 Rennen.",
        en: "Damon Hill became world champion, Williams won 12 of 16 races."
      },
      {
        name: "FW14B", year: 1992, champion: true,
        color: "#f2f2f2", accent: "#1e3c8c",
        engine: "Renault 3,5 L V10",
        power: "ca. 760 PS",
        drivers: "Nigel Mansell, Riccardo Patrese",
        de: "Hatte eine computergesteuerte „aktive Federung“ – richtig viel Mechatronik!",
        en: "Had computer-controlled “active suspension” – lots of mechatronics!"
      },
      {
        name: "FW07", year: 1980, champion: true,
        color: "#f2f2f2", accent: "#0a7a3a",
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
        color: "#f2f2f2", accent: "#1b3fd8",
        engine: "Red Bull Ford 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Liam Lawson, Arvid Lindblad",
        de: "Fährt wie Red Bull mit dem neuen eigenen Motor von Red Bull und Ford.",
        en: "Like Red Bull, it uses the new in-house engine from Red Bull and Ford."
      },
      {
        name: "AlphaTauri AT01", year: 2020,
        color: "#f2f2f2", accent: "#1b2a5c",
        engine: "Honda 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Pierre Gasly, Daniil Kwjat",
        de: "Pierre Gasly gewann damit sensationell den Großen Preis von Italien in Monza.",
        en: "Pierre Gasly sensationally won the Italian Grand Prix at Monza with it."
      },
      {
        name: "Toro Rosso STR3", year: 2008,
        color: "#1b2a5c", accent: "#d4001f",
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
        color: "#e6e6e6", accent: "#d4001f",
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Esteban Ocon, Oliver Bearman",
        de: "Das aktuelle Haas-Auto nach den neuen Regeln von 2026.",
        en: "The current Haas car built for the new 2026 rules."
      },
      {
        name: "VF-18", year: 2018,
        color: "#2b2b2b", accent: "#d4001f",
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 950 PS",
        drivers: "Romain Grosjean, Kevin Magnussen",
        de: "Das bisher beste Jahr von Haas: Platz 5 bei den Konstrukteuren.",
        en: "Haas' best year so far: 5th in the constructors' championship."
      },
      {
        name: "VF-16", year: 2016,
        color: "#8c8f94", accent: "#d4001f",
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
        color: "#9a9ea6", accent: "#f50537",
        engine: "Audi 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Nico Hülkenberg, Gabriel Bortoleto",
        de: "Das erste Formel-1-Auto von Audi – mit einem Motor aus Neuburg an der Donau.",
        en: "Audi's first Formula 1 car – with an engine built in Neuburg, Germany."
      },
      {
        name: "Sauber C45", year: 2025,
        color: "#1f1f1f", accent: "#52e252",
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Nico Hülkenberg, Gabriel Bortoleto",
        de: "Nico Hülkenberg fuhr damit in Silverstone endlich sein erstes Podium.",
        en: "Nico Hülkenberg finally scored his first podium with it at Silverstone."
      },
      {
        name: "BMW Sauber F1.08", year: 2008,
        color: "#f2f2f2", accent: "#1f5fbf",
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
        color: "#1a1a1a", accent: "#ffffff",
        engine: "Ferrari 1,6 L V6 Turbo-Hybrid",
        power: "ca. 1000 PS",
        drivers: "Sergio Pérez, Valtteri Bottas",
        de: "Das allererste Cadillac-Auto. Später will Cadillac einen eigenen Motor bauen.",
        en: "The very first Cadillac car. Later Cadillac wants to build its own engine."
      }
    ]
  }
];

// Autos jedes Teams nach Jahr sortieren (neuestes zuerst)
teams.forEach(function (team) {
  team.cars.sort(function (a, b) { return b.year - a.year; });
});

// Teamname in der aktuellen Sprache (nur "Legenden" hat einen englischen Namen)
function teamName(team) {
  return lang === "en" && team.name_en ? team.name_en : team.name;
}

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
      <h3>${teamName(team)}</h3>
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
  if (use3D) viewer.stop(); // 3D-Animation anhalten, spart Akku
}

function renderModal() {
  const t = texts[lang];
  const team = openTeam;

  // Timeline-Buttons (ein Button pro Auto)
  let timeline = "";
  team.cars.forEach(function (car, i) {
    timeline += `<button class="${i === openCarIndex ? "active" : ""}" data-index="${i}">${car.champion ? "🏆 " : ""}${car.year} · ${car.name}</button>`;
  });

  // Galerie (alle Autos des Teams als kleine Bilder)
  let gallery = "";
  team.cars.forEach(function (car, i) {
    gallery += `<div class="thumb${i === openCarIndex ? " active" : ""}" data-index="${i}" title="${car.name}">${carImage(car, team)}<span>${car.year}</span></div>`;
  });

  modalContent.innerHTML = `
    <h2>${teamName(team)}</h2>
    <p class="team-info">
      ${t.base}: ${team.info.base} · ${t.founded}: ${team.info.founded} · ${t.titles}: ${team.info.titles}<br>
      ${team.info[lang]}
    </p>

    <h3>${t.cars_title}</h3>
    <p class="hint">${t.champ_hint}</p>
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
      <div class="car-image" id="car-3d">${use3D ? `<span class="drag-hint">↔ ${t.drag_hint}</span>` : carImage(car, openTeam)}</div>
      <table class="specs">
        <tr><th>${t.year}</th><td>${car.year}</td></tr>
        <tr><th>${t.engine}</th><td>${car.engine}</td></tr>
        <tr><th>${t.power}</th><td>${car.power}</td></tr>
        <tr><th>${t.drivers}</th><td>${car.drivers}</td></tr>
      </table>
      <p class="car-desc">${car[lang]}</p>
    </div>
  `;

  // 3D-Modell des Autos anzeigen (siehe car3d.js)
  if (use3D) viewer.show(document.getElementById("car-3d"), car, openTeam);
}

// Kann der Browser 3D? Wenn nicht, werden einfache Zeichnungen gezeigt.
const use3D = has3D();

// Eigenes Foto, falls vorhanden – sonst Bild vom 3D-Modell oder die Zeichnung
function carImage(car, team) {
  if (car.img) {
    return `<img src="${car.img}" alt="${car.name}">`;
  }
  if (use3D) {
    return `<img src="${carThumbnail(car, team)}" alt="${car.name}">`;
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
