
/**
 * 
 * @param {WebGlRenderer} renderer 自定义类型
 * @param {string} path 指向目录/, 'assets/mary/
 * @param {string} name OBJ的名字, 没有后缀 'Marry'
 */
function loadOBJ(renderer, path, name) {

	// three.js library type
	const manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};

	function onProgress(xhr) {
		if (xhr.lengthComputable) {
			const percentComplete = xhr.loaded / xhr.total * 100;
			console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
		}
	}
	function onError() { }

	new THREE.MTLLoader(manager)
		.setPath(path)
		.load(name + '.mtl', function (materials) { // load material first 
			materials.preload();
			new THREE.OBJLoader(manager)
				.setMaterials(materials) // set material <<<<------------------------------
				.setPath(path)
				.load(name + '.obj', function (object) { // load object
					object.traverse(function (child) { // for each mesh 
						if (child.isMesh) { 
							let geo = child.geometry; // mesh geometry
							let mat; // the material of this mesh 
							if (Array.isArray(child.material)) mat = child.material[0];
							else mat = child.material;
							
							// indeces buffer  ?
							var indices = Array.from({ length: geo.attributes.position.count }, (v, k) => k);
							let mesh = new Mesh({ name: 'aVertexPosition', array: geo.attributes.position.array },
								{ name: 'aNormalPosition', array: geo.attributes.normal.array },
								{ name: 'aTextureCoord', array: geo.attributes.uv.array },
								indices);

							let colorMap = null;
							// 绑定image 到opengl texture
							if (mat.map != null) colorMap = new Texture(renderer.gl, mat.map.image);  // 
							// MARK: You can change the myMaterial object to your own Material instance

							// let textureSample = 0;
							// let myMaterial;
							// if (colorMap != null) {
							// 	textureSample = 1;
							// 	myMaterial = new Material({
							// 		'uSampler': { type: 'texture', value: colorMap },
							// 		'uTextureSample': { type: '1i', value: textureSample },
							// 		'uKd': { type: '3fv', value: mat.color.toArray() }
							// 	},[],VertexShader, FragmentShader);
							// }else{
							// 	myMaterial = new Material({
							// 		'uTextureSample': { type: '1i', value: textureSample },
							// 		'uKd': { type: '3fv', value: mat.color.toArray() }
							// 	},[],VertexShader, FragmentShader);
							// }
							let myMaterial = new PhongMaterial(mat.color.toArray(), colorMap , mat.specular.toArray(),renderer.lights[0].entity.mat.intensity);
			
							let meshRender = new MeshRender(renderer.gl, mesh, myMaterial);
							renderer.addMesh(meshRender);
						}
					});
				}, onProgress, onError);
		});
}
