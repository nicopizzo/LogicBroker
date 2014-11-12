var containerCount = 1;
var caseCount = 1;

$(document).ready(function() {
	var colmain = $('#collapsibleSet');
	var collapsible = $('<div data-role="collapsible" data-collapsed="false" id="container' + containerCount +'">');
	collapsible.append('<h4>Container 1</h4>');
	collapsible.append('<button type="button" data-mini="true" data-inline="true" class="addCaseButton" id="addCaseButton' + containerCount + '" onclick="addCaseEvent('+containerCount+')">Add Case</button>');
	collapsible.append('<button type="button" data-mini="true" data-inline="true" class="removeContainerButton" onclick="removeContainerEvent()">Remove Container</button>');

	var caseSet = $('<div data-role="collapsible-set" class="caseCollapsibleSet" id="caseCollapsibleSet' + containerCount + '">');
	var case1 = $('<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '">');
	case1.append('<h4>Case-Box ' + caseCount + '</h4>');
	case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent()">Remove Case</button>');
	case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop"><li>LB-04213q</li></ul>');
	caseSet.append(case1);
	collapsible.append(caseSet);
	colmain.append(collapsible);
    colmain.trigger('create');
	refreshDragandDrop();
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
		})
	.disableSelection();
	
	$('.draganddrop').css("padding-bottom", "3%");
}

function addContainerEvent() {
		containerCount++;
		var colmain = $('#collapsibleSet');
		var collapsible = $('<div data-role="collapsible" data-collapsed="false" id="container' + containerCount + '">');
		collapsible.append('<h2>Container ' + containerCount + '</h2>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="addCaseButton" id="addCaseButton' + containerCount + '" onclick="addCaseEvent()">Add Case</button>');
		collapsible.append('<button type="button" data-mini="true" data-inline="true" class="removeContainerButton" onclick="removeContainerEvent()">Remove Container</button>');
		
		var caseSet = $('<div data-role="collapsible-set" id="caseCollapsibleSet' + containerCount + '" class="caseCollapsibleSet">');
		caseCount++;
		var case1 = $('<div data-role="collapsible" data-collapsed="false" id="caseSet' + caseCount + '">');
		case1.append('<h4>Case-Box ' + caseCount + '</h4>');
		case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent()">Remove Case</button>');
		case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop"><li>LB-04213q</li></ul>');
		caseSet.append(case1);
		collapsible.append(caseSet);
		colmain.append(collapsible);
		colmain.trigger('create');
		refreshDragandDrop();
}

function addCaseEvent(containerId) {
		caseCount++;
		var caseSet = $('#container' + containerId + '.caseCollapsibleSet');
		console.log(caseSet);
		var case1 = $('<div data-role="collapsible" data-collapsed="false" id="case' + caseCount + '">');
		console.log(case1);
		case1.append('<h4>Case-Box ' + caseCount + '</h4>');
		case1.append('<button type="button" data-mini="true" data-inline="true" class="removeCaseButton" onclick="removeCaseEvent()">Remove Case</button>');
		case1.append('<ul data-role="listview" data-inset="true" data-theme="d" class="draganddrop"><li>LB-04213q</li></ul>');
		console.log(case1);
		caseSet.append(case1);
		console.log(caseSet);
		$('#container' + containerId).trigger('create');
		refreshDragandDrop();
}

function removeCaseEvent() {
	$('.removeCaseButton').click(function() {
		$(this).parent().parent().remove();
	});
}
	
function removeContainerEvent() {	
	$('.removeContainerButton').click(function() {
		$(this).parent().parent().remove();
	});
}