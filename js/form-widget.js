/*
* jQuery Form Widget to translate
*
* @author Ariana Las <ariana.las@gmail.com>
*
*/


lang_click = function() {
	$current_div = $(this).parent().parent();
	$current_div.find('.select-language').children('option[value="select"]').attr('selected', false);
	$current_div.find('.select-language').children('option[value="' + $(this).attr('id') + '"]').attr('selected', true);
	$current_div.find('.current-language input.new-word').css('display', 'none');
	$current_div.find('.current-language input.translated').remove();
	$input = $(this).children('input');
	$str = '<input type="text" name="' + $input.attr('name') + '" value="' + $input.val() + '" class="m-wrap translated" />';
	$current_div.find('.current-language').prepend($str);
	$current_div.addClass('show');

}

new_click = function() {
	$current_div = $(this).parent();

	$current_div.find('.select-language').children('option[selected="selected"]').attr('selected', false);
	$current_div.find('.select-language').children('option[value="select"]').attr('selected', true);
	$current_div.find('.current-language input.translated').remove();
	$current_div.find('.current-language input.new-word').attr('value', '').attr('placeholder', 'Text to translate').css('display', 'inline-block');
	$current_div.addClass('show');
}

apply_click = function() {
	//input name!!!
	alert("lalala");
	$main = $(this).parent().parent().parent().siblings('input');
	$name = $main.attr('name');
	$current_div = $main.parent();
	alert($current_div.attr('id'));
	$selected = $current_div.find('.select-language option:selected').attr('value');
	$translation = $current_div.find('.new-word').val();
	if ($selected != "select" && $translation != "") {
		$str = '<span id="' + $selected  + '" class="chosen-language">' + $selected;
		$str += '<a href="#" class="remove icon-remove"></a>';
		$str += '<input class="m-wrap" type="hidden" name="' + $name + '[' + $selected + ']" value="' + $translation + '"/>';
		$str += '</span>';
		$object = $($str).appendTo($current_div.find('.language-tabs'));
		$object.css({backgroundColor: "#FBC21F"});
		$object.animate({backgroundColor: "#eee"}, 700);
		$object.click(lang_click);
		$object.children(".remove").click(remove_click);
	}
	return false; //link deactivated

}

remove_click = function() {
	//input name!!!
	$main = $(this).parent().parent().siblings('input');
	$current_div = $main.parent();
	$current_div.removeClass('show');
	$(this).parent().remove();

	return false; //link deactivated
}

jQuery(function() {
	$('.lang-translation').wrap('<div class="input-prepend form-translation" />')
	$('.form-translation').prepend('<span class="add-on open-translation"><i class="icon-reorder"></i><i class="icon-caret-up"></i></span>');
	$str = '<div class="translation-options">\n';
	$str += '<div class="translation-content"\n>';
	$str += '<select class="select-language select2" tabindex="1">\n';
	$str += '<option value="select" selected="selected">Select language</option>';
	$str += '<option value="EN">English</option>';
	$str += '<option value="DE">German</option>';
	$str += '<option value="FR">French</option>';
	$str += '<option value="ES">Spanish</option>';
	$str += '<option value="PT">Portuguese</option>';
	$str += '<option value="PL">Polish</option>';
	$str += '<option value="JP">Japanese</option>';
	$str += '</select>';
	$str += '<div class="current-language">';
	$str += '<input class="m-wrap new-word" type="text" placeholder="Text to translate" >';
	$str += '<a href="/" id="apply" class="btn blue" value="apply">Apply</a>';
	$str += '</div>';
	$str += '<span class="hide-border"></span>';
	$str += '</div></div>';
	$($str).insertAfter('.form-translation input');
	$str = '<div class="language-tabs">';
	/* SOME EXAMPLES OF TRANSLATIONS
	$str += '<span id="FR" class="chosen-language">FR';
	$str += '<a href="/" class="remove icon-remove"></a>';
	$str += '<input class="m-wrap" type="hidden" name="translation1[FR]" value="po-francusku"/>';
	$str += '</span>';
	$str += '<span id="EN" class="chosen-language">EN';
	$str += '<a href="/" class="remove icon-remove"></a>';
	$str += '<input class="m-wrap" type="hidden" name="translation1[EN]" value="po-angielsku"/>';
	$str += '</span>';
	*/
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
	$('#apply').click(apply_click);
	$('a.remove').click(remove_click);

  
});

