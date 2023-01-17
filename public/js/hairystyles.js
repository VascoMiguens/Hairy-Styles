// TODO: Allow user to use their home town
var LEAMINGTON_SPA = { lat: 52.2852, lng: -1.52 };

function createMap(mapElement) {
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
        center: LEAMINGTON_SPA,
        zoom: 15,
        styles: mapStyles
    });

    return map;
}

function initHomepage() {
    // Initialise the homepage
    var mapElement = document.getElementById('map');
    var searchElement = document.getElementById('search');
    var searchButtonElement = document.getElementById('searchButton');

    var map = createMap(mapElement);

    function searchHairStyles() {
        var searchText = searchElement.value;
        console.log('Searching for hairstyles matching: ', searchText);
        // TODO fetch /api/search?query=xxx

        // List of hairdressers where hairstyle has styletag of pixie
        var mockSearchResults = [
            {
                id: 1,
                hairdresser_name: 'Nashwhite',
                location: '(52.2852, -1.52)',
                hairstyles: [
                    {
                        hairstyle_id: 1,
                        image_name: 'my-pixie-hairstyle-from-nashwhite.jpg',
                        style_tags: ['pixie']
                    }
                ]
            },
            {
                id: 2,
                hairdresser_name: 'Indigo Hair Ltd',
                location: '(52.2852, -1.52)',
                hairstyles: [
                    {
                        hairstyle_id: 2,
                        image_name: 'my-pixie-hairstyle-from-indigo.jpg',
                        style_tags: ['pixie']
                    },
                    {
                        hairstyle_id: 3,
                        image_name: 'my-pixie-lob-hairstyle-from-indigo.jpg',
                        style_tags: ['pixie', 'lob']
                    }
                ]
            }
        ];
        // Loop over dataset
        for(var i=0; i<mockSearchResults.length; i++) {
            var result = mockSearchResults[i];
            console.log(`${i+1} - ${result.hairdresser_name} - ${result.location}`);
        }
    }
    searchButtonElement.addEventListener('click', searchHairStyles);
}

function initUpload() {
    var mapElement = document.getElementById('map');
    var searchElement = document.getElementById('search');
    var searchButtonElement = document.getElementById('searchButton');

    var hairdresserPlaceIdElement = document.getElementById('hairdresserPlaceId');
    var hairdresserNameElement = document.getElementById('hairdresserName');
    var hairdresserLocationElement = document.getElementById('hairdresserLocation');

    var map = createMap(mapElement);
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
            location: LEAMINGTON_SPA,
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

function initMap() {
    var homepageElement = document.getElementById("homepage");
    var uploadElement = document.getElementById("upload");

    if (homepageElement) {
        initHomepage();
    }

    if (uploadElement) {
        initUpload();
    }

}

window.initMap = initMap;