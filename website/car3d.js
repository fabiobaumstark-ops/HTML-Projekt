/* =========================================================
   F1 Garage – car3d.js
   Baut per Programmcode ein 3D-Modell eines Formel-1-Autos.
   Die Karosserie entsteht aus vielen Querschnitten (wie Spanten
   bei einem Boot), die zu einer glatten Hülle verbunden werden.
   Je nach Baujahr ändert sich die Form:
     bis 1967  Zigarre ohne Flügel
     bis 1982  Keilform mit großem Heckflügel und Airbox
     bis 1993  flach und breit (Turbo-Zeit)
     bis 2008  hohe Nase, schmaler
     bis 2021  lang, breiter Frontflügel, ab 2018 mit Halo
     ab 2022   Ground-Effect-Autos mit großen Rädern und Halo
   Benötigt die Bibliothek three.js (lib/three.min.js).
   ========================================================= */

// ---------- Maße je nach Epoche ----------
function eraParams(year) {
  if (year < 1968) {
    return { era: "classic", wb: 2.3, track: 1.3, wheelR: 0.33, wheelW: 0.17, rearW: 0.22, rearR: 0.35 };
  }
  if (year < 1983) {
    return {
      era: "wedge", wb: 2.6, track: 1.45, wheelR: 0.3, wheelW: 0.26, rearW: 0.46, rearR: 0.33,
      noseY: 0.18, nose: "low", airbox: year >= 1971, sidepodW: 0.4, sidepodH: 0.28,
      frontWing: 1.4, rearWing: { w: 1.05, y: 0.95, back: 0.55 }
    };
  }
  if (year < 1994) {
    return {
      era: "turbo", wb: 2.85, track: 1.5, wheelR: 0.31, wheelW: 0.28, rearW: 0.42, rearR: 0.33,
      noseY: 0.2, nose: "low", airbox: year >= 1989, sidepodW: 0.42, sidepodH: 0.25,
      frontWing: 1.5, rearWing: { w: 1.0, y: 0.85, back: 0.45 }
    };
  }
  if (year < 2009) {
    return {
      era: "highnose", wb: 3.05, track: 1.45, wheelR: 0.33, wheelW: 0.25, rearW: 0.36, rearR: 0.33,
      noseY: 0.4, nose: "high", airbox: true, sidepodW: 0.34, sidepodH: 0.3,
      frontWing: 1.4, rearWing: { w: 0.85, y: 0.92, back: 0.42 }
    };
  }
  if (year < 2022) {
    return {
      era: "hybrid", wb: 3.5, track: 1.55, wheelR: 0.33, wheelW: 0.26, rearW: 0.38, rearR: 0.33,
      noseY: year < 2014 ? 0.42 : 0.26, nose: year < 2014 ? "high" : "low", airbox: true,
      sidepodW: 0.36, sidepodH: 0.3, fin: year <= 2017,
      frontWing: 1.8, rearWing: { w: 0.9, y: 0.92, back: 0.45 }, halo: year >= 2018
    };
  }
  return {
    era: "ground", wb: year >= 2026 ? 3.4 : 3.6, track: 1.55, wheelR: 0.36, wheelW: 0.28, rearW: 0.38, rearR: 0.36,
    noseY: 0.24, nose: "low", airbox: true, sidepodW: 0.42, sidepodH: 0.32, covers: true,
    frontWing: year >= 2026 ? 1.7 : 1.9, rearWing: { w: 0.9, y: 0.88, back: 0.45 }, halo: true
  };
}

// ---------- Materialien ----------
// Lack mit Klarlack-Schicht: glänzt und spiegelt die Umgebung
function paint(color) {
  return new THREE.MeshPhysicalMaterial({
    color: color, metalness: 0.1, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.45
  });
}
function plain(color, rough, metal) {
  return new THREE.MeshStandardMaterial({ color: color, roughness: rough, metalness: metal || 0 });
}

// ---------- Hilfsfunktionen für Formen ----------

// Glatte Hülle aus Querschnitten.
// Jeder Querschnitt: { x, w (Breite), top, bot (Ober-/Unterkante), z (Mitte), n (Rundheit) }
// n = 2 ist rund (Ellipse), größere Werte werden eckiger.
function loft(sections, material, steps, ring) {
  steps = steps || 6;
  ring = ring || 28;
  const val = function (o, p) { return o[p] === undefined ? (p === "n" ? 2.4 : 0) : o[p]; };
  // Zwischen den Querschnitten weich überblenden (mehr Querschnitte = glatter)
  const all = [];
  for (let i = 0; i < sections.length - 1; i++) {
    const a = sections[i], b = sections[i + 1];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const k = t * t * (3 - 2 * t); // "smoothstep" für weiche Übergänge
      const mix = function (p) { return val(a, p) * (1 - k) + val(b, p) * k; };
      all.push({ x: a.x * (1 - t) + b.x * t, w: mix("w"), top: mix("top"), bot: mix("bot"), z: mix("z"), n: mix("n") });
    }
  }
  const last = sections[sections.length - 1];
  all.push({ x: last.x, w: last.w, top: last.top, bot: last.bot, z: val(last, "z"), n: val(last, "n") });

  const pos = [];
  all.forEach(function (sec) {
    for (let j = 0; j < ring; j++) {
      const ang = (j / ring) * Math.PI * 2;
      const c = Math.cos(ang), s = Math.sin(ang);
      const e = 2 / sec.n;
      const zz = Math.sign(c) * Math.pow(Math.abs(c), e) * sec.w / 2 + sec.z;
      const yy = sec.bot + (sec.top - sec.bot) * (0.5 + 0.5 * Math.sign(s) * Math.pow(Math.abs(s), e));
      pos.push(sec.x, yy, zz);
    }
  });
  // Mittelpunkte für die Deckel vorne und hinten
  const first = all[0], end = all[all.length - 1];
  pos.push(first.x, (first.top + first.bot) / 2, first.z);
  pos.push(end.x, (end.top + end.bot) / 2, end.z);
  const capA = all.length * ring, capB = capA + 1;

  const idx = [];
  for (let i = 0; i < all.length - 1; i++) {
    for (let j = 0; j < ring; j++) {
      const a = i * ring + j, b = i * ring + (j + 1) % ring;
      const c = a + ring, d = b + ring;
      idx.push(a, b, c, b, d, c);
    }
  }
  const o = (all.length - 1) * ring;
  for (let j = 0; j < ring; j++) {
    idx.push(capA, (j + 1) % ring, j);
    idx.push(capB, o + j, o + (j + 1) % ring);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

// Flügelprofil (wie bei einem Flugzeug) in die Breite gezogen
function wingElement(chord, thick, span, angle, material) {
  const sh = new THREE.Shape();
  sh.moveTo(0, 0);
  sh.bezierCurveTo(chord * 0.1, thick * 1.1, chord * 0.5, thick, chord, thick * 0.15);
  sh.lineTo(chord, 0);
  sh.bezierCurveTo(chord * 0.5, -thick * 0.15, chord * 0.1, -thick * 0.25, 0, 0);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: span, bevelEnabled: false, curveSegments: 10 });
  geo.translate(-chord, 0, -span / 2);
  const m = new THREE.Mesh(geo, material);
  m.rotation.z = angle; // Anstellwinkel
  return m;
}

// Flache Platte mit runden Ecken (Endplatten der Flügel)
function plate(len, height, thick, radius, material) {
  const sh = new THREE.Shape();
  const r = Math.min(radius, height / 2, len / 2);
  sh.moveTo(-len / 2 + r, -height / 2);
  sh.lineTo(len / 2 - r, -height / 2);
  sh.quadraticCurveTo(len / 2, -height / 2, len / 2, -height / 2 + r);
  sh.lineTo(len / 2, height / 2 - r);
  sh.quadraticCurveTo(len / 2, height / 2, len / 2 - r, height / 2);
  sh.lineTo(-len / 2 + r, height / 2);
  sh.quadraticCurveTo(-len / 2, height / 2, -len / 2, height / 2 - r);
  sh.lineTo(-len / 2, -height / 2 + r);
  sh.quadraticCurveTo(-len / 2, -height / 2, -len / 2 + r, -height / 2);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: thick, bevelEnabled: false });
  geo.translate(0, 0, -thick / 2);
  return new THREE.Mesh(geo, material);
}

// Dünnes Rohr zwischen zwei Punkten (Aufhängung, Spiegelhalter)
function rod(a, b, r, material) {
  const start = new THREE.Vector3(a[0], a[1], a[2]);
  const end = new THREE.Vector3(b[0], b[1], b[2]);
  const dir = new THREE.Vector3().subVectors(end, start);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, dir.length(), 8), material);
  m.position.copy(start).add(dir.clone().multiplyScalar(0.5));
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}

// Rad: Reifen mit runden Flanken, Felge mit Speichen
function wheel(R, W, p, rimMat, stripe) {
  const g = new THREE.Group();
  const rimR = R * (p.era === "ground" ? 0.72 : 0.62);
  const e = Math.min(0.06, W * 0.3);
  // Querschnitt des Reifens, um die Achse gedreht
  const prof = [
    new THREE.Vector2(rimR, -W / 2 + 0.01),
    new THREE.Vector2(R - e, -W / 2),
    new THREE.Vector2(R - e * 0.3, -W / 2 + e * 0.3),
    new THREE.Vector2(R, -W / 2 + e),
    new THREE.Vector2(R, W / 2 - e),
    new THREE.Vector2(R - e * 0.3, W / 2 - e * 0.3),
    new THREE.Vector2(R - e, W / 2),
    new THREE.Vector2(rimR, W / 2 - 0.01)
  ];
  const tire = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), plain("#161616", 0.85));
  tire.material.side = THREE.DoubleSide;
  tire.rotation.x = Math.PI / 2;
  g.add(tire);
  // farbiger Streifen auf der Reifenflanke (ab 2011 wie bei Pirelli)
  if (stripe) {
    [-1, 1].forEach(function (s) {
      const ringM = new THREE.Mesh(new THREE.TorusGeometry(R * 0.86, 0.012, 6, 48), plain(stripe, 0.5));
      ringM.position.z = s * (W / 2 + 0.002);
      g.add(ringM);
    });
  }
  // Felge
  const rimBand = new THREE.Mesh(new THREE.CylinderGeometry(rimR, rimR, W * 0.9, 32, 1, true), rimMat);
  rimBand.rotation.x = Math.PI / 2;
  g.add(rimBand);
  [-1, 1].forEach(function (s) {
    const face = new THREE.Mesh(new THREE.CircleGeometry(rimR, 32), p.covers ? plain("#202024", 0.4, 0.3) : plain("#0d0d0f", 0.9));
    face.position.z = s * W * 0.28;
    if (s < 0) face.rotation.y = Math.PI;
    g.add(face);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.12, R * 0.12, 0.04, 16), plain("#c0c0c0", 0.2, 0.9));
    hub.rotation.x = Math.PI / 2;
    hub.position.z = s * (W * 0.32 + 0.02);
    g.add(hub);
    // Speichen (alte Autos: viele dünne Drahtspeichen, neue: wenige breite)
    if (!p.covers) {
      const count = p.era === "classic" ? 24 : 10;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        g.add(rod([0, 0, s * W * 0.33], [Math.cos(a) * rimR * 0.95, Math.sin(a) * rimR * 0.95, s * W * 0.3],
          p.era === "classic" ? 0.004 : 0.014, p.era === "classic" ? plain("#d0d0d0", 0.2, 0.9) : rimMat));
      }
    }
  });
  return g;
}

// ---------- Das Auto bauen ----------
// car: { year, color?, accent? }  team: { color }
function buildCar3D(car, team) {
  const p = eraParams(car.year);
  const body = paint(car.color || team.color);
  const accent = paint(car.accent || "#ffffff");
  const carbon = plain("#17171b", 0.45, 0.35);
  const dark = plain("#0a0a0c", 0.8);
  dark.side = THREE.DoubleSide;
  const g = new THREE.Group();

  const fx = p.wb / 2;     // Vorderachse
  const rx = -p.wb / 2;    // Hinterachse
  const tz = p.track / 2;  // halbe Spurweite
  let headY = 0.66, headX = -0.12;

  if (p.era === "classic") {
    // Zigarrenform
    g.add(loft([
      { x: fx + 0.8, w: 0.22, top: 0.54, bot: 0.3, n: 2 },
      { x: fx + 0.35, w: 0.5, top: 0.66, bot: 0.18, n: 2.2 },
      { x: 0.25, w: 0.64, top: 0.74, bot: 0.13, n: 2.4 },
      { x: -0.15, w: 0.66, top: 0.64, bot: 0.12, n: 2.6 },
      { x: -0.6, w: 0.6, top: 0.76, bot: 0.13, n: 2.4 },
      { x: rx - 0.1, w: 0.42, top: 0.62, bot: 0.18, n: 2.2 },
      { x: rx - 0.75, w: 0.1, top: 0.46, bot: 0.34, n: 2 }
    ], body, 8, 32));
    // Kühlergrill vorne
    const grill = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), dark);
    grill.rotation.y = Math.PI / 2;
    grill.position.set(fx + 0.805, 0.42, 0);
    g.add(grill);
    // Windschutzscheibe
    const screen = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.12, 20, 1, true, Math.PI / 2 - 1.2, 2.4),
      new THREE.MeshPhysicalMaterial({ color: "#cfe3ff", transparent: true, opacity: 0.35, roughness: 0, clearcoat: 1, side: THREE.DoubleSide }));
    screen.position.set(-0.1, 0.78, 0);
    g.add(screen);
    // Auspuffrohre
    [-1, 1].forEach(function (s) {
      g.add(rod([-0.2, 0.3, s * 0.3], [rx - 0.6, 0.28, s * 0.32], 0.03, plain("#9a9a9a", 0.25, 0.9)));
    });
    headY = 0.84; headX = -0.25;
  } else {
    const hiNose = p.nose === "high";
    const top = p.airbox ? 0.98 : 0.7;
    const tip = fx + 0.6;
    // Chassis von der Nasenspitze bis zum Getriebe
    g.add(loft([
      { x: tip, w: 0.14, top: p.noseY + 0.05, bot: p.noseY - 0.05, n: 2.2 },
      { x: fx + 0.15, w: 0.26, top: p.noseY + 0.14, bot: hiNose ? p.noseY - 0.06 : 0.12, n: 2.6 },
      { x: fx - 0.35, w: 0.42, top: 0.58, bot: hiNose ? 0.26 : 0.11, n: 3 },
      { x: 0.42, w: 0.56, top: 0.66, bot: 0.1, n: 3.4 },
      { x: 0.0, w: 0.62, top: 0.58, bot: 0.1, n: 3.4 },
      { x: -0.4, w: 0.6, top: top - 0.05, bot: 0.1, n: 2.8 },
      { x: -0.75, w: 0.5, top: top, bot: 0.1, n: 2.4 },
      { x: rx + 0.35, w: 0.3, top: 0.52, bot: 0.14, n: 2.6 },
      { x: rx - 0.3, w: 0.18, top: 0.36, bot: 0.2, n: 2.6 }
    ], body, 7, 32));
    // Cockpit-Öffnung (dunkler Rand)
    const cockpit = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 32), dark);
    cockpit.rotation.x = Math.PI / 2;
    cockpit.scale.set(1.5, 1, 1);
    cockpit.position.set(-0.05, 0.6, 0);
    g.add(cockpit);
    // Lufteinlass über dem Kopf
    if (p.airbox) {
      const inlet = new THREE.Mesh(new THREE.CircleGeometry(0.1, 20), dark);
      inlet.rotation.y = Math.PI / 2;
      inlet.scale.set(1, 1.2, 1);
      inlet.position.set(-0.36, top - 0.13, 0);
      g.add(inlet);
    }
    // Haifischflosse auf der Motorabdeckung (2008–2017)
    if (p.fin) {
      const fin = new THREE.Shape();
      fin.moveTo(-0.6, 0); fin.lineTo(rx + 0.2, 0); fin.lineTo(rx + 0.1, 0.32); fin.lineTo(-0.6, 0);
      const fg = new THREE.ExtrudeGeometry(fin, { depth: 0.015, bevelEnabled: false });
      fg.translate(0, top - 0.06, -0.0075);
      g.add(new THREE.Mesh(fg, body));
    }
    // Seitenkästen (Sidepods) mit Lufteinlass
    [-1, 1].forEach(function (s) {
      const zf = s * (0.27 + p.sidepodW / 2);
      const h = p.sidepodH;
      g.add(loft([
        { x: 0.38, w: p.sidepodW, top: 0.13 + h, bot: 0.12, z: zf, n: 4 },
        { x: -0.1, w: p.sidepodW * 1.02, top: 0.15 + h, bot: 0.11, z: zf, n: 4 },
        { x: -0.8, w: p.sidepodW * 0.6, top: 0.12 + h * 0.75, bot: 0.11, z: s * (0.27 + p.sidepodW * 0.3), n: 3 },
        { x: rx + 0.3, w: 0.08, top: 0.3, bot: 0.12, z: s * 0.22, n: 2.5 }
      ], body, 6, 24));
      const inlet = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), dark);
      inlet.rotation.y = Math.PI / 2;
      inlet.scale.set(p.sidepodW * 0.8, h * 0.7, 1);
      inlet.position.set(0.385, 0.13 + h * 0.5, zf);
      g.add(inlet);
      // Rückspiegel
      g.add(rod([0.32, 0.6, s * 0.26], [0.32, 0.7, s * 0.4], 0.01, carbon));
      g.add(loft([
        { x: 0.38, w: 0.14, top: 0.76, bot: 0.67, z: s * 0.44, n: 3 },
        { x: 0.27, w: 0.12, top: 0.75, bot: 0.68, z: s * 0.44, n: 3 }
      ], body, 2, 16));
    });
    // Unterboden aus Kohlefaser und Diffusor
    const floor = plate(p.wb * 0.85, p.track * 0.82, 0.03, 0.25, carbon);
    floor.rotation.x = Math.PI / 2;
    floor.position.set(-0.15, 0.07, 0);
    g.add(floor);
    const diff = wingElement(0.5, 0.04, 0.9, -0.35, carbon);
    diff.position.set(rx - 0.1, 0.1, 0);
    g.add(diff);
    // rotes Regenlicht hinten
    const rain = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.06, 0.12),
      new THREE.MeshStandardMaterial({ color: "#ff1a1a", emissive: "#ff0000", emissiveIntensity: 0.7 }));
    rain.position.set(rx - 0.31, 0.29, 0);
    g.add(rain);

    // Frontflügel: Hauptprofil und Klappen, Endplatten
    const fwX = tip + 0.12;
    const fw1 = wingElement(0.42, 0.05, p.frontWing, 0.05, accent);
    fw1.position.set(fwX, 0.08, 0);
    g.add(fw1);
    const fw2 = wingElement(0.22, 0.035, p.frontWing * 0.92, -0.35, body);
    fw2.position.set(fwX - 0.36, 0.13, 0);
    g.add(fw2);
    if (car.year >= 1994) {
      const fw3 = wingElement(0.16, 0.03, p.frontWing * 0.88, -0.6, accent);
      fw3.position.set(fwX - 0.5, 0.21, 0);
      g.add(fw3);
    }
    [-1, 1].forEach(function (s) {
      const ep = plate(0.48, 0.22, 0.02, 0.06, accent);
      ep.position.set(fwX - 0.25, 0.17, s * p.frontWing / 2);
      g.add(ep);
    });
    // Stützen zwischen hoher Nase und Frontflügel
    if (hiNose) {
      [-0.07, 0.07].forEach(function (z) {
        const pyl = plate(0.18, p.noseY - 0.1, 0.02, 0.03, carbon);
        pyl.position.set(fwX - 0.25, (p.noseY + 0.1) / 2, z);
        g.add(pyl);
      });
    }

    // Heckflügel: zwei Profile, Endplatten, Mittelstütze
    const rw = p.rearWing;
    const rwX = rx - rw.back;
    const r1 = wingElement(0.36, 0.05, rw.w, -0.15, accent);
    r1.position.set(rwX + 0.2, rw.y, 0);
    g.add(r1);
    const r2 = wingElement(0.24, 0.035, rw.w, -0.6, body);
    r2.position.set(rwX - 0.1, rw.y + 0.14, 0);
    g.add(r2);
    [-1, 1].forEach(function (s) {
      const ep = plate(0.62, 0.55, 0.02, 0.08, accent);
      ep.position.set(rwX, rw.y - 0.1, s * rw.w / 2);
      g.add(ep);
    });
    const pillar = plate(0.12, rw.y - 0.3, 0.03, 0.02, carbon);
    pillar.position.set(rwX + 0.05, (rw.y + 0.3) / 2, 0);
    g.add(pillar);

    // Halo-Kopfschutz (ab 2018)
    if (p.halo) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.5, 0.66, -0.25), new THREE.Vector3(-0.32, 0.84, -0.27),
        new THREE.Vector3(0.02, 0.88, -0.2), new THREE.Vector3(0.18, 0.87, 0),
        new THREE.Vector3(0.02, 0.88, 0.2), new THREE.Vector3(-0.32, 0.84, 0.27),
        new THREE.Vector3(-0.5, 0.66, 0.25)
      ]);
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.028, 10, false), carbon));
      g.add(rod([0.17, 0.87, 0], [0.42, 0.64, 0], 0.03, carbon));
    }
  }

  // Fahrer mit Helm und Visier
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.13, 28, 20), paint(car.helmet || "#ffd400"));
  helmet.position.set(headX, headY, 0);
  g.add(helmet);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.133, 28, 10, -Math.PI * 0.35, Math.PI * 0.7, Math.PI * 0.36, Math.PI * 0.16),
    new THREE.MeshPhysicalMaterial({ color: "#111111", roughness: 0.05, metalness: 0.8, clearcoat: 1 }));
  visor.rotation.y = Math.PI / 2;
  visor.position.copy(helmet.position);
  g.add(visor);

  // Räder und Aufhängung
  const rimMat = plain(car.rim || (p.era === "classic" ? "#bfbfbf" : "#3a3a42"), 0.3, 0.8);
  const stripe = car.year >= 2011 ? "#ffd400" : null;
  [[fx, p.wheelR, p.wheelW], [rx, p.rearR, p.rearW]].forEach(function (a) {
    [-1, 1].forEach(function (s) {
      const w = wheel(a[1], a[2], p, rimMat, stripe);
      w.position.set(a[0], a[1], s * tz);
      g.add(w);
      const inner = s * (tz - a[2] / 2);
      g.add(rod([a[0] + 0.18, 0.4, s * 0.24], [a[0], a[1] + 0.07, inner], 0.014, carbon));
      g.add(rod([a[0] - 0.18, 0.4, s * 0.24], [a[0], a[1] + 0.07, inner], 0.014, carbon));
      g.add(rod([a[0] + 0.18, 0.18, s * 0.24], [a[0], a[1] - 0.07, inner], 0.014, carbon));
      g.add(rod([a[0] - 0.18, 0.18, s * 0.24], [a[0], a[1] - 0.07, inner], 0.014, carbon));
    });
  });

  // Alle Teile werfen Schatten
  g.traverse(function (o) {
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
  });
  return g;
}

// ---------- Szene: Fotostudio mit Licht und Boden ----------

// Unsichtbares "Studio" mit hellen Lichtflächen. Es spiegelt sich im Lack.
function studioEnvironment(renderer) {
  const s = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(20, 10, 20), new THREE.MeshBasicMaterial({ color: "#2a2a30", side: THREE.BackSide }));
  room.position.y = 4;
  s.add(room);
  const panel = new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  [[0, 8.9, 0, 10, 5, Math.PI / 2, 0], [9.9, 4, 0, 6, 3, 0, -Math.PI / 2], [-9.9, 4, 2, 6, 3, 0, Math.PI / 2], [0, 4, 9.9, 8, 2, 0, Math.PI]].forEach(function (q) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(q[3], q[4]), panel);
    m.position.set(q[0], q[1], q[2]);
    m.rotation.set(q[5], q[6], 0);
    s.add(m);
  });
  const pm = new THREE.PMREMGenerator(renderer);
  const env = pm.fromScene(s, 0.04).texture;
  pm.dispose();
  return env;
}

// Hintergrund wie in einem Fotostudio: in der Mitte hell, außen dunkel
let studioBackground = null;
function backgroundTexture() {
  if (studioBackground) return studioBackground;
  const c = document.createElement("canvas");
  c.width = 512; c.height = 288;
  const ctx = c.getContext("2d");
  const grad = ctx.createRadialGradient(256, 110, 10, 256, 110, 330);
  grad.addColorStop(0, "#74747f");
  grad.addColorStop(0.45, "#383842");
  grad.addColorStop(1, "#121216");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 288);
  studioBackground = new THREE.CanvasTexture(c);
  return studioBackground;
}

function makeScene(renderer) {
  const scene = new THREE.Scene();
  scene.background = backgroundTexture();
  if (!renderer.envMap) renderer.envMap = studioEnvironment(renderer);
  scene.environment = renderer.envMap;
  scene.add(new THREE.HemisphereLight("#ffffff", "#222228", 0.35));
  const sun = new THREE.DirectionalLight("#ffffff", 1.1);
  sun.position.set(2.5, 7, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -4; sun.shadow.camera.right = 4;
  sun.shadow.camera.top = 4; sun.shadow.camera.bottom = -4;
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  // Boden, der nur den Schatten zeigt
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.55 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  // weicher Schatten direkt unter dem Auto (Bild mit Farbverlauf)
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,0.95)");
  grad.addColorStop(0.55, "rgba(0,0,0,0.7)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  blob.rotation.x = -Math.PI / 2;
  blob.scale.set(6.0, 2.5, 1);
  blob.position.y = 0.002;
  blob.name = "blob";
  scene.add(blob);
  return scene;
}

function makeCamera(aspect) {
  const cam = new THREE.PerspectiveCamera(30, aspect, 0.1, 100);
  cam.position.set(4.0, 2.0, 5.0);
  cam.lookAt(-0.1, 0.35, 0);
  return cam;
}

function setupRenderer(r) {
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
}

// Prüfen, ob der Browser 3D (WebGL) kann
function has3D() {
  try {
    const c = document.createElement("canvas");
    return !!(window.THREE && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

// ---------- Großer 3D-Viewer (mit Maus/Finger drehbar) ----------
const viewer = {
  renderer: null, scene: null, camera: null, model: null,
  running: false, dragging: false, lastX: 0, speed: 0.005,

  // Viewer in ein HTML-Element einsetzen und Auto anzeigen
  show: function (container, car, team) {
    if (!this.renderer) this.init();
    container.appendChild(this.renderer.domElement);
    this.resize(container);
    if (this.model) this.scene.remove(this.model);
    this.model = buildCar3D(car, team);
    this.model.rotation.y = -0.6;
    this.scene.add(this.model);
    if (!this.running) {
      this.running = true;
      this.loop();
    }
  },

  init: function () {
    const self = this;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setupRenderer(this.renderer);
    this.scene = makeScene(this.renderer);
    this.camera = makeCamera(16 / 9);
    const el = this.renderer.domElement;
    el.className = "car-canvas";

    // Ziehen mit Maus oder Finger dreht das Auto
    el.addEventListener("pointerdown", function (e) {
      self.dragging = true;
      self.lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", function (e) {
      if (!self.dragging || !self.model) return;
      self.model.rotation.y += (e.clientX - self.lastX) * 0.01;
      self.lastX = e.clientX;
    });
    el.addEventListener("pointerup", function () { self.dragging = false; });
    el.addEventListener("pointercancel", function () { self.dragging = false; });
    window.addEventListener("resize", function () {
      if (el.parentElement) self.resize(el.parentElement);
    });
  },

  resize: function (container) {
    const w = container.clientWidth || 400;
    const h = Math.round(w * 0.56);
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

  loop: function () {
    const self = this;
    if (!this.running) return;
    // Auto dreht sich langsam von selbst, solange man nicht zieht
    if (this.model && !this.dragging) this.model.rotation.y += this.speed;
    if (this.model) this.scene.getObjectByName("blob").rotation.z = this.model.rotation.y;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(function () { self.loop(); });
  },

  stop: function () {
    this.running = false;
  }
};

// ---------- Kleine Vorschaubilder für die Galerie ----------
// Jedes Auto wird einmal gerendert und als Bild gespeichert.
const thumbCache = {};
let thumbRenderer = null;

function carThumbnail(car, team) {
  const key = team.id + "-" + car.name + "-" + car.year;
  if (thumbCache[key]) return thumbCache[key];
  if (!thumbRenderer) {
    thumbRenderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    thumbRenderer.setSize(320, 180);
    setupRenderer(thumbRenderer);
  }
  const scene = makeScene(thumbRenderer);
  const model = buildCar3D(car, team);
  model.rotation.y = -0.6;
  scene.add(model);
  scene.getObjectByName("blob").rotation.z = model.rotation.y;
  thumbRenderer.render(scene, makeCamera(16 / 9));
  thumbCache[key] = thumbRenderer.domElement.toDataURL("image/png");
  return thumbCache[key];
}
