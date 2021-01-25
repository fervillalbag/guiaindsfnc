$(document).ready(function() {
    'use strict';

    var map = {};

    if ($('#mapa').length !== 0) {
        initializeMap();
    }

    var center = map.getCenter();
    google.maps.event.trigger($("#mapa")[0], 'resize');
    map.setCenter(center);


    function initializeMap() {
        var mapCanvas = $('#mapa');
        var latitude = $('#latitud');
        var longitude = $('#longitud');
        var latLng = new google.maps.LatLng(-25.16, -57.40);
        var zoom = 9;

        // Si tenemos valores guardados posicionamos el mapa y el zoom
        if (latitude.val().length > 0 && longitude.val().length > 0) {
            latLng = new google.maps.LatLng(latitude.val(), longitude.val());
            zoom = 17;
        }

        // Mapa
        var mapOptions = {
            center: latLng,
            zoom: zoom
        };

        map = new google.maps.Map(mapCanvas[0], mapOptions);


        // Marcador
        var markerOptions = {
            map: map,
            draggable: true,
            title: 'Mueve el marcador a tu posicion'
        };
        var marker = new google.maps.Marker(markerOptions);
        marker.setPosition(latLng);

        if (latitude.val().length > 0 && longitude.val().length > 0) {
            marker.setPosition(latLng);
        }


        // Permite al marcador reposicionarse
        google.maps.event.addListener(marker, 'drag', function() {
            latitude.val(marker.getPosition().lat());
            longitude.val(marker.getPosition().lng());
        });
    }
});