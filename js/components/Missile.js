
function Missile(scene, x, y) {
	
	var modelLoader = new THREE.GLTFLoader()
	this.model;
	this.height;
	this.width;

	modelLoader.load
		( 
			"../../assets/models/missile/missile.gltf", 
			(function(obj)
			{
				this.model = obj.scene;

				// this.model.rotation.x = Math.PI / 2;
				this.model.rotation.y = -Math.PI;

				this.model.position.set(x, y, -100);
				this.model.scale.set(0.5,0.5,0.5);

				scene.add(this.model);
				var missileBndBox = new THREE.Box3().setFromObject(this.model);
				this.height = missileBndBox.getSize().y;
				this.width = missileBndBox.getSize().x;
			}).bind(this)
		)

	this.update = function() {
		if (this.model)
			this.model.position.y += 10;
	}
	this.destroy = function() {
		scene.remove(this.model);
	}
}

