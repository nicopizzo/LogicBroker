function createTable(key) {
	
    $.ajax({
        url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders?status=Submitted&subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
    })
    .done(function (data) {
        //alert("success");
        //Add table rows here following the format below
        var len = data.Body.SalesOrders.length;
        for (var i = 0; i <= len; i++) {
			var lbk = data.Body.SalesOrders[i].LogicbrokerKey;
			var companySource = 'unknown';
			
			$.ajax({
				url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders/' + lbk + '?subscription-key=' + key,
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
				
            var tableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe' id='lb" + lbk + "'><tbody>";
            tableCode += "<tr><th>Order Number:</th><td class='orderNumber'>" + data.Body.SalesOrders[i].OrderNumber + "</td></tr>";
            tableCode += "<tr><th>Company Source:</th><td>" + companySource + "</td></tr>";
            tableCode += "<tr><th>Status:</th><td>" + data.Body.SalesOrders[i].Status + "</td></tr>";
            //Closing tags for table
            tableCode += "</tbody></table>"
            $("#orderSelection").append(tableCode);
			
			// set click event
			setClickEvent(key,lbk);
        }
    })
    .fail(function () {
        alert("error");
    });
};

function setClickEvent(key,id){
	$(document).on('click', '#lb' + id, function()
	{
		console.log('splash.html?auth=' + key + '&lbk=' + id);
		window.location = 'splash.html?auth=' + key + '&lbk=' + id;
	});
};
	
	
//Things to be accomplished on load
$(document).ready(function () {
	
	//gets authentication key
	var key = getUrlParameter('auth');
	
	//Add tables
	createTable(key);
});