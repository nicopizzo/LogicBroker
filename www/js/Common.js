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

function nullTester(val){
	if(val == null){
		return "";
	}
	else{
		return val;
	}
};

function createTable(headers, values, id){
	var sizeHeader = headers.length;
	if(sizeHeader != values.length){
		return "";
	}
	else{
		var createdTable;
		if(id == null){
			createdTable = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe'><tbody>";
		}
		else{
			createdTable = "<table style='font-size:small; width:100%; border:ridge' class='ui-responsive table-stripe' id='" + id + "'><tbody>";
		}
		for(var i = 0; i < sizeHeader; i++){
			createdTable += "<tr><th>" + headers[i] + ":</th><td>" + values[i] + "</td></tr>";
		}
		createdTable += "</tbody></table>";
		return createdTable;
	}
};

function getLogicbrokerTime(){
	var d = new Date(Date.now());
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	var hours = d.getHours();
	var mins = d.getMinutes();
	var secs = d.getSeconds();
	if(parseInt(month) < 10){
		month = '0' + month;
	}
	if(parseInt(date) < 10){
		date = '0' + date;
	}
	if(parseInt(hours) < 10){
		hours = '0' + hours;
	}
	if(parseInt(mins) < 10){
		mins = '0' + mins;
	}
	if(parseInt(secs) < 10){
		secs = '0' + secs;
	}
	var formattedTime = year + "-" + month + "-" + date + "T" + hours + ":" + mins + ":" + secs;
	return formattedTime;
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

function navigateToPackingScreen(id,key, lbk) {
    $(id).on('click', function (){
        window.location = 'packingscreen.html?auth=' + key + '&lbk=' + lbk;
    });
};

// Hide & Show loader spinners while waiting on ajax
$(document).ajaxStart(function(){
	$('IMG.spinner').attr('src', 'img/spinner_48x48.gif');
	$("IMG.spinner").show();
});

$(document).ajaxStop(function(){
	$("IMG.spinner").hide();
});
