
// modal = function(){
    var btn = $(".l-btn__add");
        mask = $('.m-modals__mask');

    btn.click(function(){
        //Open modal
        $(this).siblings('.m-modals__add-modal').removeClass('is-close').addClass('is-open');
        mask.addClass('is-open');
        //Add modal mask
        mask.prepend('<div id="m-modals-mask"></div>');

    $('#m-modals-mask').click(function(){
        //Close modal
        mask.removeClass('is-open');
        $('.m-modals__add-modal.is-open').removeClass('is-open').addClass('is-close');
        //Remove modal mask
        $(this).remove();

    })
    })
// }();
