var generaicInputRegEx = /^[A-Za-z 0-9 \- , # ._ ']+$/;
var emailRegEx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var usa_mexicoZipRegEx = /^\d{5}$|^\d{5}-\d{4}$/;

var isAllValid = true;
var eMailNotValid = true;
var message = "";




$(document).ready(function () {
    $(".bg-danger").html("");
});

function SetValidationAttribute(elem) {
    
    var thisVal = $.trim($(elem).val());
    $(elem).removeAttr("oninvalid", "");

    if (thisVal == "") {
        $(elem).attr("oninvalid", "this.setCustomValidity('Please enter your email address')");
    } else {
        //$(elem).removeAttr("oninvalid", "");
        var message = "'Please include an `@` in the email address. `" + thisVal + "`  is missing `@`.'";

        $(elem).attr("oninvalid", "this.setCustomValidity(" + message + ")");
    }
}


function DoValidation() {

    
    ClearMessage();

    isAllValid = true;
    eMailNotValid=true;

    $(".dummy_vld").each(function () {

        if ($.trim($(this).val()) == "" || $.trim($(this).attr("placeholder").toLowerCase()) == $.trim($(this).val().toLowerCase())) {
            isAllValid = false;
            DisplayErrorMessage($(this).attr("msg"));
        } else {
            CheckEmailFormatValidation();
        }

    });

    

    if (eMailNotValid == true) {

    $(".dummy_vldPass").each(function () {
        if ($.trim($(this).val()) == "" || $.trim($(this).attr("placeholder").toLowerCase()) == $.trim($(this).val().toLowerCase())) {
            isAllValid = false;
            DisplayErrorMessage($(this).attr("msg"));
        }
    });


    }

    return isAllValid;
}

function CheckEmailFormatValidation() {

    var trimValueEmail = $.trim($("[id*=txtEmail]").val());

    MatchWithRegularExpression(trimValueEmail, emailRegEx, ' ');
}


function MatchWithRegularExpression(valueToMatch, regExpression, errorMessage) {

    if (!regExpression.test(valueToMatch)) {
        ClearMessage();
        eMailNotValid = false;
    }

}


function ClearMessage() {

    $("[id*=MainContent_divMessage]").hide();
}


function DisplayErrorMessage(msg) {

    if (message == "") {
        message = "<span class='col-xs-12'>Incorrect fields.</span><span class='col-xs-12'>Please try again.</span>";
        //message = "<strong>Email and password required.</strong> ";
    }

    message = message + " ";

    $(".bg-danger").html(message);
    $("[id*=MainContent_divMessage]").show();
    $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
}

function ShowHideDiv() {
    var message = "";
    if (message == "") {
        message = "<strong>Account not recognised.</strong> ";
    }

    message = message + " ";

//    $(".bg-danger").html(message);
    $("[id*=MainContent_divMessage]").show();
    $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');

}