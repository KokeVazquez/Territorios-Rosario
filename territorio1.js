// === Territorio 1 ===
// Este archivo define un territorio (grupo de polígonos) + sus etiquetas

// ------------------------------
// 1. Crear un grupo para el territorio
// ------------------------------
var territorio1 = L.featureGroup().addTo(map);

// ------------------------------
// 2. Definir sub-polígonos con ID único, color, fillOpacity, weight y link
// ------------------------------
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

// ------------------------------
// 3. Cargar estado guardado de localStorage
// ------------------------------
var estadoGuardado = JSON.parse(
  localStorage.getItem("territorio1_estado") || "{}"
);

// ------------------------------
// 4. Crear polígonos y aplicar persistencia
// ------------------------------
poligonosData.forEach(function (d) {
  var pol = L.polygon(d.coords, {
    color: d.color,
    fillOpacity: d.fillOpacity,
    weight: d.weight,
  }).addTo(territorio1);
  pol._id = d.id;
  pol._link = d.link; // Guardamos el link en el polígono

  // Guardar estilo original
  pol._originalStyle = {
    color: pol.options.color,
    fillColor: pol.options.fillColor || pol.options.color,
    fillOpacity: pol.options.fillOpacity,
    weight: pol.options.weight,
  };

  // Restaurar estado guardado
  pol._selected = estadoGuardado[pol._id] || false;
  if (pol._selected)
    pol.setStyle({ color: "gray", fillColor: "gray", fillOpacity: 1.0 });

  // Agregar etiqueta
  if (d.label) agregarEtiqueta(pol, d.label);

  // Toggle al hacer clic normal (izquierdo)
  pol.on("click", function () {
    pol._selected = !pol._selected;
    if (pol._selected)
      pol.setStyle({ color: "gray", fillColor: "gray", fillOpacity: 0.9 });
    else pol.setStyle(pol._originalStyle);

    // Guardar en localStorage
    estadoGuardado[pol._id] = pol._selected;
    localStorage.setItem("territorio1_estado", JSON.stringify(estadoGuardado));
  });

  // ------------------------------
  // Menú contextual con link propio
  // ------------------------------
  var menu = document.getElementById("menuContextual");
  var btnUbicacion = document.getElementById("btnUbicacion");
  var longPressTimer;

  // Mostrar menú en clic derecho (PC)
  pol.on("contextmenu", function (e) {
    e.originalEvent.preventDefault();
    mostrarMenu(e, pol);
  });

  // Detectar long press en móvil
  pol.on("mousedown touchstart", function (e) {
    longPressTimer = setTimeout(function () {
      mostrarMenu(e, pol);
    }, 600); // medio segundo
  });

  pol.on("mouseup touchend", function () {
    clearTimeout(longPressTimer);
  });

  function mostrarMenu(e, pol) {
    var x = e.originalEvent.clientX || (e.originalEvent.touches && e.originalEvent.touches[0].clientX);
    var y = e.originalEvent.clientY || (e.originalEvent.touches && e.originalEvent.touches[0].clientY);

    menu.style.left = x + "px";
    menu.style.top = y + "px";
    menu.style.display = "block";

    // Acción del botón: usar link del polígono
    btnUbicacion.onclick = function () {
      if (pol._link) {
        window.open(pol._link, "_blank");
      } else {
        alert("Este polígono no tiene link asignado.");
      }
      menu.style.display = "none";
    };
  }

  // Ocultar menú si clic fuera
  map.on("click", function () {
    menu.style.display = "none";
  });
});

// ------------------------------
// 5. Guardar el grupo en el array global
// ------------------------------
poligonos.push(territorio1);

// =============================
// Función reutilizable: agregarEtiqueta
// =============================
function agregarEtiqueta(poligono, texto) {
  var latlngs = poligono.getLatLngs()[0];
  var coords = latlngs.map(function (ll) {
    return [ll.lng, ll.lat];
  });

  var first = coords[0];
  var last = coords[coords.length - 1];
  if (!first || first[0] !== last[0] || first[1] !== last[1])
    coords.push([first[0], first[1]]);

  var centroide = turf.centroid(turf.polygon([coords]));
  var cLat = centroide.geometry.coordinates[1];
  var cLng = centroide.geometry.coordinates[0];

  L.marker([cLat, cLng], {
    icon: L.divIcon({
      className: "etiqueta-poligono",
      html: texto,
      iconSize: [10, 18],
      iconAnchor: [20, 9],
    }),
  }).addTo(territorio1);
}


