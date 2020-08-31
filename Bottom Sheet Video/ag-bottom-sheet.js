function openBottomSheet(regionID) {
    let pageBody = $('.t-PageBody');
    let bottomRegion = $(regionID);

    bottomRegion.removeClass('ag-bottom-sheet--hidden');

    bottomRegion.addClass('ag-bottom-sheet--visible');
    apex.event.trigger(regionID, 'ag-bottom-sheet--opened');

    pageBody.addClass('apex-no-scroll');
    pageBody.append(`<div class="ui-widget-overlay ui-front ag-bottom-sheet-overlay" style="z-index: 900;"></div>`);

    $('.ag-bottom-sheet-overlay').click(() => {closeBottomSheet(regionID);});
}

function closeBottomSheet(regionID) {
    let bottomRegion = $(regionID);

    bottomRegion.removeClass('ag-bottom-sheet--visible');

    bottomRegion.one('animationend', (e) => {
        let pageBody = $('.t-PageBody');
        $('.ag-bottom-sheet-overlay').remove();
        pageBody.removeClass('apex-no-scroll');
        console.log(e);
        console.log('Animation ended');

        apex.event.trigger(regionID, 'ag-bottom-sheet--closed');
    });

    bottomRegion.addClass('ag-bottom-sheet--hidden');
}