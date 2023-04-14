chrome.storage.local.clear().then(() => {
  chrome.tabs.query(
    { active: true, windowType: "normal", currentWindow: true },
    function (tabs) {
      chrome.tabs.remove(tabs[0].id);
    }
  );
});
