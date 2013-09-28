$(document).ready(function() {
	$('#selected-color').submit(function(e) {
		e.preventDefault();
		var userColor = $(this).serialize().split('=')[1],
			colors = ["459fda", "F7021F", "1FBA04", "F5EE25", "FA2FAC", "F59631", "000000", "459fda", "459fda", "1FBA04"];

		if (userColor) {
			var myColor = colors[Math.floor(Math.random() * 10)];

			$('#ball').css({'border-color': '#' + myColor});

			if(myColor == userColor) {
				alert('You won :)');
			} else {
				alert('You loose :(');	
			}
			$('#ball').css({background: '#fff'});
		} else {
			alert('pick the color!')
		}
	})
})