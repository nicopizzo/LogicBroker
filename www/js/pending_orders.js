var orders;

function getOrders(key) {	
	var allOrders = [];
    //Retrieve information via "SalesOrders- get list" for general data about all orders
    $.ajax({
        url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/salesorders?status=Submitted&subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
    })
    .done(function (data) {
        //Add table rows here following the format below
        var len = data.Body.SalesOrders.length;
        for (var i = 0; i < len; i++) {
			var lbk = data.Body.SalesOrders[i].LogicbrokerKey;
			var companySource = 'unknown';
			var orderNumber = data.Body.SalesOrders[i].OrderNumber;
			var status = data.Body.SalesOrders[i].Status;
			//Retrieve information via "SalesOrder-get" for a particular order
            $.ajax({
				url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/salesorders/' + lbk + '?subscription-key=' + key,
				type: 'GET',
				origin: 'foo',
				async: false
			})
			.done(function (data2) {
                //Assume that the company source is who is being billed
			    companySource = data2.Body.SalesOrder.BillToAddress.CompanyName;
			})
			.fail(function() {
				alert('Failed to get company source');
			});
			
			// build struct and add to order array
			var order = {
				'orderNumber' : orderNumber,
				'companySource' : companySource,
				'status' : status,
				'lbk' : lbk
			};
			
			allOrders.push(order);
			//Automatically filter by default choice on load
			filter();
        }
    })
    .fail(function () {
		//Allow user the ability to reload page if an error occurs
        var dialog = "Error: Unable to retrieve pending orders.Would you like to try again?";
		var choice = confirm(dialog);
		if (choice == true)
		{
			//refresh page
			location.reload();
		}
    });
	
	return allOrders;
};

function createTable(orders, key){
	// string value for Company Filter
    var companyFilter = getCompanyString();
    // value for order filter
    var orderFilter = getOrderString();
	var numOrders = orders.length;
	console.log(numOrders);
	var ordersFound = 0;
	for(var i=0; i < numOrders; i++){
		var currentOrder = orders[i];
		if ((currentOrder['companySource'] == companyFilter || companyFilter == "All Partners")&&(currentOrder['orderNumber']==orderFilter||orderFilter=="")) {
			var tableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe clickable-div' id='lb" + currentOrder['lbk'] + "'><tbody>";
			tableCode += "<tr><th>Order Number:</th><td class='orderNumber'>" + currentOrder['orderNumber'] + "</td></tr>";
			tableCode += "<tr><th>Company Source:</th><td>" + currentOrder['companySource'] + "</td></tr>";
			tableCode += "<tr><th>Status:</th><td>" + currentOrder['status'] + "</td></tr>";
			//Closing tags for table
			tableCode += "</tbody></table>"
			$("#tableDiv").append(tableCode);

			// set click event
			setClickEvent(key, currentOrder['lbk']);
			ordersFound++;
		}
	}
	
	if(ordersFound <= 0){
		alert('No Orders Found');
	}
		
};

function setClickEvent(key,id){
    $(document).on('click', '#lb' + id, function()
    {
		console.log('splash.html?auth=' + key + '&lbk=' + id);
		window.location = 'splash.html?auth=' + key + '&lbk=' + id;
	});
};

// Returns whats in drop down - string
function getCompanyString() {
    var elem = document.getElementById("select-choice-1");
    var companyFilter = elem.options[elem.selectedIndex].text;
    return companyFilter;
};

// Returns string in Input form
function getOrderString() {
    var orderSearch = document.getElementById("order-search").value;
    return orderSearch;
};
function filter() {
    //document.getElementById(orderSelection).innerHTML = "";
    $("#tableDiv").empty();
    createTable(orders, getUrlParameter('auth'));
};


////Things to be accomplished on load
$(document).ready(function () {
	
	//gets authentication key
	var key = getUrlParameter('auth');
	
	orders = getOrders(key);
});


