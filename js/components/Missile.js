
function Missile(scene, x, z) {
	
	var modelLoader = new THREE.GLTFLoader()
	this.model;

	modelLoader.load
		( 
			"../../Fik-shoot/assets/models/missile/missile.gltf", 
			(function(obj)
			{
				this.model = obj.scene;

				this.model.rotation.x = -Math.PI/2;

				this.model.position.set(x, -0.05, z);
				this.model.scale.set(0.005,0.005,0.005);

				scene.add(this.model);
			}).bind(this)
		)

	this.update = function() {
		this.model.position.z -= 1.75;
	}

	this.destroy = function() {
		scene.remove(this.model);
	}
}

