var a = true;
function onDeviceReadyHome() {
    // Get the most accurate position updates available on the
    // device.
    var options = {maximumAge: 1000, timeout: 10000, enableHighAccuracy: false};
    watchID = navigator.geolocation.watchPosition(onSuccessHome, onErrorHome, options);
}
// onSuccess Geolocation

function onSuccessHome(position) {
    var current_latitude = position.coords.latitude;
    var current_longitude = position.coords.longitude;
    userComandHome(current_latitude, current_longitude);

}
function onErrorHome() {
}
;

//////************* My Home **************///////////
var map;
function userComandHome(current_latitude, current_longitude) {
    var home_lat = $("#hidden_lat").val();
    var home_lng = $("#hidden_lng").val();
    
    /*
     console.log(current_latitude);
     console.log(current_longitude);
     console.log(home_lat);
     console.log(home_lng);
     */
    $("#routeMyhome").show();
    $("#instructionsHome").show();
    map = new GMaps({
        el: '#routeMyhome',
        lat: current_latitude,
        lng: current_longitude
    });
    
    map.travelRoute({
        origin: [current_latitude, current_longitude],
        destination: [home_lat, home_lng],
        travelMode: 'driving',
        step: function(e) {

            if ($('#instructionsHome li').html() === e.instructions) {
                e.instructions = "";a = false;return;
            } else if (a) {
                $('#instructionsHome').append('<li>' + e.instructions + '</li>');
            }
            $('#instructionsHome li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
                map.drawPolyline({
                    path: e.path,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.6,
                    strokeWeight: 6
                });


            });
        }
    });
    stopAnimation();
    $("#loaderImage3").hide();
}
