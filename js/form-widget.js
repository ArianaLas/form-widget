/*
* jQuery Form Widget to translate
*
* @author Damian Duda <dduda@nexway.com>
*
*/


lang_click = function() {
	$current_id = $(this).parent().parent().attr('id');
	$('#' + $current_id + ' .select-language').children('option[value="select"]').attr('selected', false);
	$('#' + $current_id + ' .select-language').children('option[value="' + $(this).attr('id') + '"]').attr('selected', true);
	$('#' + $current_id + '.form-translation').toggleClass('show');
	$('#' + $current_id + ' .current-language input.new-word').css('display', 'none');
	$('#' + $current_id + ' .current-language input.translated').remove();
	$input = $(this).children('input');
	$str = '<input type="text" name="' + $input.attr('name') + '" value="' + $input.val() + '" class="m-wrap translated" />';
	$($str).appendTo($('#' + $current_id + ' .current-language'));
	

}

new_click = function(event) {
	$current_id = $(this).parent().attr('id');
	$('#' + $current_id + ' .select-language').children('option[selected="selected"]').attr('selected', false);
	$('#' + $current_id + ' .select-language').children('option[value="select"]').attr('selected', true);
	$('#' + $current_id + ' .current-language input.translated').remove();
	$('#' + $current_id + ' .current-language input.new-word').css('display', 'block');
	event.stopPropagation();
	$('#' + $current_id + '.form-translation').toggleClass('show');

}

jQuery(function() {

	$('.open-translation').click(new_click);
	$('.chosen-language').click(lang_click);

  
});

