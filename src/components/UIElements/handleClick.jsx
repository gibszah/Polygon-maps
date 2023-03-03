export const handleClicked = (area, event) => {
	const clickedLatLng = event.latLng;
	const isInside = window.google.maps.geometry.poly.containsLocation(
		clickedLatLng,
		area
	);
	if (isInside) {
		area.setOptions({
			fillColor: "yellow",
			strokeColor: "#FF0000",
		});
	} else {
		area.setOptions({
			fillColor: "#FF0000",
			strokeColor: "#FF0000",
		});
	}
};
