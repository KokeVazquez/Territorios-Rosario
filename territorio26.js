// =============================
// === Territorio 26 ===
// =============================

var datosTerritorio26 = {
    id: "territorio26",
    numeroTerritorio: 26, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio26",
            coords: [
                [[28.610846, -106.076723], [28.610396, -106.077068], [28.609789, -106.076030], [28.610253, -106.075716]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/GiR1b5e76xpwisEh9"
        },
        {
            id: "Cuadra2_Territorio26",
            coords: [
                [[28.611241, -106.076430], [28.610884, -106.076689], [28.610295, -106.075678], [28.610655, -106.075420]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/pvgp1UW8A85PbwiZA"
        },
        {
            id: "Cuadra3_Territorio26",
            coords: [
                [[28.610627, -106.075372], [28.609760, -106.075985], [28.609503, -106.075527], [28.610367, -106.074906]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/Giis9utXPQ1opYAg8"
        },
        {
            id: "Cuadra4_Territorio26",
            coords: [
                [[28.610337, -106.074859], [28.609473, -106.075482], [28.609213, -106.075025], [28.610072, -106.074408]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/4ABZJQfAqXJCPKEz8"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio26Data = crearTerritorio(datosTerritorio26);
var territorio26 = territorio26Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio26.poligonos.find(p => p.id === "Cuadra3_Territorio26");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio26 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio26.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio26._marcadorTerritorio = marcadorTerritorio26;
