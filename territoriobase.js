// =============================
// === Territorio Base ===
// =============================

function crearTerritorio(datosTerritorio) {
  // ------------------------------
  // 1. Crear grupo
  // ------------------------------
  var grupo = L.featureGroup().addTo(map);

  // ------------------------------
  // 2. Estado y notas guardadas
  // ------------------------------
  var estadoGuardado = JSON.parse(localStorage.getItem(datosTerritorio.id + "_estado") || "{}");
  var notasPoligonos = JSON.parse(localStorage.getItem(datosTerritorio.id + "_notas") || "{}");

  // ------------------------------
  // 3. Crear polígonos
  // ------------------------------
  datosTerritorio.poligonos.forEach(function (d) {
    var pol = L.polygon(d.coords, { color: d.color, fillOpacity: d.fillOpacity, weight: d.weight }).addTo(grupo);
    pol._id = d.id;
    pol._link = d.link;

    pol._originalStyle = { color: pol.options.color, fillColor: pol.options.fillColor || pol.options.color, fillOpacity: pol.options.fillOpacity, weight: pol.options.weight };

    pol._selected = estadoGuardado[pol._id] || false;
    if (pol._selected) pol.setStyle({ color: "gray", fillColor: "gray", fillOpacity: 0.9 });

    if (d.label) pol._label = d.label;

    // Selección
    pol.on("click", function () {
      pol._selected = !pol._selected;
      pol.setStyle(pol._selected ? { color: "gray", fillColor: "gray", fillOpacity: 0.9 } : pol._originalStyle);
      estadoGuardado[pol._id] = pol._selected;
      localStorage.setItem(datosTerritorio.id + "_estado", JSON.stringify(estadoGuardado));
      if (pol._selected) abrirPopupTrabajado(pol._id, notasPoligonos, datosTerritorio.id);
    });

    // Menú contextual
    pol.on("contextmenu", function (e) { mostrarMenu(e, pol, notasPoligonos, datosTerritorio.id); });
  });

  return { grupo: grupo, notasPoligonos: notasPoligonos };
}

// =============================
// === Funciones reutilizables ===
// =============================

function mostrarMenu(e, pol, notasPoligonos, territorioId) {
  ocultarMenu();
  var menu = document.getElementById("menuContextual");
  var x = e.originalEvent.clientX || (e.originalEvent.touches && e.originalEvent.touches[0].clientX);
  var y = e.originalEvent.clientY || (e.originalEvent.touches && e.originalEvent.touches[0].clientY);
  menu.style.left = x + "px";
  menu.style.top = y + "px";
  menu.style.display = "block";

  menu.innerHTML = `
    <button onclick="window.open('${pol._link}', '_blank'); ocultarMenu();">📍 Ubicación</button>
    <button onclick="anadirNotaPopup('${pol._id}', '${territorioId}');">➕ Añadir nota</button>
    <button onclick="verNotas('${pol._id}', '${territorioId}');">📒 Notas</button>
    <button onclick="mostrarCapitanes('${territorioId}');">🧭 Capitanes</button>
  `;
}

function ocultarMenu() { document.getElementById("menuContextual").style.display = "none"; }

function anadirNotaPopup(id, territorioId) {
  ocultarMenu();
  var notasPoligonos = JSON.parse(localStorage.getItem(territorioId + "_notas") || "{}");
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
    if (!texto) return;
    if (!notasPoligonos[id]) notasPoligonos[id] = [];
    notasPoligonos[id].push(texto);
    localStorage.setItem(territorioId + "_notas", JSON.stringify(notasPoligonos));
    map.closePopup();
  };
}

function verNotas(id, territorioId) {
  var notasPoligonos = JSON.parse(localStorage.getItem(territorioId + "_notas") || "{}");
  mostrarNotasPopup(id, notasPoligonos, territorioId);
  map.closePopup();
}

function mostrarNotasPopup(id, notasPoligonos, territorioId) {
  var notas = notasPoligonos[id] || [];
  notas = notas.filter(n => !n.startsWith("Trabajado por:"));

  var contenido = "<b>Notas:</b><br><br>";
  if (notas.length === 0) contenido += "No hay notas aún.";
  else notas.forEach((nota, i) => contenido += `${i + 1}. ${nota} <button onclick="confirmarEliminarNotaPopup('${id}', ${i}, '${territorioId}')">❌</button><br>`);

  L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);
}

function confirmarEliminarNotaPopup(id, index, territorioId) {
  map.closePopup();
  L.popup().setLatLng(map.getCenter()).setContent(`
    <b>¿Eliminar esta nota?</b><br>
    <button onclick="eliminarNota('${id}', ${index}, '${territorioId}')">✅ Sí</button>
    <button onclick="map.closePopup()">❌ No</button>
  `).openOn(map);
}

function eliminarNota(id, index, territorioId) {
  var notasPoligonos = JSON.parse(localStorage.getItem(territorioId + "_notas") || "{}");
  notasPoligonos[id].splice(index, 1);
  localStorage.setItem(territorioId + "_notas", JSON.stringify(notasPoligonos));
  map.closePopup();
}

function abrirPopupTrabajado(id, notasPoligonos, territorioId) {
  var contenido = document.createElement("div");
  contenido.innerHTML = `
    <b>Trabajado:</b><br>
    Nombre: <input type="text" id="nombreTrabajado" placeholder="Nombre"><br>
    Fecha: <input type="date" id="fechaTrabajado" value="${new Date().toISOString().slice(0, 10)}"><br>
    <button id="guardarTrabajado">💾 Guardar</button>
    <button onclick="map.closePopup()">❌ Cancelar</button>
  `;
  var popup = L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);

  contenido.querySelector("#guardarTrabajado").onclick = function () {
    var nombre = contenido.querySelector("#nombreTrabajado").value.trim();
    var fecha = contenido.querySelector("#fechaTrabajado").value;
    if (!nombre || !fecha) return;
    if (!notasPoligonos[id]) notasPoligonos[id] = [];
    notasPoligonos[id] = notasPoligonos[id].filter(n => !n.startsWith("Trabajado por:"));
    notasPoligonos[id].push(`Trabajado por: ${nombre} | Fecha: ${fecha}`);
    localStorage.setItem(territorioId + "_notas", JSON.stringify(notasPoligonos));
    map.closePopup();
  };
}

function mostrarCapitanes(territorioId) {
  ocultarMenu();
  var notasPoligonos = JSON.parse(localStorage.getItem(territorioId + "_notas") || "{}");
  var contenido = `<b>${territorioId}:</b><br><br>`;
  Object.keys(notasPoligonos).forEach(polId => {
    notasPoligonos[polId].forEach(nota => {
      if (nota.startsWith("Trabajado por:")) {
        var partes = nota.replace("Trabajado por: ", "").split("| Fecha:");
        var nombre = partes[0].trim();
        var fecha = partes[1].trim();
        var fechaObj = new Date(fecha);
        var fechaFormateada = ("0" + fechaObj.getDate()).slice(-2) + "/" +
          ("0" + (fechaObj.getMonth() + 1)).slice(-2) +
          "/" + fechaObj.getFullYear();
        contenido += `<b>${polId}</b> - <span style="color:red;">${nombre}</span> - <b>Fecha:</b> <span style="color:red;">${fechaFormateada}</span> 
                      <button onclick="confirmarEliminarCapitan('${polId}', '${territorioId}')">❌</button><br><br>`;
      }
    });
  });
  if (contenido === `<b>${territorioId}:</b><br><br>`) contenido += "No hay registros de capitanes aún.";

  L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);
}

function confirmarEliminarCapitan(polId, territorioId) {
  L.popup().setLatLng(map.getCenter()).setContent(`
    <b>¿Eliminar este registro de Capitán?</b><br>
    <button onclick="eliminarCapitan('${polId}', '${territorioId}')">✅ Sí</button>
    <button onclick="mostrarCapitanes('${territorioId}')">❌ No</button>
  `).openOn(map);
}

function eliminarCapitan(polId, territorioId) {
  var notasPoligonos = JSON.parse(localStorage.getItem(territorioId + "_notas") || "{}");
  if (!notasPoligonos[polId]) return;
  notasPoligonos[polId] = notasPoligonos[polId].filter(n => !n.startsWith("Trabajado por:"));
  localStorage.setItem(territorioId + "_notas", JSON.stringify(notasPoligonos));
  mostrarCapitanes(territorioId);
}

