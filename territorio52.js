// =============================
// === Territorio 52 ===
// =============================

var datosTerritorio52 = {
    id: "territorio52",
    numeroTerritorio: 52, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio52",
            coords: [
                [[28.614916, -106.073760], [28.614621, -106.073243], [28.613731, -106.073881], [28.614032, -106.074402]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/5uWu6QeRu6ZpzTQz7"
        },
        {
            id: "Cuadra2_Territorio52",
            coords: [
                [[28.614600, -106.073202], [28.614339, -106.072742], [28.613480, -106.073394], [28.613715, -106.073819]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/UEvCAgTCpxwbA4kW6"
        },
        {
            id: "Cuadra3_Territorio52",
            coords: [
                [[28.614285, -106.072721], [28.612881, -106.072387], [28.613440, -106.073347]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/F5phTGVoruqkU5w26"
        },
        {
            id: "Cuadra4_Territorio52",
            coords: [
                [[28.614300, -106.072673], [28.612886, -106.072337], [28.613759, -106.071721]]
            ],
            color: "rgba(255, 7, 7, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/C5qznPcAHuE4pa8M8"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio52Data = crearTerritorio(datosTerritorio52);
var territorio52 = territorio52Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio52.poligonos.find(p => p.id === "Cuadra3_Territorio52");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio52 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio52.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio52._marcadorTerritorio = marcadorTerritorio52;
