function setOrderDetails(key,lbk){
	
	$.ajax({
		url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/salesorders/' + lbk + '?subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
	})
	.done(function (data) {
	/* Assign Data of Interest to local variables */

	  var orderNumber = data.Body.SalesOrder.Identifier.SourceKey;
    //Assume Company Source comes from the person being billed for order (retailer)
	  var companySource = data.Body.SalesOrder.BillToAddress.CompanyName;
	  var orderDate = data.Body.SalesOrder.OrderDate;
    //Loop through orders to get total items, total weight, etc
	      var len = data.Body.SalesOrder.OrderLines.length;
	      var totalWeight = 0.0;
	      var totalItems = 0;
	      for (var i = 0; i < len; i++)
	      {
	          var curOrder = data.Body.SalesOrder.OrderLines[i];
            //Get number of items in this order
	          var curQuantity = curOrder.Quantity;
            //Get total weight of all the items in this order
	          var curWeight = curOrder.Weight * curQuantity;
            //Add this order's totals to the running totals
	              totalItems += curQuantity;
	              totalWeight += curWeight;
	      }
    /* Append local variables where necessary in HTML */

		$('#orderNumber').append(orderNumber);
		$('#companySource').append(companySource);
		$('#dateOrdered').append(orderDate);
		$('#totalItems').append(totalItems);
		$('#totalWeight').append(totalWeight);

		// sets click event
		$('#orderDetails').on('click',function() {
			console.log('order_details.html?auth=' + key + '&lbk=' + lbk);
			window.location = 'order_details.html?auth=' + key + '&lbk=' + lbk;
		});
	})
	.fail(function() {
		$('#packingScreen').append('Failed to load');
	});
	
};

function setPacking(key,lbk){
	
	$('#packingScreen').on('click',function() {
			console.log('packingscreen.html?auth=' + key + '&lbk=' + lbk);
			window.location = 'packingscreen.html?auth=' + key + '&lbk=' + lbk;
	});
};


function setASN(key,lbk){
	
};

//Hide tables while ajax running
$(document).ajaxStart(function(){
	$("table").hide();
});
//Show tables when ajax stops
$(document).ajaxStop(function(){
	$("table").show();
});

$(document).ready(function(){
	var key = getUrlParameter('auth');
	var lbk = getUrlParameter('lbk');
	
	// set side navigation
	navigateToPendingOrders('#sidePendingOrders', key);
	navigateToSplash('#sideSplash',key,lbk);
	navigateToOrderDetails('#sideOrderDetails', key, lbk);
    navigateToPackingScreen('#sidePackingScreen', key, lbk);
	
	$.ajax({
		url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/salesorders/' + lbk + '?subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
	})
	.done(function(data) {
		setOrderDetails(key,lbk);
		setPacking(key,lbk);
		setASN(key,lbk);
	})
});