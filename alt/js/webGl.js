if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container = $("header");

			var camera, scene, renderer;
			var cameraCube, sceneCube;

			var mesh, zmesh, lightMesh, geometry;
			var spheres = [];

			var directionalLight, pointLight;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			document.addEventListener( 'mousemove', onDocumentMouseMove, false );

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
				camera.position.z = 2200;

				cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

				scene = new THREE.Scene();
				sceneCube = new THREE.Scene();


				var geometry = new THREE.SphereGeometry( 100, 32, 16 );

				var path = "img/webgl/";
				var format = '.jpg';
				var urls = [
						path + 'posx' + format, path + 'negx' + format,
						path + 'posy' + format, path + 'negy' + format,
						path + 'posz' + format, path + 'negz' + format
					];


				var textureCube = THREE.ImageUtils.loadTextureCube( urls );
				textureCube.format = THREE.RGBFormat;

//				var shader = THREE.FresnelShader;
//				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
//
//				uniforms[ "tCube" ].value = textureCube;
//
//				var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms };
//				var material = new THREE.ShaderMaterial( parameters );
//
//				for ( var i = 0; i < 500; i ++ ) {
//
//					var mesh = new THREE.Mesh( geometry, material );
//
//					mesh.position.x = Math.random() * 10000 - 5000;
//					mesh.position.y = Math.random() * 10000 - 5000;
//					mesh.position.z = Math.random() * 10000 - 5000;
//
//					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
//
//					scene.add( mesh );
//
//					spheres.push( mesh );
//
//				}

				scene.matrixAutoUpdate = false;
                
//                // Text
//                
//                var material = new THREE.MeshPhongMaterial({
//                color: 0xdddddd
//                });
//                
//                var textGeom = new THREE.TextGeometry( 'n', {
//                size: 2000, height: 70, curveSegments: 3,
//                font: 'janda manatee solid', weight: 'normal',
//                bevelThickness:  10, bevelSize: 10, bevelEnabled: true
//                });
//                
//                var textMesh = new THREE.Mesh( textGeom, material );
//                
//                textGeom.computeBoundingBox();
//                var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
//    
//                textMesh.position.set( -0.5 * textWidth, 100, 0 );
//
//                scene.add( textMesh );
                
                // model
                // texture

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};

				// model
				var loader = new THREE.OBJLoader( manager );
				loader.load( 'img/versuch.obj', function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							//child.material.map = texture;

						}

					} );

					object.position.x = 50;
                    //object.rotation.x = 20* Math.PI / 180;
                    //object.rotation.z = 20* Math.PI / 180;
                    object.scale.x = 2;
                    object.scale.y = 2;
                    object.scale.z = 2;
                    obj = object
					scene.add( obj );

				} );
				//
                
                
                var light = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
				// Skybox

				var shader = THREE.ShaderLib[ "cube" ];
				shader.uniforms[ "tCube" ].value = textureCube;

				var material = new THREE.ShaderMaterial( {

					fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: shader.uniforms,
					side: THREE.BackSide

				} ),

				mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
				sceneCube.add( mesh );

				//

				renderer = new THREE.WebGLRenderer( { antialias: false } );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.autoClear = false;
				container.append( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				cameraCube.aspect = window.innerWidth / window.innerHeight;
				cameraCube.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) * 10;
				mouseY = ( event.clientY - windowHalfY ) * 10;

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				var timer = 0.0001 * Date.now();

				camera.position.x += ( mouseX - camera.position.x ) * .05;
				camera.position.y += ( - mouseY - camera.position.y ) * .05;

				camera.lookAt( scene.position );

				cameraCube.rotation.copy( camera.rotation );

				

				renderer.clear();
				renderer.render( sceneCube, cameraCube );
				renderer.render( scene, camera );

			}

		