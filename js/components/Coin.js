
function Coin(scene, x, z) {

	const radius = 0.2;
	const geometry = new THREE.SphereGeometry( radius, 16, 16 );
	const material = new THREE.MeshBasicMaterial( { color: 0xfbb000 } );
	this.model = new THREE.Mesh( geometry, material );	
	this.model.position.set(x, 0, z);
	
	scene.add(this.model);

	this.destroy = function() {
		scene.remove(this.model);
	}
}

