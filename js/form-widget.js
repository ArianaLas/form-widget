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
	$('#' + $current_id + ' .current-language input.new-word').css('display', 'none');
	$('#' + $current_id + ' .current-language input.translated').remove();
	$input = $(this).children('input');
	$str = '<input type="text" name="' + $input.attr('name') + '" value="' + $input.val() + '" class="m-wrap translated" />';
	$($str).appendTo($('#' + $current_id + ' .current-language'));
	$('#' + $current_id + '.form-translation').toggleClass('show');

}

new_click = function() {
	$current_id = $(this).parent().attr('id');
	$('#' + $current_id + ' .select-language').children('option[selected="selected"]').attr('selected', false);
	$('#' + $current_id + ' .select-language').children('option[value="select"]').attr('selected', true);
	$('#' + $current_id + ' .current-language input.translated').remove();
	$('#' + $current_id + ' .current-language input.new-word').css('display', 'block');
	$('#' + $current_id + '.form-translation').toggleClass('show');

}

jQuery(function() {
	$('.form-translation').prepend('<span class="add-on open-translation"><i class="icon-reorder"></i><i class="icon-caret-up"></i></span>');
	$str = '<div class="translation-options">\n';
	$str += '<div class="translation-content"\n>';
	$str += '<select class="select-language select2" tabindex="1">\n';
	$str += '<option value="select" selected="selected">Select language</option>';
	$str += '<option value="en">English</option>';
	$str += '<option value="de">German</option>';
	$str += '<option value="fr">French</option>';
	$str += '<option value="es">Spanish</option>';
	$str += '<option value="pt">Portuguese</option>';
	$str += '<option value="pl">Polish</option>';
	$str += '<option value="jp">Japanese</option>';
	$str += '</select>';
	$str += '<div class="current-language">';
	$str += '<input class="m-wrap new-word" type="text" placeholder="Text to translate" >';
	$str += '<a href="#" id="apply" class="btn blue" value="apply">Apply</a>';
	$str += '</div>';
	$str += '<span class="hide-border"></span>';
	$str += '</div></div>';
	$($str).insertAfter('.form-translation input');
	$str = '<div class="language-tabs">';
	$str += '<span id="fr" class="chosen-language">FR';
	$str += '<a href="/" class="remove icon-remove"></a>';
	$str += '<input class="m-wrap" type="text" name="fr" value="po-francusku"/>';
	$str += '</span>';
	$str += '<span id="en" class="chosen-language">EN';
	$str += '<a href="/" class="remove icon-remove"></a>';
	$str += '<input class="m-wrap" type="text" name="en" value="po-angielsku"/>';
	$str += '</span>';
	$str += '</div>';
	$($str).insertAfter('.translation-options');


	$('body').click(function() {
		$('.form-translation').removeClass('show');
	});
	
	$('.form-translation').click(function(e){
		e.stopPropagation();
	});

	$('.open-translation').click(new_click);
	$('.chosen-language').click(lang_click);

  
});

