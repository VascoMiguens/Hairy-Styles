var mapElement = document.getElementById("map");

function initMap() {
  if (navigator.geolocation) {
    // Get User's current location
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Initiate map with user's current location
        var map = new google.maps.Map(mapElement, {
          zoom: 10,
          center: currentPosition,
        });
        // Create marker
        var marker = new google.maps.Marker({
          position: { lat: currentPosition.lat, lng: currentPosition.lng },
          map: map,
        });
        //add click on marker to zoom in the current location
        marker.addListener("click", function () {
          map.setZoom(20);
          map.panTo(marker.getPosition());
          infowindow.open(map, marker);
        });
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // handle user denied permission
            // pass random location to render map
            var randomLocation = {
              lat: 51.509865,
              lng: -0.118092,
            };
            // Create the map with a default location
            var map = new google.maps.Map(mapElement, {
              zoom: 10,
              center: randomLocation,
            });
            var marker = new google.maps.Marker({
              position: { lat: currentPosition.lat, lng: currentPosition.lng },
              map: map,
            });
            marker.addListener("click", function () {
              map.setZoom(20);
              map.panTo(marker.getPosition());
              infowindow.open(map, marker);
            });
            break;
          case error.POSITION_UNAVAILABLE:
            // handle position unavailable
            console.log("Position unavailable");
            var randomLocation = {
              lat: 51.509865,
              lng: -0.118092,
            };
            // Create the map with a default location
            var map = new google.maps.Map(mapElement, {
              zoom: 10,
              center: randomLocation,
            });
            var marker = new google.maps.Marker({
              position: { lat: currentPosition.lat, lng: currentPosition.lng },
              map: map,
            });
            marker.addListener("click", function () {
              map.setZoom(20);
              map.panTo(marker.getPosition());
              infowindow.open(map, marker);
            });
            break;
          case error.TIMEOUT:
            // handle timeout
            console.log("Request timed out");
            var randomLocation = {
              lat: 51.509865,
              lng: -0.118092,
            };
            // Create the map with a default location
            var map = new google.maps.Map(mapElement, {
              zoom: 10,
              center: randomLocation,
            });
            var marker = new google.maps.Marker({
              position: { lat: currentPosition.lat, lng: currentPosition.lng },
              map: map,
            });
            marker.addListener("click", function () {
              map.setZoom(20);
              map.panTo(marker.getPosition());
              infowindow.open(map, marker);
            });
            break;
          case error.UNKNOWN_ERROR:
            // handle unknown error
            console.log("unknown error");
            var randomLocation = {
              lat: 51.509865,
              lng: -0.118092,
            };
            // Create the map with a default location
            var map = new google.maps.Map(mapElement, {
              zoom: 10,
              center: randomLocation,
            });
            var marker = new google.maps.Marker({
              position: { lat: currentPosition.lat, lng: currentPosition.lng },
              map: map,
            });
            marker.addListener("click", function () {
              map.setZoom(20);
              map.panTo(marker.getPosition());
              infowindow.open(map, marker);
            });
            break;
        }
      }
    );
  } else {
    // If the browser does not support geolocation, handle the error
    console.log("Geolocation is not supported by this browser.");
  }
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
  console.log(mapElement);
  console.log(location);
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
      //create marker
      var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
      });
      //add listener to marker to zoom in on hairdressers location and add hairdresser's name to marker
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
