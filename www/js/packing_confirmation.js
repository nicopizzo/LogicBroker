

//The original ajax calls we initially created for this script
function retrieveAndPostJSON() {
  var key = getUrlParameter('auth');
  var lbk = getUrlParameter('lbk');
  var params = {
    // Specify your subscription key
    'subscription-key': key,
    'CoId': 17052
  };
  $.ajax({
    url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/salesorders/' + lbk + '?subscription-key=' + key,
    type: 'GET',
    origin: 'foo'
  })
  .done(function (data) {
    alert("success - JSON get");
    var sendingData = shipmentCreateString(data);
    console.log(sendingData);
    $.ajax({
      url: 'https://logicbroker.azure-api.net/stage-api/v1/15056/shipments?' + $.param(params),
      type: 'POST',
      data: sendingData,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json'
    })
    .done(function (data) {
      alert("success - JSON post");
    })
    .fail(function () {
      alert("error - JSON post");
    });
  })
  .fail(function () {
    alert("Error on JSON get");
  });
};


$(document).ready(function () {
  //Executes original ajax functions as we first developed them for JSON
  retrieveAndPostJSON();
});

// shimpmentCreateString known to work
function shipmentCreateString(data) {
    var sendingData =
   {
       "ShipFromAddress": {
           "CompanyName": "FEEP",
           "FirstName": null,
           "LastName": null,
           "Title": null,
           "Address1": "10 UIT Way",
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
                 "SupplierSKU": "LB-000110",
                 "PartnerSKU": null,
                 "ParentSKU": "",
                 "ManufacturerSKU": null,
                 "ExternalSKU": null,
                 "ASIN": null,
                 "UPC": "",
                 "ISBN": null,
                 "SerialNumber": null
             },
             "Price": 0,
             "Cost": 0,
             "MSRP": 0,
             "Description": "apparently",
             "Discounts": null,
             "ShipmentInfos": [
               {
                   "DateShipped": null,
                   "CarrierCode": "UNSP",
                   "ClassCode": null,
                   "TrackingNumber": null,
                   "ShippingDiscounts": null,
                   "SellerFullfillmentId": null,
                   "ShipmentCost": 156,
                   "ShipmentTaxes": null,
                   "InsuranceCost": 0
               }
             ],
             "Taxes": null,
             "WarehouseCode": null,
             "ShippingAddress": null,
             "IsDropShip": false,
             "Quantity": 24,
             "LineNumber": 1,
             "Weight": 0,
             "WeightUOM": null,
             "ExtendedAttributes": []
         },
         {
             "ItemIdentifier": {
                 "SupplierSKU": "LB-000078",
                 "PartnerSKU": null,
                 "ParentSKU": "",
                 "ManufacturerSKU": null,
                 "ExternalSKU": null,
                 "ASIN": null,
                 "UPC": "",
                 "ISBN": null,
                 "SerialNumber": null
             },
             "Price": 6.5,
             "Cost": 0,
             "MSRP": 0,
             "Description": "this is required",
             "Discounts": null,
             "ShipmentInfos": [
               {
                   "DateShipped": "2014-09-30T16:00:00",
                   "CarrierCode": "UNSP",
                   "ClassCode": null,
                   "TrackingNumber": null,
                   "ShippingDiscounts": null,
                   "SellerFullfillmentId": null,
                   "ShipmentCost": 156,
                   "ShipmentTaxes": null,
                   "InsuranceCost": 0
               }
             ],
             "Taxes": null,
             "WarehouseCode": null,
             "ShippingAddress": null,
             "IsDropShip": null,
             "Quantity": 24,
             "LineNumber": 1,
             "Weight": 0,
             "WeightUOM": null,
             "ExtendedAttributes": []
         }
       ],
       "Identifier": {
           "SourceKey": "OR1410013665-001",
           "LogicbrokerKey": 25,
           "DestinationKey": null,
           "LinkKey": "1410013665"
       },
       "OrderNumber": "OR1410013665-001",
       "PartnerPO": "OR1410013665-001",
       "SupplierPO": null,
       "OrderDate": "2014-02-12T00:00:00",
       "Discounts": null,
       "Taxes": null,
       "Payments": null,
       "PaymentTerm": null,
       "ShipmentInfos": null,
       "ShipToAddress": {
           "CompanyName": "Burlington Coat Factory",
           "FirstName": null,
           "LastName": null,
           "Title": null,
           "Address1": "4287 Route 130 South",
           "Address2": null,
           "City": "Edgewater Park",
           "State": "NJ",
           "Country": null,
           "Zip": "08010",
           "Province": null,
           "AddressCode": null,
           "StateCode": null,
           "CountryCode": null,
           "Phone": null,
           "ContactID": null,
           "ContactType": 0,
           "Email": null,
           "TaxNumber": null,
           "FaxNumber": null,
           "Note": null,
           "ExtendedAttributes": null
       },
       "BillToAddress": {
           "CompanyName": "Burlington Coat Factory",
           "FirstName": null,
           "LastName": null,
           "Title": null,
           "Address1": "ATTN: ACCOUNTS PAYABLE",
           "Address2": "1830 ROUTE 130 N",
           "City": "BURLINGTON",
           "State": "NJ",
           "Country": null,
           "Zip": "08016",
           "Province": null,
           "AddressCode": "02",
           "StateCode": null,
           "CountryCode": null,
           "Phone": null,
           "ContactID": null,
           "ContactType": 0,
           "Email": "",
           "TaxNumber": null,
           "FaxNumber": null,
           "Note": null,
           "ExtendedAttributes": null
       },
       "ExtendedAttributes": null,
       "TotalAmount": 624,
       "Currency": null,
       "Status": null,
       "HandlingAmount": 0,
       "HandlingTaxes": null,
       "Note": null,
       "WarehouseCode": null
   }
        return JSON.stringify(sendingData);
}

//function shipmentCreateString(data) {
//    var sendingData =
//    {
//        //Assume user needs to input this for now, dummy values now
//        "ShipFromAddress": {
//            "CompanyName": "THE LBSDT LIMITED",
//            "FirstName": "KC",
//            "LastName": "Philcox",
//            "Title": "CEO",
//            "Address1": "1600 Pennsylvania Avenue",
//            "Address2": "The White House",
//            "City": "Storrs",
//            "State": "CT",
//            "Country": "US",
//            "Zip": "06403",
//            "Province": "This is not Canada.",
//            "AddressCode": "None.",
//            "StateCode": "None.",
//            "CountryCode": "None.",
//            "Phone": "860-867-5309",
//            "ContactID": "1234",
//            "ContactType": 0,
//            "Email": "jonathan.husky@uconn.edu",
//            "TaxNumber": "Some tax string?",
//            "FaxNumber": "860-555-1234",
//            "Note": "Must sign for package!!!",
//            "ExtendedAttributes": null
//        },
//        //I assume we need to have the user input this info
//        "ShipmentDate": "2015-03-27T00:00:00",
//        //I assume we need to have the user input this info
//        "ExpectedDeliveryDate": "2015-05-09T09:00:00",
//        //I assume we need to have the user input this info
//        "InvoiceNumber": "1337",
//        //I assume we need to have the user input this info
//        "ShipmentNumber": "9999999999",
//        "ShipmentLines":data.Body.SalesOrder.OrderLines,
//        "Identifier": data.Body.SalesOrder.Identifier,
//        "OrderNumber": data.Body.SalesOrder.OrderNumber,
//        "PartnerPO": data.Body.SalesOrder.PartnerPO,
//        "SupplierPO": data.Body.SalesOrder.SupplierPO,
//        "OrderDate": data.Body.SalesOrder.OrderDate,
//        "Discounts": data.Body.SalesOrder.Discounts,
//        "Taxes": data.Body.SalesOrder.Taxes,
//        "Payments": data.Body.SalesOrder.Payments,
//        "PaymentTerm": data.Body.SalesOrder.PaymentTerm,
//        "ShipmentInfos": data.Body.SalesOrder.ShipmentInfos,
//        "ShipToAddress": data.Body.SalesOrder.ShipToAddress,
//        "BillToAddress": data.Body.SalesOrder.BillToAddress,
//        "ExtendedAttributes": data.Body.SalesOrder.ExtendedAttributes,
//        "TotalAmount": data.Body.SalesOrder.TotalAmount,
//        "Currency": data.Body.SalesOrder.Currency,
//        "Status": data.Body.SalesOrder.Status,
//        "HandlingAmount": data.Body.SalesOrder.HandlingAmount,
//        "HandlingTaxes": data.Body.SalesOrder.HandlingTaxes,
//        "Note": data.Body.SalesOrder.Note,
//        "WarehouseCode": data.Body.SalesOrder.WarehouseCode
//    }
//    //alert(JSON.stringify(sendingData));
//    return JSON.stringify(sendingData);
//}



