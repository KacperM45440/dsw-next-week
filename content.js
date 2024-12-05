function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js'); // This method works despite throwing an error
    (document.head || document.documentElement).appendChild(script);
}

function checkSubdomain() {
    const urls = [
        'https://harmonogramy.dsw.edu.pl/Plany/PlanyGrup/',
        'https://harmonogramy.dsw.edu.pl/Plany/PlanyProwadzacych/',
        'https://harmonogramy.dsw.edu.pl/Plany/PlanySal/',
        'https://harmonogramy.dsw.edu.pl/ProwadzacyPlanyZajec/PlanyPrzedmiotow/',
        'https://harmonogramy.dsw.edu.pl/Plany/PlanyTokow/'
    ];

    const shortnames = [
        'group',
        'leader',
        'room',
        'subject',
        'course'
    ];

    const action = document.getElementById("aspnetForm").action.toString();

    for (i = 0; i < urls.length; i++) {
        if (urls[i] == action) {
            return shortnames[i];
        }
    }
    console.error("Not a valid course website.");
    return null;
}

function addRadio() {
    if (document.getElementById("RadioList_Termin1.5")) {
        return;
    }
    const subdomain = checkSubdomain();

    if (subdomain == null) {
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

    radioContainer = null;

    switch (subdomain) {
        case 'group':
        case 'leader':
            radioContainer = document.getElementById("aspnetForm").getElementsByClassName("info")[0];
            radioContainer.insertBefore(newDiv, radioContainer.childNodes[10]);
            break;
        case 'room':
        case 'subject':
        case 'course':
            radioContainer = document.getElementById("aspnetForm")
            radioContainer.insertBefore(newDiv, radioContainer.childNodes[4]);
            break;
    }
}

function adjustLanguage() {
    language = document.querySelector('.ul-jezyki .btn-warningCustom img').alt;
    nextWeekLabel = document.getElementById('RadioList_Termin1.5').labels[0];
    upcomingClassesLabel = document.getElementById('RadioList_Termin2').labels[0];
    planName = document.querySelector("#zawartoscPage .info > :nth-child(1)");
    guide = document.querySelector("#zawartoscPage .info > :nth-child(2)")
    selectedCourse = document.querySelector("#zawartoscPage .info > :nth-child(3) > :first-child > :first-child");
    subdomain = checkSubdomain();

    switch (language) {
        case 'pl':
            nextWeekLabel.innerHTML = 'Nast&#281;pny tydzie&#324;';
            break;
        case 'gb':
        case 'en':
            nextWeekLabel.innerHTML = 'Next week';
            switch (subdomain) {
                case 'course':
                    selectedCourse.innerHTML = 'Course schedule:';
                    break;
                case 'subject':
                    selectedCourse.innerHTML = 'Subject schedule:';
                    break;
            }
            break;
        case 'ru':
            nextWeekLabel.innerHTML = '&#x041D;&#x0430;&#x0020;&#x0441;&#x043B;&#x0435;&#x0434;&#x0443;&#x044E;&#x0449;&#x0435;&#x0439;&#x0020;&#x043D;&#x0435;&#x0434;&#x0435;&#x043B;&#x0435;';
            upcomingClassesLabel.innerHTML = '&#x0411;&#x043B;&#x0438;&#x0436;&#x0430;&#x0439;&#x0448;&#x0438;&#x0435;&#x0020;&#x0437;&#x0430;&#x043D;&#x044F;&#x0442;&#x0438;&#x044F;';
            guide.innerHTML = '&#x0427;&#x0442;&#x043E;&#x0431;&#x044B;&#x0020;&#x043F;&#x0440;&#x043E;&#x0441;&#x043C;&#x043E;&#x0442;&#x0440;&#x0435;&#x0442;&#x044C;&#x0020;&#x0434;&#x043E;&#x043F;&#x043E;&#x043B;&#x043D;&#x0438;&#x0442;&#x0435;&#x043B;&#x044C;&#x043D;&#x044B;&#x0435;&#x0020;&#x043A;&#x043E;&#x043C;&#x043C;&#x0435;&#x043D;&#x0442;&#x0430;&#x0440;&#x0438;&#x0438;&#x002C;&#x0020;&#x043D;&#x0430;&#x0436;&#x043C;&#x0438;&#x0442;&#x0435; <span><i class="fas fa-info-circle"></i></span>'
            switch (subdomain) {
                case 'course':
                    selectedCourse.innerHTML = '&#x0412;&#x044B;&#x0431;&#x0440;&#x0430;&#x043D;&#x043D;&#x044B;&#x0439;&#x0020;&#x043A;&#x0443;&#x0440;&#x0441;:';
                    break;
            }
            break;
        case 'uk':
        case 'ua':
            nextWeekLabel.innerHTML = '&#x043D;&#x0430;&#x0441;&#x0442;&#x0443;&#x043F;&#x043D;&#x043E;&#x0433;&#x043E;&#x0020;&#x0442;&#x0438;&#x0436;&#x043D;&#x044F;';
            upcomingClassesLabel.innerHTML = '&#x041D;&#x0430;&#x0439;&#x0431;&#x043B;&#x0438;&#x0436;&#x0447;&#x0456;&#x0020;&#x0437;&#x0430;&#x043D;&#x044F;&#x0442;&#x0442;&#x044F;';
            guide.innerHTML = '&#x0429;&#x043E;&#x0431;&#x0020;&#x043F;&#x0435;&#x0440;&#x0435;&#x0433;&#x043B;&#x044F;&#x043D;&#x0443;&#x0442;&#x0438;&#x0020;&#x0434;&#x043E;&#x0434;&#x0430;&#x0442;&#x043A;&#x043E;&#x0432;&#x0456;&#x0020;&#x043A;&#x043E;&#x043C;&#x0435;&#x043D;&#x0442;&#x0430;&#x0440;&#x0456;&#x002C;&#x0020;&#x043D;&#x0430;&#x0442;&#x0438;&#x0441;&#x043D;&#x0456;&#x0442;&#x044C; <span><i class="fas fa-info-circle"></i></span>';
            switch (subdomain) {
                case 'course':
                    planName.innerHTML = '&#x041F;&#x043B;&#x0430;&#x043D;&#x0438;&#x0020;&#x043A;&#x0443;&#x0440;&#x0441;&#x0456;&#x0432;';
                    selectedCourse.innerHTML = '&#x0412;&#x0438;&#x0431;&#x0440;&#x0430;&#x043D;&#x0438;&#x0439;&#x0020;&#x043A;&#x0443;&#x0440;&#x0441;:';
                    document.getElementById('SzukajLogout').parentElement.children[1].innerHTML = '<i class="fas fa-search"></i> &#x0417;&#x043D;&#x0430;&#x0439;&#x0434;&#x0456;&#x0442;&#x044C;&#x0020;&#x043A;&#x0443;&#x0440;&#x0441;';
                    break;
                case 'subject':
                    selectedCourse.innerHTML = '&#x0420;&#x043E;&#x0437;&#x043A;&#x043B;&#x0430;&#x0434;&#x0020;&#x043F;&#x0440;&#x0435;&#x0434;&#x043C;&#x0435;&#x0442;&#x0456;&#x0432;:';
                    break;
            }
        default:
            console.error("No valid language found.")
            break;
    }
}

injectScript();
addRadio();
adjustLanguage();

