
$(window).load(function () {

    $("input[type=text]").focusout(function () {
        CheckFieldValidAndChangeBorder(this);
    });

});

function CheckFieldValidAndChangeBorder(element) {
    isAllValid = true;
    valueInput = $.trim($(element).val());
    fieldType = (typeof $(element).attr("field-type") !== 'undefined') ? $(element).attr("field-type") : "";
    bubbleID = (typeof $(element).attr("bubble-id") !== 'undefined') ? $(element).attr("bubble-id") : "";
    validationType = (typeof $(element).attr("validiti-type") !== 'undefined') ? $(element).attr("validiti-type") : "";


    if ((typeof fieldType !== 'undefined') || fieldType !== null || fieldType !== '') {

        if (fieldType == "checkbox" && $(this).is(':checked') == false) {
            isAllValid = false;
        }

        if (fieldType != "checkbox") {

            if (((typeof valueInput === 'undefined') || valueInput == null || valueInput == '') && validationType == 'required') {

                isAllValid = false;

            } else {
                hdnFieldID = $.trim($(element).attr("hdnid"));

                if (typeof hdnFieldID !== 'undefined' && hdnFieldID != null && hdnFieldID != "") {

                    hdnValue = $.trim($("input[id*='" + hdnFieldID + "']").val());

                    if (hdnValue == "" || typeof hdnValue === 'undefined' || hdnValue == null) {
                        isAllValid = false;
                    }
                }

                if (fieldType == "date-field" && valueInput != "") {
                    validDate = kendo.parseDate(valueInput, "dd/MM/yyyy");
                    if (!validDate) {
                        isAllValid = false;
                    }
                }

                if (fieldType == "time-field" && valueInput != "") {
                    validTime = kendo.parseDate(valueInput, "HH:mm");
                    if (!validTime) {
                        isAllValid = false;
                    }
                }

                if (fieldType == "email-field" && !regExpEmail.test(valueInput) && valueInput != "") {
                    isAllValid = false;
                }

                if (fieldType == "mobile-field" && !regExpMobile.test(valueInput) && valueInput != "") {
                    isAllValid = false;
                }

                if (fieldType == "name-field" && !regExpName.test(valueInput) && valueInput != "") {
                    isAllValid = false;
                }
                if (fieldType == "ninumber-field" && valueInput != "") {
                    niIsValidValid = CheckNationalInsuranceNumber(valueInput);
                    if (niIsValidValid == false) {
                        isAllValid = false;
                    }
                }
            }
        }

    }


    if (validationType != "") {
        if (isAllValid == true) {
            $(element).closest("div").removeClass("bds-invalid");
            $(element).closest("div").addClass("bds-valid");
        } else {
            $(element).closest("div").removeClass("bds-valid");
            $(element).closest("div").addClass("bds-invalid");
        }
    }
}