requirejs.config({
	baseUrl: 'js/libs',
	shim: {
		Box2D: {
			exports: 'Box2D'
		},
		pixi: {
			exports: 'PIXI'
		}
	},
	paths: {
		hero: '../layouts/hero',
		phy: '../utils/box2dweb_definitions',
		stats: '../utils/stats',
		entity: '../utils/entity',
		bg: '../layouts/bg',
		loader: '../utils/loader',
	}
});

require(
	['phy', 'hero', 'stats', 'pixi', 'bg', 'loader'],
	function(phy, hero, stats, PIXI, bg, loader) {


		// create an new instance of a pixi stage
		var stage = new PIXI.Stage(0x66FF99),
			height = window.innerHeight,
			width = window.innerWidth;

		function Start() {
			// create a renderer instance
			var renderer = PIXI.autoDetectRenderer(width, height);
			
			// add the renderer view element to the DOM
			document.body.appendChild(renderer.view);
			requestAnimFrame( animate );

			bg.kStart(stage);
			hero.init(stage)

			function animate() {
				requestAnimFrame(animate);
				phy.kUpdate();

				bg.kAnimate();
				hero.update();
				stats.kUpdate();
				
				// render the stage   
				renderer.render(stage);
			}	
		}

		loader.onComplete = Start;
		loader.load()

	}
);