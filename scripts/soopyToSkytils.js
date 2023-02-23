function soopyToSkytils() {
	let skytilsData = {"categories":[{"name": "Soopy Import","waypoints": [],"island": "crystal_hollows"}]};
	
	let data = JSON.parse(document.getElementById("soopyToSkytilsText").value);
	let numPoints = Object.keys(data).length;
	for(wp of data) {
		waypoint = {
			name: wp["options"]["name"],
			x: wp["x"],
			y: wp["y"],
			z: wp["z"],
			enabled: true,
			color: RGBPercentToInt(1, wp["r"], wp["g"], wp["b"]),
			addedAt: 0
		};
		
		skytilsData.categories[0].waypoints.push(waypoint);
	}
	let output = zipEncodeData(JSON.stringify(skytilsData));
	
	navigator.clipboard.writeText("<Skytils-Waypoint-Data>(V1):" + output);
	alert(`Copied ${numPoints} waypoint(s) to clipboard!`);
	
	return;
}