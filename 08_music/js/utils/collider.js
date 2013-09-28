define(
	['Box2D'],
	function(Box2D) {
		function isHero(object) {
			if (!!object) {
				return object.GetBody().GetUserData() == 'hero';
			}
		}

		function isGround (object) {
			if (!!object) {
				return object.GetBody().GetUserData() == 'ground';
			}
		}

		var collider = {
			addContactListener: function(world) {
				//Add listeners for contact
				var listener = new  Box2D.Dynamics.b2ContactListener;
				
				listener.BeginContact = function(contact) {
					var obj1 = contact.GetFixtureA();
					var obj2 = contact.GetFixtureB();

					if (isHero(obj1) || isHero(obj2)) {
						if (isGround(obj1) || isGround(obj2)) {			
							world.heroCanJump = true;
						}
					}
				}

				listener.EndContact = function(contact) {
					var obj1 = contact.GetFixtureA();
					var obj2 = contact.GetFixtureB();
					if (isHero(obj1) || isHero(obj2)) {
						if (isGround(obj1) || isGround(obj2)) {
							world.heroCanJump = false;
						}
					}
				}

				world.SetContactListener(listener);
			}
		}

		return collider;
	}
)