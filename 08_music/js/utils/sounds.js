define(
	['jquery', 'loader'],
	function($, loader) {
		var sounds = loader.sounds,
			mute = false;

		function init(hero) {
			sounds.bg.loop(true).volume(0.2).play();
			var ctrl = $('<a href="" id="sound-control">Mute sound</a>')
			ctrl.appendTo($('body'))
				.click(function(e) {
					e.preventDefault();
					mute = !mute;

					if (mute) {
						sounds.bg.mute();
						$(this).text('Unmute sound');
					} else {
						sounds.bg.unmute();
						$(this).text('Mute sound');
					}
					
				});
		}

		return {
			init: init,
			sounds: sounds
		}
	}
)