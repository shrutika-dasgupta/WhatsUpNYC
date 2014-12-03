jQuery(document).ready(function() {
	$(".show_comment_link").unbind('click').click(function(e){
		console.log(e);
		e.preventDefault();
		$(this).closest('.feed_item').find('.comment_area').slideToggle(700);
	});
	$(".share_wrapper").hover(
		function() {
			$(this).find('.share_hidden').show();
		},
		function() {
			$(this).find('.share_hidden').hide();
		}
	);
});