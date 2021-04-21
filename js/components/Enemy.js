
function Enemy(scene, x, z) {
	
	var modelLoader = new THREE.GLTFLoader()
	this.model;

	modelLoader.load
		( 
			"../../assets/models/enemy/enemy.gltf", 
			(function(obj)
			{
				this.model = obj.scene;

				this.model.rotation.y = -Math.PI / 2;
				this.model.rotation.x = Math.PI / 24;

				this.model.position.set(x, 0, z);
				this.model.scale.set(0.0018,0.0018,0.0018);

				scene.add(this.model);
			}).bind(this)
		)

	this.destroy = function() {
		scene.remove(this.model);
	}
}

