// =============================
// === Territorio 56 ===
// =============================

var datosTerritorio56 = {
    id: "territorio56",
    numeroTerritorio: 56, // Número que se mostrará en el marcador principal
    poligonos: [
        {
            id: "Cuadra1_Territorio56",
            coords: [
                [[28.615911, -106.074732], [28.615873, -106.075000], [28.615839, -106.075339], [28.615538, -106.074780], [28.615968, -106.074478]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "1",
            link: "https://maps.app.goo.gl/did9y7mgTCBf5KfP9"
        },
        {
            id: "Cuadra2_Territorio56",
            coords: [
                [[28.615981, -106.074413], [28.615516, -106.074740], [28.615247, -106.074265], [28.616140, -106.073630], [28.616220, -106.073720]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "2",
            link: "https://maps.app.goo.gl/vPwgKQzMBrocymEX8"
        },
        {
            id: "Cuadra3_Territorio56",
            coords: [
                [[28.616113, -106.073598], [28.615860, -106.073140], [28.614976, -106.073773], [28.615224, -106.074227]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "3",
            link: "https://maps.app.goo.gl/fb1kuxMDjGSpCLFm7"
        },
        {
            id: "Cuadra4_Territorio56",
            coords: [
                [[28.616420, -106.072737], [28.616593, -106.073009], [28.616231, -106.073657], [28.616160, -106.073576], [28.615907, -106.073117]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "4",
            link: "https://maps.app.goo.gl/1pS6UHpQBgybqYVo8"
        },
        {
            id: "Cuadra5_Territorio56",
            coords: [
                [[28.616469, -106.072686], [28.616881, -106.072353], [28.617025, -106.072462], [28.616637, -106.072956]]
            ],
            color: "rgba(221, 210, 0, 1)",
            fillOpacity: 0.8,
            weight: 2,
            label: "5",
            link: "https://maps.app.goo.gl/GxRB9Df9DNEC378NA"
        }
    ],
};

// ------------------------------
// Crear territorio con base
// ------------------------------
var territorio56Data = crearTerritorio(datosTerritorio56);
var territorio56 = territorio56Data.grupo;

// ------------------------------
// Crear marcador inicial del territorio (número)
// ------------------------------
var polFijo = datosTerritorio56.poligonos.find(p => p.id === "Cuadra3_Territorio56");
var centro = L.polygon(polFijo.coords).getBounds().getCenter();

var marcadorTerritorio56 = L.marker(centro, {
    icon: L.divIcon({
        className: "etiquetaTerritorio",
        html: `<b>${datosTerritorio56.numeroTerritorio}</b>`,
        iconSize: [20, 20]
    })
}).addTo(map);

// Guardamos la referencia en el grupo para poder ocultarla desde index
territorio56._marcadorTerritorio = marcadorTerritorio56;
