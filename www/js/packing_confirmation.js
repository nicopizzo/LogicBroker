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
        alert(sendingData);
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
            "LogicbrokerKey": data.Body.SalesOrder.Identifier.LogicbrokerKey,
            "DestinationKey": null,
            "LinkKey": data.Body.SalesOrder.Identifier.LinkKey
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
    return JSON.stringify(sendingData);
}


