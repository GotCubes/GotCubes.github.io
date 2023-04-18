async function getAHData() {
	let btn = document.getElementById("coinsPerPetXPSubmit");
	btn.disabled = true;
	btn.value = "Loading API Data...";
	
	let url = "https://api.hypixel.net/skyblock/auctions?page=";
	let response = await fetch(url + "0");
	let data = await response.json()
	let numPages = data.totalPages;
	
	let ah = data.auctions
	for(let page = 1; page < numPages; page++) {
		response = await fetch(url + page.toString());
		data = await response.json()
		ah.push(...data.auctions.filter(a => a.bin));
	}
	
	console.log("AH Data Loaded!")
	auctionsLoaded = true;
	auctions = ah;
	btn.disabled = false;
	btn.value = "Calculate";
}