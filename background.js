const group = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyGrup';
const leader = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyProwadzacych';
const room = 'https://harmonogramy.dsw.edu.pl/Plany/PlanySal';
const subject = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyPrzedmiotow';
const course = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyTokow';
const prefixes = [group, leader, room, subject, course];

function onLoadDSW(changeInfo, tab) {
    if (changeInfo.status == 'complete' && prefixes.some(prefix => tab.url.startsWith(prefix))) {
        return true;
    }
    else {
        return false;
    }
}

function onChangeDSW(givenPage) {
    if (prefixes.some(prefix => givenPage.startsWith(prefix))) {
        return true;
    }
    else {
        return false;
    }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!onLoadDSW(changeInfo, tab)) {
        return;
    }

    // continue code here
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
    var currentPage;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        currentPage = tabs[0].url;
        if (!onChangeDSW(currentPage)) {
            return;
        }

        // continue code here
    });
})