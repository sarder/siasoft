$(document).ready(function () {
    $(".dummy_toggle_deletebtn").attr("disabled", "disabled");
});

function DoEnableDeleteButton(element) {
    var inputValue = parseInt($.trim($(element).val()));
    var randomNumber = parseInt($.trim($(".dummy_random_number").text()));

    if (inputValue == randomNumber) {
        $(".dummy_toggle_deletebtn").removeAttr("disabled");
    } else {
        $(".dummy_toggle_deletebtn").attr("disabled", "disabled");
    }
}