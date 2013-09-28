define(
	['entity'],
	function(Entity) {
		var hero = new Entity({
			width: 30,
			height: 30,
			posX: 84,
			posY: 84,
			texture: "/textures/Other/bunny.png"
		});
		
		return hero;
	}
);