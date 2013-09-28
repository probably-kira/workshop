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

		function isFoot (object) {
			if(!!object) {
				return object.GetUserData() == 'foot'
			}
		}

		function isFlare(object) {
			if(!!object) {
				return object.GetUserData()  && object.GetUserData().type == 'flare'
			}	
		}

		var collider = {
			addContactListener: function(world) {
				//Add listeners for contact
				var listener = new  Box2D.Dynamics.b2ContactListener;
				
				listener.BeginContact = function(contact) {
					var obj1 = contact.GetFixtureA();
					var obj2 = contact.GetFixtureB();

					if (isFoot(obj1) || isFoot(obj2)) {
						if (isGround(obj1) || isGround(obj2)) {			
							world.heroCanJump = true;
						}
					}

					if (isHero(obj1) || isHero(obj2)) {
						if (isFlare(obj1) || isFlare(obj2)) {
							if (isFlare(obj1)) {
								world.flare = obj1;
							} else {
								world.flare = obj2;
							}		
							
						}
					}
				}

				listener.EndContact = function(contact) {
					var obj1 = contact.GetFixtureA();
					var obj2 = contact.GetFixtureB();
					if (isFoot(obj1) || isFoot(obj2)) {
						if (isGround(obj1) || isGround(obj2)) {
							world.heroCanJump = false;
						}
					}

					if (isHero(obj1) || isHero(obj2)) {
						if (isFlare(obj1) || isFlare(obj2)) {		
							world.flare = null;
						}
					}
				}

				world.SetContactListener(listener);
			}
		}

		return collider;
	}
)