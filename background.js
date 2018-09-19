function enablePopup(tab) {
  if (isShaparak(tab.url)) {
    browser.pageAction.show(tab.id);
    browser.pageAction.setIcon({
      tabId: tab.id,
      path: "assets/images/icons/verified_icon_128.png"
    });
    browser.pageAction.setTitle({ tabId: tab.id, title: "سایت معتبر است" });
  } else {
    browser.pageAction.hide(tab.id);
    browser.pageAction.setTitle({ tabId: tab.id, title: "Shaparak Verifier" });
  }
}
function isShaparak(urlString) {
  try {
    let url = new URL(urlString);
    return !!url.hostname.match(/\.shaparak\.ir$/i) && url.protocol == "https:";
  } catch (e) {
    return false;
  }
}
let gettingAllTabs = browser.tabs.query({});
  gettingAllTabs.then(tabs => {
  for (let tab of tabs) {
    enablePopup(tab);
  }
});
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  enablePopup(tab);
});
