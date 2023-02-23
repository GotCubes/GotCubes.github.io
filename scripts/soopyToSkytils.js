function soopyToSkytils() {
	var skytilsData = {"categories":[{"name": "Soopy Import","waypoints": [],"island": "crystal_hollows"}]};
	
	var data = JSON.parse(document.getElementById("soopyToSkytilsText").value);
	var numPoints = Object.keys(data).length;
	for (wp of data) {
		waypoint = {
			"name": wp["options"]["name"],
			"x": wp["x"],
			"y": wp["y"],
			"z": wp["z"],
			"enabled": true,
			"color": rgbPercentToInt(1, wp["r"], wp["g"], wp["b"]),
			"addedAt": 0
		};
		
		skytilsData.categories[0].waypoints.push(waypoint);
	}
	
	var compressed = pako.gzip(JSON.stringify(skytilsData),{to: "string"});
	var compressedB64 = btoa(String.fromCharCode.apply(null, compressed));
	
	navigator.clipboard.writeText("<Skytils-Waypoint-Data>(V1):" + compressedB64);
	alert(`Copied ${numPoints} waypoint(s) to clipboard!`);
	
	return;
}

function rgbPercentToInt(a, r, g, b) {
	var color = 0
	color |= (a * 255) << 24;
	color |= (r * 255) << 16;
	color |= (g * 255) << 8;
	color |= (b * 255);

	return color;
}