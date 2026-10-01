/* =========================================================
   F1 Garage – car3d.js
   Baut aus einfachen 3D-Formen (Boxen, Zylindern, Kugeln)
   ein Formel-1-Auto. Je nach Baujahr sieht das Auto anders aus:
     bis 1967  Zigarre ohne Flügel
     bis 1982  Keilform mit großem Heckflügel und Airbox
     bis 1993  flach und breit (Turbo-Zeit)
     bis 2008  hohe Nase, schmaler
     bis 2021  lang, breiter Frontflügel, ab 2018 mit Halo
     ab 2022   Ground-Effect-Autos mit großen Rädern und Halo
   Benötigt die Bibliothek three.js (lib/three.min.js).
   ========================================================= */

// ---------- Maße und Bauteile je nach Epoche ----------
function eraParams(year) {
  if (year < 1968) {
    return { era: "classic", wb: 2.3, track: 1.3, wheelR: 0.36, wheelW: 0.16, rearW: 0.2 };
  }
  if (year < 1983) {
    return {
      era: "wedge", wb: 2.6, track: 1.45, wheelR: 0.31, wheelW: 0.26, rearW: 0.46,
      noseY: 0.2, airbox: true, sidepodW: 0.38, sidepodH: 0.3,
      frontWing: 1.4, rearWing: { w: 1.05, y: 0.95, back: 0.55 }
    };
  }
  if (year < 1994) {
    return {
      era: "turbo", wb: 2.85, track: 1.5, wheelR: 0.32, wheelW: 0.28, rearW: 0.42,
      noseY: 0.22, airbox: year >= 1989, sidepodW: 0.4, sidepodH: 0.26,
      frontWing: 1.5, rearWing: { w: 1.0, y: 0.85, back: 0.45 }
    };
  }
  if (year < 2009) {
    return {
      era: "highnose", wb: 3.05, track: 1.45, wheelR: 0.33, wheelW: 0.24, rearW: 0.36,
      noseY: 0.42, airbox: true, sidepodW: 0.34, sidepodH: 0.3,
      frontWing: 1.4, rearWing: { w: 0.85, y: 0.92, back: 0.42 }
    };
  }
  if (year < 2022) {
    return {
      era: "hybrid", wb: 3.5, track: 1.55, wheelR: 0.33, wheelW: 0.26, rearW: 0.38,
      noseY: year < 2014 ? 0.45 : 0.3, airbox: true, sidepodW: 0.36, sidepodH: 0.3,
      frontWing: 1.8, rearWing: { w: 0.9, y: 0.92, back: 0.45 }, halo: year >= 2018
    };
  }
  return {
    era: "ground", wb: year >= 2026 ? 3.4 : 3.6, track: 1.55, wheelR: 0.36, wheelW: 0.28, rearW: 0.38,
    noseY: 0.25, airbox: true, sidepodW: 0.4, sidepodH: 0.32,
    frontWing: year >= 2026 ? 1.7 : 1.9, rearWing: { w: 0.9, y: 0.9, back: 0.45 }, halo: true
  };
}

// ---------- Hilfsfunktionen ----------
function mat(color, rough) {
  return new THREE.MeshStandardMaterial({ color: color, roughness: rough === undefined ? 0.35 : rough, metalness: 0.25 });
}

// Box mit Mittelpunkt (x, y, z) und Größe (sx, sy, sz)
function box(sx, sy, sz, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
  m.position.set(x, y, z);
  return m;
}

// Dünner Zylinder zwischen zwei Punkten (für Aufhängung, Halo-Strebe)
function rod(a, b, r, material) {
  const start = new THREE.Vector3(a[0], a[1], a[2]);
  const end = new THREE.Vector3(b[0], b[1], b[2]);
  const dir = new THREE.Vector3().subVectors(end, start);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, dir.length(), 6), material);
  m.position.copy(start).add(dir.multiplyScalar(0.5));
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}

// Seitenansicht (Punkte x/y) wird in die Breite "gezogen" (extrudiert)
function sideProfile(points, width, material) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) shape.lineTo(points[i][0], points[i][1]);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 });
  geo.translate(0, 0, -width / 2);
  return new THREE.Mesh(geo, material);
}

// Rad mit Reifen und Felge
function wheel(r, w, rimColor) {
  const g = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 32), mat("#141414", 0.9));
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.62, r * 0.62, w + 0.01, 24), mat(rimColor, 0.3));
  tire.rotation.x = Math.PI / 2;
  rim.rotation.x = Math.PI / 2;
  g.add(tire, rim);
  return g;
}

// ---------- Das Auto bauen ----------
// car: { year, color?, accent? }  team: { color }
function buildCar3D(car, team) {
  const p = eraParams(car.year);
  const body = mat(car.color || team.color);
  const accent = mat(car.accent || "#ffffff");
  const carbon = mat("#1b1b1f", 0.6);
  const helmet = mat(car.helmet || "#ffd400", 0.25);
  const g = new THREE.Group();

  const fx = p.wb / 2;     // Vorderachse
  const rx = -p.wb / 2;    // Hinterachse
  const tz = p.track / 2;  // halbe Spurweite

  if (p.era === "classic") {
    // Zigarrenform: ein Profil wird um die Längsachse gedreht (Lathe)
    const pts = [];
    const profile = [[0, 0.02], [0.2, 0.17], [0.6, 0.27], [1.4, 0.34], [2.3, 0.33], [3.0, 0.26], [3.7, 0.12], [3.8, 0.02]];
    profile.forEach(function (q) { pts.push(new THREE.Vector2(q[1], q[0])); });
    const cigar = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), body);
    cigar.rotation.z = Math.PI / 2;          // Achse zeigt nach vorne (x)
    cigar.position.set(fx + 0.75, 0.42, 0);  // Spitze vor der Vorderachse
    g.add(cigar);
    // Kühlergrill vorne
    const grill = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), carbon);
    grill.rotation.y = Math.PI / 2;
    grill.position.set(fx + 0.74, 0.42, 0);
    g.add(grill);
    // Windschutzscheibe, Kopfstütze, Fahrer
    g.add(box(0.03, 0.12, 0.4, mat("#bcd7ff", 0.1), 0.15, 0.8, 0));
    g.add(box(0.35, 0.12, 0.16, body, -0.45, 0.76, 0));
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), helmet);
    head.position.set(-0.15, 0.86, 0);
    g.add(head);
    // Auspuffrohre
    g.add(rod([-0.4, 0.3, 0.3], [rx - 0.7, 0.3, 0.3], 0.04, mat("#888", 0.3)));
  } else {
    // Monocoque (Hauptteil) als Seitenprofil
    const top = p.airbox ? 0.88 : 0.66;
    const mono = sideProfile([
      [rx - 0.25, 0.12], [0.55, 0.12], [0.55, 0.6], [0.25, 0.64], [0.15, 0.56],
      [-0.4, 0.56], [-0.55, top], [-0.85, top], [rx + 0.3, 0.42], [rx - 0.25, 0.32]
    ], 0.52, body);
    g.add(mono);
    // Nase: schmaler, vorne auf Höhe noseY
    const tip = fx + 0.6;
    g.add(sideProfile([[0.5, 0.18], [tip, p.noseY - 0.06], [tip, p.noseY + 0.04], [0.5, 0.58]], 0.26, body));
    // Seitenkästen (Sidepods) mit dunklem Lufteinlass
    [-1, 1].forEach(function (s) {
      const z = s * (0.26 + p.sidepodW / 2);
      g.add(box(1.35, p.sidepodH, p.sidepodW, body, -0.35, 0.13 + p.sidepodH / 2, z));
      g.add(box(0.02, p.sidepodH * 0.7, p.sidepodW * 0.8, carbon, 0.33, 0.13 + p.sidepodH / 2, z));
    });
    // Unterboden
    g.add(box(p.wb * 0.8, 0.04, p.track * 0.8, carbon, -0.2, 0.08, 0));
    // Lufteinlass über dem Fahrer
    if (p.airbox) g.add(box(0.05, 0.2, 0.26, carbon, -0.53, top - 0.12, 0));
    // Fahrerhelm
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), helmet);
    head.position.set(-0.12, 0.66, 0);
    g.add(head);

    // Frontflügel mit Endplatten (bei hoher Nase an Stützen)
    const fwX = tip - 0.15;
    g.add(box(0.4, 0.03, p.frontWing, accent, fwX, 0.1, 0));
    g.add(box(0.25, 0.025, p.frontWing * 0.9, body, fwX - 0.12, 0.16, 0));
    [-1, 1].forEach(function (s) {
      g.add(box(0.45, 0.2, 0.02, accent, fwX, 0.17, s * p.frontWing / 2));
    });
    if (p.noseY > 0.3) {
      [-0.08, 0.08].forEach(function (z) {
        g.add(box(0.12, p.noseY - 0.1, 0.02, carbon, fwX + 0.05, (p.noseY + 0.1) / 2, z));
      });
    }

    // Heckflügel mit Endplatten und Mittelstütze
    const rw = p.rearWing;
    const rwX = rx - rw.back;
    g.add(box(0.32, 0.04, rw.w, accent, rwX, rw.y, 0));
    g.add(box(0.22, 0.03, rw.w, body, rwX - 0.05, rw.y + 0.12, 0));
    [-1, 1].forEach(function (s) {
      g.add(box(0.55, 0.5, 0.025, accent, rwX, rw.y - 0.12, s * rw.w / 2));
    });
    g.add(box(0.1, rw.y - 0.35, 0.05, carbon, rwX + 0.05, (rw.y + 0.35) / 2, 0));

    // Halo (Kopfschutz ab 2018): halber Ring plus Mittelstrebe
    if (p.halo) {
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 8, 24, Math.PI), carbon);
      halo.rotation.x = Math.PI / 2;
      halo.rotation.z = -Math.PI / 2;
      halo.position.set(-0.2, 0.84, 0);
      g.add(halo);
      g.add(rod([0.08, 0.84, 0], [0.3, 0.62, 0], 0.03, carbon));
    }
  }

  // Räder und Aufhängung (für alle Epochen gleich)
  const rim = car.rim || "#9a9aa0";
  [[fx, p.wheelR, p.wheelW], [rx, p.wheelR + (p.era === "classic" ? 0.02 : 0), p.rearW]].forEach(function (a) {
    [-1, 1].forEach(function (s) {
      const w = wheel(a[1], a[2], rim);
      w.position.set(a[0], a[1], s * tz);
      g.add(w);
      g.add(rod([a[0] + 0.15, 0.35, s * 0.25], [a[0], a[1] + 0.05, s * (tz - a[2] / 2)], 0.018, carbon));
      g.add(rod([a[0] - 0.15, 0.2, s * 0.25], [a[0], a[1] - 0.05, s * (tz - a[2] / 2)], 0.018, carbon));
    });
  });

  return g;
}

// ---------- Szene mit Licht, Kamera und Boden ----------
function makeScene() {
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight("#ffffff", "#333344", 0.9));
  const sun = new THREE.DirectionalLight("#ffffff", 0.9);
  sun.position.set(3, 6, 4);
  scene.add(sun);
  const back = new THREE.DirectionalLight("#ffffff", 0.35);
  back.position.set(-4, 3, -3);
  scene.add(back);
  // runder "Schatten" unter dem Auto
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(3, 48),
    new THREE.MeshBasicMaterial({ color: "#000000", transparent: true, opacity: 0.45 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.set(1, 0.38, 1);
  scene.add(shadow);
  return scene;
}

function makeCamera(aspect) {
  const cam = new THREE.PerspectiveCamera(32, aspect, 0.1, 100);
  cam.position.set(3.9, 2.2, 4.9);
  cam.lookAt(0, 0.35, 0);
  return cam;
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
  running: false, dragging: false, lastX: 0, speed: 0.006,

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
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.scene = makeScene();
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
    thumbRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    thumbRenderer.setSize(320, 180);
  }
  const scene = makeScene();
  const model = buildCar3D(car, team);
  model.rotation.y = -0.6;
  scene.add(model);
  thumbRenderer.render(scene, makeCamera(16 / 9));
  thumbCache[key] = thumbRenderer.domElement.toDataURL("image/png");
  return thumbCache[key];
}
