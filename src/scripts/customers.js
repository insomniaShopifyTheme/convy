/*******************************************************************************
    Customers
  *****************************************************************************/

theme.loginForms = function() {
  function showRecoverPasswordForm() {
    theme.cache.$recoverPasswordForm.show();
    theme.cache.$customerLoginForm.hide();
  }

  function hideRecoverPasswordForm() {
    theme.cache.$recoverPasswordForm.hide();
    theme.cache.$customerLoginForm.show();
  }

  theme.cache.$recoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    showRecoverPasswordForm();
  });

  theme.cache.$hideRecoverPasswordLink.on('click', function(evt) {
    evt.preventDefault();
    hideRecoverPasswordForm();
  });

  // Allow deep linking to recover password form
  if (theme.getHash() == '#recover') {
    showRecoverPasswordForm();
  }
};

theme.resetPasswordSuccess = function() {
  theme.cache.$passwordResetSuccess.show();
};