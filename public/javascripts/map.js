var Orbit = function () {};

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest();
  req.open('GET', path);
  req.addEventListener('load', fn.bind(req));
  req.send();
  return req;
};

function initialize() {

  var styleArray = [
  {
    featureType: "road.highway",
    stylers: [
      { hue: "#c3a770"},
    ]
  },{
    featureType: "road.arterial",
    stylers: [
      { hue: "#d5d2d2"}
    ]
  },{
    featureType: "water",
    stylers: [
      { hue: "#0744b9"}
    ]
  },{
    featureType: "transit.line",
    stylers: [
      { hue: "#a6f204"}
    ]
  },{
    featureType: "poi.park",
    stylers: [
      {hue: "#8B6220"}
    ]
  },{
    featureType: "transit",
    stylers: [
      {hue: "#effa27"}
    ]
  }
];

var styledMap = new google.maps.StyledMapType(styleArray,
    {name: "Styled Map"});

  var mapOptions = {
    center: { lat: 39.102100, lng: -105.536616},
    zoom: 7,
    style: styleArray,
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
        var licenseLocations = new Orbit();

        licenseLocations.get ('/licenses', function() {
          var licenses = JSON.parse (this.response);
          var geocoder = new google.maps.Geocoder();
          for (var i = 0; i < licenses.length; i ++) {
              geocoder.geocode( { 'address': licenses[i].street + licenses[i].city + licenses[i].state + licenses[i].zip}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  map.setCenter(results[0].geometry.location);
                  console.log(licenses);
                  var marker = new google.maps.Marker({
                      map: map,
                      position: results[0].geometry.location,
                      icon: '/images/liquor.png'
                  });
                } else {
                  alert("Geocode was not successful for the following reason: " + status);
                }
                //     var contentString =
                //   '<div id="content">'+
                //   '<div id="siteNotice">'+
                //   '</div>'+
                //   '<h1 id="firstHeading" class="firstHeading">' + businessName + '</h1>' +
                //   '<h2 id="secondHeading" class="secondHeading">' + street + '</h2>' +
                //   '</div>'+
                //   '</div>';
                //
                //   var infowindow = new google.maps.InfoWindow({
                //   content: contentString
                // });
                // var marker = new google.maps.Marker({
                //   position: myLatlng,
                //   map: map,
                //   title: licenses.businessName
                // });
                // google.maps.event.addListener(marker, 'click', function() {
                //   infowindow.open(map,marker);
                // });
              });
            }
        });

}


google.maps.event.addDomListener(window, 'load', initialize);
