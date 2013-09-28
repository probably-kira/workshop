define(
	['Box2D'],
	function(Box2D) {

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
			   
			   var SCALE = 28;

			   var fixDef = new b2FixtureDef;
			   fixDef.density = 1.0;
			   fixDef.friction = 0.5;
			   fixDef.restitution = 0.2;
			 
			   var bodyDef = new b2BodyDef;
			   //create ground
			   bodyDef.type = b2Body.b2_staticBody;

			   // positions the center of the object (not upper left!)
			   bodyDef.position.x = canvas.width / 2 / SCALE;
			   bodyDef.position.y = canvas.height / SCALE;
			   fixDef.shape = new b2PolygonShape;
			   // half width, half height. eg actual height here is 1 unit
			   fixDef.shape.SetAsBox((width / SCALE) / 2, (245 / SCALE) / 2);
			   world.CreateBody(bodyDef).CreateFixture(fixDef);

			   // left edge
			   bodyDef.position.x = 0;
			   bodyDef.position.y = 0;
			   fixDef.shape = new b2PolygonShape;
			   fixDef.shape.SetAsBox((4 / SCALE) / 2, height/SCALE);
			   world.CreateBody(bodyDef).CreateFixture(fixDef);

			   //setup debug draw
			   var debugDraw = new b2DebugDraw();
			   debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
			   debugDraw.SetDrawScale(SCALE);
			   debugDraw.SetFillAlpha(0.5);
			   debugDraw.SetLineThickness(0.2);
			   debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			   world.SetDebugDraw(debugDraw);

		return {
			kUpdate: function() {
				world.Step(
					 1 / 60   //frame-rate
				  ,  10       //velocity iterations
				  ,  10       //position iterations
			   );
			   world.DrawDebugData();
			   world.ClearForces();
			},
			SCALE: SCALE,
			world: world,
			bodyDef: bodyDef,
			fixDef: fixDef
		}
	}
);