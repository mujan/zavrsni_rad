GEOlocation = {
    getLocation: function(callback)
    {
        a = callback;
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    },
    showPosition: function(position)
    {
       a(position.coords.latitude,position.coords.longitude)
    }
};
