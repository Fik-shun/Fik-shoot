
function Enemy(scene, x, y) {
	
	var modelLoader = new THREE.GLTFLoader()
	this.model;
	this.height;
	this.width;

	modelLoader.load
		( 
			"../../assets/models/enemy/enemy.gltf", 
			(function(obj)
			{
				this.model = obj.scene;

				this.model.rotation.x = Math.PI / 2;
				this.model.rotation.y = -Math.PI / 2;

				this.model.position.set(x, y, -100);
				this.model.scale.set(0.2,0.2,0.2);

				scene.add(this.model);
				var enemyBndBox = new THREE.Box3().setFromObject(this.model);
				this.height = enemyBndBox.getSize().y;
				this.width = enemyBndBox.getSize().x;
			}).bind(this)
		)

	this.destroy = function() {
		scene.remove(this.model);
	}
}

