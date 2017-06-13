
$(window).load(function () {

    RegisterEdocumentGridAndBtn();

});

function RegisterEdocumentGridAndBtn() {

    $("#btnEdocUpload").kendoUpload({
        async: {
            saveUrl: edocUploadPath,
            autoUpload: true
        },
        validation: {
            allowedExtensions: [".zip", ".wav", ".xlsx", ".docx", ".doc", ".pptx", ".mp4", ".jpeg", ".jpg", ".png", ".tiff", ".tif", ".MP3", ".pdf", ".msg", ".rtf", ".txt", ".wma"]
        },
        dropZone: ".dropZoneElement",
        success: onSuccessNoteEdoc,
        error: onErrorNoteEdoc,
        select: onSelectNoteEdoc,
        complete: onComplete
    });

    $(".k-widget.k-upload.k-header span").html("Drop files to attach, or <span class='upload-link' style='color: rgb(29, 175, 235) !important;'>browse.</span>");
    LoadEdocumentList();
}


function RefreshEdoc() {
    $("#divEdocumentsGrid .k-pager-refresh.k-link").click();
    $("#divNotificationArea").hide();
}


function onSuccessNoteEdoc(e) {
    ShowEdcoumentOnSuccessMessage(e, "#divNotificationArea", "#divEdocumentsGrid");
}

function onErrorNoteEdoc(e) {
    ShowEdocumentOnErrorMessage(e, "#divNotificationArea");
}

function onSelectNoteEdoc(e) {
    ShowEdocumentOnSelectMessage(e, "#divNotificationArea");
    return true;
}


function LoadEdocumentList() {
    $("#divEdocumentsGrid").empty();
    param = "logInUserId=" + defaultLoginUserID + "&entityTypeName=bdsservicenote&entityTypeID=" + defaultNoteID;
    LoadEdocumentDataGridByID(param);
}

// 

function LoadEdocumentDataGridByID(param) {

    var loadEdocsUrl = globalWCFUrl + "web/GetEDocumentsForEntityTypeAndEntityId?" + param;

    $("#divEdocumentsGrid").kendoGrid({
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
        scrollable: {
            virtual: true
        },
        pageable: {
            refresh: true,
            numeric: false,
            previousNext: false
        },

        requestStart: function () {
            displayBusy(true);
        },

        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        sortable: true,
       
        selectable: "multiple cell",
        allowCopy: true,
      


        requestEnd: function () {
            displayBusy(false);
        }
    },
        height: 526,
        resizable: true,
        filterable: true,
        sortable: true,
        scrollable: {
            virtual: true
        },
        selectable: "multiple cell",
        allowCopy: true,
        pageable: {
            refresh: true,
            numeric: false,
            previousNext: false
        },
        columns: [
    {
        field: "EDOC_ID",
        title: "ID",
        width: "60px"
    },
     {
         field: "EDOC_FILE_NAME",
         title: "File Path",
         width: "480px"
     },
     {
         field: "CREATED_DATE",
         title: "Added",
         width: "100px",
         template: "#=kendo.toString(kendo.parseDate(CREATED_DATE, 'yyyy-MM-dd'), 'dd/MM/yyyy')#"
     },
     {

         command: [

        {
            name: "View",
            click: function (event) {
                var clickedRow = this.dataItem($(event.currentTarget).closest("tr"));
                var currentId = clickedRow.EDOC_ID;
                var selectedEdocLinkID = GetSelectedEdocumentByGridName("#divEdocumentsGrid", "#divNotificationArea");

                if (currentId > 0 && selectedEdocLinkID > 0 && currentId != selectedEdocLinkID) {
                    ShowEdocumentNotificationMessage("#divNotificationArea", EDOCUMENT_INVALID_ROW_EDIT_MSG);
                }

                if (currentId == selectedEdocLinkID) {
                    GetEdocumentDownLoadUrlByDocID(currentId);
                }

                return false;
            },
            href: " "
        }, // View Edoc command btnHdnEdocView
        {
            name: "Delete",
            claick: function (event) {
                var clickedRow = this.dataItem($(event.currentTarget).closest("tr"));
                var currentId = clickedRow.EDOC_ID;
                var deleteEdocLinkID = GetSelectedEdocumentByGridName("#divEdocumentsGrid", "#divNotificationArea");

                if (currentId > 0 && deleteEdocLinkID > 0 && currentId != deleteEdocLinkID) {
                    ShowEdocumentNotificationMessage("#divNotificationArea", EDOCUMENT_INVALID_ROW_EDIT_MSG);
                }

                if (currentId == deleteEdocLinkID) {
                    ShowEdocumentModal("#divModalEdocDelete", "#divEdocumentsGrid", "#divNotificationArea", deleteEdocLinkID);
                }

            }
        } // Delete Edoc command btnHdnEdocDelete
         ]
     } // command 
        ],
        selectable: true
    });
}



