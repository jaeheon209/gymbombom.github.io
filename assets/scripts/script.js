/* global window */
(function (window, document, $) {
  'use strict';

  $(function () {

      $(window).scroll(function () {
          var viewportTop = $(window).scrollTop();
          if (viewportTop) {
            $('#back-to-top').addClass('static').show();
              var viewportBottom = viewportTop + $(window).height();
             // var footerTop = $('#footer').offset().top;
             var footerTop;
              if ((footerTop <= viewportBottom) && (footerTop >= viewportTop)) {
                  // footer is visible: static above footer
                  $('#back-to-top').addClass('static').show();
              } else {
                  // footer is invisible: fixed on bottom-right of viewport
                  $('#back-to-top').removeClass('static').show();
              }
          } else {
              // already top: hide
              $('#back-to-top').hide();
          }
      });
  });
}(window, window.document, window.jQuery));