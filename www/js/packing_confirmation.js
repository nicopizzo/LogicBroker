// JavaScript source code

$(document).ready(function () {
    var key = getUrlParameter('auth');
    var lbk = getUrlParameter('lbk');
    var params = {
        // Specify your subscription key
        'subscription-key': key,
        'CoId': 15056
    };
    $.ajax({
        url: 'https://logicbroker.azure-api.net/stage-api/v1/0/salesorders/' + lbk + '?subscription-key=' + key,
        type: 'GET',
        origin: 'foo'
    })
    .done(function (data) {
        alert("success - get");
        var sendingData = shipmentCreateString(data);
        console.log(sendingData);
            $.ajax({
                url: 'https://logicbroker.azure-api.net/stage-api/v1/10633/shipments?' + $.param(params),
                type: 'POST',
                data: sendingData,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            })
            .done(function (data) {
                alert("success - post");
            })
            .fail(function () {
                alert("error - post");
            });
    })
    .fail(function () {
        alert("Error");
    });
});

function shipmentCreateString(data) {
    var sendingData =
    {
        //Assume user needs to input this for now, dummy values now
        "ShipFromAddress": {
            "CompanyName": "THE LBSDT LIMITED",
            "FirstName": "KC",
            "LastName": "Philcox",
            "Title": "CEO",
            "Address1": "1600 Pennsylvania Avenue",
            "Address2": "The White House",
            "City": "Storrs",
            "State": "CT",
            "Country": "US",
            "Zip": "06403",
            "Province": "This is not Canada.",
            "AddressCode": "None.",
            "StateCode": "None.",
            "CountryCode": "None.",
            "Phone": "860-867-5309",
            "ContactID": "1234",
            "ContactType": 0,
            "Email": "jonathan.husky@uconn.edu",
            "TaxNumber": "Some tax string?",
            "FaxNumber": "860-555-1234",
            "Note": "Must sign for package!!!",
            "ExtendedAttributes": null
        },
        //I assume we need to have the user input this info
        "ShipmentDate": "2015-03-27T00:00:00",
        //I assume we need to have the user input this info
        "ExpectedDeliveryDate": "2015-05-09T09:00:00",
        //I assume we need to have the user input this info
        "InvoiceNumber": "1337",
        //I assume we need to have the user input this info
        "ShipmentNumber": "9999999999",
        "ShipmentLines":data.Body.SalesOrder.OrderLines,
        "Identifier": data.Body.SalesOrder.Identifier,
        "OrderNumber": data.Body.SalesOrder.OrderNumber,
        "PartnerPO": data.Body.SalesOrder.PartnerPO,
        "SupplierPO": data.Body.SalesOrder.SupplierPO,
        "OrderDate": data.Body.SalesOrder.OrderDate,
        "Discounts": data.Body.SalesOrder.Discounts,
        "Taxes": data.Body.SalesOrder.Taxes,
        "Payments": data.Body.SalesOrder.Payments,
        "PaymentTerm": data.Body.SalesOrder.PaymentTerm,
        "ShipmentInfos": data.Body.SalesOrder.ShipmentInfos,
        "ShipToAddress": data.Body.SalesOrder.ShipToAddress,
        "BillToAddress": data.Body.SalesOrder.BillToAddress,
        "ExtendedAttributes": data.Body.SalesOrder.ExtendedAttributes,
        "TotalAmount": data.Body.SalesOrder.TotalAmount,
        "Currency": data.Body.SalesOrder.Currency,
        "Status": data.Body.SalesOrder.Status,
        "HandlingAmount": data.Body.SalesOrder.HandlingAmount,
        "HandlingTaxes": data.Body.SalesOrder.HandlingTaxes,
        "Note": data.Body.SalesOrder.Note,
        "WarehouseCode": data.Body.SalesOrder.WarehouseCode
    }
    //alert(JSON.stringify(sendingData));
    return JSON.stringify(sendingData);
}


