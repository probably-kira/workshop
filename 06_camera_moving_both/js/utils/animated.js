define(
	['Box2D'],
	function(Box2D) {
		var scale = 28,
			distancePerFrame = null;

		function detectDistancePerFrame(obj) {
			var prevPoint = obj._body.GetPosition().x;
			detectDistancePerFrame = function(body) {
				distancePerFrame = obj._body.GetPosition().x - prevPoint;
				obj.distance = obj._body.GetPosition().x;
				return distancePerFrame;
			}

			return 0;
		}

		var availableActions = {
			jump : function() {
				if (this.canJump()) {
					this._body.ApplyImpulse(
							new Box2D.Common.Math.b2Vec2(0, -12),
		                    this._body.GetWorldCenter());
				}
			},

			increaseDistance: function() {
				if (distancePerFrame) {
					this.distance += distancePerFrame;//in points	
				} else {
					detectDistancePerFrame(this);
				}
				this.vector = 1
			},

			decreaseDistance: function() {
				if (distancePerFrame) {
					this.distance -= distancePerFrame;//in points	
				}
				this.vector = -1;
			},
			
			moveRight : function() {
				var vel = this._body.GetLinearVelocity();
				vel.x = 140 / scale;
			},
			
			/**
			 * Effectuer un déplacement vers la gauche
			 */
			moveLeft : function() {
				var vel = this._body.GetLinearVelocity();
				vel.x = -140 / scale;
			},

			stop: function() {
				this._body.GetLinearVelocity().x = 0;
				this.vector = 0;
			}
		}

		return availableActions;
	});