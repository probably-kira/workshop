define(
	['entity', 'sounds', 'counter'],
	function(Entity, sounds, counter) {
		var scale = 28;

		function detectCollision() {
			if (hero.canJump()) {
				hero.stop();
			}

			if (window.pressedKeys[38]) {
				if(hero.canJump()) {
					sounds.sounds.jump.play()	
				}
				hero.jump();
			}

			if (window.pressedKeys[37]) {
				if (hero.canMove) {
					hero.moveLeft();	
				}
				hero.decreaseDistance();
			} 

			if (window.pressedKeys[39]) {
				if (hero.canMove) {
					hero.moveRight();	
				}
				hero.increaseDistance();
			}

			var flare = hero.catchFlare();
			if (flare) {
				var body = flare.GetBody(),
					flareIndex = flare.GetUserData().index,
					flareSprite = body._sprite.children[body._sprite.children.length - 1],//,
                       flareToDestroy = flareSprite.getChildAt(flareIndex)

				flareToDestroy.alpha = 0
				body.DestroyFixture(flare);
				sounds.sounds.coin.play()
				counter.update()

			}
		}

		var hero = new Entity({
			width: 30,
			height: 30,
			posX: 104,
			posY: 104,
			vector: 0,
			texture: "/textures/Other/bunny.png",
			can: 'all',
			distance: 0,
			canJump: function() {
				return this._body.GetWorld().heroCanJump
			},
			catchFlare: function() {
				return this._body.GetWorld().flare;
			},
			init: function() {
				this.super.init.apply(this, arguments);
				this._body.SetUserData('hero');
				this._fixture.SetDensity(2);
				this._fixture.SetRestitution(0.2);
				this._fixture.SetFriction(0);
				this._fixture.GetBody().SetFixedRotation(true);

				var footDef = new Box2D.Dynamics.b2FixtureDef();
				footDef.friction = 0;
				footDef.userData = 'foot';
				footDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
				footDef.shape.SetAsOrientedBox(10 / 28, 10 / 28, 
						new Box2D.Common.Math.b2Vec2(0, 7 / 28),
						0
				);
				this._fixture.GetBody().CreateFixture(footDef);
				counter.init();
			},

			update: function() {
				detectCollision();
				this.super.update.call(this);
			}
		});

		return hero;
	}
);