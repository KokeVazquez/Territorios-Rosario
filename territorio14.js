// =============================
// === Territorio 14 ===
// =============================

var datosTerritorio14 = {
    id: "territorio14",
    numeroTerritorio: 14, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio14",
            coords: [
                [[28.605917, -106.071561], [28.605494, -106.071855], [28.604962, -106.070892], [28.605365, -106.070612]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/9wC9xuMwjgbB3RQS8"
        },
        {
            id: "Parque",
            coords: [
                [[28.605457, -106.071880], [28.605046, -106.072180], [28.604514, -106.071230], [28.604928, -106.070921]]
            ],
            color: "rgba(70, 44, 11, 1)",
            fillOpacity: 1.0,
            weight: 2,
            label: "Parque",
            link: "https://maps.app.goo.gl/GB53MoyQNpS6y7zY7"
        },
        {
            id: "Cuadra2_Territorio14",
            coords: [
                [[28.605343, -106.070571], [28.604939, -106.070853], [28.604342, -106.069848], [28.604791, -106.069556]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/CADLkuEHZFtNy4je7"
        },
        {
            id: "Cuadra3_Territorio14",
            coords: [
                [[28.604904, -106.070876], [28.604489, -106.071195], [28.603900, -106.070256], [28.604310, -106.069875]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/Xh9RpEr5YtBmYBZZ6"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio14Data = crearTerritorio(datosTerritorio14);
var territorio14 = territorio14Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio14.poligonos.find(p => p.id === "Cuadra2_Territorio14");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio14 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio14.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio14._marcadorTerritorio = marcadorTerritorio14;
