// =============================
// === Territorio Base ===
// =============================

function crearTerritorio(datosTerritorio) {
  // ------------------------------
  // 1. Crear grupo
  // ------------------------------
  var grupo = L.featureGroup().addTo(map);
  grupo._id = datosTerritorio.id; // id del grupo

  // ------------------------------
  // 2. Estado y notas guardadas
  // ------------------------------
  var estadoGuardado = JSON.parse(localStorage.getItem(datosTerritorio.id + "_estado") || "{}");
  var notasPoligonos = JSON.parse(localStorage.getItem(datosTerritorio.id + "_notas") || "{}");

  // ------------------------------
  // 3. Crear polígonos
  // ------------------------------
  datosTerritorio.poligonos.forEach(function (d) {
    var pol = L.polygon(d.coords, {
      color: d.color,
      fillOpacity: d.fillOpacity,
      weight: d.weight
    }).addTo(grupo);

    pol._id = d.id;
    pol._territorioId = datosTerritorio.id; // <-- esto es lo nuevo
    pol._link = d.link;

    // Guardamos estilo original
    pol._originalStyle = {
      color: pol.options.color,
      fillColor: pol.options.fillColor || pol.options.color,
      fillOpacity: pol.options.fillOpacity,
      weight: pol.options.weight
    };

    // Estado guardado
    pol._selected = estadoGuardado[pol._id] || false;
    if (pol._selected) {
      pol.setStyle({ color: "gray", fillColor: "gray", fillOpacity: 0.9 });
    }

    // Etiqueta
    if (d.label) pol._label = d.label;
  });

  // ------------------------------
  // 4. Agregar a la lista global
  // ------------------------------
  window.todosLosTerritorios = window.todosLosTerritorios || [];
  window.todosLosTerritorios.push(grupo);

  return { grupo: grupo, notasPoligonos: notasPoligonos };
}

// =============================
// === Menú contextual ===
// =============================

function mostrarMenu(e, pol, notasPoligonos, territorioId) {
  ocultarMenu();
  var menu = document.getElementById("menuContextual");
  if (!menu) return;

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

function ocultarMenu() {
  const menu = document.getElementById("menuContextual");
  if (menu) menu.style.display = "none";
}

// =============================
// === Notas ===
// =============================

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

  L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);

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
  ocultarMenu();
  var notasPoligonos = JSON.parse(localStorage.getItem(territorioId + "_notas") || "{}");
  mostrarNotasPopup(id, notasPoligonos, territorioId);
}

function mostrarNotasPopup(id, notasPoligonos, territorioId) {
  map.closePopup();
  var notas = notasPoligonos[id] || [];
  notas = notas.filter(n => !n.startsWith("Trabajado por:"));

  var contenido = "<b>Notas:</b><br><br>";
  if (notas.length === 0) contenido += "No hay notas aún.";
  else notas.forEach((nota, i) => {
    contenido += `${i + 1}. ${nota} 
      <button onclick="confirmarEliminarNotaPopup('${id}', ${i}, '${territorioId}')">❌</button><br>`;
  });

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

// =============================
// === Capitanes (Trabajado) ===
// =============================

function abrirPopupTrabajado(id, notasPoligonos, territorioId) {
  ocultarMenu();

  var contenido = document.createElement("div");
  contenido.innerHTML = `
    <b>Registrar Capitán:</b><br>
    Nombre: <input type="text" id="nombreTrabajado" placeholder="Nombre"><br>
    Fecha: <input type="date" id="fechaTrabajado" value="${new Date().toISOString().slice(0, 10)}"><br>
    <button id="guardarTrabajado">💾 Guardar</button>
    <button onclick="map.closePopup()">❌ Cancelar</button>
  `;

  L.popup().setLatLng(map.getCenter()).setContent(contenido).openOn(map);

  contenido.querySelector("#guardarTrabajado").onclick = function () {
    var nombre = contenido.querySelector("#nombreTrabajado").value.trim();
    var fecha = contenido.querySelector("#fechaTrabajado").value;
    if (!nombre || !fecha) return;

    var capitanes = JSON.parse(localStorage.getItem(territorioId + "_capitanes") || "{}");
    capitanes[id] = [`Trabajado por: ${nombre} | Fecha: ${fecha}`];
    localStorage.setItem(territorioId + "_capitanes", JSON.stringify(capitanes));

    map.closePopup();
  };
}

function mostrarCapitanes(territorioId) {
  ocultarMenu();
  var capitanes = JSON.parse(localStorage.getItem(territorioId + "_capitanes") || "{}");
  var contenido = `<b>${territorioId}:</b><br><br>`;

  Object.keys(capitanes).forEach(polId => {
    capitanes[polId].forEach(nota => {
      var partes = nota.replace("Trabajado por: ", "").split("| Fecha:");
      var nombre = partes[0].trim();
      var fecha = partes[1].trim();
      var fechaObj = new Date(fecha);
      var fechaFormateada =
        ("0" + fechaObj.getDate()).slice(-2) + "/" +
        ("0" + (fechaObj.getMonth() + 1)).slice(-2) + "/" +
        fechaObj.getFullYear();

      contenido += `<b>${polId}</b> - <span style="color:red;">${nombre}</span> - <b>Fecha:</b> <span style="color:red;">${fechaFormateada}</span> 
                    <button onclick="confirmarEliminarCapitan('${polId}', '${territorioId}')">❌</button><br><br>`;
    });
  });

  if (contenido === `<b>${territorioId}:</b><br><br>`)
    contenido += "No hay registros de capitanes aún.";

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
  var capitanes = JSON.parse(localStorage.getItem(territorioId + "_capitanes") || "{}");
  if (!capitanes[polId]) return;

  delete capitanes[polId];
  localStorage.setItem(territorioId + "_capitanes", JSON.stringify(capitanes));

  mostrarCapitanes(territorioId);
}

// =============================
// === Eventos del territorio activo ===
// =============================

function registrarEventosTerritorioActivo(territorio, notasPoligonos, territorioId) {
  territorio.eachLayer(function (pol) {
    // Resetear eventos
    pol.off("click");
    pol.off("contextmenu");

    // Click → seleccionar en gris + abrir popup de capitán
    pol.on("click", function () {
      pol._selected = !pol._selected;

      if (pol._selected) {
        pol.setStyle({ color: "gray", fillColor: "gray", fillOpacity: 0.9 });
        abrirPopupTrabajado(pol._id, notasPoligonos, territorioId);
      } else {
        pol.setStyle(pol._originalStyle);
      }

      var estadoGuardado = JSON.parse(localStorage.getItem(territorioId + "_estado") || "{}");
      estadoGuardado[pol._id] = pol._selected;
      localStorage.setItem(territorioId + "_estado", JSON.stringify(estadoGuardado));
    });

    // Clic derecho → menú contextual
    pol.on("contextmenu", function (e) {
      mostrarMenu(e, pol, notasPoligonos, territorioId);
    });
  });
}





