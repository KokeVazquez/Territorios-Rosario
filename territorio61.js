// =============================
// === Territorio 61 ===
// =============================

var datosTerritorio61 = {
    id: "territorio61",
    numeroTerritorio: 61, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio61",
            coords: [
                [[28.613097, -106.069281], [28.612606, -106.069627], [28.612054, -106.068652], [28.612554, -106.068280]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/PNLKkp3UkgMFzW6K9"
        },
        {
            id: "Cuadra2_Territorio61",
            coords: [
                [[28.613466, -106.069009], [28.612914, -106.068015], [28.612648, -106.068213], [28.613206, -106.069192]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/nRvJWtPCrfMvPGKP6"
        },
        {
            id: "Cuadra3_Territorio61",
            coords: [
                [[28.614079, -106.068542], [28.613545, -106.067550], [28.612964, -106.067981], [28.613516, -106.068970]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/U16zKnoDS6YLoyyA7"
        },
        {
            id: "Cuadra4_Territorio61",
            coords: [
                [[28.614968, -106.067912], [28.614701, -106.067462], [28.614644, -106.067484], [28.614605, -106.067516], [28.613885, -106.068051], [28.614130, -106.068509]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/BiDv4iAh1xsTNK5fA"
        },
        {
            id: "Cuadra5_Territorio61",
            coords: [
                [[28.614668, -106.067406], [28.614611, -106.067432], [28.613856, -106.067994], [28.613592, -106.067511], [28.614412, -106.066934]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "5",
            link: "https://maps.app.goo.gl/2YNiRRLfmfRYinxg7"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio61Data = crearTerritorio(datosTerritorio61);
var territorio61 = territorio61Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio61.poligonos.find(p => p.id === "Cuadra3_Territorio61");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio61 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio61.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio61._marcadorTerritorio = marcadorTerritorio61;
