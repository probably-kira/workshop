define(
	['jquery'],
	function($) {
	
	var counter;

	return {
		init: function() {
			counter = $('<div id="counter">0</div>').appendTo('body');
		},
		update: function() {
			var current = counter.text()
			counter.text(current += 10)
		}
	}
})