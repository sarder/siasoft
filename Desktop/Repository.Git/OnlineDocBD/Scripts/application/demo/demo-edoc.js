function InitializeKendoUploadWidget() {

    $("#btnEdocUpload").kendoUpload({
        async: {
            saveUrl: edocUploadPath,
            autoUpload: true
        },
        validation: {
            allowedExtensions: [".zip", ".wav", ".xlsx", ".docx", ".doc", ".pptx", ".mp4", ".jpeg", ".jpg", ".png", ".tiff", ".tif", ".MP3", ".pdf", ".msg", ".rtf", ".txt", ".wma"]
        },
        dropZone: ".dropZoneElement",
        success: onSuccess,
        error: onError,
        select: onSelect,
        complete: onComplete
    });

    $(".k-widget.k-upload.k-header span").text("browse.");
    InitializeEdocumentGridWidget();
}

function RefreshEdoc() {

    $("#divEdocDataGrid .k-pager-refresh.k-link").click();
    CloseNotificationMessage($("[id*=spnEdocMessage]"));
}

function onSuccess(e) {

    isError = false;
    var successFiles = e.files;
    var xmlHttpReq = e.XMLHttpRequest;
    var files = e.files;
    var status = xmlHttpReq.status;
    var statusText = xmlHttpReq.statusText;
    var responseText = xmlHttpReq.responseText;

    EDOCUMENT_ADDED_SUCCESS_MSG = "A new attachment has been added."
    ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), EDOCUMENT_ADDED_SUCCESS_MSG, "success");
    $('#divEdocDataGrid').data('kendoGrid').dataSource.read();
    $(".k-upload-files.k-reset").find("li").remove();
    $("#divEdocDataGrid .k-pager-refresh.k-link").click();
} // onSuccess function end


function onError(e) {
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
        ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), EDOCUMENT_ADDED_FAIL_MSG, "warning");

    }
}



function onSelect(e) {
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
                ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), "File type " + fileExtension + " not allowed.", "warning");
            } else {
                CloseNotificationMessage($("[id*=spnEdocMessage]"));
                return true;
            }
        }
    }
    displayBusy(true);
    return true;
} // select


function getFileInfo(e) {
    return $.map(e.files, function (file) {
        var info = file.name;
        if (file.size > 0) {
            info += " (" + Math.ceil(file.size / 1024) + " KB)";
        }
        return info;
    }).join(", ");
} // getFileInfo

function onComplete(e) {

    if (isError == false) {

        displayBusy(false);
    }
}


function displayBusy(showBusy) {
    var element = $(".btn.btn-doc"); //   $("#divContainer");

    if (showBusy == true) {
        element.hide();
    }
    else {
        element.show();
    }
} // displayBusy



function InitializeEdocumentGridWidget() {

    param = $.trim("paramID=10932");
    LoadFormFillingNoteEdocumentDataGrid(param);
}


function LoadFormFillingNoteEdocumentDataGrid(param) {

    var loadEdocsUrl = "https://servicehostlive.caseworkerconnectonline.org/tmkendo/TMWCFApp.svc/web/GetEDocumentsForDayOppEtevTraining?" + param;

    //console.log(loadEdocsUrl);
    $("#divEdocDataGrid").kendoGrid({
        dataSource:
    {
        transport: {
            read: {
                url: loadEdocsUrl,
                dataType: "json"
            }
        },
        schema: {
            data: "d.DocumentList",
            total: "d.DocumentList.length",
            model:
        {
            id: "EDOC_ID"
        }
        },
        pageSize: 15,
        requestStart: function () {
            //displayBusy(true);
        },
        requestEnd: function () {
            //displayBusy(false);
        }
    },
        height: 332,
        //groupable: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
    {
        field: "EDOC_ID",
        title: "ID",
        width: "25px"
    },
     {
         field: "EDOC_FILE_NAME",
         title: "File Name",
         width: "180px"
     },

     {
         field: "CREATED_DATE",
         title: "Added",
         width: "100px",
         template: "#=kendo.toString(kendo.parseDate(CREATED_DATE, 'yyyy-MM-dd'), 'dd/MM/yyyy')#"
     },
     {
         width: "110px",

         command: [

        {
            name: "View",
            click: function (event) {
                var clickedRow = this.dataItem($(event.currentTarget).closest("tr"));
                var currentId = clickedRow.EDOC_ID;
                var viewEdocLinkID = GetRowEdocID();

                if (currentId == viewEdocLinkID && viewEdocLinkID > 0) {
                    ViewEdocument(viewEdocLinkID);
                } else {
                    ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), EDOCUMENT_INVALID_ROW_EDIT_MSG, "warning");
                }

            }
        }, // View Edoc command btnHdnEdocView
        {
        name: "Delete",
        click: function (event) {
            var clickedRow = this.dataItem($(event.currentTarget).closest("tr"));
            var currentId = clickedRow.EDOC_ID;
            var deleteEdocLinkID = GetRowEdocID();

            if (deleteEdocLinkID > 0 && deleteEdocLinkID == currentId) {

                $("#divModalEdocDelete").modal('show');

                $(".ifYes").click(function () {

                    $("#divModalEdocDelete").modal('hide');
                    DeleteEdocumentT(deleteEdocLinkID);
                });


                $(".ifNo").click(function () {

                    deleteEdocLinkID = 0
                    $("#divModalEdocDelete").modal('hide');
                    $('tr.k-state-selected', '#grid').removeClass('k-state-selected')

                    $('html, body').animate({ scrollTop: $("#diveDocuments").offset().top -= 80 }, 300);

                });

            } else {
                $('html, body').animate({ scrollTop: $("#diveDocuments").offset().top -= 80 }, 300);
                ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), EDOCUMENT_INVALID_ROW_EDIT_MSG, "warning");
            }

        }
    } // Delete Edoc command btnHdnEdocDelete
         ]
     } // command 
        ], // columns
        change: NoteEdocumentRowSelectInGrid,
        selectable: true
    });
} //  LoadIssueEdocuments



function NoteEdocumentRowSelectInGrid() {
    var gview = $("#divEdocDataGrid").data("kendoGrid");
    if (typeof gview === 'undefined') {
        return 0;
    }
    var selectedItem = gview.dataItem(gview.select());
    if (selectedItem === null) {
        return 0;
    }

    var edocumentID = selectedItem.EDOC_ID;
    //alert(edocumentID);
    return edocumentID;
} // checkEdocumentSelectInGrid



function ViewEdocument(edocID) {

    var viewEdocUrl = globalWCFUrl + "web/GetEDocumentLink?Id=" + edocID;
    //console.log("viewEdocUrl: " + viewEdocUrl); 
    if (edocID > 0) {
        $.get(viewEdocUrl, function (response) {
            //console.log(response);
            data = response.d;
            // alert(data.hyperlink);
            //console.log("View Edocument - hyperlink is: " + data.Hyperlink);
            if (data.Hyperlink === undefined) {
                alert("The requested Hyperlink is undefined and therefore not available.");
            }
            else {
                var win = window.open(data.Hyperlink, '_blank');
                win.focus();
            }
        }).error(function () {
            alert("sorry there was an error when attempting to view the eDocument for EdocId" + edocID);
        });
    }

} // ViewEdocument 



function DeleteEdocumentT(edocID) {
    var deleteEdocParam = "";
    var userId = "2";
    if (edocID > 0) {
        deleteEdocParam = "docId=" + edocID + "&userId=" + userId;
        displayBusy(true);
        $.get(globalWCFUrl + "web/DeleteEDocument?" + deleteEdocParam, function (response) {
            //console.log(response);
            data = response.d;
            //message here

            $('html, body').animate({ scrollTop: $("#diveDocuments").offset().top -= 80 }, 300);

            ISSUE_EDOCUMENT_DELETE_SUCCESS_MSG = "The attachment has been deleted. The id is " + edocID + "."
            ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), ISSUE_EDOCUMENT_DELETE_SUCCESS_MSG, "success");
            $("#divEdocDataGrid .k-pager-refresh.k-link").click();

        }).error(function () {
            alert("sorry there was an error when deleting an edocument");
        });
        displayBusy(false);
    }


} // DeleteEdocument



function GetRowEdocID() {

    var edocID = 0
    edocID = NoteEdocumentRowSelectInGrid();

    if (edocID < 1) {

        $('html, body').animate({ scrollTop: $("#diveDocuments").offset().top -= 80 }, 300);

        ShowNotificationMessage("divEdocMsgContainer", $("[id*=spnEdocMessage]").attr("id"), ISSUE_EDOCUMENT_DELETE_MSG, "");

        return 0;
    }

    return edocID;
} // GetRowEdocId
