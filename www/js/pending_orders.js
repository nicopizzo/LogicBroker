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
		var companySourceFilter = [];
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
			
			// creates company source filter
			createCompanySourceFilter(companySourceFilter, companySource);
        }
		populateCompanySourceFilter(companySourceFilter);
		createTable(allOrders,key);
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
	var numOrders = orders.length;
	console.log(numOrders);
	var ordersFound = 0;
	for(var i=0; i < numOrders; i++){
		var currentOrder = orders[i];
		if (currentOrder['companySource'] == companyFilter || companyFilter == "All Partners"){
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

//Creates company source filter array
function createCompanySourceFilter(elems, toAdd){
	var isFound = 0;
	for(var i =0; i< elems.length; i++){
		var curItem = elems[i];
		if(toAdd == curItem){
			// found
			isFound = 1;
			break;
		}
	}
	if(isFound == 0){
		elems.push(toAdd);
	}
};

// Populates Company Source Filter
function populateCompanySourceFilter(filters){
	for(var i =0; i<filters.length;i++){
		var curItem = filters[i];
		$('#select-choice-1').append('<option value=' + i + '>' + curItem + '</option>');
	}
};

////Things to be accomplished on load
$(document).ready(function () {
	
	//gets authentication key
	var key = getUrlParameter('auth');
	
	var orders = getOrders(key);
	
	// event on filter order
	$('#order-search').on('change keyup paste', function() {
		$("#tableDiv").empty();
		var curInput = $('#order-search').val().toLowerCase();
		var searchedOrder = [];
		for(var i=0; i<orders.length; i++){
			var curItem = orders[i];
			var orderNumber = curItem['orderNumber'].toLowerCase();
			console.log(orderNumber.search(curInput));
			if(orderNumber.search(curInput) != -1){
				searchedOrder.push(curItem);
			}
		}
		createTable(searchedOrder, key);
	});
	
	// event on changing filter company source
	$('#select-choice-1').on('change', function() {
		$("#tableDiv").empty();
		// clears textbox
		$('#order-search').val('');
		createTable(orders,key);
	});
});


