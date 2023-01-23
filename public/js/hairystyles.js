var mapElement = document.getElementById("map");
function initMap() {
  createMap(mapElement);
}

document.querySelectorAll(".map-button").forEach((button) => {
  button.addEventListener("click", function () {
    //grab data-location from handlebar
    let location = this.dataset.location;
    //grab data-name from handlebar
    let hairdresserName = this.dataset.name;
    console.log(hairdresserName);
    console.log(location);
    // Pass the location and hairdresser name to the createMap function
    createMap(mapElement, location, hairdresserName);
    //scroll to map
    mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

function createMap(mapElement, location, name) {
  //initiate map
  var map = new google.maps.Map(mapElement, {
    zoom: 10,
  });
  var service = new google.maps.places.PlacesService(map);

  //hairdresser and location query
  var request = {
    query: `${name} in ${location}`,
    fields: ["name", "geometry"],
  };
  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var place = results[0];
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
      });
      //create marker
      marker.addListener("click", function () {
        map.setZoom(20);
        map.panTo(marker.getPosition());
        var infowindow = new google.maps.InfoWindow({
          content: '<div style="color: black">' + results[0].name + "</div>",
        });
        infowindow.open(map, marker);
      });
      //center map on results
      map.setCenter({ lat: lat, lng: lng });
    }
  });
}
