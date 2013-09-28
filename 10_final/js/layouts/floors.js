define(
	['box', 'animated'],
	function(box, animated) {

	var scale = 28,
		floors = [
			{
				x: 2000,
				y: 110,
				width: 1
			},
			{
				x: 250,
				y: 250,
				width: 2
			},
			{
				x: 1400,
				y: 450,
				width: 3
			},
			{
				x: 1800,
				y: 250,
				width: 1
			},
			{
				x: 1050,
				y: 350,
				width: 4
			},
			{
				x: 700,
				y: 150,
				width: 3
			},
			{
				x: 800,
				y: 50,
				width: 1
			}
		]

	function createFloor(floor) {
		var leftEdgeT = PIXI.Texture.fromImage("/textures/Walkways/Walkway1W.png"),
			middleT = PIXI.Texture.fromImage("/textures/Walkways/Walkway2W.png"),
			rightEdgeT = PIXI.Texture.fromImage("/textures/Walkways/Walkway1E.png");	

		// create a tiling sprite..
		// requires a texture, width and height
		// to work in webGL the texture size must be a power of two
		var leftEdge = new PIXI.Sprite(leftEdgeT, 128, 128),
			rightEdge = new PIXI.Sprite(rightEdgeT, 128, 128);
			middle = new PIXI.TilingSprite(middleT, floor.width * 128, 128);

		middle.__shift = floor.width * 128;

		var _floor = new PIXI.DisplayObjectContainer();

		var shift = 0;
		[leftEdge, middle, rightEdge].forEach(function(block) {
			_floor.addChild(block);
			block.position.x += shift;
			shift += block.__shift || block.texture.width;
		})

		var _flares = new PIXI.DisplayObjectContainer();
		for (var i = 0; i < floor.width; i ++) {
			var flareT = new PIXI.Texture.fromImage('/textures/Other/Flare.png'),
				flare = new PIXI.Sprite(flareT, 256, 256),
				flareShift = floor.width * 128 / 2;


			flare.position = {
				x: flareShift + i * 60,
				y: -128 - 40
			}
			_flares.addChild(flare);
		}

		_floor.addChild(_flares);
		return _floor;
	}

	//let's divide interactve screens and collect values
	var screens = [0],
		layouts = {0: []}

	var currentScreen = 0,
		b2Vec2 = Box2D.Common.Math.b2Vec2;

	return {
		init: function(stage) {
			var allFloors = new PIXI.DisplayObjectContainer();
	        floors.forEach(function(floor) {
	        	var _floor = createFloor(floor), //return PIXI element
	        		floorScale = .5,
	        		wholeFloorWidth = ((floor.width * 128) + (128 * 2)) * floorScale;

	       		floor.wholeWidth = wholeFloorWidth;
	       		floor.height = 128 * floorScale;
	       		allFloors.addChild(_floor);

	       		var body = box.create(floor);

	        	floor._body = body; //return box2d body

	        	body._sprite  = _floor;
	        	floor._sprite = _floor;

	        	_floor.position = {
					x: floor.x,
					y: floor.y
				}

				_floor.scale = {
					x: floorScale,
					y: floorScale
				}
	        });
	        stage.addChild(allFloors);
	        this.canvas = allFloors;
		},
		update: function(){},

		moveLeft: function() {
			var self = this;
			floors.forEach(function(floor) {
				var pos = floor._body.GetPosition(),
					shift = pos.x + animated.heroProps.distancePerFrame;

				floor._body.SetPosition(new b2Vec2(shift, pos.y))
				self.updateSprite(floor)
			})
		},
		moveRight: function() {
			var self = this;
			floors.forEach(function(floor) {
				var pos = floor._body.GetPosition(),
					shift = pos.x - animated.heroProps.distancePerFrame;
				floor._body.SetPosition(new b2Vec2(shift, pos.y))
				self.updateSprite(floor)
			})
		},

		updateSprite: function(floor) {
			var sprite = floor._sprite,
				position = floor._body.GetPosition() 
			sprite.position.x = (position.x * scale) - (floor.wholeWidth / 2);
            sprite.position.y = (position.y * scale) - (floor.height / 2);
		}
	}
})