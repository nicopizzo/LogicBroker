/*
  salesOrder-GET
    
    This is live sample response obtained via salesOrder-GET retrieved via the emulator.
    This is the sample I am using when comparing the information needed for shipment-create.
    I didn't use the sample available via the logicbroker portal because that json object is
    broken!
*/

var foo = {
  "Code": null,
  "Message": null,
  "Body": {
    "SalesOrder": {
      "RequestedShipDate": null,
      "OrderLines": [{
        "ItemIdentifier": {
          "SupplierSKU": "LB-000075",
          "PartnerSKU": null,
          "ParentSKU": null,
          "ManufacturerSKU": null,
          "ExternalSKU": null,
          "ASIN": null,
          "UPC": null,
          "ISBN": null,
          "SerialNumber": null
        },
        "Price": 298.5,
        "Cost": 238.8,
        "MSRP": 0.0, 
        "Description": "Dimethyl Hydrazine Fuel",
        "Discounts": null,
        "ShipmentInfos": null,
        "Taxes": null,
        "WarehouseCode": null,
        "ShippingAddress": null,
        "IsDropShip": false,
        "Quantity": 2,
        "LineNumber": 1,
        "Weight": 20.0,
        "WeightUOM": null,
        "ExtendedAttributes": null
      }],
      "Identifier": {
        "SourceKey": "OR1412014793-001",
        "LogicbrokerKey": "36",
        "DestinationKey": null,
        "LinkKey": "1412014793"
      },
      "OrderNumber": null,
      "PartnerPO": "OR1412014793-001",
      "SupplierPO": null,
      "OrderDate": "2014-12-15T00:00:00",
      "Discounts": null,
      "Taxes": null,
      "Payments": null,
      "PaymentTerm": {
        "TermsDescription": null,
        "PayInNumberOfDays": 0
      },
      "ShipmentInfos": null,
      "ShipToAddress": {
        "CompanyName": "Seelyville Laboratory of Unusual Research Projects",
        "FirstName": null,
        "LastName": null,
        "Title": null,
        "Address1": "10 UIT Way",
        "Address2": null,
        "City": "Shelton",
        "State": "CT",
        "Country": "USA",
        "Zip": "06484",
        "Province": null,
        "AddressCode": "Default Ship To",
        "StateCode": null,
        "CountryCode": "US",
        "Phone": "203-555-1212",
        "ContactID": null,
        "ContactType": 0,
        "Email": null,
        "TaxNumber": null,
        "FaxNumber": null,
        "Note": null,
        "ExtendedAttributes": null
      },
      "BillToAddress": {
        "CompanyName": "Seelyville Laboratory of Unusual Research Projects",
        "FirstName": null,
        "LastName": null,
        "Title": null,
        "Address1": "10 UIT Way",
        "Address2": null,
        "City": "Shelton",
        "State": "CT",
        "Country": "USA",
        "Zip": "06484",
        "Province": null,
        "AddressCode": null,
        "StateCode": null,
        "CountryCode": null,
        "Phone": null,
        "ContactID": null,
        "ContactType": 0,
        "Email": "lollipop.candy@gmail.com",
        "TaxNumber": null,
        "FaxNumber": null,
        "Note": null,
        "ExtendedAttributes": null
      },
      "ExtendedAttributes": [{
        "Name": "VendorId",
        "Value": "Field Emission Electronic Propulsion Inc.",
        "Section": "GreatPlains"
      }, {
        "Name": "LinkKey",
        "Value": "1412014793",
        "Section": "Documents"
      }],
      "TotalAmount": 597.0,
      "Currency": null,
      "Status": null,
      "HandlingAmount": 0.0,
      "HandlingTaxes": null,
      "Note": "",
      "WarehouseCode": null
    }
  }
}