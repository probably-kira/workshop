define(function(){
		// possibles axis to move the camera
		var AXIS = {
			NONE: "none", 
			HORIZONTAL: "horizontal"
		};

		var scale = 28;

		// Camera constructor
		function Camera(canvasWidth, worldWidth)
		{
			// distance from followed object to border before camera starts move
			this.xDeadZone = 0; // min distance to horizontal borders
			
			// viewport dimensions
			this.cView = canvasWidth;
			this.distance = 0;

			// object that should be followed
			this.followed = null;
			
			// rectangle that represents the viewport
			//this.viewportRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);				
								
			// rectangle that represents the world's boundary (room's boundary)
			//this.worldRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);
			
		}

		// gameObject needs to have "x" and "y" properties (as world(or room) position)
		Camera.prototype.follow = function(hero, bg, deadZoneLeft, deadZoneRight)
		{		
			this.hero = hero;
			this.bg = bg;
			this.deadZone = {
				left: deadZoneLeft,
				right: deadZoneRight
			};

console.log(this.deadZone)		
		}					


		Camera.prototype.update = function()
		{
			// keep following the player (or other desired object)
			if(!this.hero) {
				return;
			}

			var hero = this.hero,
				bg = this.bg,
				position = hero._body.GetPosition(),
				scaledPosition = position.x * 28;


				hero.canMove = false;
				bg.canMove = false;

				//hero distance stored in points
				if (hero.distance * 28 < this.deadZone.left) {
					//we near left edge, we can move
					hero.canMove = true;
					bg.canMove = false;
				} else {
					//go back
					if (scaledPosition < this.deadZone.left) {
						if (hero.vector < 0) {
							hero.canMove = false;
							bg.canMove = true;	
						} else {
							hero.canMove = true;
							bg.canMove = false;		
						}
					}

					if (scaledPosition > this.deadZone.left && scaledPosition < this.deadZone.right) {
						hero.canMove = true;
						bg.canMove = false;
					}

					if (scaledPosition > this.deadZone.right) {
						if(hero.vector < 0) {
							hero.canMove = true;
							bg.canMove = false;							
						} else {
							hero.canMove = false;
							bg.canMove = true;	
						}

					}
				}
		}	
		
		return Camera

})