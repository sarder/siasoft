
var EDOCUMENT_NOT_ROW_EDIT_MSG = "Choose a record, and then try again.";
var EDOCUMENT_INVALID_ROW_EDIT_MSG = "Please select this record, and then try again.";
var edocumentModalName;

function GetEdocumentIDFromElement(element) {

    recentDocID = $.trim($(element).attr('noteid'));
    GetEdocumentDownLoadUrlByDocIDAndElementName(recentDocID, element);
    return false;
}


function GetEdocumentDownLoadUrlByDocIDAndElementName(documentID,elementName) {

    var docParam = "logInUserId=" + defaultLoginUserID + "&edocId=" + documentID;

    var viewEdocUrl = globalWCFUrl + "web/GetEdocumentDownloadUrl?" + docParam;

    if (documentID > 0) {
        $.get(viewEdocUrl, function (response) {
            data = response.d;
            if (data.Hyperlink === undefined || data.Hyperlink == null) {
                alert("The requested Hyperlink is undefined and therefore not available.");
            }
            else {
                var win = window.open(data.Hyperlink, '_blank');
                win.focus();
                elementForName = $.trim($(elementName).attr('element-for'));
                if (elementForName != "" && elementForName == "note-list") {
                    setTimeout(function () {
                       var elementColapsedID =  $(elementName).closest("div.dummy_parent_note").find(".collapse.dummy_note_collapse").attr("id");
                       $("#" + elementColapsedID).addClass("in");
                    }, 300);
                }
                return false;
            }
        }).error(function () {
            alert("sorry there was an error when attempting to view the eDocument for EdocId" + edocID);
            return false;
        });
    }

}

function GetEdocumentDownLoadUrlByDocID(documentID) {

    var docParam= "logInUserId=" + defaultLoginUserID +"&edocId=" + documentID;

    var viewEdocUrl = globalWCFUrl + "web/GetEdocumentDownloadUrl?" + docParam;
    
    if (documentID > 0) {
        $.get(viewEdocUrl, function (response) {
            data = response.d;
            if (data.Hyperlink === undefined || data.Hyperlink == null) {
                alert("The requested Hyperlink is undefined and therefore not available.");
            }
            else {
                var win = window.open(data.Hyperlink, '_blank');
                win.focus();
                return false;
            }
        }).error(function () {
            alert("sorry there was an error when attempting to view the eDocument for EdocId" + edocID);
            return false;
        });
    }

}


function DeleteSelectedEdocumentByID(modalName, edocumentGridName, notificationAreaID, edocumentID) {

    var deleteEdocParam = "";
    if (edocumentID > 0) {
        deleteEdocParam = "logInUserId=" + defaultLoginUserID + "&eDocId=" + edocumentID;
        displayBusy(true);
        $.get(globalWCFUrl + "web/DeleteEDocument?" + deleteEdocParam, function (response) {
            console.log(response);
            data = response.d;
            var edocDeleteMessage = "The edoc has been deleted. The id is " + edocumentID + ".";
            ShowEdocumentNotificationMessage(notificationAreaID, edocDeleteMessage);
            $(edocumentGridName + " .k-pager-refresh.k-link").click();
            $(modalName).modal('hide');
            return false;
        }).error(function () {
            //alert("sorry there was an error when deleting an edocument");
        });
        displayBusy(false);
    }
}


function GetSelectedEdocumentByGridName(edocGridName,notificationMsgAreaID) {

    var gview = $(edocGridName).data("kendoGrid");
    HideEdocumentNotificationMessage(notificationMsgAreaID);

    if (typeof gview === 'undefined') {
        ShowEdocumentNotificationMessage(notificationMsgAreaID, EDOCUMENT_NOT_ROW_EDIT_MSG);
        return false;
    }

    var selectedItem = gview.dataItem(gview.select());

    if (selectedItem === null) {
        ShowEdocumentNotificationMessage(notificationMsgAreaID, EDOCUMENT_NOT_ROW_EDIT_MSG);
        return false;
    }

    var edocumentID = selectedItem.EDOC_ID;

    return edocumentID;
}


function ShowEdocumentNotificationMessage(notificationMsgAreaID, messageText) {
    $(notificationMsgAreaID + " span").text(messageText);
    $(notificationMsgAreaID).removeClass("hidden");
    $(notificationMsgAreaID).show();
}

function HideEdocumentNotificationMessage(notificationMsgAreaID) {
    $(notificationMsgAreaID).hide();
}

function ShowEdocumentModal(modalName, edocGridName, notificationAreaID, edocumetnID) {
    $(modalName).modal('show');
    
    $(".dummy_doc_yes").click(function () {
        DeleteSelectedEdocumentByID(modalName, edocGridName, notificationAreaID, edocumetnID);
    });

    $(".dummy_doc_no").click(function () {
        $(modalName).modal('hide');
    });
}


function displayBusy(showBusy) {
    var element = $(".btnadsf");

    if (showBusy == true) {
        element.hide();
    }
    else {
        element.show();
    }
} // displayBusy

function onComplete(e) {

    if (isError == false) {

        displayBusy(false);
    }
}

function ShowEdcoumentOnSuccessMessage(e, notificationMsgAreaID, gridNameID) {
    isError = false;
    var successFiles = e.files;
    var xmlHttpReq = e.XMLHttpRequest;
    var files = e.files;
    var status = xmlHttpReq.status;
    var statusText = xmlHttpReq.statusText;
    var responseText = xmlHttpReq.responseText;

    ShowEdocumentNotificationMessage(notificationMsgAreaID, "A new edoc has been added.")

    $(gridNameID + " .k-pager-refresh.k-link").click();

    $(".k-upload-files.k-reset").find("li").remove();
}

function ShowEdocumentOnErrorMessage(e, notificationMsgAreaID) {

    isError = true;
    //console.log("FAILED");
    var msg = "";
    var xmlHttpReq = e.XMLHttpRequest;
    var files = e.files;
    var status = xmlHttpReq.status;
    var statusText = xmlHttpReq.statusText;
    var responseText = xmlHttpReq.responseText;

    if (status != "200" || responseText != null) {
        if (e.operation == "upload") {
            msg = "Failed to upload, error is: " + responseText;
        } else {
            msg = "Failed on upload, error is: " + responseText;
        }
    } // status 


    EDOCUMENT_ADDED_FAIL_MSG = "File upload failed, error is: " + responseText + ".";

    if (msg != "") {

        ShowEdocumentNotificationMessage(notificationMsgAreaID, EDOCUMENT_ADDED_FAIL_MSG);

    }
}


function ShowEdocumentOnSelectMessage(e, notificationMsgAreaID) {
    var files = e.files;

    if (files.length > 5) {
        alert("Maximum of 5 files can be uploaded at a time.");
        e.preventDefault();
        return false;
    }
    for (var fileCntr = 0; fileCntr < files.length; fileCntr++) {
        if (files[fileCntr].size > 10485760) {
            alert("File size more than 10MB can not be uploaded.");
            e.preventDefault();
            return false;
        }

        var extensionList = ".zip,.wav,.xlsx,.docx,.doc,.pptx,.mp4,.jpeg,.jpg,.png,.tiff,.tif,.mp3,.pdf,.msg,.rtf,.txt,.wma";
        var fileExtension = files[fileCntr].extension.toLowerCase();

        var arrayExt = extensionList.split(',');

        var extensionValid = true;

        for (var i = 0; i < arrayExt.length; i++) {

            if (fileExtension != arrayExt[i]) {
                ShowEdocumentNotificationMessage(notificationMsgAreaID, "File type " + fileExtension + " not allowed.");
                $(".k-upload-files.k-reset").find("li").remove();
            } else {
                HideEdocumentNotificationMessage(notificationMsgAreaID);
                return true;
            }
        }
    }

    displayBusy(true);
}



function EdocumentModalDeleteButtonClick(element){


}