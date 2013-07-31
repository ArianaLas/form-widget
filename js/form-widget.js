/*
* jQuery Form Widget to translate
*
* @author Damian Duda <dduda@nexway.com>
*
*/

jQuery(function($) {
  var $_formTranslation = $('.form-translation'), $_openTranslation = $('.open-translation');

  $('.open-translation').click(function(evt) {
      evt.stopPropagation();
      $('.form-translation').toggleClass('show');
  });

  // $(document).click(function(evt) {
  //     if(!$(evt.target).is('.form-translation')){
  //         $(".form-translation").removeClass('show');
  //     }
  // });
  
});

