chrome.runtime.onInstalled.addListener(() => {
  chrome.pageAction.onClicked.addListener((tab) => {
    const query = {
      active: true,
      currentWindow: true
    };
    chrome.tabs.query(query, (tabs) => {
      const mainTab = tabs[0];
      chrome.tabs.executeScript(mainTab.id, { file: 'inject.js' });
    });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: 'play.google.com',
            pathPrefix: '/music'
          },
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});