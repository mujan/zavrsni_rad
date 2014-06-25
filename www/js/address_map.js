var map;
$(document).ready(function() {
    map = new GMaps({
        el: '#address_map',
        lat: -12.043333,
        lng: -77.028333
    });
    $('#geocoding_form').submit(function(e) {
        e.preventDefault();
        GMaps.geocode({
            address: $('#_address').val().trim(),//line: 165
            callback: function(results, status) {
                if (status == 'OK') {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    var latlng = new google.maps.LatLng(latitude, longitude);

                    var mapOptions = {
                        zoom: 18,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP

                    };

                    map = new google.maps.Map(document.getElementById('address_map'), mapOptions);

                    var latlng = new google.maps.LatLng(latitude, longitude);
                    map.setCenter(latlng);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: latlng,
                        title: 'Hello World!'

                    });
                }
            }
        });
        $('#geocoding_form')[0].reset();
    });
});

var user_name = [];
$(document).ready(function() {
    $("#__myhome").submit(function(event) {//line: 191 <!-- My home -->
        event.preventDefault();
        $("#instructionsHome").hide();//hide instrunction of route
        $("#routeMyhome").hide();//this is map
        self = this;
        var input_data = $("#user_name").val();
        if (!input_data) {
            alert('Morate uneti korisnicko ime!');
            return;
        } else { //chack if user name exist in db
            check_user_name("http://localhost/server_side/switch.php?action=check_user_name&inputData=" + input_data,//ajax.js line:43
                    function(data) {
                        alert(data)
                        //check_data(data);
                    }
            );
            function check_data(data) {
                if (data !== "false") {
                    user_name.push($("#user_name").val());//get value from input if exist in db
                }
                //chack if first element in array is equal to last element
                if (user_name[0] !== user_name[user_name.length - 1] && $("#routeMyhome").html().length !== 0 && data !== "false") {
                    stopAnimation();
                    $("#loaderImage3").hide();
                    $("#instructionsHome").hide();
                    $("#routeMyhome").hide();
                    alert("Ne mozete koristiti dva korisnicka imena");
                    return;
                }
                if (data === "false") {
                    $("#foo").show();
                    var r = confirm("Da bi ste koristili ovu uslugu morate se uclaniti");
                    if (r === true)
                    {
                        window.location = location.pathname + "#sing_form";
                    }
                    else
                    {
                        
                    }
                } else {
                    $("#loaderImage3").show();
                    new imageLoader("css/images/sprites.gif", 'startAnimation(' + 3 + ')');

                    $.each(data, function(key, value) {
                        var Homelat = value.lat;
                        var Homelng = value.lng;
                        $("#hidden_lat").val(Homelat);
                        $("#hidden_lng").val(Homelng);
                        onDeviceReadyHome();//myhome.js

                    });
                }
            }
        }
    });
});