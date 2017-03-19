// Theme functions
window.theme = window.theme || {};

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
};

theme.sliders = {};
theme.debug = {};

theme.getHash = function () {
  return window.location.hash;
};
