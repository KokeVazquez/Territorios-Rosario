// =============================
// === Territorio 13 ===
// =============================

var datosTerritorio13 = {
    id: "territorio13",
    numeroTerritorio: 13, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio13",
            coords: [
                [[28.607066, -106.073630], [28.606253, -106.074256], [28.605981, -106.073800], [28.606822, -106.073195]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/TWuCFFP58K2orK6Y6"
        },
        {
            id: "Cuadra2_Territorio13",
            coords: [
                [[28.606789, -106.073133], [28.605949, -106.073738], [28.605677, -106.073250], [28.606526, -106.072667]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/cqqFuQPQFSRpJhPj9"
        },
        {
            id: "Cuadra3_Territorio13",
            coords: [
                [[28.606495, -106.072608], [28.606088, -106.072908], [28.605548, -106.071924], [28.605958, -106.071638]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/gmLn8HNHuY29ng9p6"
        },
        {
            id: "Cuadra4_Territorio13",
            coords: [
                [[28.606037, -106.072942], [28.605658, -106.073214], [28.605104, -106.072246], [28.605496, -106.071968]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/Fz5JUQVwh84kjrPv5"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio13Data = crearTerritorio(datosTerritorio13);
var territorio13 = territorio13Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio13.poligonos.find(p => p.id === "Cuadra3_Territorio13");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio13 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio13.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio13._marcadorTerritorio = marcadorTerritorio13;
