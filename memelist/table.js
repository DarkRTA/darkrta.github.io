async function load() {

timestamp = parseInt(localStorage.timeStamp);
timestamp = isNaN(timestamp) ? 0 : timestamp;

let tablehtml = `<tr><td class="id">ID</td><td class="text">Text</td></tr>`
if ((Date.now() - timestamp) > 3600000) {
	let response = await fetch("https://dark.ski/memebot/238116049554243584");

	let text = document.createElement("div");
	text.innerText = await response.text();
	var memes = text.innerHTML.split("<br>");

	memes.pop();
	var table = document.getElementById("memetable")
	for (let line of memes) {
		let arr = line.split(" ");
		let id = arr.shift();
		let time = arr.shift();
		let text = arr.join(" ").replace("\\n", "\n");

		tablehtml += `<tr><td class="id">${id}</td><td class="text">${text}</td></tr>`
	}


	localStorage.cache = LZString.compressToUTF16(tablehtml);
	localStorage.timeStamp = Date.now();
} else {
	tablehtml = LZString.decompressFromUTF16(localStorage.cache);
}


/*
let response = await fetch("emotes.json");
let emotes   = await response.json();
let replace  = "(?<=[\\ \\>])(?:"
let dict     = {};
for (let emote of emotes) {
	replace += (emote.code + "|");
	if (emote.id == undefined) {
		throw "bad id"
	}
	dict[emote.code] = {
		id: emote.id,
		test: new RegExp(emote.code, "g"),
	};
}
replace = new RegExp(replace.slice(0, -1) + ")(?=[\\ \\<])", "g");

let tests = Object.values(dict);
tablehtml = tablehtml.replace(replace, (match) => {
	let id;
	if (dict[match] == undefined) {
		for (let test of tests) {
			if (match.search(test.test) != -1) {
				id = test.id;
				break;
			}
		}
	} else {
		id = dict[match].id
	}
	return `<img class="emote" src="//static-cdn.jtvnw.net/emoticons/v1/${id}/1.0" alt="${match}" />`
});
*/

document.getElementById("table").innerHTML = tablehtml;

}


load();
