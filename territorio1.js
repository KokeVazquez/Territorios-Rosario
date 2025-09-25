// === Territorio 1 ===
var territorio1 = L.featureGroup().addTo(map);

var poligonosData = [
  {
    id: "Territorio1_Completo",
    coords: [
      [28.613789, -106.087208], [28.613313, -106.086946], [28.613539, -106.086516], [28.613822, -106.086119],
      [28.614039, -106.08591], [28.61407, -106.085838], [28.61454, -106.084801], [28.615263, -106.08384],
      [28.615725, -106.083035], [28.615823, -106.08281], [28.616002, -106.082085], [28.616101, -106.081501],
      [28.617104, -106.080712],
    ],
    color: "red",
    fillOpacity: 0.0,
    weight: 0,
    label: null,
    link: "https://maps.app.goo.gl/3jBZofcfzsqaMbSg8",
  },
  {
    id: "Cuadra1_Territorio1",
    coords: [
      [28.613786, -106.087204], [28.613313, -106.086951], [28.61333, -106.086877], [28.613365, -106.086799],
      [28.613509, -106.086534], [28.613746, -106.086185], [28.613808, -106.08611], [28.614037, -106.085906],
      [28.614046, -106.085894], [28.614066, -106.085949], [28.614106, -106.086005], [28.614181, -106.086075],
      [28.614318, -106.086169],
    ],
    color: "red",
    fillOpacity: 0.2,
    weight: 2,
    label: "1",
    link: "https://maps.app.goo.gl/3jBZofcfzsqaMbSg8",
  },
  {
    id: "Cuadra2_Territorio1",
    coords: [
      [28.614337, -106.086131], [28.614202, -106.08604], [28.614135, -106.085979], [28.614097, -106.085924],
      [28.614066, -106.085837], [28.614537, -106.084814], [28.614719, -106.084545], [28.615256, -106.083837],
      [28.615439, -106.083972], [28.614807, -106.085195],
    ],
    color: "red",
    fillOpacity: 0.2,
    weight: 2,
    label: "2",
    link: "https://maps.app.goo.gl/BaLzy98ZWXqad7ED8",
  },
  {
    id: "Cuadra3_Territorio1",
    coords: [
      [28.61546, -106.083936], [28.615282, -106.0838], [28.615525, -106.083402], [28.615715, -106.083038],
      [28.615803, -106.082794], [28.615987, -106.082904],
    ],
    color: "red",
    fillOpacity: 0.2,
    weight: 2,
    label: "3",
    link: "https://maps.app.goo.gl/DMVPi1x3392ot1DR8",
  },
  {
    id: "Escuela_Territorio1",
    coords: [
      [28.615996, -106.082892], [28.615807, -106.082779], [28.615849, -106.08264], [28.615929, -106.082359],
      [28.615988, -106.082099], [28.616042, -106.081834], [28.616094, -106.081477], [28.617107, -106.080707],
    ],
    color: "blue",
    fillOpacity: 1.0,
    weight: 2,
    label: "Escuela",
    link: "https://maps.app.goo.gl/h5t4FwYLoA2yHxTc8",
  },
];

var estadoGuardado = JSON.parse(localStorage.getItem("territorio1_estado") || "{}");
var notasPoligonos = {};

poligonosData.forEach(function (d) {
  var pol = L.polygon(d.coords, { color: d.color, fillOpacity: d.fillOpacity, weight: d.weight }).addTo(territorio1);
  pol._id = d.id;
  pol._link = d.link;

  pol._originalStyle = { color: pol.options.color, fillColor: pol.options.fillColor || pol.options.color, fillOpacity: pol.options.fillOpacity, weight: pol.options.weight };

  pol._selected = estadoGuardado[pol._id] || false;
  if (pol._selected) pol.setStyle({ color: "gray", fillColor: "gray", fillOpacity: 1.0 });
  if (d.label) agregarEtiqueta(pol, d.label);

  pol.on("click", function () {
    pol._selected = !pol._selected;
    pol.setStyle(pol._selected ? { color: "gray", fillColor: "gray", fillOpacity: 0.9 } : pol._originalStyle);
    estadoGuardado[pol._id] = pol._selected;
    localStorage.setItem("territorio1_estado", JSON.stringify(estadoGuardado));
  });

  // Menú contextual
  pol.on("contextmenu", function (e) { e.originalEvent.preventDefault(); mostrarMenu(e, pol); });
  pol.on("mousedown touchstart", function (e) { longPressTimer = setTimeout(() => mostrarMenu(e, pol), 600); });
  pol.on("mouseup touchend", function () { clearTimeout(longPressTimer); });
  var longPressTimer;
});

poligonos.push(territorio1);

function agregarEtiqueta(poligono, texto) {
  var latlngs = poligono.getLatLngs()[0];
  var coords = latlngs.map(ll => [ll.lng, ll.lat]);
  var first = coords[0], last = coords[coords.length - 1];
  if (!first || first[0] !== last[0] || first[1] !== last[1]) coords.push([first[0], first[1]]);
  var centroide = turf.centroid(turf.polygon([coords]));
  var cLat = centroide.geometry.coordinates[1], cLng = centroide.geometry.coordinates[0];

  L.marker([cLat, cLng], { icon: L.divIcon({ className: "etiqueta-poligono", html: texto, iconSize: [10, 18], iconAnchor: [20, 9] }) }).addTo(territorio1);
}

// =============================
// Menú contextual
// =============================
function mostrarMenu(e, pol) {
  ocultarMenu();
  var menu = document.getElementById("menuContextual");
  var x = e.originalEvent.clientX || (e.originalEvent.touches && e.originalEvent.touches[0].clientX);
  var y = e.originalEvent.clientY || (e.originalEvent.touches && e.originalEvent.touches[0].clientY);
  menu.style.left = x + "px";
  menu.style.top = y + "px";
  menu.style.display = "block";

  menu.innerHTML = `
    <button onclick="window.open('${pol._link}', '_blank'); ocultarMenu();">📍 Ubicación</button>
    <button onclick="anadirNotaPopup('${pol._id}');">➕ Añadir nota</button>
    <button onclick="verNotas('${pol._id}');">📒 Notas</button>
  `;
}

function ocultarMenu() { document.getElementById("menuContextual").style.display = "none"; }

// =============================
// Notas con popup
// =============================
function anadirNotaPopup(id) {
  ocultarMenu();
  var contenido = document.createElement("div");
  contenido.innerHTML = `
    <b>Añadir nota:</b><br>
    <textarea id="inputNota" rows="4" cols="30" placeholder="Escribe tu nota aquí..."></textarea><br>
    <button id="guardarNota">💾 Guardar</button>
    <button onclick="map.closePopup()">❌ Cancelar</button>
  `;
  var popup = L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);

  contenido.querySelector("#guardarNota").onclick = function () {
    var texto = contenido.querySelector("#inputNota").value.trim();
    if (!texto) return alert("La nota está vacía.");
    if (!notasPoligonos[id]) notasPoligonos[id] = [];
    notasPoligonos[id].push(texto);

    // ✅ Cerrar popup automáticamente después de guardar
    map.closePopup();
  };
}

function verNotas(id) {
  ocultarMenu();
  mostrarNotasPopup(id);
}

function mostrarNotasPopup(id) {
  var notas = notasPoligonos[id] || [];
  if (notas.length === 0) { alert("📭 No hay notas."); return; }

  var contenido = "<b>Notas:</b><br><br>";
  notas.forEach((nota, i) => { contenido += `${i + 1}. ${nota} <button onclick="confirmarEliminarNotaPopup('${id}', ${i})">❌</button><br>`; });

  L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);
}

function confirmarEliminarNotaPopup(id, index) {
  map.closePopup(); // cerrar notas
  L.popup()
    .setLatLng(map.getCenter())
    .setContent(`
      <b>¿Eliminar esta nota?</b><br>
      <button onclick="eliminarNota('${id}', ${index})">✅ Sí</button>
      <button onclick="map.closePopup()">❌ No</button>
    `)
    .openOn(map);
}

function eliminarNota(id, index) {
  notasPoligonos[id].splice(index, 1);
  map.closePopup();
}


