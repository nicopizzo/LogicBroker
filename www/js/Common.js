function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};

function navigateToPendingOrders(id,key){
	$(id).on('click', function(){
		window.location = "pending_orders.html?auth=" + key;
	});
};

function navigateToSplash(id,key, lbk){
	$(id).on('click', function(){
		window.location = 'splash.html?auth=' + key + '&lbk=' + lbk;
	});
};

function navigateToOrderDetails(id,key, lbk){
	$(id).on('click', function(){
		window.location= 'order_details.html?auth=' + key + '&lbk=' + lbk;
	});
};