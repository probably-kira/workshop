define(
	['Box2D'],
	function(Box2D) {

		var availableActions = {
			jump : function() {
				if (this.canJump()) {
					this._body.ApplyImpulse(
							new Box2D.Common.Math.b2Vec2(0, -12),
		                    this._body.GetWorldCenter());
				}
			},
			
			moveRight : function() {
				var vel = this._body.GetLinearVelocity();
				vel.x = 140 / 28;
			},
			
			/**
			 * Effectuer un déplacement vers la gauche
			 */
			moveLeft : function() {
				var vel = this._body.GetLinearVelocity();
				vel.x = -140 / 28;
			},
			stop: function() {
				this._body.GetLinearVelocity().x = 0
			}
		}

		return availableActions;
	});