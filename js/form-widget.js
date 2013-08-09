/*
* jQuery Form Widget to translate
*
* @author Ariana Las <ariana.las@gmail.com>
*
*/

/* I need to see how to trigger this to do not copy it in two places
one_opened = function() {
			alert($(this).children('input.lang-translation').attr('name'));
			alert('hello');
	$('.form-translation').each(function() {
		if ($(this).hasClass('show')) {
			$(this).removeClass('show');
			return;
		}
	});
}
*/

lang_click = function() {
	$current_div = $(this).parent().parent();
	$current_div.children('.open-translation').removeClass('open');
	$(this).siblings().removeClass('open');
	$(this).toggleClass('open');
	if ($(this).hasClass('open')) {
		$current_div.find('.select-language').children('option[selected="selected"]').attr('selected', false);
		$current_div.find('.select-language').children('option[value="' + $(this).attr('id') + '"]').attr('selected', true);

		$current_div.find('.current-language .new-word').css('display', 'none');
		$input = $(this).children('input');

		$current_div.find('.current-language .translated').html($input.val()).val($input.val());
		$current_div.find('.current-language .translated').css('display', 'inline-block');

		$current_div.find('.apply').css('display', 'none');
		$current_div.find('.update').css('display', 'inline-block');
		$('.form-translation').each(function() {
			if ($(this).hasClass('show')) {
				$(this).removeClass('show');
				return;
			}
		});
		$current_div.addClass('show');
	} else {
		$current_div.removeClass('show');
	}
}

update_click = function() {
	$current_div = $(this).parent().parent().parent().parent();
	$input = $(this).siblings('.translated');
	$selected = $current_div.find('.select-language option[selected="selected"]').attr('value');

	$object = $current_div.find('.language-tabs span[id="' + $selected + '"]');
	$object.children('input').attr('value', $input.val());
	$object.css({backgroundColor: "#ffb848"});
	$object.animate({backgroundColor: "#eee"}, 700);
	$current_div.removeClass('show');
	
	return false; //link deactivated
}

new_click = function() {
	$current_div = $(this).parent();
	$current_div.find('.chosen-language').removeClass('open');
	$(this).toggleClass('open');
	if ($(this).hasClass('open')) {
		$current_div.find('.update').css('display', 'none');
		$current_div.find('.apply').css('display', 'inline-block');
		$current_div.find('.select-language').children('option[selected="selected"]').attr('selected', false);
		$current_div.find('.select-language').children('option[value="select"]').attr('selected', true);
		$current_div.find('.current-language .translated').css('display', 'none');
		$current_div.find('.current-language .new-word').attr('placeholder', 'Text to translate').attr('value', '').val('').css('display', 'inline-block');
		$('.form-translation').each(function() {
			if ($(this).hasClass('show')) {
				$(this).removeClass('show');
				return;
			}
		});
		$current_div.addClass('show');
	} else {
		$current_div.removeClass('show');
	}
}

option_changed = function() {
	$current_div = $(this).parent().parent().parent();
	$current_div.find('.chosen-language').removeClass('open');
	$current_div.children('.open-translate').toggleClass('open');
	$selected = $(this).children('option:selected').attr('value');

	$current_div.find('.select-language').children('option[selected="selected"]').attr('selected', false);
	$current_div.find('.select-language').children('option[value="' + $selected + '"]').attr('selected', true);

	$current_div.find('.update').css('display', 'none');
	$current_div.find('.apply').css('display', 'inline-block');
	$the_same = false;

	$current_div.find('.language-tabs').children('span').each(function() {
		if ($selected == $(this).attr('id')) {
			$current_div.find('.apply').css('display', 'none');
			$current_div.find('.update').css('display', 'inline-block');
			$the_same = true;
			return;
		}
	});

	if ($the_same == false) {
		$current_div.find('.current-language .translated').css('display', 'none');
		$current_div.find('.current-language .new-word').attr('value', '').attr('placeholder', 'Text to translate').css('display', 'inline-block');
		$current_div.find('.current-language .new-word').focus();
	} else {
		$current_div.find('.current-language .new-word').css('display', 'none');
		$input = $current_div.find('.language-tabs span[id=' + $selected + ']').children('input');
		$current_div.find('.current-language .translated').css('display', 'inline-block').html($input.val()).val($input.val());
	}
}

apply_click = function() {
	//input name!!!
	$main = $(this).parent().parent().parent().siblings('input');
	$name = $main.attr('name');
	$current_div = $main.parent();
	$selected = $current_div.find('.select-language option:selected').attr('value');
	$translation = $current_div.find('.new-word').val();
	if ($selected != "select" && $translation != "") {
		$str = '<span id="' + $selected  + '" class="chosen-language">' + $selected;
		$str += '<a href="/" class="remove icon-remove"></a>';
		$str += '<input class="m-wrap" type="hidden" name="' + $name + '[' + $selected + ']" value="' + $translation + '"/>';
		$str += '</span>';
		$object = $($str).appendTo($current_div.find('.language-tabs'));
		$object.css({backgroundColor: "#ffb848"});
		$object.animate({backgroundColor: "#eee"}, 700);
		$object.click(lang_click);
		$object.children(".remove").click(remove_click);

		$object.mouseover(function(){
			$(this).css({backgroundColor: "#e1e1e1"});
		});

		$object.mouseleave(function(){
			$(this).css({backgroundColor: "#eee"});
		});	
		$current_div.find('.apply').css('display', 'none');
		$current_div.find('.update').css('display', 'inline-block');
	}
	$current_div.children('.open-translation').removeClass('open');
	$object.toggleClass('open');
	return false; //link deactivated
}

remove_click = function() {
	//input name!!!
	if (confirm("Delete?")) {
		$main = $(this).parent().parent().siblings('input');
		$current_div = $main.parent();
		$current_div.removeClass('show');
		$(this).parent().remove();
	}

	return false; //link deactivated
}

jQuery(function() {
	$('.lang-translation').wrap('<div class="input-prepend form-translation" />')
	$('.form-translation').each(function() {
		$(this).prepend('<span class="add-on open-translation"><i class="icon-reorder"></i><i class="icon-caret-up"></i></span>');
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
		$str += '<textarea class="m-wrap translated" rows="1"></textarea>';
		$str += '<textarea class="m-wrap new-word" placeholder="Text to translate" rows="1"></textarea>';
		$str += '<a href="/" class="btn blue apply">Apply</a>';
		$str += '<a href="/" class="btn blue update">Update</a>';
		$str += '</div>';
		$str += '<span class="hide-border"></span>';
		$str += '</div></div>';
		$($str).appendTo($(this));
		$str = '<div class="language-tabs">';
		$str += '</div>';
		$($str).insertAfter($(this).children('.translation-options'));
	});



	$('body').click(function() {
		$('.form-translation .open-translation').removeClass('open');
		$('.form-translation .chosen-language').removeClass('open');
		$('.form-translation').removeClass('show');
	});
	
	$('.form-translation').click(function(e){
		e.stopPropagation();
	});

	$('.open-translation').click(new_click);
	$('.chosen-language').click(lang_click);
	$('.apply').click(apply_click);
	$('.remove').click(remove_click);
	$('.select-language').change(option_changed);
	$('.update').click(update_click);

  
});
