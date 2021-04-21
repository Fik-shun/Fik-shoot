
function Plane(scene) {
	
	const textureLoader = new THREE.TextureLoader()
	var texMap = textureLoader.load("../../assets/textures/plane.png")
	var modelMaterial = new THREE.MeshBasicMaterial({ map: texMap})

	var modelLoader = new THREE.OBJLoader()

	this.model;
	this.height;
	this.width;

	modelLoader.load
		( 
			"../../assets/models/plane.obj", 
			(function(obj)
			{
				this.model = obj;

				this.model.traverse( function (child) {
						if ( child.isMesh ) {
							child.material = modelMaterial;
						}
					}
				)

				// rotating, scaling down the plane model
				this.model.rotation.x = -Math.PI / 2;
				
				scene.add(this.model);

				var planeBndBox = new THREE.Box3().setFromObject(this.model);
				this.height = planeBndBox.getSize().y;
				this.width = planeBndBox.getSize().x;

			}).bind(this)
		);

	
	this.update = function() {
		if (this.model)
			this.model.position.y += 1;
	}

	this.handleInput = function(keyMap, camera) {
		if (keyMap[87] && this.model.position.y < camera.position.y + camera.top - this.height/2) {
			this.model.position.y += 5;
		}
		if (keyMap[83] && this.model.position.y > camera.position.y + camera.bottom + this.height/2) {
			this.model.position.y -= 5;
		}
		if (keyMap[68] && this.model.position.x < camera.right - this.width/2) {
			this.model.position.x += 5;			
		}
		if (keyMap[65] && this.model.position.x > camera.left + this.width/2) {
			this.model.position.x -= 5;
		}
	}

	this.launchMissile = function() {
        var x = this.model.position.x;
        var y = this.model.position.y + this.height/2;
        const m = new Missile(scene, x, y);

        return m;
	}
}

