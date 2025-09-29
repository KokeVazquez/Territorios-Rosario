// =============================
// === Territorio 23 ===
// =============================

var datosTerritorio23 = {
    id: "territorio23",
    numeroTerritorio: 23, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio23",
            coords: [
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: ""
        },
        {
            id: "Cuadra2_Territorio23",
            coords: [
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: ""
        },
        {
            id: "Cuadra3_Territorio23",
            coords: [
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: ""
        },
        {
            id: "Cuadra4_Territorio23",
            coords: [
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: ""
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio23Data = crearTerritorio(datosTerritorio23);
var territorio23 = territorio23Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio23.poligonos.find(p => p.id === "Cuadra3_Territorio23");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio23 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio23.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio23._marcadorTerritorio = marcadorTerritorio23;
