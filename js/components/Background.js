
function Background(scene, height) {
	
	const textureLoader = new THREE.TextureLoader()
	
	var geometry = new THREE.PlaneGeometry(3000, 3000)

	var material = new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_dn.png")})

	var bg = new THREE.Mesh(geometry, material)
	bg.rotation.z = -Math.PI / 2;
	bg.position.z = -900;
	bg.position.y = 1000;

	scene.add(bg)
	
	this.update = function() {
	}
}

