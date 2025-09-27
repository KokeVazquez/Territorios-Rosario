// =============================
// === Territorio 10 ===
// =============================

var datosTerritorio10 = {
    id: "territorio10",
    numeroTerritorio: 10, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio10",
            coords: [
                [28.610554, -106.079746], [28.609727, -106.080346], [28.609478, -106.079930], [28.610309, -106.079314]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/277geuozcTWuac4U9"
        },
        {
            id: "Cuadra2_Territorio10",
            coords: [
                [28.610275, -106.079256], [28.609442, -106.079870], [28.609191, -106.079407], [28.610041, -106.078789]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/LPaU1W9aT8jmTCL5A"
        },
        {
            id: "Cuadra3_Territorio10",
            coords: [
                [28.610020, -106.078733], [28.609592, -106.079057], [28.609077, -106.078090], [28.609483, -106.077787]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/cNfGkoEK1aN2NZDj6"
        },
        {
            id: "Cuadra4_Territorio10",
            coords: [
                [28.609552, -106.079081], [28.609159, -106.079351], [28.608625, -106.078425], [28.609034, -106.078130]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/QTLeGvue1RrfmR2v5"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio10Data = crearTerritorio(datosTerritorio10);
var territorio10 = territorio10Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio10.poligonos.find(p => p.id === "Cuadra3_Territorio10");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio10 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio10.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio10._marcadorTerritorio = marcadorTerritorio10;

