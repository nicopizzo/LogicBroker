//var createTable = function()
//{
//	var orderNumber = "32767";
//	var companySource = "Huskies";
//	var orderStatus = "DONE!";

//	//Opening tags for table element
//	var tableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe'><tbody>";
//	//Add table rows here following the format below
//	tableCode += "<tr><th>Order Number:</th><td class='orderNumber'>" + orderNumber + "</td></tr>";
//	tableCode += "<tr><th>Company Source:</th><td>" + companySource + "</td></tr>";
//	tableCode += "<tr><th>Status:</th><td>" + orderStatus + "</td></tr>";
//	//Closing tags for table
//	tableCode += "</tbody></table>"	
//	$("#orderSelection").append(tableCode);
//};

var createTable = function () {
    var params = {
        // Specify your subscription key
        'subscription-key': '36bc998ba68b49488cacd8d72440fb33',
    };

    $.ajax({
        // Specify values for path parameters (shown as {...})
        url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders?status=Submitted&' + $.param(params),
        type: 'GET',
        origin: 'foo'
    })
    .done(function (data) {
        alert("success");
        //Add table rows here following the format below
        var len = data.Body.SalesOrders.length;
        for (var i = 0; i <= len; i++) {
			var lbk = data.Body.SalesOrders[i].LogicbrokerKey;
			var companySource = 'unknown';
			
			$.ajax({
				url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders/' + lbk + '?' + $.param(params),
				type: 'GET',
				origin: 'foo',
				async: false
			})
			.done(function(data2) {
				companySource = data2.Body.SalesOrder.ExtendedAttributes[0].Value;
			})
			.fail(function() {
				alert('Failed to get company source');
			});
				
            var tableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe'><tbody>";
            tableCode += "<tr><th>Order Number:</th><td class='orderNumber'>" + data.Body.SalesOrders[i].OrderNumber + "</td></tr>";
            tableCode += "<tr><th>Company Source:</th><td>" + companySource + "</td></tr>";
            tableCode += "<tr><th>Status:</th><td>" + data.Body.SalesOrders[i].Status + "</td></tr>";
            //Closing tags for table
            tableCode += "</tbody></table>"
            $("#orderSelection").append(tableCode);
        }
    })
    .fail(function () {
        alert("error");
    });
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