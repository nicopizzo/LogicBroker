

//The original ajax calls we initially created for this script
function retrieveAndPostJSON() {
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
    alert("success - JSON get");
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

//The new XML version of the original scripts
function retrieveAndPrintXML() {
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
    origin: 'foo',
    dataType: 'xml'
  })
  .done(function (data) {
    alert("success - get XML");
    var sendingData = shipmentCreateXML(data);
    console.log(sendingData);
    
  })
  .fail(function () {
    alert("Error on XML get");
  });
};

$(document).ready(function () {
  //Executes original ajax functions as we first developed them for JSON
  retrieveAndPostJSON();
  //The start of the XML version of the ajax functions, currently outputs framework for what will be sent in console.
  retrieveAndPrintXML();
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

function shipmentCreateXML(xml)
{
  //Basics of XML manipulation by Jeff 
  //  //Take xml and select an xml subset and turn it into a string
  //  var lol = $(xml).find("Identifier").prop('outerHTML');

  //  //turn xml in string form to actual xml object
  //  var anotherTest = $.parseXML(lol);

  //  //Turn parts of xml to string form
  //  var xmlstring = xmlToString(anotherTest);

  //Values that we expect the user to input in our app
    var shipFromCompanyName = "FEEP";
    var shipFromAddress1 = "1221 East Dyer Rd";
    var shipFromCity = "Santa Ana";
    var shipFromState = "CA";
    var shipFromCountry = "USA";
    var shipFromZip = "92715";
    var shipFromPhone = "203-907-7385";
    var shipFromContactType = "Customer";
    var shipmentNumber = 5555;
    var invoiceNumber = "1234567890";
    //Input value needs to be formated in logicbroker form, see defaults below
    var shipmentDate = "2014-03-03T00:00:00";
    var expectedDeliveryDate = "2014-03-10T00:00:00";

    //The complete XML object will be created from this string
    var staticXML =
    "<Shipment>" +
      $(xml).find('Identifier').prop('outerHTML') +
      $(xml).find('PartnerPO').prop('outerHTML') +
      $(xml).find('OrderDate').prop('outerHTML') +
      $(xml).find('PaymentTerm').prop('outerHTML') +
      //INSERT DYNAMIC NICO CODE HERE 'ShipmentInfos'
        "<ShipToAddress>" +
          $(xml).find('ShipToAddress').find('CompanyName').prop('outerHTML') +
          $(xml).find('ShipToAddress').find('Address1').prop('outerHTML') +
          $(xml).find('ShipToAddress').find('City').prop('outerHTML') +
          $(xml).find('ShipToAddress').find('State').prop('outerHTML') +
          $(xml).find('ShipToAddress').find('Zip').prop('outerHTML') +
          $(xml).find('ShipToAddress').find('ContactType').prop('outerHTML') +
        "</ShipToAddress>" +
        "<BillToAddress>" +
          $(xml).find('BillToAddress').find('CompanyName').prop('outerHTML') +
          $(xml).find('BillToAddress').find('Address1').prop('outerHTML') +
          $(xml).find('BillToAddress').find('Address2').prop('outerHTML') +
          $(xml).find('BillToAddress').find('City').prop('outerHTML') +
          $(xml).find('BillToAddress').find('State').prop('outerHTML') +
          $(xml).find('BillToAddress').find('Zip').prop('outerHTML') +
          //WHERE DO I FIND ADDRESS CODE?! Not available in from SalesOrder-GET.
          //$(xml).find('BillToAddress').find('AddressCode').prop('outerHTML') +
          //Adding empty xml object for now
            "<AddressCode></AddressCode>" +
          $(xml).find('BillToAddress').find('ContactType').prop('outerHTML') +
          $(xml).find('BillToAddress').find('Email').prop('outerHTML') +
        "</BillToAddress>" +
      $(xml).find('ExtendedAttributes').prop('outerHTML') +
      $(xml).find('TotalAmount').prop('outerHTML') +
      $(xml).find('HandlingAmount').prop('outerHTML') +
      $(xml).find('OrderDate').prop('outerHTML') +
      //This section populates with info input by user of app 
      "<ShipFromAddress>" +
        "<CompanyName>" + shipFromCompanyName + "</CompanyName>" +
        "<Address1>" + shipFromAddress1 + "</Address1>" +
        "<City>" + shipFromCity + "</City>" +
        "<State>" + shipFromState + "</State>" +
        "<Country>" + shipFromCountry + "</Country>" +
        "<Zip>" + shipFromZip + "</Zip>" +
        "<Phone>" + shipFromPhone + "</Phone>" +
        "<ContactType>" + shipFromContactType + "</ContactType>" +
      "</ShipFromAddress>" +
      //Need to insert a time stamp formated in logicbroker standard 2014-03-03T00:00:00
      "<ShipmentDate>" +
        shipmentDate +
      "</ShipmentDate>" +
      //ExpectedDeliveryDate needs to be input by user
      "<ExpectedDeliveryDate>" +
        expectedDeliveryDate +
      "</ExpectedDeliveryDate>" +
      //Invoice Number is something the user needs to put in
      "<InvoiceNumber>" +
        invoiceNumber +
      "</InvoiceNumber>" +
      //Shipment Number is something the user needs to put in
      "<ShipmentNumber>" +
        shipmentNumber +
      "</ShipmentNumber>" +
      //DYNAMIC NICO CODE HERE ShipmentLines
    "</Shipment>";
    return staticXML;
}
//Convert XML to a string no regardless of browser having ActiveX
function xmlToString(xmlData) {

  var xmlString;
  //IE
  if (window.ActiveXObject) {
    xmlString = xmlData.xml;
  }
    // code for Mozilla, Firefox, Opera, etc.
  else {
    xmlString = (new XMLSerializer()).serializeToString(xmlData);
  }
  return xmlString;
}


