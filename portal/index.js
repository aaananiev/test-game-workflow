requestFile('./dist/game.json',init);
window.addEventListener('load', init);
var initComplete;
var gameJSON;
function init(data) {
	gameJSON = gameJSON || (data instanceof Event ? undefined : data);
	if (initComplete || !window.tierSelect || !gameJSON) {
		return;
	}
	initComplete = true;

	gameJSON = JSON.parse(gameJSON);
	lastWinningTier = lastWinningTier || gameJSON.prize_tiers.length;
	prizeCombinations = prizeCombinations || Object.keys(gameJSON.prize_combinations)
	.sort(function(a,b) {
		if (+a > +b) {
			return -1;
		} else if (+a < +b) {
			return 1;
		}
		return 0;
	})
	.map(function(key) {
		return gameJSON.prize_combinations[key][0];
	});
	for(var tier = 0; tier < lastWinningTier; tier++) {
		var tierOption = document.createElement('option');
		tierOption.value = firstWinningTier + tier;
		tierOption.innerText = 'Tier ' + tierOption.value + ' : ' + gameJSON.prize_tiers[tier].prizes[0].cash / 100;
		if(prizeCombinations[tier]){
			tierOption.innerText+= ' - ' + prizeCombinations[tier];
		}
		tierSelect.appendChild(tierOption);
	}
	var loosingTierOption = document.createElement('option');
	loosingTierOption.value = loosingTier;
	loosingTierOption.innerText = 'Tier ' + loosingTierOption.value + ' : Losing';
	tierSelect.appendChild(loosingTierOption);
	addListeners();
	urlParams = [];
}
function requestFile (src,callback) {
	function reqListener () {
		if (typeof callback === 'function') {
			callback(this.responseText);
		}
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", src);
	oReq.send();
}
function addListeners() {
	randomSeed.addEventListener('click', function() {
		seedSelect.value = randomInt(1,100000000);
	});
	disableInterruptionsLbl.addEventListener('click', function() {
		disableInterruptions.checked = !disableInterruptions.checked;
		disableInterruptions.dispatchEvent(new Event('change'));
	});
	function configureInterruptions() {
		if (this.checked) {
			addURLparams('channel=MOBILE');
		} else {
			removeURLparams('channel=MOBILE');
		}
	}
	disableInterruptions.addEventListener('change', configureInterruptions);
	start.addEventListener('click', function() {
		// On iOS the parameters may be remembered from the previous game
		urlParams = [];
		configureInterruptions.apply(disableInterruptions);
		addURLparams([
			'mode=' + modeSelect.options[modeSelect.selectedIndex].value,
			'lang=' + langSelect.options[langSelect.selectedIndex].value,
			'tier=' + tierSelect.options[tierSelect.selectedIndex].value,
			'seed=' + seedSelect.value
			]);
		var iframeLocation = iframeVendor.options[iframeVendor.selectedIndex].value;

		var url = gameURL;

		if (iframeLocation) {
			url = iframeURL + iframeLocation + '?gameUrl=' + url;
		}
		if (urlParams.length && iframeLocation) {
			url = url.replace(/\?$/,'&');
		}
		location.href = url + urlParams.join('&');
	});

}
function addURLparams (params) {
	params = [].concat(params);
	for(var i = 0; i < params.length; i++) {
		if (urlParams.indexOf(params[i]) === -1) {
			urlParams.push(params[i]);
		}
	}
}
function removeURLparams (params) {
	params = [].concat(params);
	for(var i = 0; i < params.length; i++) {
		var paramIndex = urlParams.indexOf(params[i]);
		if (paramIndex >= 0) {
			urlParams.splice(paramIndex,1);
		}
	}
}
function randomInt(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
