
function Coin(scene, x, y) {

	const radius = 20;
	const geometry = new THREE.CircleGeometry( radius, 16 );
	const material = new THREE.MeshBasicMaterial( { color: 0xfbb000 } );
	this.model = new THREE.Mesh( geometry, material );	
	this.model.position.set(x, y, -500);
	
	scene.add(this.model);

	
	this.height = 2*radius;
	this.width = 2*radius;


	this.destroy = function() {
		scene.remove(this.model);
	}
}

