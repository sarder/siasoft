$(document).ready(function () {

    var clientAgent = detect.parse(navigator.userAgent);

    //alert(clientAgent.browser.family.toLowerCase() + " version: " + parseInt(clientAgent.browser.version));

    if (clientAgent.browser.family.toLowerCase() == "opera" && parseInt(clientAgent.browser.version) < 36) {
        window.location = baseUrl + "browser-update.aspx";
    }

    if (clientAgent.browser.family.toLowerCase() == "chrome" && parseInt(clientAgent.browser.version) < 48) {
        window.location = baseUrl + "browser-update.aspx";
    }
   
    if (clientAgent.browser.family.toLowerCase() == "firefox" && parseInt(clientAgent.browser.version) < 46) {
        window.location = baseUrl + "browser-update.aspx";
    }

    if (clientAgent.browser.family.toLowerCase() == "ie" && parseInt(clientAgent.browser.version) < 11) {
        window.location = baseUrl + "browser-update.aspx";
    }

    if (clientAgent.browser.family.toLowerCase() == "safari" && parseInt(clientAgent.browser.version) < 3) {
        window.location = baseUrl + "browser-update.aspx";
    }

});