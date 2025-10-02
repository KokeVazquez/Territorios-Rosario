// =============================
// === Territorio 16 ===
// =============================

var datosTerritorio16 = {
    id: "territorio16",
    numeroTerritorio: 16, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio16",
            coords: [
                [[28.612627, -106.081120], [28.611768, -106.081755], [28.611504, -106.081300], [28.612367, -106.080691]]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/cYZSMEzSvVF3beEi8"
        },
        {
            id: "Cuadra2_Territorio16",
            coords: [
                [[28.612327, -106.080642], [28.611479, -106.081263], [28.611207, -106.080784], [28.612055, -106.080165]]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/8DDyzDQApaNGJg3Y7"
        },
        {
            id: "Cuadra3_Territorio16",
            coords: [
                [[28.611179, -106.080728], [28.612023, -106.080102], [28.611772, -106.079666], [28.610935, -106.080279]]
            ],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/Q3pULjcEnxkWxXNy8"
        },
        {
            id: "Cuadra4_Territorio16",
            coords: [
                [[28.611738, -106.079604], [28.611503, -106.079182], [28.610660, -106.079800], [28.610899, -106.080227]]],
            color: "rgb(64,224,208)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/BUoB8rUPn3gh6moM7"
        },
        {
            id: "Escuela",
            coords: [
                [[28.613201, -106.082124], [28.612332, -106.082754], [28.611839, -106.081882], [28.612699, -106.081259]]
            ],
            color: "rgba(70, 44, 11, 1)",
            fillOpacity: 1.0,
            weight: 2,
            label: "Escuela",
            link: "https://maps.app.goo.gl/DCdBfeBLiPi4g2Hn7"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio16Data = crearTerritorio(datosTerritorio16);
var territorio16 = territorio16Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio16.poligonos.find(p => p.id === "Cuadra3_Territorio16");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio16 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio16.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio16._marcadorTerritorio = marcadorTerritorio16;
