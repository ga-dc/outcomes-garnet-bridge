chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var $newNote = $(".new_note");
		var $submit = $("[data-test-id='save-note']")
		$submit.on("click", function(event){
			var token = localStorage.getItem("garnet_token");
			if (!token) {
				window.open("https://0.0.0.0:3000/api/send_api_token");
				window.addEventListener("message", function(event){
					var token = event.data;
					localStorage.setItem("garnet_token", token);
					postToGarnet(token)
				});
			} else {
				postToGarnet(token)
			}
		});
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

function postToGarnet(token){
	var text = $("#note_body").val();
	console.log(text);
	var id = window.location.pathname.match(/[0-9]+/)[0];
	$.ajax({
		url:"https://0.0.0.0:3000/api/observations/from_outcomes?api_token="+ token,
		dataType: "json",
		type: "POST",
		data: {
			id: id,
			body: text
		}
	})
	.then(function(response){
		console.log(response);
	})
}
