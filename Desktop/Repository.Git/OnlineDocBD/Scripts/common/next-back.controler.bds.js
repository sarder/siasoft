function DoActiveThisTabByClassNameAndCurrentID(className, currentTabPanelID) {

    var validationClass;
    var currentTab;
    var visibleTabPanel;
    var isTabPanelValid = true;
 

    $(className).each(function () {
    
       $(".dummy_notification_area").hide();
        validationClass = $(this).children().attr("validation-class");
        currentTab = $(this).children().attr("current-tab");
        visibleTabPanel = $(this).children().attr("visible-tab");

        if (currentTabPanelID == currentTab) {
            isTabPanelValid = DoValidationByClassNameAndMessageType(validationClass, bubbleTypeMessage, false);
        } else {
            isTabPanelValid = DoValidationByClassNameAndMessageType(validationClass, bubbleTypeMessage, true);
        }
        
        
        if (isTabPanelValid == true) {
            $(className).removeClass("active");
            $(currentTab).addClass("active");
            $(".dummy_parent_tab.tab-pane.fade").removeClass("active in");
            $(visibleTabPanel).addClass("active in");
           
        } else {

            $(className).removeClass("active");
            $(currentTab).addClass("active");
            $(".dummy_parent_tab.tab-pane.fade").removeClass("active in");
            $(visibleTabPanel).addClass("active in");
            if (currentTabPanelID == currentTab) {
                $(".dummy_vlidation_hide").hide();
                return false;
            }
            return false;
        }

        if (currentTabPanelID == currentTab) {
            $(".dummy_vlidation_hide").hide();
            return false;
        }

    });
}


function GoToNextTabPanelAndDoFieldValidation(element) {
    debugger;
    $(".dummy_notification_area").hide();
    var isThisTabFieldValid = true;
    var tabControllClassName = ".dummy_toggle_tab";
    nextTabID = $.trim($(element).attr("next-tab"));
    visibleTab = $.trim($(element).attr("visible-tab"));
    validationClass = $.trim($(element).attr("validation-class"));
    currentTabId = $.trim($(element).attr("current-tab"));

    isThisTabFieldValid = DoValidationByClassNameAndMessageType(validationClass, bubbleTypeMessage, true);

    if (isThisTabFieldValid == true) {
        $(".dummy_toggle_tab ").removeClass("active");
        $(nextTabID).addClass("active");
        $(".dummy_parent_tab.tab-pane.fade").removeClass("active in");
        $(visibleTab).addClass("active in");
        $('html, body').animate({ scrollTop: $(visibleTab).offset().top -= 200 }, 300);
        
    } else {
        $('html, body').animate({ scrollTop: $(validationScrollAreaID).offset().top -= 200 }, 300);
    }

    GetProgressRangeForSpeceficPage(tabControllClassName, nextTabID, false, currentTabId); // Perticular page function handler
    
}


function GoToPreviousPanelByThisElement(element) {

    var tabControllClassName = ".dummy_toggle_tab";
    $(".dummy_notification_area").hide();
    $(".dummy_vlidation_hide").hide();
    prevtabID = $.trim($(element).attr("prev-tab"));
    visibleTab = $.trim($(element).attr("visible-tab"));
    currentTabId = $.trim($(element).attr("current-tab"));
    GetProgressRangeForSpeceficPage(tabControllClassName, prevtabID, false, currentTabId); // Perticular page function handler
    $(".dummy_tab ").removeClass("active");
    $(prevtabID).addClass("active");
    $(".dummy_parent_tab.tab-pane.fade").removeClass("active in");
    $(visibleTab).addClass("active in");
}