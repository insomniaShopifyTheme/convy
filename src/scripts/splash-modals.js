/*******************************************************************************
 Top Bar
 *****************************************************************************/
theme.splashModals = function() {
    var selector = {
        modal: '#SplashModal'
    }
    var daysHidden = $(selector.modal).data('days-hidden'),
        showUpDelay = ($(selector.modal).data('showup-delay') * 1000), //to milliseconds
        testMode = $(selector.modal).data('test-mode'),
        modalContent = $(selector.modal).find('.modal-content'),
        explosiveOffer = modalContent.data('explosive-offer'),
        explosionGif = modalContent.data('explosion-gif');

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
            if(explosiveOffer){
                modalContent.css("transform", "scale(0)");
                $(selector.modal)
                    .css("background-image", "url("+explosionGif+")")
                    .css("background-size", "cover")
                    .css("background-repeat", "no-repeat")
                    .css("background-position", "50% 50%");

                setTimeout(function () {
                    modalContent.css("transform", "scale(1)");
                    setTimeout(function () {
                        $(selector.modal).css("background", "rgba(0, 0, 0, 0.4)");
                    }, 1000);
                }, 1500);
            }
        }, showUpDelay);
    }
};