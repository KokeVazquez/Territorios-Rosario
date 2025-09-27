// =============================
// === Territorio 8 ===
// =============================

var datosTerritorio8 = {
    id: "territorio8",
    numeroTerritorio: 8, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio8",
            coords: [
                [28.612394, -106.084106], [28.611983, -106.084408], [28.611434, -106.083450], [28.611868, -106.083143]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/YxrzadxY1f1AfwVf9"
        },
        {
            id: "Cuadra2_Territorio8",
            coords: [
                [28.612848, -106.083779], [28.612428, -106.084083], [28.611899, -106.083116], [28.612319, -106.082816]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/azw9qm3qZErc3jSu7"
        },
        {
            id: "Cuadra3_Territorio8",
            coords: [
                [28.612297, -106.082777], [28.611879, -106.083080], [28.611397, -106.082208], [28.611805, -106.081902]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/nk3jSbGGXjARcBBX8"
        },
        {
            id: "Cuadra4_Territorio8",
            coords: [
                [28.611846, -106.083103], [28.611416, -106.083418], [28.610939, -106.082540], [28.611364, -106.082232]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/PnLUyafhZXES2NPq9"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio8Data = crearTerritorio(datosTerritorio8);
var territorio8 = territorio8Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio8.poligonos.find(p => p.id === "Cuadra3_Territorio8");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio8 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio8.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio8._marcadorTerritorio = marcadorTerritorio8;
