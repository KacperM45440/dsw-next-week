function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js'); // This method works despite throwing an error
    (document.head || document.documentElement).appendChild(script);
}

function addRadio() {
    if (document.getElementById("RadioList_Termin1.5")) {
        return;
    }

    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7;

    const nextMonday = new Date(today);
    const endOfWeek = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
    endOfWeek.setDate(today.getDate() + daysUntilNextMonday + 6);

    const formatDate = (date) =>
        `${date.getFullYear()},${String(date.getMonth() + 1).padStart(2, '0')},${String(date.getDate()).padStart(2, '0')}`;

    const radioContainer = document.getElementById('aspnetForm');

    const newDiv = document.createElement('div');
    newDiv.className = 'custom-control custom-radio custom-control-inline radio-margin';

    const newRadio = document.createElement('input');
    newRadio.type = 'radio';
    newRadio.className = 'custom-control-input';
    newRadio.name = 'RadioList_Termin';
    newRadio.id = 'RadioList_Termin1.5';
    newRadio.value = `${formatDate(nextMonday)}\\${formatDate(endOfWeek)}\\1`;

    const newLabel = document.createElement('label');
    newLabel.className = 'custom-control-label';
    newLabel.htmlFor = newRadio.id;

    newDiv.appendChild(newRadio);
    newDiv.appendChild(newLabel);
    radioContainer.insertBefore(newDiv, radioContainer.childNodes[4]);
}

function adjustLanguage() {
    language = document.querySelector('.ul-jezyki .btn-warningCustom img').alt;
    nextWeekLabel = document.getElementById('RadioList_Termin1.5').labels[0];
    switch (language) {
        case 'pl':
            nextWeekLabel.innerHTML = 'Nast&#281;pny tydzie&#324;';
            break;
        case 'gb':
        case 'en':
            nextWeekLabel.innerHTML = 'Next week';
            break;
        case 'ru':
            nextWeekLabel.innerHTML = '&#x041D;&#x0430;&#x0020;&#x0441;&#x043B;&#x0435;&#x0434;&#x0443;&#x044E;&#x0449;&#x0435;&#x0439;&#x0020;&#x043D;&#x0435;&#x0434;&#x0435;&#x043B;&#x0435;';
            break;
        case 'uk':
        case 'ua':
            nextWeekLabel.innerHTML = 'Next week';
            break;
        default:
            console.error("No valid language found.")
            break;
    }
}

injectScript();
addRadio();
adjustLanguage();

