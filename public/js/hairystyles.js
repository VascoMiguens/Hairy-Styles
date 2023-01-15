function initMap() {
    // TODO: Allow user to use their home town
    var leamingtonSpa = new google.maps.LatLng(52.2852, -1.52);

    var mapElement = document.getElementById('map');
    var searchElement = document.getElementById('search');
    var searchButtonElement = document.getElementById('searchButton');

    var hairdresserPlaceIdElement = document.getElementById('hairdresserPlaceId');
    var hairdresserNameElement = document.getElementById('hairdresserName');
    var hairdresserLocationElement = document.getElementById('hairdresserLocation');

    // Map styles - turn off Points of Interest
    var mapStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ];

    var map = new google.maps.Map(mapElement, {
        center: leamingtonSpa,
        zoom: 15,
        styles: mapStyles
    });

    var service = new google.maps.places.PlacesService(map);

    // Marker and Info Window for displaying a search result on the map
    var marker;
    var infoWindow = new google.maps.InfoWindow();

    function searchPlaces() {
        // Remove any existing marker from previous searches
        if (marker) {
            marker.setMap(null);
        }

        var searchText = searchElement.value;
        var request = {
            location: leamingtonSpa,
            radius: '5000',
            keyword: searchText,
            type: ['hair_care', 'beauty_salon']
        };

        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var result = results[0];

                console.log(result);

                // Populate form fields
                hairdresserPlaceIdElement.value = result.place_id;
                hairdresserNameElement.value = result.name;
                hairdresserLocationElement.value = result.geometry.location.toString();

                // Show the result on the map
                marker = new google.maps.Marker({
                    position: result.geometry.location,
                    map: map,
                    title: result.name
                });

                var contentElement = document.createElement('div');
                contentElement.innerHTML = `
                    <h4>${result.name}</h4>
                    <p>
                      ${result.vicinity}
                    </p>`;

                infoWindow.setContent(contentElement);
                infoWindow.open({
                    anchor: marker,
                    map,
                });

                // Center the map on the result
                map.setCenter(result.geometry.location);
            }
        });
    }

    searchButtonElement.addEventListener('click', searchPlaces);

}

window.initMap = initMap;