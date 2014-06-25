(function()
{
    setInterval(function() {
        var heig = $(window).height();
        var a = heig - 170;
        var b = heig - 178;
        $("#route_map").height(a + "px");
        $("#routeMyhome").height(b + "px");
    }, 1000);
})();

$(document).ready(function() {
    $("#add_button").hide();
    $(".ui-input-search input").attr("placeholder", "Pretrazi objekte");
    $(document).on("pagecreate", "#address_position", function(event) {
        $("#address_map").css("height", "300px");
        $("#address_map").css("width", "100%");
    });
});


function add_object_to_list(name_of_object) {
    var html = '';

    html = "<li class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c' data-theme='c' onclick=\"showMeObject(document.getElementById('" + parseID(name_of_object) + "').innerHTML)\">";
    html += '<div class="ui-btn-inner ui-li">';
    html += '<div class="ui-btn-text">';
    html += '<a class="ui-link ui-link-inherit" href="' + setElementforHref_or_ID(name_of_object, false) + '">';
    html += '<span id="' + setElementforHref_or_ID(name_of_object, true) + '">' + name_of_object.capitalize() + '</span>';
    html += '</a>';
    html += '</div>';
    html += '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>';
    html += '</div>';
    html += '</li>';
    append_ul_li(html);

}

setElementforHref_or_ID = function(name_of_object, id) {
    var lowercase = name_of_object.toLowerCase();
    if (id) {
        return lowercase + '_' + 'list';
    } else {
        return '#nerbyobject_object';
    }
};
function parseID(data) {
    data = data.toLowerCase();
    return data + "_list";
}

String.prototype.capitalize = function() {
    var text = this.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
};

$(document).on("pagebeforecreate", "#list", function(event) {
    updateContent_ul();
});

function updateContent_ul() {//restonse distinct type of object
    var url_to_call = "http://geolociranje.lockernerd.co.uk/server_side/switch.php?action=TESTgetContent_ul&callback=successCallback";
    $.ajax({
        url: url_to_call,
        data: "dataSend",
        dataType: 'jsonp',
        jsonpCallback: "successCallback",
        async: true,
        beforeSend: function() {

        },
        complete: function(data) {
        },
        success: function(result) {
            $.each(result, function(key, value) {
                add_object_to_list(value.type);
            });
        },
        error: function(request, error) {
            alert("Doslo je do greske na serveru prilikom ucitavanja podataka");
        },
        successCallback: function(result) {
        }
    });
    return true;
}


function append_ul_li(result) {
    $("#append ul").append(result);
}

function showMeObject(value) {//respone nerby object
    new imageLoader("css/images/sprites.gif", 'startAnimation(' + 2 + ')');
    GEOlocation.getLocation(
            function(lat, lng) {
                callAjax("http://geolociranje.lockernerd.co.uk/server_side/switch.php?lat=" + lat + "&lng=" + lng + "&object=" + value + "&action=getNerbyObject",
                        function(result) {
                            new userComand(result.lat, result.lng, lat, lng, result.name);
                            $("#name_of_object").html("Naziv objekta: <i>" + result.name + "</i>");
                            $("#name_of_object_address").html("Adresa:  <i>" + result.address + "</i>");
                            stopAnimation();
                            $("#loaderImage2").hide();
                            $("#add_button").show();

                        });
            });
}

function submit_function() {

    var seri = $('[name="add_new_object"]').serialize();
    var form = document['add_new_object'];
    var inputs = form.getElementsByTagName('input');
    var input = Array.prototype.slice.call(inputs, 0, inputs.length);
    check_user_added_data(input, seri);
}

function check_user_added_data(inputs, seri) {
    var error = 0;
    for (var key in inputs) {
        var value = inputs[key].value;
        var id = inputs[key].id;
        if ((id == 'geolat' && value) || (id == 'geolng' && value)) {
            if (!validate_lat_lng(value,true)) {
                alert("Sirina i duzina moraju biti u formatu: xx.xxxxx");
            }
        } else if(id == 'object_type' && value){
            if (!validate_lat_lng(value,false)) {
                alert("Tip objekta prihvata samo slovne karaktere");
            }
        }
        if (!value) {
            error++;
            $("#" + id).addClass('inputerror');
        } else {
            $("#" + id).removeClass('inputerror');
        }

    }
    if (error) {
        alert("Morate popuniti sva polja");
    } else {
        add_data_to_db(seri);
    }

}
add_data_to_db = function(arg) {
    var url_to_call = "http://geolociranje.lockernerd.co.uk/server_side/switch.php?" + arg + "&action=add_data_to_db&callback=successCallback";
    console.log(url_to_call)
    $.ajax({
        url: url_to_call,
        data: "dataSend",
        dataType: 'jsonp',
        jsonpCallback: "successCallback",
        async: true,
        beforeSend: function() {

        },
        complete: function(data) {
        },
        success: function(result) {
            if (result == 'exist') {
                alert("Podaci o unesenom objektu vec postoje");
            } else if (result == 'false') {
                alert("Doslo je do greske na serveru molimo vas pokusajte ponovo");
            } else if (result == 'notenoughargument') {
                alert("Morate popuniti sva polja i Ukljucite JavaScript!");
            } else {
                if (confirm("Uspesno ste uneli podatke") === true) {
                    window.location = "index.html";
                    $('[name="add_new_object"]').trigger("reset");
                } else {
                    $('[name="add_new_object"]').trigger("reset");
                    window.location = "index.html";
                }
            }

        },
        error: function(request, error) {
            alert("Doslo je do greske na serveru prilikom ucitavanja podataka");
        },
        successCallback: function(result) {
        }
    });
    return true;
};

function validate_lat_lng(value, num_or_string) {
    if (num_or_string) {
        var pattern = /^-*\d{2}\.\d+$/;
        var test = pattern.test(value);
        return test;
    } else {
        var pattern = /^[a-zA-z]+$/;
        var test = pattern.test(value);
        return test;
    }
}