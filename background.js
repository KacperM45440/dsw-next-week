const urls = {
    group: 'https://harmonogramy.dsw.edu.pl/Plany/PlanyGrup',
    leader: 'https://harmonogramy.dsw.edu.pl/Plany/PlanyProwadzacych',
    room: 'https://harmonogramy.dsw.edu.pl/Plany/PlanySal',
    subject: 'https://harmonogramy.dsw.edu.pl/Plany/PlanyPrzedmiotow',
    course: 'https://harmonogramy.dsw.edu.pl/Plany/PlanyTokow'
};

const prefixes = Object.values(urls);

function onLoadDSW(changeInfo, tab) {
    return changeInfo.status === 'complete' && prefixes.some(prefix => tab.url.startsWith(prefix));
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!onLoadDSW(changeInfo, tab)) return;

    chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
    });
});
