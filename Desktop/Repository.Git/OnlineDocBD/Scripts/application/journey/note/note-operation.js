
var noteHoursPicker;
var noteMintesPicker;
var noteDatePicker;
var travelTimeHoursPicker;
var travelTimeMinutesPicker;
var mileageNumberPicker;
var contactTypeListCmb;
var serviceNotesKendoEditor;
var adminNotesKendoEditor;
var logedInUserID;
var defaultNoteID;
var isEditMode;


$(document).ready(function () {
    totalProgressPanel = 4;
    GetCodeBehindProperty();
    InitializeAllNotesData();
    LoadContactTypeListCombo();
});

$(window).load(function () {
    if (isEditMode == "true") {
        var progressAmount = 100;
        setTimeout(function () {
            GetProgressRangeForSpeceficPage(".dummy_toggle_tab", "", false);
        }, 400);
    }
    else 
    {   
        $("[id*=txtClnNoteDate]").focusout();
    }
});


function InitializeAllNotesData() {

    noteHoursPicker = $("[id*=txtNumNoteHours]").kendoNumericTextBox({ format: "n0", min: 0, max: 23, placeholder: "0" }).data("kendoNumericTextBox");
    noteMintesPicker = $("[id*=txtNumNoteMinute]").kendoNumericTextBox({ format: "n0", min: 0, max: 59, placeholder: "0" }).data("kendoNumericTextBox");
    travelTimeHoursPicker = $("[id*=txtNumTravelTimeHours]").kendoNumericTextBox({ format: "n0", min: 0, max: 23, placeholder: "0" }).data("kendoNumericTextBox");
    travelTimeMinutesPicker = $("[id*=txtNumTravelTimeMinute]").kendoNumericTextBox({ format: "n0", min: 0, max: 59, placeholder: "0" }).data("kendoNumericTextBox");
    mileageNumberPicker = $("[id*=txtNumMileageNumber]").kendoNumericTextBox({ format: "n0", min: 0, max: 80000000, placeholder: "0" }).data("kendoNumericTextBox");
    txtFMSFeePoundPayrollService = $("[id*=txtNumExpenses]").kendoNumericTextBox({ format: "£0.00", placeholder: "£0.00", min: 0.00, decimals: 2 }).data("kendoNumericTextBox");
    
    noteDatePicker = $("[id*=txtClnNoteDate]").kendoDatePicker({ format: "dd/MM/yyyy" }).data("kendoDatePicker");


    serviceNotesKendoEditor = $("[id*=txtServiceNoteEditor]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");

    adminNotesKendoEditor = $("[id*=txtArAdminNotes]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");
     

}





function LoadContactTypeListCombo() {
    param = $.trim("logInUserID=" + defaultLoginUserID);
    $("[id*=txtCmbContactType]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_NOTE_CONTACT_TYPE_NAME",
        dataValueField: "BDS_SERVICE_NOTE_CONTACT_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceNoteContactList?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsNoteContactList",
                model:
              {
                  id: "BDS_SERVICE_NOTE_CONTACT_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    contactTypeListCmb = $("[id*=txtCmbContactType]").data("kendoComboBox");

    contactTypeListCmb.bind("change", function () {
        if (contactTypeListCmb.selectedIndex === -1 && contactTypeListCmb.value()) {

            $("[id*=hdnContactTypeValue]").val('');
        }
        else {
            var cID = contactTypeListCmb.value();
            $("[id*=hdnContactTypeValue]").val(cID);
        }
    });
}

function SelectTabPanelByElement(element) {
    var currentTabName = $(element).attr("current-tab");
    var tabControllClassName = ".dummy_toggle_tab";
    GetProgressRangeForSpeceficPage(tabControllClassName, currentTabName, false);
    DoActiveThisTabByClassNameAndCurrentID(tabControllClassName, currentTabName);

}

function SaveServiceAfterValidation(element) {

    var isThisTabFieldValid = true;
    var isValidOk = true;
    var tabControllClassName = ".dummy_toggle_tab";
    validationClass = $.trim($(element).attr("validation-class"));
    nextTabID = $.trim($(element).attr("next-tab"));
    isThisTabFieldValid = DoValidationByClassNameAndMessageType(validationClass, bubbleTypeMessage, true);
    GetProgressRangeForSpeceficPage(tabControllClassName, nextTabID, false); // Perticular page function handle

    if (isThisTabFieldValid == true) {
        $(".dummy_vlidation_hide").hide();
        isValidOk = DoValidationByClassNameAndMessageType(".dummy_required", bubbleTypeMessage, true);
    } else {
        isValidOk = false;
    }

    return isValidOk;

}


function DoServiceNoteValidation() {

    var isValidOk = true;
    $(".dummy_vlidation_hide").hide();
    var tabControllClassName = ".dummy_toggle_tab";
    GetProgressRangeForSpeceficPage(tabControllClassName, "", false);
    isValidOk = DoValidationByClassNameAndMessageType(".dummy_required", notificationTypeMessage, true);
    return isValidOk;
}