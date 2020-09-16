function sendRecords(pRegionID) {
    const grid = apex.region(pRegionID).call('getViews','grid');
    const selectedRecords = grid.view$.grid("getSelectedRecords"),
        recordsToProcess = [];
    let recordID,
        spinner = apex.util.showSpinner('#' + pRegionID);

    selectedRecords.forEach((ele, ind) => {
        recordID = grid.model.getRecordId(ele);
        recordsToProcess.push(recordID);
    });
    
    apex.server.process(
        "PROCESS_RECORDS",
        {f01: recordsToProcess},
        {dataType: "text"}
    ).done((pData) => {
            console.log(pData);
            apex.region(pRegionID).refresh();
    })
    .fail((jqXHR, textStatus, errorThrown) => {
            console.log(jqXHR, textStatus, errorThrown)
    })
    .always(() => {
        spinner.remove();
    });
    
    return recordsToProcess;
}