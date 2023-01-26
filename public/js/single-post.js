var mapElement = document.getElementById("map");
// loads up the google map
function initMap(location) {
  createMap(mapElement, location);
}


//grab hairdresser and location on page load
document.addEventListener("DOMContentLoaded", function () {
  var locationElement = document.querySelector("div[data-location]");
  var hairdresserNameElement = document.querySelector("div[data-name]");
  var location = locationElement.dataset.location;
  var hairdresserName = hairdresserNameElement.dataset.name;
  console.log(location);
  console.log(hairdresserName);
  createMap(mapElement, location, hairdresserName);
});
// creates map based on the values read from the event listeners above
function createMap(mapElement, location, name) {
  var map = new google.maps.Map(mapElement, {
    zoom: 20,
  });
  //using the google maps API PalcesService to find the hairdressers and place the loaction pin on the map
  var service = new google.maps.places.PlacesService(map);
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
        title: name,
      });
      map.setCenter({ lat: lat, lng: lng });
    }
  });
}
