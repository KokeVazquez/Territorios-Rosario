// =============================
// === Territorio 46 ===
// =============================

var datosTerritorio46 = {
    id: "territorio46",
    numeroTerritorio: 46, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio46",
            coords: [
                [[28.615115, -106.076444], [28.614854, -106.075972], [28.614003, -106.076598], [28.614261, -106.077060]]
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/FhYTtPDgZ1SGxDqF9"
        },
        {
            id: "Cuadra2_Territorio46",
            coords: [
                [[28.614832, -106.075930], [28.614570, -106.075478], [28.613714, -106.076113], [28.613977, -106.076556]]
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/sSzVE1ijzmfpzZ4H7"
        },
        {
            id: "Cuadra3_Territorio46",
            coords: [
                [[28.614547, -106.075438], [28.614143, -106.075744], [28.613593, -106.074779], [28.614000, -106.074484]]
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/9k3Kt7Z3nKk9dMd79"
        },
        {
            id: "Cuadra4_Territorio46",
            coords: [
                [[28.614108, -106.075772], [28.613688, -106.076075], [28.613161, -106.075099], [28.613556, -106.074810]]
            ],
            color: "blue",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/pdQ3sPHYgKqfzd117"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio46Data = crearTerritorio(datosTerritorio46);
var territorio46 = territorio46Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio46.poligonos.find(p => p.id === "Cuadra2_Territorio46"); // Centramos en polígono 2
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio46 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio46.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio46._marcadorTerritorio = marcadorTerritorio46;
