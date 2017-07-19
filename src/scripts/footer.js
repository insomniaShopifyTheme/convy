/*******************************************************************************
 Footer Section
 *****************************************************************************/
theme.footer = function() {
    $('.menu-collapse-btn').click(function () {
        var collapsibleId = $(this).data('collapsible-id');
        var collapsible = $('.collapsible-id-'+collapsibleId);
        if(collapsible.hasClass('collapsed')){
            $(this).removeClass('collapsed')
            collapsible.removeClass('collapsed')
        }else{
            $(this).addClass('collapsed')
            collapsible.addClass('collapsed')
        }
    });
};

