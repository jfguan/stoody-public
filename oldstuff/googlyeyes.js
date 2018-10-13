//https://developers.google.com/maps/documentation/javascript/examples/marker-remove

function initMap() {
  // The location of THE DIAG
  var anne = {lat: 42.277154, lng: -83.738285};
  // The map, centered at UMICH
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: anne});
  map.addListener('click', function(event) {
    	refresh_markers();
  });
    // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: anne, map: map});
}

function refresh_markers(){
	deleteMarkers();
}
// Adds a marker to the map and push to the array.
function addMarker(location) {
	var marker = new google.maps.Marker({
	  position: location,
	  map: map
	});
	markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	}
}

function set_markers(){

}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}