
function Plane(scene) {
	
	const textureLoader = new THREE.TextureLoader()
	var texMap = textureLoader.load("../../assets/textures/plane.png")
	var modelMaterial = new THREE.MeshBasicMaterial({ map: texMap})

	var modelLoader = new THREE.OBJLoader()

	this.model;
	this.planeBndBox;

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
				this.model.rotation.x = Math.PI / 12;
				this.model.position.z = -10;
				this.model.scale.set(0.01, 0.01, 0.009);
				
				scene.add(this.model);

				this.planeBndBox = new THREE.Box3().setFromObject(this.model);

			}).bind(this)
		);

	
	this.update = function() {
		this.model.position.z -= 0.4;
	}

	this.handleInput = function(keyMap, camera) {
		
		if (keyMap[87]) {
			if (keyMap[16]) {
				this.model.position.z -= 1.5;
				camera.position.z -= 1.5;
			}
			else {
				this.model.position.z -= 1;
				camera.position.z -= 1;
			}
		}
		if (keyMap[83] && this.model.position.z < -1) {
			this.model.position.z += 1;
			camera.position.z += 1;
		}
		if (keyMap[68] && this.model.position.x < 15) {
			this.model.position.x += 0.2;			
			camera.position.x += 0.2;
		}
		if (keyMap[65] && this.model.position.x > -15) {
			this.model.position.x -= 0.2;
			camera.position.x -= 0.2;
		}
	}

	this.launchMissile = function() {

        var x = this.model.position.x;
        var z = this.model.position.z - this.planeBndBox.getSize().z;

        const m = new Missile(scene, x, z);

        return m;
	}
}

