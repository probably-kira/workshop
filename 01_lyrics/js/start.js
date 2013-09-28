requirejs.config({
	baseUrl: 'js/libs',
	shim: {
		pixi: {
			exports: 'PIXI'
		}
	},
	paths: {
		bg: '../layouts/bg',
		hero: '../layouts/hero',
		loader: '../utils/loader',
		stats: '../utils/stats'
		
	}
});

require(
	['pixi', 'stats', 'loader', 'bg', 'hero'],
	function(PIXI, stats, loader, bg, hero) {

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

			bg.rStart(stage);
			hero.rStart(stage);
			
			function animate() {
				requestAnimFrame(animate);
				bg.rAnimate();
				stats.kUpdate();
				
				// render the stage   
				renderer.render(stage);
			}	
		}

		loader.onComplete = Start;
		loader.load()

	}
);