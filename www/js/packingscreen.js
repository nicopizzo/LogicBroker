var containerCount = 1;
var caseCount = 1;

$(document).ready(function() {
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
	.done(function (data) {
	    //create JSON.stringify - will be used to pass to confirmation screen
	    shipmentCreate(data);
		//unsorted list setup
		var len = data.Body.SalesOrder.OrderLines.length;
		for (var i = 0; i < len; i++) {
			var sku = data.Body.SalesOrder.OrderLines[i].ItemIdentifier.SupplierSKU;
			var qty = data.Body.SalesOrder.OrderLines[i].Quantity;
			var itemToAdd = $('<li class="dragableItem">' + sku + '----' + qty + '</li>');
			$('#unpackaged-items').append(itemToAdd);
			
			// setup order items body
			$('#order_items').append(createTable(["SKU","QTY","QTY Left"], [sku,qty,qty], null));
		}
		
		// drag and drop setup
		var colmain = $('#collapsibleSet');
		var collapsible = $('<div data-role="collapsible" data-collapsed="false" id="container' + containerCount +'">');
		collapsible.append('<h4>Container 1</h4>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="addCaseButton" id="addCaseButton' + containerCount + '" onclick="addCaseEvent('+containerCount+')">Add Case</button>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="removeContainerButton" onclick="removeContainerEvent('+containerCount+')">Remove Container</button>');

		var caseSet = $('<div data-role="collapsible-set" class="caseCollapsibleSet" id="caseCollapsibleSet' + containerCount + '">');
		var case1 = $('<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '">');
		case1.append('<h4>Case-Box ' + caseCount + '</h4>');
		case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent('+caseCount+')">Remove Case</button>');
		case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop"></ul>');
		caseSet.append(case1);
		collapsible.append(caseSet);
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
				item = ui.item;
				newList = oldList = ui.item.parent();
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
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="addCaseButton" id="addCaseButton' + containerCount + '" onclick="addCaseEvent('+containerCount+')">Add Case</button>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="removeContainerButton" onclick="removeContainerEvent('+containerCount+')">Remove Container</button>');
		
		var caseSet = $('<div data-role="collapsible-set" id="caseCollapsibleSet' + containerCount + '" class="caseCollapsibleSet">');
		caseCount++;
		var case1 = $('<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '">');
		case1.append('<h4>Case-Box ' + caseCount + '</h4>');
		case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent('+caseCount+')">Remove Case</button>');
		case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop"></ul>');
		caseSet.append(case1);
		collapsible.append(caseSet);
		colmain.append(collapsible);
		colmain.trigger('create');
		refreshDragandDrop();
}

function addCaseEvent(containerId) {
		caseCount++;
		var container = $('#container' + containerId).find('.caseCollapsibleSet');
		var case1 = '<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '"><h4>Case-Box ' + caseCount + '</h4><button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent('+caseCount+')">Remove Case</button><ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop"></ul></div>';
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
	var remainingItem = '<li class="dragableItem">' + item.text().substring(0,itemIndex) + remainingQty + '</li>';
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
			var itemCode = '<li class="dragableItem">' + items[i] + '----' + qtys[i] + '</li>';
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
		var sku = $(itemTable).eq(0).children().eq(1).text();
		var qty = $(itemTable).eq(1).children().eq(1).text();
		var qtyLeft = $(itemTable).eq(2).children().eq(1).text();
		
		var isFound = 0;
		for(var j=0; j<unpackedItems.length; j++){
			var itemIndex = unpackedItems.eq(j).text().indexOf('----');
			if(sku == unpackedItems.eq(j).text().substring(0,itemIndex)){
				isFound = 1;
				var currentQty = unpackedItems.eq(j).text().substring(itemIndex+4);
				$(itemTable).eq(2).children().eq(1).text(currentQty);
				break;
			}
		}
		if(isFound == 0){
			$(itemTable).eq(2).children().eq(1).text(0);
		}
	}
}

// event on submit
function processPacking(){
	var test = 0;
	var containerSet = $('#collapsibleSet').children();
	for(var i=0; i< containerSet.length; i++){
		var caseSet = containerSet.eq(i).find('.caseCollapsibleSet').children();
		for(var j=0; j<caseSet.length; j++){
			var itemsSet = caseSet.eq(j).find('ul').children();
			for(var k=0; k<itemsSet.length; k++){
				var curItem = itemsSet.eq(k).text();
				//alert(curItem);
			}
		}
		test += caseSet.length;
	}
	alert('containers=' + containerSet.length + 'cases=' + test);
}

function shipmentCreate(data) {
    var sendingData =
    { 
        "ShipFromAddress": {
            "CompanyName": "Company",
            "FirstName": "KC",
            "LastName": "Philcox",
            "Title": null,
            "Address1": "1111 Test Post Drive",
            "Address2": null,
            "City": "Beacon Falls",
            "State": "CT",
            "Country": "US",
            "Zip": "06403",
            "Province": null,
            "AddressCode": null,
            "StateCode": null,
            "CountryCode": null,
            "Phone": "203-463-3300",
            "ContactID": null,
            "ContactType": 0,
            "Email": null,
            "TaxNumber": null,
            "FaxNumber": null,
            "Note": null,
            "ExtendedAttributes": null
        },
        "ShipmentDate": null,
        "ExpectedDeliveryDate": "2014-03-10T00:00:00",
        "InvoiceNumber": "",
        "ShipmentNumber": "232591006",
        "ShipmentLines": [
        {
            "ItemIdentifier": {
                "SupplierSKU": null,
                "PartnerSKU": "46430663",
                "ParentSKU": "",
                "ManufacturerSKU": null,
                "ExternalSKU": null,
                "ASIN": null,
                "UPC": "",
                "ISBN": null,
                "SerialNumber": null
            },
            "Price": 6.5,
            "Cost": 0.0,
            "MSRP": 0.0,
            "Description": "Camera accessories",
            "Discounts": null,
            "ShipmentInfos": [
            {
                "DateShipped": null,
                "CarrierCode": "UNSP",
                "ClassCode": null,
                "TrackingNumber": null,
                "ShippingDiscounts": null,
                "SellerFullfillmentId": null,
                "ShipmentCost": 156.0,
                "ShipmentTaxes": null,
                "InsuranceCost": 0.0
            }
            ],
            "Taxes": null,
            "WarehouseCode": null,
            "ShippingAddress": null,
            "IsDropShip": false,
            "Quantity": 24,
            "LineNumber": 1,
            "Weight": 0.0,
            "WeightUOM": null,
            "ExtendedAttributes": [
            {
                "Name": "Color",
                "Value": "BLACK",
                "Section": "LogicBroker"
            },
            {
                "Name": "ParentSkuUOM",
                "Value": "EA",
                "Section": "LogicBroker"
            },
            {
                "Name": "Size Code",
                "Value": "8",
                "Section": "LogicBroker"
            },
            {
                "Name": "StyleNumber",
                "Value": "08-15244",
                "Section": "LogicBroker"
            },
            {
                "Name": "StyleQualifier",
                "Value": "IT",
                "Section": "LogicBroker"
            },
            {
                "Name": "053",
                "Value": "24",
                "Section": "SDQ1"
            }
            ]
        },
        {
            "ItemIdentifier": {
                "SupplierSKU": null,
                "PartnerSKU": "46430676",
                "ParentSKU": "",
                "ManufacturerSKU": null,
                "ExternalSKU": null,
                "ASIN": null,
                "UPC": "",
                "ISBN": null,
                "SerialNumber": null
            },
            "Price": 6.5,
            "Cost": 0.0,
            "MSRP": 0.0,
            "Description": "Refill pack",
            "Discounts": null,
            "ShipmentInfos": [
            {
                "DateShipped": "2014-09-30T16:00:00",
                "CarrierCode": "UNSP",
                "ClassCode": null,
                "TrackingNumber": null,
                "ShippingDiscounts": null,
                "SellerFullfillmentId": null,
                "ShipmentCost": 156.0,
                "ShipmentTaxes": null,
                "InsuranceCost": 0.0
            }
            ],
            "Taxes": null,
            "WarehouseCode": null,
            "ShippingAddress": null,
            "IsDropShip": null,
            "Quantity": 24,
            "LineNumber": 1,
            "Weight": 0.0,
            "WeightUOM": null,
            "ExtendedAttributes": [
            {
                "Name": "Color",
                "Value": "BLACK",
                "Section": "LogicBroker"
            },
            {
                "Name": "ParentSkuUOM",
                "Value": "EA",
                "Section": "LogicBroker"
            },
            {
                "Name": "Size Code",
                "Value": "10",
                "Section": "LogicBroker"
            },
            {
                "Name": "StyleNumber",
                "Value": "08-15244",
                "Section": "LogicBroker"
            },
            {
                "Name": "StyleQualifier",
                "Value": "IT",
                "Section": "LogicBroker"
            },
            {
                "Name": "053",
                "Value": "24",
                "Section": "SDQ1"
            }
            ]
        }
        ],
        "Identifier": {
            "SourceKey": "232591006",
            "LogicbrokerKey": "36",
            "DestinationKey": null,
            "LinkKey": "1402025786"
        },
        "OrderNumber": data.Body.SalesOrder.Identifier.SourceKey,
        "PartnerPO": "232591006",
        "SupplierPO": null,
        "OrderDate": "2014-02-12T00:00:00",
        "Discounts": null,
        "Taxes": null,
        "Payments": null,
        "PaymentTerm": {
            "TermsDescription": "CC Payment in ship",
            "PayInNumberOfDays": 0
        },
        "ShipmentInfos": [
        {
            "DateShipped": "2014-09-30T16:00:00",
            "CarrierCode": "UNSP",
            "ClassCode": "UNSP",
            "TrackingNumber": null,
            "ShippingDiscounts": null,
            "SellerFullfillmentId": null,
            "ShipmentCost": 0.0,
            "ShipmentTaxes": null,
            "InsuranceCost": 0.0,
            "ContainerCode": "008103400142178605",
            "Qty": 0,
            "ContainerType": "Box",
            "ShipmentContainerParentCode": "008103400121403032"
        },
        {
            "DateShipped": "2014-09-30T16:00:00",
            "CarrierCode": "UNSP",
            "ClassCode": "UNSP",
            "TrackingNumber": null,
            "ShippingDiscounts": null,
            "SellerFullfillmentId": null,
            "ShipmentCost": 0.0,
            "ShipmentTaxes": null,
            "InsuranceCost": 0.0,
            "ContainerCode": "008103400142178674",
            "Qty": 0,
            "ContainerType": "Box",
            "ShipmentContainerParentCode": "008103400121403032"
        }
        ],
        "ShipToAddress": {
            "CompanyName": data.Body.SalesOrder.ShipToAddress.CompanyName,
            "FirstName": data.Body.SalesOrder.ShipToAddress.FirstName,
            "LastName": data.Body.SalesOrder.ShipToAddress.LastName,
            "Title": null,
            "Address1": data.Body.SalesOrder.ShipToAddress.Address1,
            "Address2": data.Body.SalesOrder.ShipToAddress.Address2,
            "City": data.Body.SalesOrder.ShipToAddress.City,
            "State": data.Body.SalesOrder.ShipToAddress.State,
            "Country": null,
            "Zip": data.Body.SalesOrder.ShipToAddress.Zip,
            "Province": null,
            "AddressCode": null,
            "StateCode": null,
            "CountryCode": null,
            "Phone": data.Body.SalesOrder.ShipToAddress.Phone,
            "ContactID": null,
            "ContactType": 0,
            "Email": data.Body.SalesOrder.ShipToAddress.Email,
            "TaxNumber": null,
            "FaxNumber": data.Body.SalesOrder.ShipToAddress.FaxNumber,
            "Note": null,
            "ExtendedAttributes": null
        },
        "BillToAddress": {
            "CompanyName": data.Body.SalesOrder.BillToAddress.CompanyName,
            "FirstName": data.Body.SalesOrder.BillToAddress.FirstName,
            "LastName": data.Body.SalesOrder.BillToAddress.LastName,
            "Title": null,
            "Address1": data.Body.SalesOrder.BillToAddress.Address1,
            "Address2": data.Body.SalesOrder.BillToAddress.Address1,
            "City": "BURLINGTON",
            "State": "NJ",
            "Country": null,
            "Zip": data.Body.SalesOrder.BillToAddress.Zip,
            "Province": null,
            "AddressCode": data.Body.SalesOrder.BillToAddress.AddressCode,
            "StateCode": null,
            "CountryCode": null,
            "Phone": null,
            "ContactID": null,
            "ContactType": 0,
            "Email": data.Body.SalesOrder.BillToAddress.Email,
            "TaxNumber": null,
            "FaxNumber": data.Body.SalesOrder.BillToAddress.FaxNumber,
            "Note": null,
            "ExtendedAttributes": null
        },
        "ExtendedAttributes": [
        {
            "Name": "SourceSystem",
            "Value": "Exact",
            "Section": "Documents"
        },
        {
            "Name": "LinkKey",
            "Value": "1402025786",
            "Section": "Documents"
        },
        {
            "Name": "ExportedFileName",
            "Value": "63527840656248801355782.xml",
            "Section": "LogicBroker"
        },
        {
            "Name": "Key",
            "Value": "c4bfcaaf-76be-4d18-b2be-a10368a2d687",
            "Section": "Documents"
        }
        ],
        "TotalAmount": 624.0,
        "Currency": null,
        "Status": null,
        "HandlingAmount": 0.0,
        "HandlingTaxes": [
        {
            "TaxTitle": "Sales order tax",
            "TaxCode": null,
            "TaxAmount": 0.0,
            "TaxRate": null
        }
        ],
        "Note": null,
        "WarehouseCode": null
    }
    //alert(JSON.stringify(sendingData));
}