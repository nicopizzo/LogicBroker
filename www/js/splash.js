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
		$(document).on('click',function() {
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


$(document).ready(function(){
	var key = getUrlParameter('auth');
	var lbk = getUrlParameter('lbk');
	
	setOrderDetails(key,lbk);
	setPacking(key,lbk);
	setASN(key,lbk);
});