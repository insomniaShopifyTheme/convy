/*******************************************************************************
 Top Bar
 *****************************************************************************/
theme.topBar = function() {
    if (!theme.adminSet) {
        var $shareBtn = $('.fake-share-button'),
            $likeBtn = $('.fake-like-button');
        
        $shareBtn.css('display', 'none');
        $likeBtn.css('display', 'none');
    }
};