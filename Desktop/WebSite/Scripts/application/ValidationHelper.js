function ValidationMessageCustom(element) 
{
    msg = "";

    if (element.value == '') {

        if (typeof $(element).attr("required-msg") !== "undefined") {
            msg = $(element).attr("required-msg");
        }

        element.setCustomValidity(msg);
    }
    else {
        element.setCustomValidity('');
    }
    return true;
}

function ValidationMessageEmailCustom(element) 
{
    msg = "";

    if (element.value == '') 
    {
        if (typeof $(element).attr("required-msg") !== "undefined") 
        {
            msg = $(element).attr("required-msg");
        }

        element.setCustomValidity(msg);
    }
    else if (element.validity.typeMismatch) 
    {
        if (typeof $(element).attr("invalid-msg") !== "undefined") 
        {
            msg = $(element).attr("invalid-msg");
        }

        element.setCustomValidity(msg);
    }
    else {
        element.setCustomValidity('');
    }
    return true;

}


function SetValidationAttribute(element) {

    var value = $.trim($(element).val());

    if (value != "") {
        $(element).removeAttr("required");
    } else {
        $(element).attr("required", "required");
    }

}