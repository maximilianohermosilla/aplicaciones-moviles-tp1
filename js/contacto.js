let map;

async function initMap() {
    let catedralLaPlata = new google.maps.LatLng(-34.92278836498422, -57.95625112423649);
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: catedralLaPlata,
        zoom: 15,
        mapId: "map",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: catedralLaPlata,
        title: "Uluru",
    });
}

initMap();
