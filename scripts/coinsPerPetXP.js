function coinsPerPetXP() {
	if(!auctionsLoaded) { return; }
	
	let rarity = document.getElementById("raritySelect").value;
	let pet = document.getElementById("petSelect").value;
	console.log("Finding " + rarity + " " + pet);
	
	let xpRequired = 0;
	if(rarity == "COMMON") {
		xpRequired = 5624785;
	} else if(rarity == "UNCOMMON") {
		xpRequired = 8644220;
	} else if(rarity == "RARE") {
		xpRequired = 12626665;
	} else if(rarity == "EPIC") {
		xpRequired = 18608500;
	} else {
		xpRequired = 25353230;
	}
	
	let matches = auctions.filter(a => (a.tier == rarity) && (a.item_name.includes(pet)));
	let lvl1_lbin = matches.filter(a => a.item_name.includes("[Lvl 1]")).sort(sortByPrice)[0];

	let table = document.getElementById("coinsPerPetXPTable");
	let error = document.getElementById("errorTxt");
	table.innerHTML = "";
	error.innerHTML = "";
	
	let thead = table.createTHead();
	let row = thead.insertRow();
	let td = document.createElement("td");
	let th = document.createElement("th");
	
	let cont = true;
	try {
		th.appendChild(document.createTextNode(lvl1_lbin.item_name));
		row.appendChild(th)
	} catch (e) {
		let error = document.getElementById("errorTxt");
		error.innerText = "UNABLE TO FIND LVL 1 PET";
		cont = false;
	}

	if(pet != "Golden Dragon") {
		if(cont) {
			let lvl100_lbin = matches.filter(a => a.item_name.includes("[Lvl 100]")).sort(sortByPrice)[0];
			
			try {
				th = document.createElement("th");
				th.appendChild(document.createTextNode(lvl100_lbin.item_name));
				row.appendChild(th)
			} catch (e) {
				error.innerText = "UNABLE TO FIND LVL 100 PET";
				return;
			}
			
			th = document.createElement("th");
			th.appendChild(document.createTextNode("Total Profit"));
			row.appendChild(th)
			
			th = document.createElement("th");
			th.appendChild(document.createTextNode("Coins Per Pet XP"));
			row.appendChild(th);
			
			row = thead.insertRow();
			td = document.createElement("td");
			td.appendChild(document.createTextNode(lvl1_lbin.starting_bid.toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode(lvl100_lbin.starting_bid.toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode((lvl100_lbin.starting_bid - lvl1_lbin.starting_bid).toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode(((lvl100_lbin.starting_bid - lvl1_lbin.starting_bid) / xpRequired).toFixed(2)));
			row.appendChild(td)
		}
	} else {
		let lvl102_lbin = matches.filter(a => !a.item_name.includes("Egg")).sort(sortByPrice)[0];
		let lvl200_lbin = matches.filter(a => a.item_name.includes("[Lvl 200]")).sort(sortByPrice)[0];
		
		if(cont) {	
			try {
				th = document.createElement("th");
				th.appendChild(document.createTextNode(lvl102_lbin.item_name));
				row.appendChild(th)
			}catch (e) {
				error.innerText = "UNABLE TO FIND LVL 102 PET";
			}

			th = document.createElement("th");
			th.appendChild(document.createTextNode("Total Profit"));
			row.appendChild(th)
			
			th = document.createElement("th");
			th.appendChild(document.createTextNode("Coins Per Pet XP"));
			row.appendChild(th);
			
			row = thead.insertRow();
			td = document.createElement("td");
			td.appendChild(document.createTextNode(lvl1_lbin.starting_bid.toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode(lvl102_lbin.starting_bid.toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode((lvl102_lbin.starting_bid - lvl1_lbin.starting_bid).toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode(((lvl102_lbin.starting_bid - lvl1_lbin.starting_bid) / xpRequired).toFixed(2)));
			row.appendChild(td)
		}
		/*-----------------------------------------------------------------------------------------------------------------------------*/
		cont = true;
		
		try {
			row = thead.insertRow();
			th = document.createElement("th");
			th.appendChild(document.createTextNode(lvl102_lbin.item_name));
			row.appendChild(th)
		} catch (e) {
			error.innerText = "UNABLE TO FIND LVL 102 PET";
			cont = false;
		}	
	
		try {
			th = document.createElement("th");
			th.appendChild(document.createTextNode(lvl200_lbin.item_name));
			row.appendChild(th)
		} catch (e) {
			error.innerText = "UNABLE TO FIND LVL 200 PET";
			cont = false;
		}
		
		if(cont) {
			th = document.createElement("th");
			th.appendChild(document.createTextNode("Total Profit"));
			row.appendChild(th)
			
			th = document.createElement("th");
			th.appendChild(document.createTextNode("Coins Per Pet XP"));
			row.appendChild(th);
			
			row = thead.insertRow();
			td = document.createElement("td");
			td.appendChild(document.createTextNode(lvl102_lbin.starting_bid.toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode(lvl200_lbin.starting_bid.toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode((lvl200_lbin.starting_bid - lvl102_lbin.starting_bid).toLocaleString("en-US")));
			row.appendChild(td)
			
			td = document.createElement("td");
			td.appendChild(document.createTextNode(((lvl200_lbin.starting_bid - lvl102_lbin.starting_bid) / 184896600).toFixed(2)));
			row.appendChild(td)
		}
	}
}

function sortByPrice(a, b) {
	if(a.starting_bid < b.starting_bid) { return -1; }
	if(a.starting_bid > b.starting_bid) { return 1; }
	return 0;
}