define(function(){
		// possibles axis to move the camera
		var AXIS = {
			NONE: "none", 
			HORIZONTAL: "horizontal"
		};

		// Camera constructor
		function Camera(canvasWidth, worldWidth)
		{
			// distance from followed object to border before camera starts move
			this.xDeadZone = 0; // min distance to horizontal borders
			
			// viewport dimensions
			this.wView = canvasWidth;		

			// object that should be followed
			this.followed = null;
			
			// rectangle that represents the viewport
			//this.viewportRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);				
								
			// rectangle that represents the world's boundary (room's boundary)
			//this.worldRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);
			
		}

		// gameObject needs to have "x" and "y" properties (as world(or room) position)
		Camera.prototype.follow = function(hero, xDeadZone, bg)
		{		
			this.hero = hero;
			this.bg = bg;
			this.xDeadZone = xDeadZone;
		}					
		
		Camera.prototype.update = function()
		{
			// keep following the player (or other desired object)
			if(!this.hero) {
				return;
			}

			var hero = this.hero,
				bg = this.bg,
				position = hero._body.GetPosition();

				hero.canMove = false;
				bg.canMove = false;

				if (position.x * 28 < this.xDeadZone / 2) {
					hero.canMove = true;
					bg.canMove = false;
				} else {
					hero.canMove = false;
					bg.canMove = true;
				}

			// update viewportRect
			//this.viewportRect.set(this.xView, this.yView);
			
		}	
		
		return Camera

})