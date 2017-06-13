function CloseNotificationMessage(elem) {

    $(elem).parent().children().first().html("");
    $(elem).parent().hide();
}

function ShowNotificationMessage(divMsgAreaID, spanMsgEelement, errorMessage, iconClass) {

    if (iconClass == "")
        iconClass = "warning";

    if (iconClass == 'close')
    { $("i").addClass("fa fa-close") }
    else if (iconClass == 'warning')
    { $("i").addClass("fa fa-info-circle") }
    else if (iconClass == 'success')
    { $("i").addClass("fa fa-check-circle") }

    $("#" + divMsgAreaID).show();
    $("#" + spanMsgEelement).html(errorMessage);
}

function ShowBdsNotificationMessage(divMessageContainerID, messageText){
    $(".dummy_notification_area").hide();
    $(divMessageContainerID).find("span").html(messageText);
    $(divMessageContainerID).removeClass("hidden");
    $(divMessageContainerID).show();
    $(divMessageContainerID).delay(5000).fadeOut('slow');
}


//All Notification Message

var USER_NOT_SELECT_MESSAGE = "Please choose a user, and then try again.";
var USER_SEARCH_TEXT_EMPTY_MESSAGE = "Enter at least one search parameter.";
var SERVICE_NOT_SELECT_MESSAGE = "Please choose a service, and then try again.";
var SERVICE_NOTE_NOT_SELECT_MESSAGE = "Please choose a note, and then try again.";

var EDOCUMENT_NOT_ROW_EDIT_MSG = "Choose a record, and then try again.";
var ISSUE_EDOCUMENT_DO_SOMETHING_MSG = "Choose a record, and then try again.";
var ISSUE_EDOCUMENT_DELETE_MSG = "Choose a record, and then try again.";
var ISSUE_EDOCUMENT_DELETE_SUCCESS_MSG = "Edoc has been deleted.";
var EDOCUMENT_INVALID_ROW_EDIT_MSG = "Please select this record, and then try again.";