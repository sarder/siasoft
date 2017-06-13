var generaicInputRegEx = /^[A-Za-z 0-9 \- , # ._ ']+$/;
var emailRegEx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var usa_mexicoZipRegEx = /^\d{5}$|^\d{5}-\d{4}$/;
var regExpEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

var isAllValid = true;
var message = "";

$(document).ready(function () {

    
});




function DoValidation() {
    ClearMessage();

    isAllValid = true;


    $(".dummy_vld").each(function () {
        if ($.trim($(this).val()) == "" || $.trim($(this).attr("placeholder").toLowerCase()) == $.trim($(this).val().toLowerCase())) {
            isAllValid = false;
            DisplayErrorMessage($(this).attr("msg"));
        }
    });

    return isAllValid;
}


function CheckEmailFormatValidation() {

    var trimValueEmail = $.trim($("[id*=txtEmail]").val());

    MatchWithRegularExpression(trimValueEmail, emailRegEx, ' ');
}


function MatchWithRegularExpression(valueToMatch, regExpression, errorMessage) {

    if (!regExpression.test(valueToMatch)) {
        isAllValid = false;
        DisplayErrorMessage(errorMessage);
    }

}


function ClearMessage() {
    $("[id*=MainContent_divMessage]").hide();
}


function DisplayErrorMessage(msg) {

    if (message == "") {
        //        message = "<strong>Enter your email address.</strong> ";
        message = "<span class='col-xs-12'>Incorrect field.</span><span class='col-xs-12'>Please try again.</span>";
    }

    message = message + " ";
    $(".bg-danger").html(message);
    $("[id*=MainContent_divMessage]").show();
    $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');

}