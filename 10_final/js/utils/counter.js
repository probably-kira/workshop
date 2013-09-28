define(
	['jquery'],
	function($) {
	
	var counter;

	return {
		init: function() {
			counter = $('<div id="counter">0</div>').appendTo('body');
		},
		update: function() {
			var upd = +counter.text() + 10;
			counter.text(upd)
		}
	}
})