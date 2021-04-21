
function Skybox(scene, height) {
	
	const textureLoader = new THREE.TextureLoader()
	
	var geometry = new THREE.CubeGeometry(3000, 3000, 3000)

	var cubeMaterials = 
	[
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_ft.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_bk.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_up.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_dn.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_rt.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/ulukai/corona_lf.png"), side: THREE.DoubleSide }),
	]
	var material = new THREE.MeshFaceMaterial(cubeMaterials)

	var cube = new THREE.Mesh(geometry, material)

	cube.rotation.x = Math.PI / 2;
	cube.position.z = -1490;
	// bg.position.y = 1000;

	scene.add(cube)

}

