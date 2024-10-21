function RadioButtonZmiana(radioBt) {
    var d = radioBt.value.split('\\');
    var year = d[0].split(',')[0];
    var month = d[0].split(',')[1] - 1;
    var day = d[0].split(',')[2];
    var d1 = new Date(year, month, day);
    year = d[1].split(',')[0];
    month = d[1].split(',')[1] - 1;
    day = d[1].split(',')[2];
    var d2 = new Date(year, month, day);
    MVCxDataOd.SetDate(d1);
    MVCxDataDo.SetDate(d2);
}
function addRadio() {
    if (document.getElementById("RadioList_Termin1.5") != null) {
        return;
    }

    let today = new Date();
    let dayOfWeek = today.getDay();
    let daysUntilNextMonday = (8 - dayOfWeek) % 7;

    if (daysUntilNextMonday === 0) {
        daysUntilNextMonday = 7;
    }

    let nextMonday = new Date(today);
    let endOfWeek = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
    endOfWeek.setDate(today.getDate() + daysUntilNextMonday + 6);

    let year = nextMonday.getFullYear();
    let month = nextMonday.getMonth() + 1;
    let day = nextMonday.getDate();
    let endYear = endOfWeek.getFullYear();
    let endMonth = endOfWeek.getMonth() + 1;
    let endDay = endOfWeek.getDate();

    let radioContainer = document.getElementById('aspnetForm');

    let nextMondayFormattedRadio = `${year},${month.toString().padStart(2, '0')},${day.toString().padStart(2, '0')}`;
    let endOfWeekFormattedRadio = `${endYear},${endMonth.toString().padStart(2, '0')},${endDay.toString().padStart(2, '0')}`;
    let nextMondayFormattedData = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    let endOfWeekFormattedData = `${endDay.toString().padStart(2, '0')}.${endMonth.toString().padStart(2, '0')}.${endYear}`;

    let newDiv = document.createElement('div');
    newDiv.className = 'custom-control custom-radio custom-control-inline radio-margin';

    let newRadio = document.createElement('input');
    newRadio.type = 'radio';
    newRadio.className = 'custom-control-input';
    newRadio.name = 'RadioList_Termin';
    newRadio.id = `RadioList_Termin1.5`;
    newRadio.value = `${nextMondayFormattedRadio}\\${endOfWeekFormattedRadio}\\1`;

    let newLabel = document.createElement('label');
    newLabel.className = 'custom-control-label';
    newLabel.htmlFor = newRadio.id;
    newLabel.textContent = 'Nastepny tydzien';
    newRadio.onclick = function () {
        document.getElementById('DataOd_I').value = nextMondayFormattedData;
        document.getElementById('DataDo_I').value = endOfWeekFormattedData;
        radioContainer.lastChild.value = '{"DataOd":new Date('+nextMondayFormattedRadio+'),"DataDo":new Date('+endOfWeekFormattedRadio+')}'
    };

    newDiv.appendChild(newRadio);
    newDiv.appendChild(newLabel);
    radioContainer.insertBefore(newDiv, radioContainer.childNodes[4]);
}

addRadio();
