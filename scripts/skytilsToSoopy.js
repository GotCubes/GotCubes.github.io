function skytilsToSoopy() {
	let data = prompt("Paste the export data from Skytils:").replace("<Skytils-Waypoint-Data>(V1):", "");
	let input = JSON.parse(decodeUnzipData(data));
	
	let categories = input.categories.map(category => category.name);
	let choice = prompt("Enter category name or 'all':\n" + categories.join("\n")).toLowerCase();
	
	let waypoints = [];
	if(choice === "all") {
		waypoints = input.categories.map(a => a.waypoints).flat();
	} else {
		waypoints = input.categories.find(a => a.name.toLowerCase() === choice).waypoints;
	}
	
	let soopyData = waypoints.map(a => {
		return {
				x: a.x,
				y: a.y,
				z: a.z,
				r: 0,
				g: 1,
				b: 0,
				options: {name: a.name}
		}
	})
	
	document.getElementById("skytilsToSoopyText").innerText = JSON.stringify(soopyData);
}