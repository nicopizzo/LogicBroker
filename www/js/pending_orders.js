﻿function createTable(key) {
    // string value for Company Filter
    var companyFilter = getCompanyString();
    // value for order filter
    var orderFilter = getOrderString();

    $.ajax({
        url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders?status=Submitted&subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
    })
    .done(function (data) {
        //alert("success");
        //Add table rows here following the format below
        var len = data.Body.SalesOrders.length;
        for (var i = 0; i < len; i++) {
			var lbk = data.Body.SalesOrders[i].LogicbrokerKey;
			var companySource = 'unknown';
			var orderNumber = data.Body.SalesOrders[i].OrderNumber;
			
			$.ajax({
				url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders/' + lbk + '?subscription-key=' + key,
				type: 'GET',
				origin: 'foo',
				async: false
			})
			.done(function (data2) {
			    companySource = data2.Body.SalesOrder.ExtendedAttributes[0].Value;
			})
			.fail(function() {
				alert('Failed to get company source');
			});

            //if statement to get filter
			if ((companySource == companyFilter || companyFilter == "All Partners")&&(orderNumber==orderFilter||orderFilter=="")) {
			    var tableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe clickable-div' id='lb" + lbk + "'><tbody>";
			    tableCode += "<tr><th>Order Number:</th><td class='orderNumber'>" + data.Body.SalesOrders[i].OrderNumber + "</td></tr>";
			    tableCode += "<tr><th>Company Source:</th><td>" + companySource + "</td></tr>";
			    tableCode += "<tr><th>Status:</th><td>" + data.Body.SalesOrders[i].Status + "</td></tr>";
			    //Closing tags for table
			    tableCode += "</tbody></table>"
			    $("#tableDiv").append(tableCode);

			    // set click event
			    setClickEvent(key, lbk);
			}
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
    var key = getUrlParameter('auth');
    createTable(key);
};


////Things to be accomplished on load
$(document).ready(function () {
	
	//gets authentication key
	var key = getUrlParameter('auth');
	
	//Add tables
	createTable(key);
});


