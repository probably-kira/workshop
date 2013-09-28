requirejs.config({
	baseUrl: 'js/libs',
	shim: {
		Box2D: {
			exports: 'Box2D'
		}
	},
	paths: {
		hero: '../layouts/hero',
		phy: '../utils/box2dweb_definitions',
		stats: '../utils/stats',
		entity: '../utils/entity'
	}
});

require(
	['phy','hero', 'stats'],
	function(phy, hero, stats) {
		if (!window.requestAnimationFrame) 
		{
			window.requestAnimationFrame = (function() {
				return window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
			})();
		}

		function start() {
			requestAnimationFrame( animate );

			function animate() {
				phy.kUpdate();
        		stats.kUpdate();
				requestAnimationFrame(animate);
			}	
		}

		start();

	}
);