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
    newLabel.textContent = 'Nastepny tydzien';

    newDiv.appendChild(newRadio);
    newDiv.appendChild(newLabel);
    radioContainer.insertBefore(newDiv, radioContainer.childNodes[4]);
}

injectScript();
addRadio();
