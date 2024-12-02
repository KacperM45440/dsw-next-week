const radioButton = document.getElementById("RadioList_Termin1.5");

//todo: set cookies for RadioList_TerminT, RadioList_TerminSal, RadioList_TerminProw
radioButton.onclick = function () {
    const [startDate, endDate] = radioButton.value.split('\\');

    console.debug(globalThis.MVCxDataOd.SetDate(new Date(startDate)));
    console.debug(globalThis.MVCxDataDo.SetDate(new Date(endDate)));
};
