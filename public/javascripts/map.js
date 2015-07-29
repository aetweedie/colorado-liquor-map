var Orbit = function () {};

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest();
  req.open('GET', path);
  req.addEventListener('load', fn.bind(req));
  req.send();
  return req;
};

function initialize() {

  var licenseLocations = new Orbit();

  var mapOptions = {
    center: { lat: 39.745652, lng: -104.992055},
    zoom: 11
  };

  licenseLocations.get ('/licenses', function() {
    var licenses = JSON.parse (this.response);
    for (var i = 0; i < licenses.length; i ++) {
      var latlng = new google.maps.LatLng(licenses[i].Latitude, licenses[i].Longitude);
      var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          icon: '/images/liquor.png'
      });

      var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' + licenses[i].businessName + '</h1>' +
      '<h2 id="secondHeading" class="secondHeading">' + licenses[i].Street + '</h2>' +
      '<h2 id="secondHeading" class="secondHeading">' + licenses[i].City + '</h2>' +
      '<h2 id="secondHeading" class="secondHeading">' + licenses[i].Zip + '</h2>' +
      '</div>';

      (function () {
        var infoWindow = new google.maps.InfoWindow({
          content: contentString,
          position: marker.position
        });
        // console.log(infoWindow.position);
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map);
        });
      })()
    }
  });



  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);


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

map.setOptions({styles: styleArray});

var styledMap = new google.maps.StyledMapType(styleArray,
    {name: "Styled Map"});

}



google.maps.event.addDomListener(window, 'load', initialize);
