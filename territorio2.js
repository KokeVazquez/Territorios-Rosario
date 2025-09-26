// =============================
// === Territorio 2 ===
// =============================

var datosTerritorio2 = {
    id: "territorio2",
    numeroTerritorio: 2, // ← aquí defines qué número quieres mostrar
    poligonos: [
        {
            id: "Cuadra1_Territorio2",
            coords: [
                [28.616495, -106.081101], [28.616111, -106.081401], [28.616140, -106.080481]
            ],
            color: "blue",
            fillOpacity: 0.2,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/P61enLhuVpALgMpWA"
        },
        {
            id: "Cuadra2_Territorio2",
            coords: [
                [28.617295, -106.080307], [28.617127, -106.080632], [28.616542, -106.081063], [28.616142, -106.080369], [28.616121, -106.080063], [28.616854, -106.079528]
            ],
            color: "blue",
            fillOpacity: 0.2,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/dQ7CVbQw7ts9W53E9"
        }
    ],
};

// Crear el territorio usando la función base y guardar el objeto completo
var territorio2Data = crearTerritorio(datosTerritorio2);
var territorio2 = territorio2Data.grupo;

// ============================
// Mostrar número fijo del territorio
// ============================
// Elegimos el polígono que tendrá la etiqueta al inicio
var polFijo = datosTerritorio2.poligonos.find(p => p.id === "Cuadra2_Territorio2");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

// Creamos el marcador del número del territorio
var marcadorTerritorio = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio2.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardar referencia para ocultar cuando se haga zoom desde select
territorio2._marcadorTerritorio = marcadorTerritorio;
