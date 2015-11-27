/**
 * Tabby v0.1.0
 *
 * @author daviga404
 */

function onTabsChanged() {
    chrome.windows.getAll({populate: true}, function(allWindows) {

        // Get tab count
        var count = allWindows.reduce(function(prev, curr) {
            return prev + curr.tabs.length;
        }, 0).toString();

        // Update tab count
        chrome.browserAction.setBadgeText({ text: count });

    });   
}

chrome.windows.onRemoved.addListener(onTabsChanged);
chrome.tabs.onCreated.addListener(onTabsChanged);
chrome.tabs.onRemoved.addListener(function(_, info) {
    // Ignore when window closing, as we capture
    // onRemoved instead (for whole window)
    if (!info.isWindowClosing)
        onTabsChanged();
});
