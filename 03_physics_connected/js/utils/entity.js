define(
	['phy', 'pixi', 'Box2D'],
	function(phy, PIXI, Box2D) {
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

		function addNature() {
			var bodyDef = phy.bodyDef,
				fixDef = phy.fixDef,
				self = this;

			fixDef.friction = 1;
			fixDef.restitution = 0;

			bodyDef.type = b2Body.b2_dynamicBody;
			fixDef.shape = new b2PolygonShape;

			bodyDef.position.x = self.posX / scale;
			bodyDef.position.y = self.posY / scale;

			fixDef.shape.SetAsBox((self.width / scale) / 2, (self.height / scale) / 2);

			return {
				bodyDef: bodyDef,
				fixDef: fixDef
			}
		}

		function addSprite() {
			var self = this,
				texture = PIXI.Texture.fromImage(self.texture),
				sprite = new PIXI.Sprite(texture);

		        sprite.position = {
		                x: self.posX,
		                y: self.posY
		        }

			return sprite;
		}

		function init(stage) {
			var nature = addNature.call(this),
				sprite = addSprite.call(this),
				body = phy.world.CreateBody(nature.bodyDef);

			body.CreateFixture(nature.fixDef);
			stage.addChild(sprite);	

			this._body = body;
			this._sprite = sprite;
		}

		function update() {
            var body = this._body,
            	position = body.GetPosition(),
            	sprite = this._sprite;
            sprite.position.x = (position.x * scale) - (sprite.width / 2);
            sprite.position.y = (position.y * scale) - (sprite.height / 2);
            sprite.rotation = body.GetAngle();
		}


		function entity() {
			this.init = init;
			this.update = update;
		}

		function Entity(cfg) {
			var self = this;
			for (key in cfg) {
				self[key] = cfg[key];
			}
		}

		Entity.prototype = new entity();

		return Entity;
})