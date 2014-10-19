$(document).ready(function() {
	$('.tabs .tabsLinks a').on('click', function(e) {
		var currentAttrValue = $(this).attr('href');
		
		$('.tabs ' + currentAttrValue).show().siblings().hide();
		
		$(this).parent('li').addClass('active').siblings().removeClass('active');
		
		e.preventDefault();
	});
});