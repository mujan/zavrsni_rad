var map;
QQ.showMap = function() {
    this.getMap = function() {
        var mapOptions = {
            center: QQ.latlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    };
    this.createMarker = function() {
        //Setting up the marker object to mark the location on the map canvas.
        var markerOptions = {
            position: QQ.latlng,
            map: map,
            animation: google.maps.Animation.DROP,
            clickable: true
        };
        var marker = new google.maps.Marker(markerOptions);

        var content = "You are here: " + QQ.latlng.lat() + ", " + QQ.latlng.lng();
        this.addInfoWindow(marker,content);

    };
    this.addInfoWindow = function(marker, content) {
        var infoWindowOptions = {
            content: content,
            position: QQ.latlng
        };
        var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        google.maps.event.addListener(marker, "click", function() {
            infoWindow.open(map);
        });
    };
};


$(document).ready(function() {
    $("#remove_href_mylocation").click(function() {
        $('#map').each(function() {
            if (jQuery.trim($(this).text()) === "") {
                stopAnimation();
                //start animation
                new imageLoader("css/images/sprites.gif", 'startAnimation('+1+')');
            }
        });
    });
});

var Stoploader = setInterval(function() {
    $(document).ready(function() {
        $('#map').each(function() { 
            if (jQuery.trim($(this).text()) !== "") {
                stopAnimation();
                $("#loaderImage").hide();
                clearInterval(Stoploader);
            }
        });
    });
}, 100);