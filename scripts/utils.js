function zipEncodeData(d) {
	let zipped = pako.gzip(d, {to: "string"});
	return btoa(String.fromCharCode.apply(null, zipped));
}

function decodeUnzipData(d) {
	let decoded = Uint8Array.from(atob(d), c => c.charCodeAt(0));
	return pako.ungzip(decoded, {to: "string"});
}

function RGBPercentToInt(a, r, g, b) {
	let color = 0;
	color |= Math.floor(a * 255) << 24;
	color |= Math.floor(r * 255) << 16;
	color |= Math.floor(g * 255) << 8;
	color |= Math.floor(b * 255);

	return color;
}
