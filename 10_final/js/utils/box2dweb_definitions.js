define(
	['Box2D', 'collider'],
	function(Box2D, collider) {

		var canvas = document.getElementById("canvas");
			width = window.innerWidth,
			height = window.innerHeight
		canvas.width = width;
		canvas.height = height;

		var ctx = canvas.getContext("2d");

		var world;
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
			 
			   world = new b2World(
					 new b2Vec2(0, 10)    //gravity
				  ,  true                 //allow sleep
			   );

			   collider.addContactListener(world);
			   
			   var SCALE = 28;

			   var fixDef = new b2FixtureDef;
			 
			   var bodyDef = new b2BodyDef;
			   //create ground
			   bodyDef.type = b2Body.b2_staticBody;


			   // positions the center of the object (not upper left!)
				bodyDef.position.x = canvas.width / 2 / SCALE;
				bodyDef.position.y = canvas.height / SCALE;
				fixDef.shape = new b2PolygonShape;
				fixDef.shape.SetAsBox((width / SCALE) / 2, (245 / SCALE) / 2);

			   var ground = world.CreateBody(bodyDef);
			   ground.SetUserData('ground');
			   ground.CreateFixture(fixDef);

			   // left edge
			   bodyDef.position.x = 0;
			   bodyDef.position.y = 0;
			   fixDef.shape = new b2PolygonShape;
			   fixDef.shape.SetAsBox((4 / SCALE) / 2, height/SCALE);
			   world.CreateBody(bodyDef).CreateFixture(fixDef);

		return {
			kUpdate: function() {
				world.Step(
					 1 / 60   //frame-rate
				  ,  10       //velocity iterations
				  ,  10       //position iterations
			   );
			   world.ClearForces();
			},
			SCALE: SCALE,
			world: world,
			bodyDef: bodyDef,
			fixDef: fixDef
		}
	}
);