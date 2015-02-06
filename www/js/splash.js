function setOrderDetails(key,lbk){
	
	$.ajax({
		url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders/' + lbk + '?subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
	})
	.done(function(data) {
		var orderNumber = data.Body.SalesOrder.Identifier.SourceKey;
		var companySource = data.Body.SalesOrder.ExtendedAttributes[0].Value;
		$('#orderNumber').append(orderNumber);
		$('#companySource').append(companySource);
		$('#status').append('Submitted');
		// sets click event
		$('#orderDetails').on('click',function() {
			console.log('order_details.html?auth=' + key + '&lbk=' + lbk);
			window.location = 'order_details.html?auth=' + key + '&lbk=' + lbk;
		});
	})
	.fail(function() {
		$('#orderNumber').append('Failed to load');
	});
	
};

function setPacking(key,lbk){
	
};

function setASN(key,lbk){
	
};

//Hide & Show tables while ajax running
$(document).ajaxStart(function(){
	$("table").hide();
});

$(document).ajaxStop(function(){
	$("table").show();
});

$(document).ready(function(){
	var key = getUrlParameter('auth');
	var lbk = getUrlParameter('lbk');
	
	// set side navigation
	navigateToPendingOrders('#sidePendingOrders', key);
	navigateToSplash('#sideSplash',key,lbk);
	navigateToOrderDetails('#sideOrderDetails',key,lbk);
	
	setOrderDetails(key,lbk);
	setPacking(key,lbk);
	setASN(key,lbk);
});