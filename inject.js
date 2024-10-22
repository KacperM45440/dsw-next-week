const radioButton = document.getElementById("RadioList_Termin1.5");

radioButton.onclick = function () {
    const [startDate, endDate] = radioButton.value.split('\\');

    console.debug(globalThis.MVCxDataOd.SetDate(new Date(startDate)));
    console.debug(globalThis.MVCxDataDo.SetDate(new Date(endDate)));
};
