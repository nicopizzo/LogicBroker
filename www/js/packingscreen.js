var containerCount = 1;
var caseCount = 1;
var _itemData = [];

$(document).ready(function() {
	var key = getUrlParameter('auth');
	var lbk = getUrlParameter('lbk');
	
	// set side pages
	navigateToPendingOrders('#sidePendingOrders', key);
	navigateToSplash('#sideSplash',key,lbk);
	navigateToOrderDetails('#sideOrderDetails',key,lbk);
	
	$.ajax({
        url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/salesorders/' + lbk + '?subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
    })
	.done(function (data) {

	    $(document).on('click', '#confirm', function()
	    {
	        console.log('packing_confirmation.html?auth=' + key + '&lbk=' + lbk );
	        window.location = 'packing_confirmation.html?auth=' + key + '&lbk=' + lbk;
	    });
		
		//unsorted list setup
		var len = data.Body.SalesOrder.OrderLines.length;
		for (var i = 0; i < len; i++) {
			var sku = data.Body.SalesOrder.OrderLines[i].ItemIdentifier.SupplierSKU;
			var qty = data.Body.SalesOrder.OrderLines[i].Quantity;
			var description = data.Body.SalesOrder.OrderLines[i].Description;
      //Adding a 5px margin on top of item to make drag n drop easier on a phone
			var itemToAdd = $('<li class="dragableItem" style="margin-top: 5px">' + sku + '----' + qty + '</li>');
			$('#unpackaged-items').append(itemToAdd);
			
			// add to itemData
			var o = {
				'sku': sku,
				'qty': qty,
				'description': description,
				'price': data.Body.SalesOrder.OrderLines[i].Price,
				'weight': data.Body.SalesOrder.OrderLines[i].Weight,
				'isDropShip': data.Body.SalesOrder.OrderLines[i].IsDropShip,
				'lineNumber': data.Body.SalesOrder.OrderLines[i].LineNumber
			};
			_itemData.push(o);
			// setup order items body
			$('#order_items').append(createTable(["Description","SKU","QTY","QTY Left"], [description,sku,qty,qty], null));
		}
		
		// drag and drop setup
		var colmain = $('#collapsibleSet');
		var collapsible = $('<div data-role="collapsible" data-collapsed="false" id="container' + containerCount +'">');
		collapsible.append('<h4>Container 1</h4>');
		
		var caseSet = $('<div data-role="collapsible-set" class="caseCollapsibleSet" id="caseCollapsibleSet' + containerCount + '">');
		var case1 = $('<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '">');
		case1.append('<h4>Case-Box ' + caseCount + '</h4>');
    //Adding min-height style to make a bigger initial drag and drop target
		case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop" style="min-height: 100px;"></ul>');
	  //Putting Buttons at the bottom of case to make drag and drop easier
		case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent(' + caseCount + ')">Remove Case</button>');
		caseSet.append(case1);
		collapsible.append(caseSet);
    //Putting Buttons at the bottom of container to make drag and drop easier
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="addCaseButton" id="addCaseButton' + containerCount + '" onclick="addCaseEvent(' + containerCount + ')">Add Case</button>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="removeContainerButton" onclick="removeContainerEvent(' + containerCount + ')">Remove Container</button>');
		colmain.append(collapsible);
		colmain.trigger('create');
		refreshDragandDrop();
	})
	.fail(function(){
		alert("error");
	})
});

function refreshDragandDrop() {
  var oldList, newList, item;
  
	$(".draganddrop").sortable({
		connectWith: $('.draganddrop'),
		start: function (event, ui) {
		  //jQuery object representing the current dragged element
		  item = ui.item;
      //Save current parent to both newList and oldList
		  newList = oldList = ui.item.parent();

		  /* Jeffs experimental code still under development */
		  //var oldListID = ui.item.parent().attr("id");
		  //if (oldListID === "unpackaged-items") {
		  //  ui.item.addClass("currentlyDragging");
		  //  //Temporarily collapse unpackaged collapsible for easier drag and drop
		  //  $("#unpackaged-items li").not(".currentlyDragging").hide();
		  //  $(".currentlyDragging").removeClass("currentlyDragging");
		  //}
			},
			change: function (event, ui) {
				if (ui.sender) {
				  newList = ui.placeholder.parent();
				}
			},
			stop: function (event, ui){
			  // event on drop
				if(oldList != newList){
					var maxQty = buildPopupQty(ui.item);
					$('#popupQty').popup('open');
					
					$('#popupSubmit').on('click', function() {
						var sliderValue = parseInt($('#popSlider').val());
						if(sliderValue < maxQty){
							splitItems(ui.item, oldList, maxQty, sliderValue);
						}
						combineLikeItems(newList);
						updateOrderItems();
						$('#popupQty').popup('close');
					});
					
					$('#popupClose').on('click', function() {
						// revert changes
						$(oldList).append(item);
					});
				}

        /* Jeff's Experimental Code */
			  //if (oldListID === "unpackaged-items")
			  //{
			  //  $("#unpackaged-items li").not(".currentlyDragging").show();
			  //}
				
			},
		})
	.disableSelection();
	
	$('.draganddrop').css("padding-bottom", "3%");
}

function addContainerEvent() {
		containerCount++;
		var colmain = $('#collapsibleSet');
		var collapsible = $('<div data-role="collapsible" data-collapsed="false" class="cont" id="container' + containerCount + '">');
		collapsible.append('<h2>Container ' + containerCount + '</h2>');
	
		var caseSet = $('<div data-role="collapsible-set" id="caseCollapsibleSet' + containerCount + '" class="caseCollapsibleSet">');
		caseCount++;
		var case1 = $('<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '">');
		case1.append('<h4>Case-Box ' + caseCount + '</h4>');
		case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop" style="min-height: 100px;"></ul>');
		case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent('+caseCount+')">Remove Case</button>');
		caseSet.append(case1);
		collapsible.append(caseSet);
    //Putting Buttons at the end to make drag and drop easier
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="addCaseButton" id="addCaseButton' + containerCount + '" onclick="addCaseEvent(' + containerCount + ')">Add Case</button>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="removeContainerButton" onclick="removeContainerEvent(' + containerCount + ')">Remove Container</button>');
		colmain.append(collapsible);
		colmain.trigger('create');
		refreshDragandDrop();
}

function addCaseEvent(containerId) {
		caseCount++;
		var container = $('#container' + containerId).find('.caseCollapsibleSet');
		var case1 = '<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '"><h4>Case-Box ' + caseCount + '</h4><ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop" style="min-height: 100px;"></ul><button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent(' + caseCount + ')">Remove Case</button></div>';


		container.append(case1);
		$('#container' + containerId).trigger('create');
		refreshDragandDrop();
}

function removeCaseEvent(caseId) {
	var unsorted = $('#unpackaged-items');
	var case1 = $('#case' + caseId).find('.draganddrop');
	var caselen = $('#case' + caseId).find('.draganddrop li').length;
	for(var i = 0; i < caselen; i++){
		var item = $(case1).find(':first-child()');
		$(unsorted).append(item);
	}
	
	$('#case' + caseId).remove();
	combineLikeItems($('#unpackaged-items'));
	//$('#packing').trigger('create');
}
	
function removeContainerEvent(containerId) {	
	var unsorted = $('#unpackaged-items');
	var container = $('#container' + containerId);
	var caseSet = $(container).find('#caseCollapsibleSet' + containerId);
	
	$(caseSet).children().each(function() {
		var case1 = $(this).find('.draganddrop');
		var caselen = $(this).find('.draganddrop li').length;
		for(var i = 0; i < caselen; i++){
			var item = $(case1).find(':first-child()');
			$(unsorted).append(item);
		}
	});
	
	$(container).remove();	
	combineLikeItems($('#unpackaged-items'));
}

function buildPopupQty(item){
	$('#popupQty').empty();
	var popupContents = '<p>Move How Many?</p><a href="#" id="popupClose" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>';
	var qtyIndex = item.text().indexOf('----') + 4;
	var maxQty = item.text().substring(qtyIndex);
	popupContents += '<input id="popSlider" type="number" data-type="range" value="' + maxQty + '" min="1" max="' + maxQty + '" />';
	popupContents += '<button type="button" data-mini="true" data-inline="false" id="popupSubmit">Done</button>';
	$('#popupQty').append(popupContents);
	$('#popupQty').trigger('create');
	
	return parseInt(maxQty);
}

function splitItems(item, returnList, maxQty, sliderVal){
	var remainingQty = maxQty - sliderVal;
	var itemIndex = item.text().indexOf('----') + 4;
	var remainingItem = '<li class="dragableItem" style="margin-top: 5px">' + item.text().substring(0,itemIndex) + remainingQty + '</li>';
	var selectedItem = item.text().substring(0,itemIndex) + sliderVal
	item.text(selectedItem);
	$(returnList).append(remainingItem);
	$('#collapsibleSet').trigger('create');
	refreshDragandDrop();
}

function combineLikeItems(itemList){
	var items = [];
	var qtys = [];
	var isChanged = 0;
	var listChildren = itemList.children();
	for(var i = 0; i < listChildren.length; i++){
		var itemIndex = $($(listChildren).eq(i)).text().indexOf('----');
		var o = {
			'sku' :  $($(listChildren).eq(i)).text().substring(0,itemIndex),
			'qty' :  parseInt($($(listChildren).eq(i)).text().substring(itemIndex+4))
		};
		
		var result = $.inArray(o['sku'],items)
		if(result == -1){
			items.push(o['sku']);
			qtys.push(o['qty']);
		}
		else{
			var newQty = qtys[result] + parseInt(o['qty']);
			var newText =  $($(listChildren).eq(i)).text().substring(0,itemIndex+4) + newQty;
			qtys[result] = newQty;
			isChanged = 1;
		}
	}
	// recreate list
	if(isChanged == 1){
		$(itemList).empty();
		for(var i = 0; i < items.length; i++){
		  var itemCode = '<li class="dragableItem" style="margin-top: 5px">' + items[i] + '----' + qtys[i] + '</li>';
			$(itemList).append(itemCode);
		}
	}
	$('#collapsibleSet').trigger('create');
	refreshDragandDrop();
}

function updateOrderItems(){
	var unpackedItems = $('#unpackaged-items').children();
	var orderItemSet = $('#order_items').children();
	for(var i=0; i<orderItemSet.length; i++){
		var itemTable = $(orderItemSet).eq(i).find("tr");
		var sku = $(itemTable).eq(1).children().eq(1).text();
		var qty = $(itemTable).eq(2).children().eq(1).text();
		var qtyLeft = $(itemTable).eq(3).children().eq(1).text();
		
		var isFound = 0;
		for(var j=0; j<unpackedItems.length; j++){
			var itemIndex = unpackedItems.eq(j).text().indexOf('----');
			if(sku == unpackedItems.eq(j).text().substring(0,itemIndex)){
				isFound = 1;
				var currentQty = unpackedItems.eq(j).text().substring(itemIndex+4);
				$(itemTable).eq(3).children().eq(1).text(currentQty);
				break;
			}
		}
		if(isFound == 0){
			$(itemTable).eq(3).children().eq(1).text(0);
		}
	}
}

function findItemDataAttribute(sku, attribute){
	var data;
	for(var i=0; i<_itemData.length;i++){
		var curItem = _itemData[i];
		if(curItem['sku'] == sku){
			data = curItem[attribute];
			break;
		}
	}
	return data;
}

// event on submit
function processPacking(){
	var containerSet = $('#collapsibleSet').children();
	var packedItems = [];
	var currentContainer = 10000;
	var currentCase = 1;
	for(var i=0; i< containerSet.length; i++){
		var caseSet = containerSet.eq(i).find('.caseCollapsibleSet').children();
		for(var j=0; j<caseSet.length; j++){
			var itemsSet = caseSet.eq(j).find('ul').children();
			for(var k=0; k<itemsSet.length; k++){
				var curItem = itemsSet.eq(k).text();
				var skuIndex = curItem.indexOf('----');
				var o = {
					'sku' : curItem.substring(0,skuIndex),
					'qty' : curItem.substring(skuIndex+4),
					'containerCode' : currentContainer,
					'caseCode' : currentCase,
					'caseType' : 'Box'
				};
				packedItems.push(o);
			}
			currentCase++;
		}
		currentContainer += 10000;
	}
	var xml = generateXML(packedItems);
	LoadXMLString('page2Results',xml);
}

function generateXML(formattedItems){
	var xmlDoc = '<Shipment>';
	//first case-container releation(shipmentInfos)
	xmlDoc = xmlDoc + generateShipmentInfosXML(formattedItems);
	//Next item-case releation
	xmlDoc = xmlDoc + generateShipmentLinesXML(formattedItems);
	
	xmlDoc = xmlDoc + '</Shipment>';
	
	return xmlDoc;
}

function generateShipmentInfosXML(formattedItems){
	var shipInfosXML = '<ShipmentInfos>';
	var infosSet = [];
	for(var i=0; i< formattedItems.length;i++){
		var curItem = formattedItems[i];
		var isFound = 0;
		var o = {
			'containerCode' : curItem['containerCode'],
			'caseCode' : curItem['caseCode'],
			'qty' : curItem['qty'],
			'caseType' : curItem['caseType']
		};
		if(infosSet.length == 0){
			infosSet.push(o);
		}
		else{
			for(var j=0; j<infosSet.length;j++){
				var infoItem = infosSet[j];
				if(o['caseCode'] == infoItem['caseCode']){
					isFound = 1;
					infoItem['qty'] = parseInt(infoItem['qty']) + parseInt(o['qty']);
					infosSet[j] = infoItem;
				}
			}
			if(isFound == 0){
				infosSet.push(o);
			}
		}
	}
	for(var i=0; i < infosSet.length; i++){
		var curItem = infosSet[i];
		var shipInfos = '<ShipmentInfo>';
		shipInfos = shipInfos + '<DateShipped>' + getLogicbrokerTime() + '</DateShipped>';
		shipInfos = shipInfos + '<CarrierCode></CarrierCode>';
		shipInfos = shipInfos + '<ShipmentCost></ShipmentCost>';
		shipInfos = shipInfos + '<InsuranceCost></InsuranceCost>';
		shipInfos = shipInfos + '<ContainerCode>' + curItem['caseCode'] + '</ContainerCode>';
		shipInfos = shipInfos + '<Qty>' + curItem['qty'] + '</Qty>';
		shipInfos = shipInfos + '<ContainerType>' + curItem['caseType'] + '</ContainerType>';
		shipInfos = shipInfos + '<ShipmentContainerParentCode>' + curItem['containerCode'] + '</ShipmentContainerParentCode>';
		shipInfos = shipInfos + '</ShipmentInfo>';
		shipInfosXML = shipInfosXML + shipInfos;
	}
	shipInfosXML = shipInfosXML + '</ShipmentInfos>';
	return shipInfosXML;
}

function generateShipmentLinesXML(formattedItems){
	var shipmentLinesXML = '<ShipmentLines>';
	for(var i=0; i< _itemData.length;i++){
		var curItem = _itemData[i];
		var curSKU = curItem['sku'];
		var shipLine = '<ShipmentLine>';
		shipLine = shipLine + '<ItemIdentifier><PartnerSKU>' + curSKU + '</PartnerSKU><ParentSKU></ParentSKU><UPC></UPC></ItemIdentifier>';
		shipLine = shipLine + '<Price>' + findItemDataAttribute(curSKU, 'price') + '</Price>';
		shipLine = shipLine + '<Description>' + findItemDataAttribute(curSKU, 'description') + '</Description>';
		shipLine = shipLine + '<ShipmentInfos>';
		// iterate each shipmentInfos
		for(var j=0; j<formattedItems.length;j++){
			var curPackedItem = formattedItems[j];
			if(curPackedItem['sku'] == curSKU){
				shipLine = shipLine + '<ShipmentInfo>';
				shipLine = shipLine + '<CarrierCode></CarrierCode>';
				shipLine = shipLine + '<DateShipped>' + getLogicbrokerTime() + '</DateShipped>';
				shipLine = shipLine + '<ShipmentCost></ShipmentCost><InsuranceCost></InsuranceCost>';
				shipLine = shipLine + '<ContainerCode>' + curPackedItem['caseCode'] + '</ContainerCode>';
				shipLine = shipLine + '<Qty>' + curPackedItem['qty'] + '</Qty>';
				shipLine = shipLine + '</ShipmentInfo>';
			}
		}
		shipLine = shipLine + '</ShipmentInfos>';
		shipLine = shipLine + '<IsDropShip>' + findItemDataAttribute(curSKU, 'isDropShip') + '</IsDropShip>';
		shipLine = shipLine + '<Quantity>' + findItemDataAttribute(curSKU, 'qty') + '</Quantity>';
		shipLine = shipLine + '<Weight>' + findItemDataAttribute(curSKU, 'weight') + '</Weight>';
		shipLine = shipLine + '<ExtendedAttributes></ExtendedAttributes>'
		shipLine = shipLine + '</ShipmentLine>';
		shipmentLinesXML = shipmentLinesXML + shipLine;
	}
	
	shipmentLinesXML = shipmentLinesXML + '</ShipmentLines>';
	return shipmentLinesXML;
}