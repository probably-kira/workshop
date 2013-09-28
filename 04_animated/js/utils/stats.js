define(
	['Stats'],
	function() {
			var container = document.createElement("div");
			container.id="stats-container"
			document.body.appendChild(container);
			
			var stats = new Stats();
			container.appendChild(stats.domElement);

		return {
			kUpdate: function() { return stats.update() }
		}
	}
)