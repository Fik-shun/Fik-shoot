
function placeEnemies(scene) {

	const theEnemies = [];

	[...Array(24).keys()].map(z => {

		getRandomPositions().map(x => { 
			const e = new Enemy(scene, 2*(x-7), -100*(z+1));
			theEnemies.push(e);
		});
	});

	return theEnemies;
	
	function getRandomPositions() {

		var noEnemies = 1 + Math.floor((Math.random() * 3));	
		
		var arr = [...Array(15).keys()];

		for (let i = arr.length - 1; i > 0; i--) {
		    
		    const j = Math.floor(Math.random() * i);
		    const temp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = temp;
		}

		return arr.slice(0, noEnemies)
    }


}



