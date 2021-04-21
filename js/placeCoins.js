
function placeCoins(scene) {

	const theCoins = [];
	[...Array(10).keys()].map(z => {

		getRandomPositions().map(x => { 
			const c = new Coin(scene, (x-7), -100*(z+1));
			theCoins.push(c);
		});

	});

	return theCoins;

	function getRandomPositions() {

		var noCoins = Math.floor((Math.random() * 6));	
		
		var arr = [...Array(15).keys()];

		for (let i = arr.length - 1; i > 0; i--) {
		    
		    const j = Math.floor(Math.random() * i);
		    const temp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = temp;
		}

		return arr.slice(0, noCoins)
    }

}



