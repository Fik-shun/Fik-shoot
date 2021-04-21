
function placeEnemies(scene) {

	const theEnemies = [];

	[...Array(5).keys()].map(z => {

		getRandomPositions().map(x => { 
			const e = new Enemy(scene, 2*(x-4), -200*(z+1));
			theEnemies.push(e);
		});
	});

	return theEnemies;
	
	function getRandomPositions() {

		var noEnemies = Math.floor((Math.random() * 4));	
		
		var arr = [...Array(9).keys()];

		for (let i = arr.length - 1; i > 0; i--) {
		    
		    const j = Math.floor(Math.random() * i);
		    const temp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = temp;
		}

		return arr.slice(0, noEnemies)
    }


}



