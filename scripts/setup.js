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
};

theme.sliders = {};
theme.debug = {};

theme.getHash = function () {
  return window.location.hash;
};
