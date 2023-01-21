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
    var markers = [];
    var infoWindow = new google.maps.InfoWindow();

    function searchHairStyles() {
        var searchText = searchElement.value;
        console.log(searchText);
        console.log('Searching for hairstyles matching: ', searchText);
        // TODO fetch /api/search?query=xxx

        // List of hairdressers where hairstyle has styletag of pixie
        var mockSearchResults = [
            {
                id: 1,
                hairdresser_name: 'Toni & Guy',
                location: {
                    "lat": 52.295320,
                    "lng": -1.552140
                },
                hairstyles: [
                    {
                        hairstyle_id: 1,
                        image_name: 'my-pixie-hairstyle-from-toniguy.jpg',
                        style_tags: ['pixie']
                    }
                ]
            },
            {
                id: 2,
                hairdresser_name: 'Indigo Hair Ltd',
                location: {
                    "lat": 52.291988,
                    "lng": -1.54
                },
                hairstyles: [
                    {
                        hairstyle_id: 2,
                        image_name: 'my-pixie-mullet-hairstyle-from-indigo.jpg',
                        style_tags: ['pixie', 'mullet']
                    },
                    {
                        hairstyle_id: 3,
                        image_name: 'my-pixie-lob-hairstyle-from-indigo.jpg',
                        style_tags: ['pixie', 'lob']
                    }
                ]
            },
            {
                hairdresser_name: 'Geiko',
                location: {
                    "lat": 52.291990,
                    "lng": -1.535780
                },
                hairstyles: [
                    {
                        hairstyle_id: 4,
                        image_name: 'my-pixie-hairstyle-from-geiko.jpg',
                        style_tags: ['pixie']
                    },
                    {
                        hairstyle_id: 5,
                        image_name: 'my-pixie-mullet-hairstyle-from-geiko.jpg',
                        style_tags: ['pixie', 'mullet']
                    }
                ]
            }
        ];

        // Loop over dataset
        let bounds;
        for (let i = 0; i < mockSearchResults.length; i++) {
            let result = mockSearchResults[i];
            console.log(`${i + 1} - ${result.hairdresser_name} - ${result.location}`);

            if (!bounds) {
                bounds = new google.maps.LatLngBounds(result.location);
            }

            // Extend the bounds to include the result location
            bounds.extend(result.location);

            let marker = new google.maps.Marker({
                position: result.location,
                map: map,
            });

            marker.addListener('click', function () {
                var contentElement = document.createElement('div');
                contentElement.innerHTML = `
                    <h4>${result.hairdresser_name}</h4>
                    <p>
                      ${result.hairstyles}
                    </p>`;

                infoWindow.setContent(contentElement);
                infoWindow.open({
                    anchor: marker,
                    map,
                });

            });

            markers.push(marker);
        }


        map.fitBounds(bounds);

    }

    searchButtonElement.addEventListener('click', searchHairStyles);

    document.getElementById("search")
    .addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("searchButton").click();
    }
});
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

    document.getElementById("search")
    .addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("searchButton").click();
    }
});

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