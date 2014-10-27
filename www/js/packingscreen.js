$(function () {
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
});		
			
$(function() {
	$('.draganddrop').css("padding-bottom", "3%");
});

$(function() {
	$('.addContainerButton').on("click",function() {
		 $(this).parent().append(
			"<div data-role=\"collapsible\" data-collapsed=\"false\">\
				<h4>Container</h4>\
				<a href=\"#\" data-role=\"button\" data-inline=\"true\" data-mini=\"true\" class=\"addCaseButton\">Add Case</a>\
                <a href=\"#\" data-role=\"button\" data-inline=\"true\" data-mini=\"true\" class=\"removeContainerButton\">Remove Container</a>\
			</div>"
		 );
		 
	});
});

$(function() {
	$('.removeCaseButton').click(function() {
		$(this).parent().parent().remove();
	});
});

$(function() {
	$('.removeContainerButton').click(function() {
		$(this).parent().parent().remove();
	});
});
