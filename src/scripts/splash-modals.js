/*******************************************************************************
 Top Bar
 *****************************************************************************/
theme.splashModals = function() {
    var selector = {
        modal: '#SplashModal'
    }
    var daysHidden = $(selector.modal).data('days-hidden'),
        showUpDelay = ($(selector.modal).data('showup-delay') * 1000), //to milliseconds
        testMode = $(selector.modal).data('test-mode');

    var cookieName = 'konversion-modals';
    var cookie = new theme.CookieManager();

    if(cookie.check(cookieName)){ 
        if(cookie.get(cookieName) == 'open'){
            cookie.set(cookieName, 'closed', daysHidden);
            showModal();
        }
    }else{
        cookie.set(cookieName, 'open', daysHidden);
        showModal();
    }

    //test mode
    if (theme.adminSet && testMode) {
        showModal();
    }

    function showModal() {
        setTimeout(function () {
            theme.SplashModalEl.onlyShow();
        }, showUpDelay);
    }
};