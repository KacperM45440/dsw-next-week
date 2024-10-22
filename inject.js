var radioButton = document.getElementById("RadioList_Termin1.5");
radioButton.onclick = function () {
    let date = radioButton.value;
    let startDate = date.substring(0, date.indexOf('\\'));
    let endDate = date.substring(date.indexOf('\\')+1, date.lastIndexOf('\\'));
    console.debug(globalThis.MVCxDataOd.SetDate(new Date(startDate)));
    console.debug(globalThis.MVCxDataDo.SetDate(new Date(endDate)));
}