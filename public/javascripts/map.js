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
}

// function codeAddress() {
//   var address = document.getElementById("address").value;
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//       });
//     } else {
//       alert("Geocode was not successful for the following reason: " + status);
//     }
//   });

google.maps.event.addDomListener(window, 'load', initialize);
