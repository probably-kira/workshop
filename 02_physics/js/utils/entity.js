define(
	['phy'],
	function(phy) {
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
				;

		function init() {
			var bodyDef = phy.bodyDef,
				fixDef = phy.fixDef;
				scale = phy.SCALE,
				self = this;

			fixDef.friction = 0;
			fixDef.restitution = 0;

			bodyDef.type = b2Body.b2_dynamicBody;
			fixDef.shape = new b2PolygonShape;

			bodyDef.position.x = Math.random() * 25;
			bodyDef.position.y = Math.random() * 10;

			fixDef.shape.SetAsBox((self.width / scale) / 2, (self.height / scale) / 2);
			phy.world.CreateBody(bodyDef).CreateFixture(fixDef);	
		}

		function entity() {
			this.init = init;
			//a placeholder
			this.update = function() {};
		}

		function Entity(cfg) {
			var self = this;
			for (key in cfg) {
				self[key] = cfg[key];
			}
			self.init();
		}

		Entity.prototype = new entity();

		return Entity;
})