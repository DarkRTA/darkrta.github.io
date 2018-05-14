function detectBtn() {
	var msg = document.getElementById("msgBox").value;
	document.getElementById("resultBox").value =  bayes.classify(msg);
}


function apeBtn() {
	var msg = document.getElementById("msgBox").value;
	bayes.train(msg, "ape");
	save();
	document.getElementById("resultBox").value =  "marked as ape"
}

function notapeBtn() {
	var msg = document.getElementById("msgBox").value;
	bayes.train(msg, "not an ape");
	save();
	document.getElementById("resultBox").value =  "marked as not an ape";
}

function resetBtn() {
	bayes.fromJSON(JSON.parse('{"cats":{},"words":{}}'));
}

function save() {
	var json = JSON.stringify(bayes.toJSON());
	localStorage.setItem("training", json); 
}

function importBtn(event) {
	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		try {
			var json = JSON.parse(reader.result);
      bayes.fromJSON(json);
			document.getElementById("resultBox").value =  "training data imported";
		}
		catch(err) {
			document.getElementById("resultBox").value =  "error reading training data";
		}
	};
	reader.readAsText(input.files[0]);
}

function exportBtn() {
	var json = JSON.stringify(bayes.toJSON());
	var data = 'data:application/json;charset=utf-8,'+ encodeURIComponent(json);
	var link = document.createElement('a');
	link.setAttribute('href', data);
	link.setAttribute('download', "trainingdata.json");
	link.click();
	link.parentNode.removeChild(link);
	document.getElementById("resultBox").value =  "training data exported";
}



var bayes = new classifier.Bayesian({
	thresholds: {
		ape: 2,
		"not an ape": 1
	},
	default: "cannot be determined"
});

bayes.fromJSON(JSON.parse(localStorage.getItem("training")))
