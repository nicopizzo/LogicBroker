$(document).ready(function() {
	$("#logo").css("display", "block");
	$("#logo").css("margin-left", "auto");
	$("#logo").css("margin-right", "auto");
	$("#logo").css("height", "auto");
	$("#logo").css("width", "auto");

	$("#welcomeText").css("text-align", "center");
	$("#welcomeText").css("color", "red");
	
	$("#user").css("margin-left", "10%");
	$("#user").css("margin-right", "10%");
	$("#pass").css("margin-left", "10%");
	$("#pass").css("margin-right", "10%");
	
	$("#submitButton").css("margin-left", "20%");
	$("#submitButton").css("margin-right", "20%");

	$("#help").css("color", "red");
	$("#help").css("text-align", "center");	
	
	
	$("#submitButton").click(function() {
		var user = $("#userId").val();
		var pass = $("#password").val();
		authenticate(user,pass);
	});
});

function authenticate(user,pass) {
	// do authentication process and return key
	var key = '36bc998ba68b49488cacd8d72440fb33';
	var authpass = 1;
	if(authpass == 1){
		window.location = "pending_orders.html?auth=" + key;
	}
	else{
		alert("Invalid Username or Password");
	}
	
}






