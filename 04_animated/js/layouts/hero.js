define(
	['entity', 'collider'],
	function(Entity, collider) {
		var pressedKeys = [];
		document.addEventListener('keydown', function(e) {
			pressedKeys[e.keyCode] = true;
		});

		document.addEventListener('keyup', function(e) {
			pressedKeys[e.keyCode] = false;
		});

		function detectMotion() {
			if (hero.canJump()) {
				hero.stop();
			}
				// touche "haut"
			if (pressedKeys[38]) {
				hero.jump();
			}

			// touches "gauche" et "droite"
			if (pressedKeys[37]) {

				hero.moveLeft();
			} else if (pressedKeys[39]) {
				hero.moveRight();
			}	
		}


		var hero = new Entity({
			width: 30,
			height: 30,
			posX: 104,
			posY: 104,
			texture: "/textures/Other/bunny.png",
			can: 'all',
			canJump: function() {
				return this._body.GetWorld().heroCanJump
			},
			init: function() {
				this.super.init.apply(this, arguments);
				this._body.SetUserData('hero');
				this._fixture.SetDensity(2);
				this._fixture.SetRestitution(0.2);
				this._fixture.SetFriction(0);
				this._fixture.GetBody().SetFixedRotation(true);

								// Ajouter des "pieds"
				var footDef = new Box2D.Dynamics.b2FixtureDef();
				footDef.friction = 0;
				footDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
				footDef.shape.SetAsOrientedBox(10 / 28, 10 / 28, 
						new Box2D.Common.Math.b2Vec2(0, 7 / 28),	// position par rapport centre du body
						0											// angle d'orientation
				);
				this._fixture.GetBody().CreateFixture(footDef);
			},

			update: function() {
				detectMotion();
				this.super.update.call(this);
			}
		});
		console.log(hero);

		return hero;
	}
);