define(
	['phy', 'pixi', 'Box2D', 'animated'],
	function(phy, PIXI, Box2D, animated) {
		var b2Vec2 = Box2D.Common.Math.b2Vec2
				, b2BodyDef = Box2D.Dynamics.b2BodyDef
				, b2Body = Box2D.Dynamics.b2Body
				, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
				, b2Fixture = Box2D.Dynamics.b2Fixture
				, b2World = Box2D.Dynamics.b2World
				, b2MassData = Box2D.Collision.Shapes.b2MassData
				, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
				, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
				, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
				, scale = phy.SCALE
				;

		var fixDef = new b2FixtureDef;
		var bodyDef = new b2BodyDef;

		//create ground
		bodyDef.type = b2Body.b2_staticBody;

		function createBox(floor) {
			bodyDef.position.x = (floor.x + floor.wholeWidth / 2) / scale,
			bodyDef.position.y = (floor.y + floor.height / 2) /scale ;
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox((floor.wholeWidth  / scale) / 2, (floor.height / scale) / 2);
			var ground = phy.world.CreateBody(bodyDef);

			ground.SetUserData('ground');
			ground.CreateFixture(fixDef);
			return ground;
		}

		return {
			create: createBox,
			world: phy.world
		}
	}
)