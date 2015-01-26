var createTable = function()
{
	var orderNumber = "32767";
	var companySource = "Huskies";
	var orderStatus = "DONE!";

	//Opening tags for table element
	var tableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe'><tbody>";
	//Add table rows here following the format below
	tableCode += "<tr><th>Order Number:</th><td class='orderNumber'>" + orderNumber + "</td></tr>";
	tableCode += "<tr><th>Company Source:</th><td>" + companySource + "</td></tr>";
	tableCode += "<tr><th>Status:</th><td>" + orderStatus + "</td></tr>";
	//Closing tags for table
	tableCode += "</tbody></table>"	
	$("#orderSelection").append(tableCode);
};
	
	
//Things to be accomplished on load
$(document).ready(function () {
	
	//gets authentication key
	var key = getUrlParameter('auth');
	
	//Add tables
	createTable();
	//Add click event to each
	//Controls click function for each generated table
	$('#orderSelection tbody').click(function()
	{
		window.location.href = 'splash.html';
		
	});
});