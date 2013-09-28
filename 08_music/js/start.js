requirejs.config({
	baseUrl: 'js/libs',
	shim: {
		Box2D: {
			exports: 'Box2D'
		},
		pixi: {
			exports: 'PIXI'
		},
		underscore: {
			exports: '_'
		},
		howler: {
			exports: 'howler'
		},
		jquery: {
			exports: '$'
		}
	},
	paths: {
		hero: '../layouts/hero',
		phy: '../utils/box2dweb_definitions',
		stats: '../utils/stats',
		entity: '../utils/entity',
		bg: '../layouts/bg',
		loader: '../utils/loader',
		animated: '../utils/animated',
		collider: '../utils/collider',
		camera: '../layouts/camera',
		floors: '../layouts/floors',
		box: '../utils/box',
		sounds: '../utils/sounds'
	}
});

require(
	['phy', 'hero', 'stats', 'pixi', 'bg', 'loader', 'camera', 'sounds'],
	function(phy, hero, stats, PIXI, bg, loader, camera, sounds) {

		// create an new instance of a pixi stage
		var stage = new PIXI.Stage(0x66FF99),
			height = window.innerHeight,
			width = window.innerWidth;

		camera = new camera(width, 3000);

		function Start() {
			// create a renderer instance
			var renderer = PIXI.autoDetectRenderer(width, height);
			
			// add the renderer view element to the DOM
			document.body.appendChild(renderer.view);
			window.pressedKeys = [];

			document.addEventListener('keydown', function(e) {
				pressedKeys[e.keyCode] = true;
			});

			document.addEventListener('keyup', function(e) {
				pressedKeys[e.keyCode] = false;
			});

			requestAnimFrame( animate );

			bg.kStart(stage);
			hero.init(stage);
			sounds.init(hero);
			//floors.init(stage);

			camera.follow(hero, bg,  (width / 3 - 250), width / 3);

			function animate() {
				requestAnimFrame(animate);
				phy.kUpdate();

				camera.update();
				bg.update();
				hero.update();
				//floors.update(hero.distance)

				stats.kUpdate();
				
				// render the stage   
				renderer.render(stage);
			}	
		}

		loader.onComplete = Start;
		loader.load()
	}
);