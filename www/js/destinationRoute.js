var userComand = function(dblat, dblng, currentlat, currentlng, objectname) {
    var self = this;
    $('#instructions').empty()
    this.map = new GMaps({
        el: '#route_map',
        lat: currentlat,
        lng: currentlng
    });
    this.map.addMarker({
        lat: currentlat,
        lng: currentlng,
        infoWindow: {
            content: 'Moja Pozicija'
        }
    });
    this.map.addMarker({
        lat: dblat,
        lng: dblng,
        title: objectname,
        infoWindow: {
            content: objectname
        }
    });
    this.map.travelRoute({
        origin: [currentlat, currentlng],
        destination: [dblat, dblng],
        travelMode: 'driving',
        step: function(e) {
            $('#instructions').append('<li>' + e.instructions + '</li>');
            $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
                self.map.drawPolyline({
                    path: e.path,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.6,
                    strokeWeight: 6
                });
            });
        }
    });
};