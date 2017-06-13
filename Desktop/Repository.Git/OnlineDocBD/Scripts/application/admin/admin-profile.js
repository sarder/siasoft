var userProfilePhotoUploder;
var notificationMsg;
$(document).ready(function(){

    GetCodeBehindProperty();
    isShowPopupInAddEdit = true;

    if (notificationMsg != "") {

        ShowBdsNotificationMessage("[id*=MainContent_divMessage]", notificationMsg);
        $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
       
    }

    userProfilePhotoUploder = $("[id*=imageUpload]").kendoUpload({
        async: {
            saveUrl: edocUploadPath,
            autoUpload: false
        },
        dropZone: ".dropZoneElement",
        select: function (e) {
            var fileReader = new FileReader();

            var files = e.files;
            for (var fileCntr = 0; fileCntr < files.length; fileCntr++) {
                if (files[fileCntr].size > 1000000) {
                    ShowBdsNotificationMessage("[id*=divUploadMsgArea]", "The file must be less than 1MB. Please choose a different image");
                    e.preventDefault();
                    return false;
                }else{
                }

            }
            fileReader.onload = function (event) {
                console.log(event);
                $(".k-button.k-upload-selected").remove();
                var mapImage = event.target.result;
                var iurl = event.target.result.substr(event.target.result.indexOf(",") + 1, event.target.result.length);

                $("[Id*=hdnCurrentUploadImageUrl]").val(mapImage);
                $("[Id*=hdnChangeImgUploadImageUrl]").val(iurl);

                ShowBdsNotificationMessage("[id*=divUploadMsgArea]", "File uploaded.");                
                $(".k-upload-files.k-reset").hide();
                $(".k-button.k-upload-selected").remove();
                $(".k-button.k-clear-selected").hide();
            }
           
            fileReader.readAsDataURL(e.files[0].rawFile);


        },
        multiple: false,
    }).data("kendoUpload");

    $(".k-button.k-upload-button span").html("<span style='color: #495678'>Drop files to attach, or</span> <span class='secondary-color'>browse</span>");


    $("[id*=txtMobile]").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46,32, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


});

$(window).load(function () {

    setTimeout(function () {
        isAllValid = DoValidationByClassNameAndMessageType(".dummy_details_required", bubbleTypeMessage, false);
    }, 50);


});

function CancelTheImage() {
    $("[Id*=hdnChangeImgUploadImageUrl]").val("");
    $("[Id*=hdnCurrentUploadImageUrl]").val("");
    $("#change_image").addClass("hidden");
    $(".box-overlay").addClass("hidden");
    $("[id*=divUploadMsgArea]").hide();
    return false;
}

function ChooseTheImage() {
    var selectedImageUrl = $(".dummy_avatar.active").find("img").attr("src");
    var browserImgUrl = $("[Id*=hdnCurrentUploadImageUrl]").val();
    if (browserImgUrl != "") {
        var HavebrowserImgUrl = $("[Id*=hdnChangeImgUploadImageUrl]").val();
        $("[id*=imgSelectedAvatar]").attr('src', browserImgUrl);
        $("[Id*=hdnHaveUploadImageUrl]").val(HavebrowserImgUrl);
        
    } else {

        $("[id*=imgSelectedAvatar]").attr('src', selectedImageUrl);
        $("[Id*=hdnHaveUploadImageUrl]").val("");
    }
    $("[Id*=hdnChangeImgUploadImageUrl]").val("");
    $("[Id*=hdnCurrentUploadImageUrl]").val("");

    $("[id*=hdnImageUrl]").val(selectedImageUrl);
    $("#change_image").addClass("hidden");
    $(".box-overlay").addClass("hidden");
    $("[id*=divUploadMsgArea]").hide();
    ShowBdsNotificationMessage("[id*=MainContent_divMessage]", "Picture chosen done.");
    $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
    
    return false;
}




function MyDetailsValidation(){
    $(".dummy_vlidation_hide").hide();
    var isAllValid = true;
    isAllValid = DoValidationByClassNameAndMessageType(".dummy_details_required", bubbleTypeMessage, true);

    return isAllValid;
}

    function AddressSaveValidation() {

        $(".dummy_vlidation_hide").hide();
        var isAllValid = true;
        isAllValid = DoValidationByClassNameAndMessageType(".dummy_address_required", bubbleTypeMessage, true);

        return isAllValid;
    }

    function ShowPassWordExistMessage() {

        $("#divBottomMsg").text("Password already used try with different one");
        $("[id*=MainContent_divMessage]").show();
        $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
        $(".tab-pane.fade").removeClass("in active");
        $("#changePass").addClass("in active");
        $(".dummy_profile_tab").removeClass("active");
        $("#liPassword").addClass("active");
    }

    function GetAdminNameShowInHeader() {
        var firstname = $.trim($("[id*=txtFName]").val());
        var lastname = $.trim($("[id*=txtLName]").val());

        if (firstname != "" || lastname != "") {
    
            $("#spnAdminHeader").html(" ");
            $("#spnAdminHeader").html(firstname + " " + lastname);
            $("#spnLoginUserName").html(firstname + " " + lastname);
            $("[id*=hdnadminAddEditName]").val("'" + firstname + " " + lastname + "'");

        }
        else {
            $("#spnAdminHeader").html(" ");
            $("#spnAdminHeader").html("User Name");
            $("#spnLoginUserName").html("User Name");
            

        }

    }