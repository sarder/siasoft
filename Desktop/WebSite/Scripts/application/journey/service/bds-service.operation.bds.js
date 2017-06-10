var referralDatePicker;
var referralBackgroundEditor;
var circumastanceNotesEditor;
var decisionDatePicker;
var allocationDatePicker;
var clousreDatePicker;
var decisionHoursPicker;
var decisionMintesPicker;
var referrerMethodComboBox;
var refRelationshipToCLientComboBox;
var issueReferrForComboBox;
var decisionTypeComboBox;
var fundingAuthorityComboBox;
var allocationAdvocateComboBox;
var closureOutcomeComboBox;
var isEditMode;
var isDecisionDate;
var isColsureDate;


$(document).ready(function () {
    isShowPopupInAddEdit = true;
    totalProgressPanel = 8;
    GetCodeBehindPropertyForService();
    InitializeBdsServiceDatePicker();
    InitializeBdsServiceNumericPicker();
    InitializeBdsServiceKendoEditor();
    InitializeBdsServiceComboBox();
    InitializeBDSServiceSwitchs();
});

$(window).load(function () {
    ChangeFunctionCallInLoad();

    if (isEditMode == "true") {
        setTimeout(function () {
            GetProgressRangeForSpeceficPage(".dummy_toggle_tab", "", false);
        }, 400);
    }
});


function InitializeBdsServiceDatePicker() {

    referralDatePicker = $("[id*=txtClnDateOfReferral]").kendoDatePicker({ format: "dd/MM/yyyy" }).data("kendoDatePicker");
    decisionDatePicker = $("[id*=txtClnDecisionDate]").kendoDatePicker({ format: "dd/MM/yyyy" }).data("kendoDatePicker");
    allocationDatePicker = $("[id*=txtClnAllocataionDate]").kendoDatePicker({ format: "dd/MM/yyyy" }).data("kendoDatePicker");
    clousreDatePicker = $("[id*=txtClnClosure]").kendoDatePicker({ format: "dd/MM/yyyy" }).data("kendoDatePicker");

}

function InitializeBdsServiceNumericPicker() {
    decisionHoursPicker = $("[id*=txtNumDecisionHours]").kendoNumericTextBox({ format: "n0", min: 0, max: 23 }).data("kendoNumericTextBox");
    decisionMintesPicker = $("[id*=txtNumDecisionMinute]").kendoNumericTextBox({ format: "n0", min: 0, max: 59 }).data("kendoNumericTextBox");

}

function InitializeBdsServiceComboBox() {

    LoadReferrerMethodComboBox();
    LoadReferrerRelationshipToCLientComboBox();
    LoadIssueDecisionReferredFComboBox();
    LoadDecisionTypeComboBox();
    LoadFundingAuthorityComboBox();
    LoadAllocationAdvocateComboBox();
    LoadClosureOutcomeComboBox();

}


function InitializeBdsServiceKendoEditor() {

    // Describe the circumstances leading to the referral
    referralBackgroundEditor = $("[id*=txtArBackgrounds]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");

    // Circumstance Notes Editor
    circumastanceNotesEditor = $("[id*=txtArCircumstanceNotes]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");

}


// Create Combo Box For Bds Service

function LoadReferrerMethodComboBox() {  // Referral method Combo box 

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbReferrMethod]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_REFERRAL_METHOD_TYPE_NAME",
        dataValueField: "BDS_SERVICE_REFERRAL_METHOD_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceReferrerMethods?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsReferrerMethodList",
                model:
              {
                  id: "BDS_SERVICE_REFERRAL_METHOD_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    referrerMethodComboBox = $("[id*=txtCmbReferrMethod]").data("kendoComboBox");

    referrerMethodComboBox.bind("change", function () {
        if (referrerMethodComboBox.selectedIndex === -1 && referrerMethodComboBox.value()) {

            $("[id*=hdnReferrerMethod]").val('');
        }
        else {
            var cmbID = referrerMethodComboBox.value();
            $("[id*=hdnReferrerMethod]").val(cmbID);
        }
    });
}


function LoadReferrerRelationshipToCLientComboBox() {  // Relationship to client 

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbReferRelationship]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_RELATIONSHIP_TO_CLIENT_TYPE_NAME",
        dataValueField: "BDS_SERVICE_RELATIONSHIP_TO_CLIENT_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceRelationShipToClients?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsRelationShipToClientList",
                model:
              {
                  id: "BDS_SERVICE_RELATIONSHIP_TO_CLIENT_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    refRelationshipToCLientComboBox = $("[id*=txtCmbReferRelationship]").data("kendoComboBox");

    refRelationshipToCLientComboBox.bind("change", function () {
        if (refRelationshipToCLientComboBox.selectedIndex === -1 && refRelationshipToCLientComboBox.value()) {

            $("[id*=hdnReferRelationship]").val('');
        }
        else {
            var cmbID = refRelationshipToCLientComboBox.value();
            $("[id*=hdnReferRelationship]").val(cmbID);
        }
    });
}


function LoadIssueDecisionReferredFComboBox() {  // Decision Combo Box 

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbIssueReferFor]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_REFERRED_FOR_TYPE_NAME",
        dataValueField: "BDS_SERVICE_REFERRED_FOR_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceReferredForList?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsReferredForList",
                model:
              {
                  id: "BDS_SERVICE_REFERRED_FOR_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    issueReferrForComboBox = $("[id*=txtCmbIssueReferFor]").data("kendoComboBox");

    issueReferrForComboBox.bind("change", function () {
        if (issueReferrForComboBox.selectedIndex === -1 && issueReferrForComboBox.value()) {

            $("[id*=hdnIssueReferForId]").val('');
        }
        else {
            var cmbID = issueReferrForComboBox.value();
            $("[id*=hdnIssueReferForId]").val(cmbID);
        }
    });
}

function LoadDecisionTypeComboBox() {  // Decision Combo Box 

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbDecisionType]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_DECISION_TYPE_NAME",
        dataValueField: "BDS_SERVICE_DECISION_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceDecisions?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsDecisionList",
                model:
              {
                  id: "BDS_SERVICE_DECISION_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    decisionTypeComboBox = $("[id*=txtCmbDecisionType]").data("kendoComboBox");

    decisionTypeComboBox.bind("change", function () {
        if (decisionTypeComboBox.selectedIndex === -1 && decisionTypeComboBox.value()) {

            $("[id*=hdnDecisionId]").val('');
        }
        else {
            var cmbID = decisionTypeComboBox.value();
            $("[id*=hdnDecisionId]").val(cmbID);
        }
    });
}



function LoadFundingAuthorityComboBox() {  // Funding Authority ComboBox

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbFundingAuthority]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_FUNDING_AUTHORITY_TYPE_NAME",
        dataValueField: "BDS_SERVICE_FUNDING_AUTHORITY_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceFundingAuthorityList?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsFundingAuthoList",
                model:
              {
                  id: "BDS_SERVICE_FUNDING_AUTHORITY_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    fundingAuthorityComboBox = $("[id*=txtCmbFundingAuthority]").data("kendoComboBox");

    fundingAuthorityComboBox.bind("change", function () {
        if (fundingAuthorityComboBox.selectedIndex === -1 && fundingAuthorityComboBox.value()) {

            $("[id*=hdnFundingAuthority]").val('');
        }
        else {
            var cmbID = fundingAuthorityComboBox.value();
            $("[id*=hdnFundingAuthority]").val(cmbID);
        }
    });
}


function LoadAllocationAdvocateComboBox() {  // Allocation Advocate Combo Box

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmAdvocateList]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "ADVOCATE_NAME",
        dataValueField: "ADVOCATE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetServiceUserAdvocateTypes?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.AdvocateList",
                model:
              {
                  id: "ADVOCATE_ID"

              }
            }

        },

        suggest: true
    });

    allocationAdvocateComboBox = $("[id*=txtCmAdvocateList]").data("kendoComboBox");

    allocationAdvocateComboBox.bind("change", function () {
        if (allocationAdvocateComboBox.selectedIndex === -1 && allocationAdvocateComboBox.value()) {

            $("[id*=hdnAdvocateID]").val('');
        }
        else {
            var cmbID = allocationAdvocateComboBox.value();
            $("[id*=hdnAdvocateID]").val(cmbID);
        }
    });
}



function LoadClosureOutcomeComboBox() {  // Closure Outcome Combo Box

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtClosOutcomeList]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "BDS_SERVICE_CLOSE_REASON_TYPE_NAME",
        dataValueField: "BDS_SERVICE_CLOSE_REASON_TYPE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBdsServiceCloseReasons?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.BdsCloseReasonList",
                model:
              {
                  id: "BDS_SERVICE_CLOSE_REASON_TYPE_ID"

              }
            }

        },

        suggest: true
    });

    closureOutcomeComboBox = $("[id*=txtClosOutcomeList]").data("kendoComboBox");

    closureOutcomeComboBox.bind("change", function () {
        if (closureOutcomeComboBox.selectedIndex === -1 && closureOutcomeComboBox.value()) {

            $("[id*=hdnCloseOutComeID]").val('');
        }
        else {
            var cmbID = closureOutcomeComboBox.value();
            $("[id*=hdnCloseOutComeID]").val(cmbID);
        }
    });
}



function ChangeFunctionCallInLoad() {
    OnChangeDecisionSwitchEvent();
    OnChangeAllocateSwitch();
    OnChangeCloseSwitch();
}

//Initialize Switch Change Event
function InitializeBDSServiceSwitchs() {
    $("[id*=chkDecision]").bootstrapSwitch({
        onText: 'Yes',
        offText: 'No',
        onSwitchChange: OnChangeDecisionSwitchEvent
    });

    $("[id*=chkAllocate]").bootstrapSwitch({
        onText: 'Yes',
        offText: 'No',
        onSwitchChange: OnChangeAllocateSwitch
    });

    $("[id*=chkClose]").bootstrapSwitch({
        onText: 'Yes',
        offText: 'No',
        onSwitchChange: OnChangeCloseSwitch
    });
}

function OnChangeDecisionSwitchEvent() {

    if ($("[id*=chkDecision]").is(':checked')) {
        if (isDecisionDate != "true") {
            decisionDatePicker.value(new Date());
        }
        $("#divchkIssueDecision").show();
        $(".dummy_deciosion").addClass("dummy_required dummy_issuedeciosion_required");
    } else {
        decisionDatePicker.value("");
        decisionTypeComboBox.value("");
        fundingAuthorityComboBox.value("");
        decisionHoursPicker.value("");
        decisionMintesPicker.value("");
        isDecisionDate = "false";
        $("#divchkIssueDecision").hide();
        $(".dummy_deciosion").removeClass("dummy_required dummy_issuedeciosion_required");
    }

}


function OnChangeAllocateSwitch() {
    if ($("[id*=chkAllocate]").is(':checked')) {
        if (isAllocationDate != "true") {
            allocationDatePicker.value(new Date());
        }
        $(".dummy_toggle_allocate").show();
        $(".dummy_vlidation_hide").hide();
        
        $(".dumym_allocate").addClass("dummy_required dummy_allocationtab_required");
    } else {
        allocationDatePicker.value("");
        allocationAdvocateComboBox.value("");
        isAllocationDate="false"
        $(".dummy_toggle_allocate").hide();
        $(".dumym_allocate").removeClass("dummy_required dummy_allocationtab_required");
    }
}


function OnChangeCloseSwitch() {

    if ($("[id*=chkClose]").is(':checked')) {
        if(isColsureDate != "true"){
            clousreDatePicker.value(new Date());
        }
        $(".dummy_toggle_closure").show();
        $(".dummy_closeure").addClass("dummy_required dummy_closetab_required");
    } else {
        clousreDatePicker.value("");
        closureOutcomeComboBox.value("");
        isColsureDate= "false";
        $(".dummy_toggle_closure").hide();
        $(".dummy_closeure").removeClass("dummy_required dummy_closetab_required");
    }

}



function SaveBdsServiceAfterValidation(element) {
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

function DoBDSServiceValidation() {
    var isValidOk = true;
    $(".dummy_vlidation_hide").hide();
    var tabControllClassName = ".dummy_toggle_tab";
    GetProgressRangeForSpeceficPage(tabControllClassName, "", false);
    isValidOk = DoValidationByClassNameAndMessageType(".dummy_required", notificationTypeMessage, true);
    return isValidOk;
}

function SelectTabPanelByElement(element) {
    var currentTabName = $(element).attr("current-tab");
    var tabControllClassName = ".dummy_toggle_tab";
    GetProgressRangeForSpeceficPage(tabControllClassName, currentTabName, false);
    DoActiveThisTabByClassNameAndCurrentID(tabControllClassName, currentTabName);

}