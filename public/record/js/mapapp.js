var map = L.map("map").fitWorld();

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, " +
      "<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, " +
      "Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1
  }).addTo(map);

let circle;

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  map.panTo(e.latlng);
  window.loc = {
    lat: e.latitude,
    lng: e.longitude
  };

  console.log(loc);

  let marker = L.marker(e.latlng, {
    draggable: true,
    autoPan: true

  }).addTo(map);
  //.bindPopup("You are within " + radius + " meters from this point").openPopup();

  circle = L.circle(e.latlng, radius).addTo(map);

  marker.on("dragend", function(e) {
    let marker = e.target;
    circle.remove();
    console.log(e, marker.getLatLng());
    window.loc = {
      lat: marker.getLatLng().lat,
      lng: marker.getLatLng().lng
    };
  });
  console.log(circle);
}

function onLocationError(e) {
  map.setView(new L.LatLng(18.7867771, 99.0758924), 14);
  //alert(e.message);
}

map.on("locationfound", onLocationFound);
map.on("locationerror", onLocationError);
//map.setView(new L.LatLng(18.7867771,99.0758924), 5);
map.locate({ setView: true, maxZoom: 10 });
