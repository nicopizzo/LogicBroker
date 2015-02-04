function setBillToPage(data){
	$('#billToCompany').append(data.Body.SalesOrder.BillToAddress.CompanyName);
	$('#billToContact').append(data.Body.SalesOrder.BillToAddress.FirstName + " " + data.Body.SalesOrder.BillToAddress.LastName);
	$('#billToAddress').append(data.Body.SalesOrder.BillToAddress.Address1);
	$('#billToCity').append(data.Body.SalesOrder.BillToAddress.City);
	$('#billToState').append(data.Body.SalesOrder.BillToAddress.State);
	$('#billToZip').append(data.Body.SalesOrder.BillToAddress.Zip);
	$('#billToPhone').append(data.Body.SalesOrder.BillToAddress.Phone);
	$('#billToAddressCode').append(data.Body.SalesOrder.BillToAddress.AddressCode);
};

function setShipToPage(data){
	$('#shipToCompany').append(data.Body.SalesOrder.ShipToAddress.CompanyName);
	$('#shipToContact').append(data.Body.SalesOrder.ShipToAddress.FirstName + " " + data.Body.SalesOrder.ShipToAddress.LastName)
	$('#shipToAddress').append(data.Body.SalesOrder.ShipToAddress.Address1);
	$('#shipToCity').append(data.Body.SalesOrder.ShipToAddress.City);
	$('#shipToState').append(data.Body.SalesOrder.ShipToAddress.State);
	$('#shipToZip').append(data.Body.SalesOrder.ShipToAddress.Zip);
	$('#shipToPhone').append(data.Body.SalesOrder.ShipToAddress.Phone);
	$('#shipToFax').append(data.Body.SalesOrder.ShipToAddress.FaxNumber);
	$('#shipToAddressCode').append(data.Body.SalesOrder.ShipToAddress.AddressCode);
	$('#shipToEmail').append(data.Body.SalesOrder.ShipToAddress.Email);
};

function setItemsPage(data){
	//$('#subtotal').append(data.Body.SalesOrder.OrderLines);
	$('#discount').append(data.Body.SalesOrder.Discount);
	$('#tax').append(data.Body.SalesOrder.Taxes);
	$('#orderTotal').append(data.Body.SalesOrder.TotalAmount);
	
	// dynamic items
	var len = data.Body.SalesOrder.OrderLines.length;
	for (var i = 0; i < len; i++) {
		var itemId = data.Body.SalesOrder.OrderLines[i].ItemIdentifier.SupplierSKU;
		var weight = data.Body.SalesOrder.OrderLines[i].Weight;
		var qty = data.Body.SalesOrder.OrderLines[i].Quantity;
		var uprice = data.Body.SalesOrder.OrderLines[i].Price;
		var eprice = uprice * qty;
		
		
		var tableItem = "<tr><td>" + itemId + "</td>";
		tableItem += "<td>" + weight + "</td>";
		tableItem += "<td>" + qty + "</td>";
		tableItem += "<td>$" + uprice + "</td>";
		tableItem += "<td>$" + eprice + "</td></tr>";
		$("#itemsInfo").append(tableItem);
	}
	alert('done');
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