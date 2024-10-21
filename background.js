const group = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyGrup';
const leader = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyProwadzacych';
const room = 'https://harmonogramy.dsw.edu.pl/Plany/PlanySal';
const subject = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyPrzedmiotow';
const course = 'https://harmonogramy.dsw.edu.pl/Plany/PlanyTokow';
const prefixes = [group, leader, room, subject, course];

chrome.action.onClicked.addListener(async (tab) =>
{
    if (prefixes.some(prefix => tab.url.startsWith(prefix)))
    {
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';
        await chrome.action.setBadgeText(
        {
            tabId: tab.id,
            text: nextState,
        });
    }
});