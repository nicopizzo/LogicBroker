function setBillToPage(data){
	$('#billToCompany').append(nullTester(data.Body.SalesOrder.BillToAddress.CompanyName));
	$('#billToContact').append(nullTester(data.Body.SalesOrder.BillToAddress.FirstName) + " " + nullTester(data.Body.SalesOrder.BillToAddress.LastName));
	$('#billToAddress').append(nullTester(data.Body.SalesOrder.BillToAddress.Address1));
	$('#billToCity').append(nullTester(data.Body.SalesOrder.BillToAddress.City));
	$('#billToState').append(nullTester(data.Body.SalesOrder.BillToAddress.State));
	$('#billToZip').append(nullTester(data.Body.SalesOrder.BillToAddress.Zip));
	$('#billToPhone').append(nullTester(data.Body.SalesOrder.BillToAddress.Phone));
	$('#billToAddressCode').append(nullTester(data.Body.SalesOrder.BillToAddress.AddressCode));
};

function setShipToPage(data){
	$('#shipToCompany').append(nullTester(data.Body.SalesOrder.ShipToAddress.CompanyName));
	$('#shipToContact').append(nullTester(data.Body.SalesOrder.ShipToAddress.FirstName) + " " + nullTester(data.Body.SalesOrder.ShipToAddress.LastName));
	$('#shipToAddress').append(nullTester(data.Body.SalesOrder.ShipToAddress.Address1));
	$('#shipToCity').append(nullTester(data.Body.SalesOrder.ShipToAddress.City));
	$('#shipToState').append(nullTester(data.Body.SalesOrder.ShipToAddress.State));
	$('#shipToZip').append(nullTester(data.Body.SalesOrder.ShipToAddress.Zip));
	$('#shipToPhone').append(nullTester(data.Body.SalesOrder.ShipToAddress.Phone));
	$('#shipToFax').append(nullTester(data.Body.SalesOrder.ShipToAddress.FaxNumber));
	$('#shipToAddressCode').append(nullTester(data.Body.SalesOrder.ShipToAddress.AddressCode));
	$('#shipToEmail').append(nullTester(data.Body.SalesOrder.ShipToAddress.Email));
};

function setItemsPage(data){
	//$('#subtotal').append(data.Body.SalesOrder.OrderLines);
	
	var moreTableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe'><tbody>";
	moreTableCode += "<tr><th>Subtotal:</th><td class='orderNumber'>$ " + "" + "</td></tr>";
	moreTableCode += "<tr><th>Discount:</th><td>$ " + nullTester(data.Body.SalesOrder.Discount) + "</td></tr>";
    moreTableCode += "<tr><th>Freight:</th><td>$ " + "" + "</td></tr>";
	moreTableCode += "<tr><th>Miscellaneous:</th><td>$ " + "" + "</td></tr>";
	moreTableCode += "<tr><th>Tax:</th><td>$ " + nullTester(data.Body.SalesOrder.Taxes) + "</td></tr>";
	moreTableCode += "<tr><th>Order Total:</th><td>$ " + nullTester(data.Body.SalesOrder.TotalAmount) + "</td></tr>";
    moreTableCode += "</tbody></table>"
    $("#colMoreInfo").append(moreTableCode);
	
	// dynamic items
	var len = data.Body.SalesOrder.OrderLines.length;
	for (var i = 0; i < len; i++) {
		var itemId = data.Body.SalesOrder.OrderLines[i].ItemIdentifier.SupplierSKU;
		var weight = data.Body.SalesOrder.OrderLines[i].Weight;
		var qty = data.Body.SalesOrder.OrderLines[i].Quantity;
		var uprice = data.Body.SalesOrder.OrderLines[i].Price;
		var eprice = uprice * qty;
		
		var itemsTableCode = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe'><tbody>";
		itemsTableCode += "<tr><th>Item Id:</th><td class='orderNumber'>" + itemId + "</td></tr>";
		itemsTableCode += "<tr><th>Weight:</th><td>" + weight + "</td></tr>";
	    itemsTableCode += "<tr><th>Qty:</th><td>" + qty + "</td></tr>";
		itemsTableCode += "<tr><th>U-Price:</th><td>$ " + uprice + "</td></tr>";
		itemsTableCode += "<tr><th>E-Price:</th><td>$ " + eprice + "</td></tr>";
	    itemsTableCode += "</tbody></table>"
	    $("#colItems").append(itemsTableCode);
	}
};

$(document).ready(function(){
	var key = getUrlParameter('auth');
	var lbk = getUrlParameter('lbk');
	
	// set side pages
	navigateToPendingOrders('#sidePendingOrders', key);
	navigateToSplash('#sideSplash',key,lbk);
	navigateToOrderDetails('#sideOrderDetails',key,lbk);
	
	$.ajax({
        url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders/' + lbk + '?subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
    })
	.done(function(data){
		setBillToPage(data);
		setShipToPage(data);
		setItemsPage(data);
	})
	.fail(function() {
		alert("Error");
	});
	
});