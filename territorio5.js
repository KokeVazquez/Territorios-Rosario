// =============================
// === Territorio 5 ===
// =============================

var datosTerritorio5 = {
    id: "territorio5",
    numeroTerritorio: 5, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio5",
            coords: [
                [28.616613, -106.076785], [28.616212, -106.077063], [28.616358, -106.076301]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/bgVVtgHjBFC9g9ri8"
        },
        {
            id: "Cuadra2_Territorio5",
            coords: [
                [28.617529, -106.076107], [28.616646, -106.076761], [28.616392, -106.076278], [28.617261, -106.075636]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/c4khq8kbvsoNuAgy9"
        },
         {
            id: "Cuadra3_Territorio5",
            coords: [
                [28.617239, -106.075600], [28.616376, -106.076239], [28.616183, -106.075731], [28.616990, -106.075157]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/n4fWysVB3jmvV6jZA"
        },
         {
            id: "Cuadra4_Territorio5",
            coords: [
                [28.618101, -106.075697], [28.617563, -106.076082], [28.617021, -106.075135], [28.617572, -106.074733]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/DhnEKwEWf5FCyXaBA"
        },
         {
            id: "Cuadra5_Territorio5",
            coords: [
                [28.618976, -106.075052], [28.618132, -106.075673], [28.617864, -106.075184], [28.618704, -106.074580]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "5",
            link: "https://maps.app.goo.gl/ATzYutQTVsZN338C9"
        },
        {
            id: "Cuadra6_Territorio5",
            coords: [
                [28.618682, -106.074545], [28.617844, -106.075146], [28.617602, -106.074714], [28.618020, -106.074416], [28.618431, -106.074095]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "6",
            link: "https://maps.app.goo.gl/6pxZxWi8MzrZBvrh9"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio5Data = crearTerritorio(datosTerritorio5);
var territorio5 = territorio5Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio5.poligonos.find(p => p.id === "Cuadra4_Territorio5");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio5 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio5.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio5._marcadorTerritorio = marcadorTerritorio5;
