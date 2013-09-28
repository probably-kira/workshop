define(
	['pixi', 'howler'],
	function( PIXI, howler ) {
		var images = new PIXI.AssetLoader([
			"/textures/Walkways/walkway2W.png",
			"/textures/Other/far_background.png",
			"/textures/Other/bunny.png"
			]);

		var loaded = 0;

		var sounds = {};

		images.onComplete = function() {
			loaded ++;
			checkIfCompleted();
		}

		function soundsLoad() {
			var soundList = ["bg.mp3", 'jump.mp3', 'coin.mp3'],
				loadedSounds = 0;
			soundList.forEach(function(sound) {
				var name = sound.split('.')[0]
				sounds[name] = new howler.Howl({
					urls: ['/sounds/' + sound],
					onload: function() {
						loadedSounds ++;
						console.log(name + ' loaded, ' + loadedSounds + ' soudns loaded')
						if (loadedSounds == soundList.length) {
							loaded ++;
							checkIfCompleted();
						}
					}
				})
			})
		}

		function checkIfCompleted() {
			if (loaded == 2) {
				console.log('everything loaded');
				loader.onComplete()
			}
		}


		var loader = {
			load: function() {
				var buff = images.load();
				soundsLoad();
			},
			onComplete: function() {

			},
			sounds: sounds
		}

		return loader;
	}
);