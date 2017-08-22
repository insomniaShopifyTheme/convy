theme.PasswordHeader = (function() {
  function PasswordHeader() {
    this.init();

  }

  PasswordHeader.prototype = _.extend({}, PasswordHeader.prototype, {
    init: function() {
      $('.js-toggle-login-modal').magnificPopup({
        type: 'inline',
        mainClass: 'mfp-fade',
        closeOnBgClick: false,
        closeBtnInside: false,
        closeOnContentClick: false,
        tClose: "{{ 'general.ui.close' | t }}",
        removalDelay: 500,
        callbacks: {
          open: function() {
            window.setTimeout( function() { document.getElementById('password').focus(); }, 50 );
          },
          close: function() {
            window.setTimeout( function() { document.getElementById('email').focus(); }, 50 );
          }
        }
      });
      if ( $('.storefront-password-form .errors').size() ) {
        $('.js-toggle-login-modal').click();
      }
    }
  });

  return PasswordHeader;
})();
