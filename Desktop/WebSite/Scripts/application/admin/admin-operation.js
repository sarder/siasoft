var jobTitleListComboBox;
var lineManagerListComboBox;
var logedInUserID;
var isEditMode;
var regExpEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var linemanagerID;
var jobTitleID;

$(document).ready(function () {
    $("[id*=ancAdminstration]").addClass("active");
    GetCodeBehindProperty();
    GetHiddenFieldValue();
    InitialzeUserProfileComboBox();
    InitializeUserSwitchs();
    
});

$(window).load(function () {
    SetComboBoxValue();
    InitializeLineMagerStatus();
});



function InitialzeUserProfileComboBox() {
    LoadJobTitleListComboBox();
    LoadLineManagerListComboBox();
}


function SetComboBoxValue() {
    jobTitleListComboBox.value(jobTitleID);
    lineManagerListComboBox.value(linemanagerID);
}


function InitializeUserSwitchs() {
    $("[id*=chkIsLineManager]").kendoMobileSwitch({
        onLabel: "YES",
        offLabel: "NO",
        change: InitializeLineMagerStatus
    });

    $("[id*=chkIsLeaver]").kendoMobileSwitch({
        onLabel: "YES",
        offLabel: "NO"
    });
}



function InitializeLineMagerStatus() {
    
    if ($("[id*=chkIsLineManager]").is(':checked')) {
        lineManagerListComboBox.enable();
        $(".dummy_linemanager").addClass("dummy_required bds_required");
    } else {
        lineManagerListComboBox.value("");
        lineManagerListComboBox.enable(false);
        $(".dummy_linemanager").removeClass("dummy_required bds_required");
    }
}



function GetHiddenFieldValue() {
    linemanagerID = $.trim($("[id*=hdnLineManagerListID]").val());
    jobTitleID = $.trim($("[id*=hdnJobTitleListID]").val());

}

function LoadJobTitleListComboBox() {

    param = "logInUserID=" + logedInUserID;

    $("[id*=txtCmbJobTitleList]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "JOB_TITLE_NAME",
        dataValueField: "JOB_TITLE_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetBDSJobTitleList?" + $.trim(param),
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.JobTitleList",
                model:
              {
                  id: "JOB_TITLE_ID"

              }
            }

        },

        suggest: true
    });

    jobTitleListComboBox = $("[id*=txtCmbJobTitleList]").data("kendoComboBox");

    jobTitleListComboBox.bind("change", function () {
        if (jobTitleListComboBox.selectedIndex === -1 && jobTitleListComboBox.value()) {

            $("[id*=hdnJobTitleListID]").val('');
            $("[id*=txtCmbJobTitleList]").addClass("dummy_required");
        }
        else {
            var cID = jobTitleListComboBox.value();
            $("[id*=hdnJobTitleListID]").val(cID);
            $("[id*=txtCmbJobTitleList]").removeClass("dummy_required");
        }
    });
}


function LoadLineManagerListComboBox() {

    param = "logInUserID=" + logedInUserID + "&userID=" + logedInUserID ;
    
    $("[id*=txtCmbLineManagerList]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "ManagerName",
        dataValueField: "USER_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetLineManager?" + $.trim(param),
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.UserList",
                model:
              {
                  id: ""

              }
            }

        },

        suggest: true
    });

    lineManagerListComboBox = $("[id*=txtCmbLineManagerList]").data("kendoComboBox");

    lineManagerListComboBox.bind("change", function () {
        if (lineManagerListComboBox.selectedIndex === -1 && lineManagerListComboBox.value()) {

            $("[id*=hdnLineManagerListID]").val('');
        }
        else {
            var cID = lineManagerListComboBox.value();
            $("[id*=hdnLineManagerListID]").val(cID);
        }
    });
}

function DoUserValidation() {

    var isValidationOk = true;

    isValidationOk = DoValidationByClassNameAndMessageType(".dummy_required",bubbleTypeMessage, true);

    if (isValidationOk == true) {
        CheckEmailExistAndDoFinalValidation();
    } else {
        return false;
    }

    return false;

}



function CheckEmailExistAndDoFinalValidation() {


    emailAddressEdit = $.trim($("[id*=hdnEmailAddress]").val());
    emailToCheck = $.trim($("[id*=txtEmail]").val());

    if (isEditMode == "true" && (emailAddressEdit != "" && emailAddressEdit != emailToCheck)) {
        CheckEmailAlreadyExist(emailToCheck);
    }
    else if (isEditMode == "false" && emailToCheck != "") {
        CheckEmailAlreadyExist(emailToCheck);
    } else {
        $("[id*=btnUserOperation]").click();
    }
    
}


function CheckEmailAlreadyExist(emailToCheck) {

    $.get(globalWCFUrl + "web/UserEmailExist?email=" + emailToCheck, function (response) {
        
        data = response.d;
        if (data == true) {
            $("#bubbleEmailMsg").text("Email already exist");
            $("#bubbleEmailMsg").show();
            return false;
        }
        else {
            $("[id*=btnUserOperation]").click();
        }


    }).error(function () {
        alert("sorry there was an error occurred try again.");
    });

}