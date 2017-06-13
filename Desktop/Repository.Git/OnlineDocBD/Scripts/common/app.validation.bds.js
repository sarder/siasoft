var bubbleTypeMessage = "bubble";
var notificationTypeMessage = "notification";
var isShowValidationMessage = true;
var regExpEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regExpMobile = /^07[\s\d]+$/;
var regExpName = /^[a-zA-Z0-9 '\-\\s]{1,90}$/;
var validationScrollAreaID = "";
var specialOneRegEx = /[^a-zA-Z0-9]/;
var numberOneRegEx = /^(?=.*[0-9]).+$/;
var upperCaseRegEx = /^(?=.*[A-Z]).+$/;
var lowerCaseRegEx = /^(?=.*[a-z]).+$/;

function DoValidationByClassNameAndMessageType(className, messageType,isShowValidationMessage) {
   
    
    isAllValid = true;
    isBdsInvalid=true;
    valueInput = '';
    fieldType = ''; 
    bubbleID = '';
    var invalidFieldCount = 0;
    $(className).each(function () {
        debugger;
        isBdsInvalid = true;

        valueInput = $.trim($(this).val());
        id = $(this).attr("id");

        fieldType = (typeof $(this).attr("field-type") !== 'undefined') ? $(this).attr("field-type") : "";
        bubbleID = (typeof $(this).attr("bubble-id") !== 'undefined') ? $(this).attr("bubble-id") : "";
        defaultMessage = (typeof $(this).attr("msg") !== 'undefined') ? $(this).attr("msg") : "";
        exressionMessage = (typeof $(this).attr("exp-msg") !== 'undefined') ? $(this).attr("exp-msg") : "";
        validationType = (typeof $(this).attr("validiti-type") !== 'undefined') ? $(this).attr("validiti-type") : "";

        if ((typeof fieldType !== 'undefined') || fieldType !== null || fieldType !== '') {

            if (fieldType == "checkbox" && $(this).is(':checked') == false) {
                isAllValid = false;
                isBdsInvalid=false;
                ShowValidationMessage(bubbleID, defaultMessage, messageType, isShowValidationMessage);
            }

            if (fieldType != "checkbox") {

                if (((typeof valueInput === 'undefined') || valueInput == null || valueInput == '') && validationType =='required') {

                    isAllValid = false;
                    isBdsInvalid = false;
                    ShowValidationMessage(bubbleID, defaultMessage, messageType, isShowValidationMessage);

                } else {
                    hdnFieldID = $.trim($(this).attr("hdnid"));

                    if (typeof hdnFieldID !== 'undefined' && hdnFieldID != null && hdnFieldID != "") {

                        hdnValue = $.trim($("input[id*='" + hdnFieldID + "']").val());

                        if (hdnValue == "" || typeof hdnValue === 'undefined' || hdnValue == null) {
                            isAllValid = false;
                            isBdsInvalid = false;
                            ShowValidationMessage(bubbleID, defaultMessage, messageType, isShowValidationMessage);
                        }
                    }

                    if (fieldType == "date-field" && valueInput != "") {
                        validDate = kendo.parseDate(valueInput, "dd/MM/yyyy");
                        if (!validDate) {
                            isAllValid = false;
                            isBdsInvalid = false;
                            ShowValidationMessage(bubbleID, exressionMessage, messageType, isShowValidationMessage);
                        }
                    }

                    if (fieldType == "time-field" && valueInput != "") {
                        validTime = kendo.parseDate(valueInput, "HH:mm");
                        if (!validTime) {
                            isAllValid = false;
                            isBdsInvalid = false;
                            ShowValidationMessage(bubbleID, exressionMessage, messageType, isShowValidationMessage);
                        }
                    }

                    if (fieldType == "email-field" && !regExpEmail.test(valueInput) && valueInput != "") {
                        isAllValid = false;
                        isBdsInvalid = false;
                        ShowValidationMessage(bubbleID, exressionMessage, messageType, isShowValidationMessage);
                    }

                    if (fieldType == "mobile-field" && !regExpMobile.test(valueInput) && valueInput != "") {
                        isAllValid = false;
                        isBdsInvalid = false;
                        ShowValidationMessage(bubbleID, exressionMessage, messageType, isShowValidationMessage);
                    }

                    if (fieldType == "name-field" && !regExpName.test(valueInput) && valueInput != "") {
                        isAllValid = false;
                        isBdsInvalid = false;
                        ShowValidationMessage(bubbleID, exressionMessage, messageType, isShowValidationMessage);
                    }
                    if (fieldType == "ninumber-field" && valueInput != "") {
                        niIsValidValid = CheckNationalInsuranceNumber(valueInput);
                        if (niIsValidValid == false) {
                            isAllValid = false;
                            isBdsInvalid = false;
                            ShowValidationMessage(bubbleID, exressionMessage, messageType, isShowValidationMessage);
                        }
                    }
                }
            }

        }

        
        if (isAllValid == false) {
            invalidFieldCount = invalidFieldCount + 1;
        }


        if (validationType != "") {
            if (isBdsInvalid == true) {
                $(this).closest("div").removeClass("bds-invalid");
                $(this).closest("div").addClass("bds-valid");
            } else {
                $(this).closest("div").removeClass("bds-valid");
                $(this).closest("div").addClass("bds-invalid");
            }
        }

        if (isAllValid == false && invalidFieldCount == 1 && messageType == "bubble") {

            dynamicFocusID = $(this).attr("id");
            $("#" + dynamicFocusID).focus();
            validationScrollAreaID = $("#" + dynamicFocusID).attr("bubble-id");
            dynamicHdnID = $.trim($("#" + dynamicFocusID).attr("hdnid"));
            if (typeof dynamicHdnID !== 'undefined' && dynamicHdnID != null && dynamicHdnID != "") {
                $("#" + dynamicFocusID).parent().find(".k-input").focus();
            } else {
                $(this).focus();
            }
        }

    });

    return isAllValid;
}


function ShowValidationMessage(bubbleID, msgText, messageType, isShowValidationMessage) {

    if ((messageType == "bubble" || messageType == "") && isShowValidationMessage == true) {
        $(bubbleID).text(msgText);
        $(bubbleID).fadeIn(100);
    }

    if (messageType == "notification" && isShowValidationMessage == true) {
        $(".dummy_validation_message").text("Please provide all required field.");
        $(".dummy_notification_area").removeClass("hidden");
        $(".dummy_notification_area").show();
        
    }
    
    //$(bubbleID).show();
}


function CheckNationalInsuranceNumber(inputValue) {

    var exp1 = /^[A-CEGHJ-NOPR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D\s]{1}/i;
    var exp2 = /(^GB)|(^BG)|(^NK)|(^KN)|(^TN)|(^NT)|(^ZZ).+/i;

    if (inputValue.match(exp1) && !inputValue.match(exp2)) {
        return inputValue.toUpperCase()
    }
    else {
        return false;
    }
}


$(window).load(function() {

    $(".k-widget.k-multiselect.k-header").click(function () {
        var bblHideID = $.trim($(this).closest("div").find("select").attr("bubble-id"));
        $(bblHideID).hide();
    });


    $("input[type=text],input[type=password]").keypress(function () {
        var bubbleHideID = $.trim($(this).attr("bubble-id"));

        if (typeof bubbleHideID !== 'undefined' && bubbleHideID != null && bubbleHideID != "") {
            $(bubbleHideID).hide();
        } else {
            var combubbleHideID = $(this).closest("div").find("div.bds-bubble").attr("id");

            if (typeof combubbleHideID !== 'undefined' && combubbleHideID != null && combubbleHideID != "") {
                $("#" + combubbleHideID).hide();
            }
        }
        
    });

    $("input[type=text],input[type=password]").keydown(function () {
        var bubbleHideID = $.trim($(this).attr("bubble-id"));

        if (typeof bubbleHideID !== 'undefined' && bubbleHideID != null && bubbleHideID != "") {
            $(bubbleHideID).hide();
        } else {
            var combubbleHideID = $(this).closest("div").find("div.bds-bubble").attr("id");

            if (typeof combubbleHideID !== 'undefined' && combubbleHideID != null && combubbleHideID != "") {
                $("#" + combubbleHideID).hide();
            }
        }
    });

    $("input[type=text],input[type=password]").keyup(function () {

        var bubbleHideID = $.trim($(this).attr("bubble-id"));

        if (typeof bubbleHideID !== 'undefined' && bubbleHideID != null && bubbleHideID != "") {
            $(bubbleHideID).hide();
        } else {
            var combubbleHideID = $(this).closest("div").find("div.bds-bubble").attr("id");

            if (typeof combubbleHideID !== 'undefined' && combubbleHideID != null && combubbleHideID != "") {
                $("#" + combubbleHideID).hide();
            }
        }
    });

    $(".k-select").click(function () {

        var combubbleHideID = $(this).closest("div").find("div.bds-bubble").attr("id");

        if (typeof combubbleHideID !== 'undefined' && combubbleHideID != null && combubbleHideID != "") {
            $("#" + combubbleHideID).hide();
        }
    });

    $(".km-switch.km-widget").click(function () {

        var combubbleHideID = $(this).closest("div").parent().find("div.bds-bubble").attr("id");
        if (typeof combubbleHideID !== 'undefined' && combubbleHideID != null && combubbleHideID != "") {
            $("#" + combubbleHideID).hide();
        }
    });

});




function DoPasswordValidation() {

    $(".dummy_vlidation_hide").hide();
    var isValidatioOk = true;
    var IsCurrentIsOk = true;
    var IsNewIsOk = true;
    var IsConfirmIsOk = true;
    var currentPasswordText = $.trim($("[id*=txtCurrentPassword]").val());
    var newPasswordText = $.trim($("[id*=txtNewPassword]").val());
    var confirmPasswordText = $.trim($("[id*=txtConfirmPassword]").val());
    var hdnCurrentPassword = $.trim($("[id*=hdnLoginUserCurrentPassword]").val());

  

    if (currentPasswordText == "") {
        ShowValidationMessage("#bubbleCurrentPass", "Enter your current password.", bubbleTypeMessage, true);       
        isValidatioOk = false;
        IsCurrentIsOk = false;
    }

    if (newPasswordText == "") {
        ShowValidationMessage("#bubbleNewPass", "Enter your new password.", bubbleTypeMessage, true);
        isValidatioOk = false;
        IsNewIsOk = false;
    } else {
        IsNewIsOk = true;
    }
    if (confirmPasswordText == "") {
        ShowValidationMessage("#bubbleConfirmPass", "Confirm your new password.", bubbleTypeMessage, true);
        isValidatioOk = false;
        IsConfirmIsOk = false;
    } else {
        IsConfirmIsOk = true;
    }

    if (currentPasswordText !== "" && currentPasswordText != hdnCurrentPassword) {
        ShowValidationMessage("#bubbleCurrentPass", "The passwords you entered do not match.", bubbleTypeMessage, true);
        isValidatioOk = false;
        IsCurrentIsOk = false;
    }

    if ((newPasswordText != "" && confirmPasswordText != "") && newPasswordText != confirmPasswordText) {
        ShowValidationMessage("#bubbleNewPass", "The passwords you entered do not match.", bubbleTypeMessage, true);
        isValidatioOk = false;
        IsNewIsOk = false;
    }

    if ((newPasswordText != "" && confirmPasswordText != "") && (newPasswordText == confirmPasswordText) && (newPasswordText.length < 6 || confirmPasswordText.length < 6)) {
        ShowValidationMessage("#bubbleNewPass", "Your password must be at least 6 characters.", bubbleTypeMessage, true);
        isValidatioOk = false;
        IsNewIsOk = false;
    }

    if ((newPasswordText != "" && confirmPasswordText != "") && (newPasswordText == confirmPasswordText) && (newPasswordText.length >= 6 && confirmPasswordText.length >= 6) &&
        (newPasswordText.length >= 90 && confirmPasswordText.length >= 90)) {
        ShowValidationMessage("#bubbleNewPass", "Your password must be less than 90 characters.", bubbleTypeMessage, true);
        isValidatioOk = false;
        IsNewIsOk = false;
    }

    if (IsCurrentIsOk == false) {
        $("[id*=txtCurrentPassword]").closest("div").addClass("bds-invalid");
        $("[id*=txtCurrentPassword]").closest("div").removeClass("bds-valid");
    } else {
        $("[id*=txtCurrentPassword]").closest("div").removeClass("bds-invalid");
        $("[id*=txtCurrentPassword]").closest("div").addClass("bds-valid");
    }

    if ( IsNewIsOk == false) {
        $("[id*=txtNewPassword]").closest("div").addClass("bds-invalid");
        $("[id*=txtNewPassword]").closest("div").removeClass("bds-valid");
    } else {
        $("[id*=txtNewPassword]").closest("div").removeClass("bds-invalid");
        $("[id*=txtNewPassword]").closest("div").addClass("bds-valid");
    }

    if (IsConfirmIsOk == false) {
        $("[id*=txtConfirmPassword]").closest("div").addClass("bds-invalid");
        $("[id*=txtConfirmPassword]").closest("div").removeClass("bds-valid");
    } else {
        $("[id*=txtConfirmPassword]").closest("div").removeClass("bds-invalid");
        $("[id*=txtConfirmPassword]").closest("div").addClass("bds-valid");
    }


    return isValidatioOk;
}