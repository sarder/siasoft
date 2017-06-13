var totalCompletPercentageValue = 100;
var totalProgressPanel = 0;
var panelCompleted = 0;
var isShowValidationMessage = true;


function DoProgressByTotalPanelAndCompletedPanelByID(totalProgressPanel, panelCompleted) {

    var progressCompleted = parseInt((totalCompletPercentageValue / totalProgressPanel) * panelCompleted);

    $("#spnBdsProgressText").text(progressCompleted);
    $("#spnbdsProgressBar").css({ "width": progressCompleted + "%" });
}





function GetProgressRangeForSpeceficPage(className, currentTabPanelID, isShowValidationMessage,getCurrentTabId) {
  
    var completeProgress = 0;
    var autoprogressAmount = 0;

    $(className).each(function () {
        debugger;
        validationClass = $(this).children().attr("validation-class");
        currentTab = $(this).children().attr("current-tab");
        visibleTabPanel = $(this).children().attr("visible-tab");

        isTabPanelValid = DoValidationByClassNameAndMessageType(validationClass, bubbleTypeMessage, isShowValidationMessage);
        
        if (isTabPanelValid == true) {           
            $(currentTab).addClass("completed");
        } else {
            $(currentTab).removeClass("completed");
            return false;
        }

        if (getCurrentTabId == currentTab) {
            return false;
        }

    });

    $(".completed").each(function () {       
         completeProgress = completeProgress + 1;
        });
   
    DoProgressByTotalPanelAndCompletedPanelByID(totalProgressPanel, completeProgress);

}