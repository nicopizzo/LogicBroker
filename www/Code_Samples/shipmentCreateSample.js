/*
  shipmentCreate SAMPLE

    This is our sample post method for Shipment-Create. This javascript file
    is not meant to be run at all but simply given the .js extension for easy
    viewing via your editor of choice. 

    This sample's purpose is to provide a guide as to what info we can directly
    pull from the json object retrieved via salesOrder-GET. Given this purpose,
    you can expect any attributes mentioned in the comments to be in reference to
    those available in salesOrder-GET unless explicitly stated otherwise.

    ** BE ADVISED **
    Attributes in the JSON version of these responses have different organizations
    than attributes in the XML version! This quirk may lead to confusion and the false
    idea that attributes are missing. I learned this the hard way...don't let it 
    happen to you!

    - Jeff Daniewicz 3/26/2015
*/



var sendingData =
{
  //I assume we need to have the user input this info
  "ShipFromAddress": {
    "CompanyName": "NEJ",
    "FirstName": null,
    "LastName": null,
    "Title": null,
    "Address1": "170 Pinesbridge Rd",
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
  //I assume we need to have the user input this info
  "ShipmentDate": null,
  //I assume we need to have the user input this info
  "ExpectedDeliveryDate": "2014-03-10T00:00:00",
  //I assume we need to have the user input this info
  "InvoiceNumber": "",
  //I assume we need to have the user input this info
  "ShipmentNumber": "232591006",
  //The shipment equivalent of "OrderLines"
  "ShipmentLines": [
      //FIRST ITEM
      {
        "ItemIdentifier": {
          //Available in attribute of same name
          "SupplierSKU": null,
          //Available in attribute of same name
          "PartnerSKU": "46430663",
          //Available in attribute of same name
          "ParentSKU": "",
          //Available in attribute of same name
          "ManufacturerSKU": null,
          //Available in attribute of same name
          "ExternalSKU": null,
          //Available in attribute of same name
          "ASIN": null,
          //Available in attribute of same name
          "UPC": "",
          //Available in attribute of same name
          "ISBN": null,
          //Available in attribute of same name
          "SerialNumber": null
        },
        //Available in attribute of same name
        "Price": 6.5,
        //Available in attribute of same name
        "Cost": 0.0,
        //Available in attribute of same name
        "MSRP": 0.0,
        //Available in attribute of same name
        "Description": "Camera accessories",
        //Available in attribute of same name
        "Discounts": null,
        //UNSURE: Our samples return null
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
        //Available in attribute of same name
        "Taxes": null,
        //Available in attribute of same name
        "WarehouseCode": null,
        //Available in attribute of same name
        "ShippingAddress": null,
        //Available in attribute of same name
        "IsDropShip": false,
        //Available in attribute of same name
        "Quantity": 24,
        //Available in attribute of same name
        "LineNumber": 1,
        //Available in attribute of same name
        "Weight": 0.0,
        //Available in attribute of same name
        "WeightUOM": null,
        //Available in attribute of same name however sample returns null
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
      //Next Item etc etc
      //{
      //  "ItemIdentifier": {
      //    "SupplierSKU": null,
      //    "PartnerSKU": "46430676", ....
      //}
  ],
  // OUR PACKING STANDARD STARTS HERE!
  "ShipmentLayout": {
    "Containers": {
      "Container": [
        {
          "ContainerCode": "000000001",
          "Cases": {
            "Case": [
              {
                "CaseCode": "1000000",
                "CaseType": "Box",
                "Items": {
                  "Item": {
                    "SKU": "LB-000110",
                    "Qty": "5",
                    "ItemDescription": "maybe have the description as an attribute?"
                  }
                }
              },
              {
                "CaseCode": "2000000",
                "CaseType": "Box",
                "Items": {
                  "Item": [
                    {
                      "SKU": "LB-000078",
                      "Qty": "5",
                      "ItemDescription": "maybe have the description as an attribute?"
                    },
                    {
                      "SKU": "LB-000110",
                      "Qty": "5",
                      "ItemDescription": "maybe have the description as an attribute?"
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "ContainerCode": "000000002",
          "Cases": {
            "Case": {
              "CaseCode": "3000000",
              "CaseType": "Box",
              "Items": {
                "Item": {
                  "SKU": "LB-000060",
                  "Qty": "2",
                  "ItemDescription": "maybe have the description as an attribute?"
                }
              }
            }
          }
        }
      ]
    }
  },
  //OUR PACKING STANDARD ENDS HERE

  //Available in attribute of same name
  "Identifier": {
    "SourceKey": "232591006",
    "LogicbrokerKey": "54278",
    "DestinationKey": null,
    "LinkKey": "1402025786"
  },
  //Available in attribute of same name
  "OrderNumber": null,
  //Available in attribute of same name
  "PartnerPO": "232591006",
  //Available in attribute of same name
  "SupplierPO": null,
  //Available in attribute of same name
  "OrderDate": "2014-02-12T00:00:00",
  //Available in attribute of same name
  "Discounts": null,
  //Available in attribute of same name
  "Taxes": null,
  //Available in attribute of same name
  "Payments": null,
  //Available in attribute of same name
  "PaymentTerm": {
    "TermsDescription": "CC Payment in ship",
    "PayInNumberOfDays": 0
  },
  //Available in attribute of same name however sample returns null
  //DOES USER INPUT THIS???
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
  //Available in attribute of same name
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
  //Available in attribute of same name
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
  //Available in attribute of same name
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
  //Available in attribute of same name
  "TotalAmount": 624.0,
  //Available in attribute of same name
  "Currency": null,
  //Available in attribute of same name
  "Status": null,
  //Available in attribute of same name
  "HandlingAmount": 0.0,
  //Available in attribute of same name however sample returns null
  "HandlingTaxes": [
      {
        "TaxTitle": "Sales order tax",
        "TaxCode": null,
        "TaxAmount": 0.0,
        "TaxRate": null
      }
  ],
  //Available in attribute of same name
  "Note": null,
  //Available in attribute of same name
  "WarehouseCode": null
}

