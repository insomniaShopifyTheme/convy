// Theme functions
window.theme = window.theme || {};
window.theme.version = "1.1.6"

theme.cacheSelectors = function () {
  theme.cache = {
    // General
    $window : $(window),
    $html : $('html'),
    $body : $(document.body),
    $recoverPasswordForm: $('#RecoverPasswordForm'),
    $customerLoginForm: $('#CustomerLoginForm'),
    $recoverPasswordLink: $('#RecoverPassword'),
    $hideRecoverPasswordLink: $('#HideRecoverPasswordLink'),
    $passwordResetSuccess: $('#ResetSuccess')
  };

  theme.mobileBreakpoint = 1024;

  theme.isMobile = function() {
    return theme.cache.$body.width() < this.mobileBreakpoint;
  };

  theme.isDesktop = function() {
    return theme.cache.$body.width() >= this.mobileBreakpoint;
  };

  theme.smoothScroll = function($el, speed, offset) {
    if (!speed)  { speed = 1000; }
    if (!offset) { offset = 0; }
    $('html, body').animate({
      scrollTop: $el.offset().top + offset
    }, speed);
  };
};

theme.sliders = {};
theme.debug = {};

theme.getHash = function () {
  return window.location.hash;
};
