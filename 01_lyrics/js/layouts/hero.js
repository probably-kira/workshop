define(
    ['pixi'],
    function( PIXI ) {
        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("/textures/Other/bunny.png");
        // create a new Sprite using the texture
        var hero = new PIXI.Sprite(texture);

        function rStart(stage) {
            hero.position = {
                x: 200,
                y: function() {return window.innerHeight - 155}()
            }

            stage.addChild(hero);
        }

        hero.rStart = rStart;

        return hero;
    }
);