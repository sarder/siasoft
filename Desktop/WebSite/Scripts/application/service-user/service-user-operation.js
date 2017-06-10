//Properties and variables
var suGenderID;
var suEthnicityID;
var suVulnerabilityListID;
var isEditMode;
var isDecasedDate;

var decasedDatePicker;
var dateOfBirthDatePicker;
var genderLsitComboBox;
var ethnicityLsitComboBox;
var contactNotesKendoEditor;
var riskNotesKendoEditor;
var vulnerabilityMultiSelect;
var serviceUserImageUploader;
var isImageSelected = false;

var mapLat = 52.957589;
var mapLong = -1.154958;

$(document).ready(function () {
    isShowPopupInAddEdit = true;
    totalProgressPanel = 5;
    GetValueFromHiddenField();
    InitializeServiceUserDatePicker();
    InitializeServiceUserMultiSelect();
    InitializeServiceUserComboBoxes();
    InitializeServiceUserKendoEditor();
    InitializeServiceUserSwitchs();
    
});

$(window).load(function () {
    GetCodeBehindProperty();
    OnChangeDecasedSwitchEvent();
    SetSeverUserComboBoxValue();
    SetServiceUserMultiSelectValue();
    RegisterSrviceUserImageUploader();
    InitialieServiceUserMap();
    if (isEditMode == "true") {
        VisibleMapTab();
        setTimeout(function () {
            GetProgressRangeForSpeceficPage(".dummy_toggle_tab", "", false);
        }, 400);
    }
});


//Function Initializer----------------
function InitializeServiceUserDatePicker() {
    dateOfBirthDatePicker = $("[id*=txtClnDateOfBirth]").kendoDatePicker({ format: "dd/MM/yyyy", max: new Date() }).data("kendoDatePicker");
    decasedDatePicker = $("[id*=txtClnDecasedNotifiedDate]").kendoDatePicker({ format: "dd/MM/yyyy" }).data("kendoDatePicker");
}

function InitializeServiceUserMultiSelect() {

    vulnerabilityMultiSelect = $("[id*=ddlMltVulnerability]").kendoMultiSelect().data("kendoMultiSelect");
    vulnerabilityMultiSelect.value("");
}

function ChangeMultiVulnerability(){
    var selectedValue = vulnerabilityMultiSelect.value();
    $("[id*=hdnMltVulnerabilityID]").val("");
    $("[id*=hdnMltVulnerabilityID]").val(selectedValue);
}

function InitializeServiceUserComboBoxes() {
    LoadGenderListComboBox();
    LoadEthnicityListComboBox();
}

function SelectTabPanelByElement(element) {
    var currentTabName = $.trim($(element).attr("current-tab"));
    var tabControllClassName = ".dummy_toggle_tab";
    GetProgressRangeForSpeceficPage(tabControllClassName, currentTabName, false, currentTabName);
    DoActiveThisTabByClassNameAndCurrentID(tabControllClassName, currentTabName);

}

function DoServiceUsrValidation() {
    var isValidOk = true;
    $(".dummy_vlidation_hide").hide();
    var tabControllClassName = ".dummy_toggle_tab";
    GetProgressRangeForSpeceficPage(tabControllClassName, "", false);
    isValidOk = DoValidationByClassNameAndMessageType(".dummy_required", notificationTypeMessage, true);
    return isValidOk;
}

function SaveServiceUserAfterValidation(element) {
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

function GetValueFromHiddenField() {
    suGenderID = $.trim($("[id*=hdnGenderListID]").val());
    suEthnicityID = $.trim($("[id*=hdnEthnicityListID]").val());
    suVulnerabilityListID = $.trim($("[id*=hdnMltVulnerabilityID]").val());
}

function SetSeverUserComboBoxValue() {
    genderLsitComboBox.value(suGenderID);
    ethnicityLsitComboBox.value(suEthnicityID);
}


function SetServiceUserMultiSelectValue() {
    if (suVulnerabilityListID != "") {
        var multiArrayVulnerability = suVulnerabilityListID.split(',');
        var resVulnerability = $.merge([], multiArrayVulnerability);
        vulnerabilityMultiSelect.value(resVulnerability);
    }
}





//Initialize Switch Change Event
function InitializeServiceUserSwitchs() {
    $("[id*=chkDecased]").bootstrapSwitch({
        onText: 'Yes',
        offText: 'No',
        onSwitchChange: OnChangeDecasedSwitchEvent
    });
}

function OnChangeDecasedSwitchEvent(){

    if ($("[id*=chkDecased]").is(':checked')) {
        decasedDatePicker.enable();
        if (isDecasedDate != "true") {
            decasedDatePicker.value(new Date());
        }
        
        $("[id*=txtDecasedNoteByName],[id*=txtClnDecasedNotifiedDate]").addClass(" dummy_required dummy_decased_required");
        $("[id*=txtDecasedNoteByName]").removeAttr("disabled");
    } else {
        decasedDatePicker.value("");
        decasedDatePicker.enable(false);
        isDecasedDate = "false";
        $("[id*=txtDecasedNoteByName]").attr("disabled", "disabled");
        $("[id*=txtDecasedNoteByName],[id*=txtClnDecasedNotifiedDate]").removeClass(" dummy_required dummy_decased_required");
    }
}



// Create Kendo Editor Widget

function InitializeServiceUserKendoEditor() {
    contactNotesKendoEditor = $("[id*=txtArContactNotes]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");

    riskNotesKendoEditor = $("[id*=txtArRiskNote]").kendoEditor({
        stylesheets: [
            kendoEditorStyle
        ],
        tools: kendoEditorToolsList,
        resizable: false
    }).data("kendoEditor");
}



//Create Kendo Combo Widget
function LoadGenderListComboBox() {

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbGenderList]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "SERVICE_USER_GENDER_TYPES__NAME",
        dataValueField: "SERVICE_USER_GENDER_TYPES__ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetServiceUserGenderTypes?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.ServiceUserGenderList",
                model:
              {
                  id: "SERVICE_USER_GENDER_TYPES__ID"

              }
            }

        },

        suggest: true
    });

    genderLsitComboBox = $("[id*=txtCmbGenderList]").data("kendoComboBox");

    genderLsitComboBox.bind("change", function () {
        if (genderLsitComboBox.selectedIndex === -1 && genderLsitComboBox.value()) {

            $("[id*=hdnGenderListID]").val('');
            SetServiceUserImageUrl("");
        }
        else {
            var cID = genderLsitComboBox.value();
            $("[id*=hdnGenderListID]").val(cID);
            SetServiceUserImageUrl(cID);
        }
    });
}

function SetServiceUserImageUrl(getGenderId) {

    var isHave = $("[id*=hdnIsDefaultImageHave]").val();
    var currentImg = $("[id*=hdnImageUrl]").val();
    var url = baseUrl
    var fullUrl=""

    if (isHave == "" && isEditMode != "true")
    {
    

        if (getGenderId == 1) {
            $("[id*=hdnImageUrl]").val(url + "images/avatars/avatar_04.png");
        }
        if (getGenderId == 2) {
            $("[id*=hdnImageUrl]").val(url + "images/avatars/avatar_02.png");
        }

        if (getGenderId == 3) {
            $("[id*=hdnImageUrl]").val(url + "images/avatars/avatar_01.png");
        }
        if (getGenderId == 4) {
            $("[id*=hdnImageUrl]").val(url + "images/avatars/avatar_01.png");
        }

        if (getGenderId == "") {
            $("[id*=hdnImageUrl]").val(url + "images/avatars/avatar_01.png");
            
        }

        fullUrl = ($("[id*=hdnImageUrl]").val());
        $("[id*=imgSelectedAvatar]").attr('src', fullUrl);

    }


}

function LoadEthnicityListComboBox() {

    param = $.trim("logInUserID=" + defaultLoginUserID);

    $("[id*=txtCmbEthnicityList]").kendoComboBox({
        placeholder: "Please choose",
        filter: "contains",
        dataTextField: "SERVICE_USER_ETHNICITY_TYPES_NAME",
        dataValueField: "SERVICE_USER_ETHNICITY_TYPES_ID",
        autoBind: true,
        selectable: true,
        dataSource: {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetServiceUserEthnicityTypes?" + param,
                    Type: "json",
                    serverFiltering: true
                }
            },
            schema: {
                data: "d.ServiceUserEthnicityList",
                model:
              {
                  id: "SERVICE_USER_ETHNICITY_TYPES_ID"

              }
            }

        },

        suggest: true
    });

    ethnicityLsitComboBox = $("[id*=txtCmbEthnicityList]").data("kendoComboBox");

    ethnicityLsitComboBox.bind("change", function () {
        if (ethnicityLsitComboBox.selectedIndex === -1 && ethnicityLsitComboBox.value()) {

            $("[id*=hdnEthnicityListID]").val('');
        }
        else {
            var cID = ethnicityLsitComboBox.value();
            $("[id*=hdnEthnicityListID]").val(cID);
        }
    });
}


function RegisterSrviceUserImageUploader(){
    serviceUserImageUploader = $("[id*=imageUpload]").kendoUpload({
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
                } else {
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

}


function SetServiceUserImageForPreview() {
    
    var selectedImageUrl = $(".dummy_avatar.active").find("img").attr("src");
    var browserImgUrl = $("[Id*=hdnCurrentUploadImageUrl]").val();
    if (browserImgUrl != "") {
        var HavebrowserImgUrl = $("[Id*=hdnChangeImgUploadImageUrl]").val();
        $("[id*=imgSelectedAvatar]").attr('src', browserImgUrl);
        $("[Id*=hdnHaveUploadImageUrl]").val(HavebrowserImgUrl);

    } else {

        $("[id*=imgSelectedAvatar]").attr('src', selectedImageUrl);
        $("[id*=hdnIsDefaultImageHave]").val(selectedImageUrl);
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

function CancelImageForPreview() {
    $("[Id*=hdnChangeImgUploadImageUrl]").val("");
    $("[Id*=hdnCurrentUploadImageUrl]").val("");
    $("#change_image").addClass("hidden");
    $(".box-overlay").addClass("hidden");
    $("[id*=divUploadMsgArea]").hide();
    return false;
}

function ResetImagePanel() {
    $("[Id*=hdnServiceUserImagePath]").val("");
    $("[Id*=hdnCurrentUploadImageUrl]").val("");
}



function InitialieServiceUserMap(mapLat,mapLong) {
    latLng = new google.maps.LatLng(mapLat, mapLong)
    mapObj = new google.maps.Map(document.getElementById('map-canvas'), {
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 14
    });

    var marker = new google.maps.Marker({
        position: latLng,
        visible: true
    });
    marker.setMap(mapObj);

}


function GetGeoInformationByPostCode(postcode) {

        var paramText = $.trim("logInUserID=" + defaultLoginUserID + "&Key=YB83-DK99-NU49-ME69&Postcode=" + postcode + "&UserName=INDIV58810");
       
        dataURL = globalWCFUrl + "web/GetPostCodeAddressGeoAndDistance?" + paramText;

        var jqxhr = $.getJSON(dataURL,
        {
            format: "json"
        })
        .done(function (data, status, xhr) {
           
            if (data.d != null) {
                $("[id*=txtDistanceFrom]").val("");
                $("[id*=txtCCgName]").val(data.d.CCGName);
                $("[id*=txtTravelTime]").val("");
                $("[id*=txtCCgRegion]").val(data.d.CCGRegionName);
                $("[id*=txtWard]").val(data.d.WardName);
                $("[id*=txtLatitude]").val(data.d.Latitude);
                $("[id*=txtDistrict]").val(data.d.DistrictName);
                $("[id*=txtLongitude]").val(data.d.Longitude);
                $("[id*=hdnSuLatitude]").val(data.d.Latitude);
                $("[id*=hdnSuLongitude]").val(data.d.Longitude);
                InitialieServiceUserMap(data.d.Latitude, data.d.Longitude);
            }
        })
        .fail(function (data, status, xhr) {
            return false;
        })
        .always(function () {
            return false;
        });
}

function VisibleMapTab() {
    
    setTimeout(function () { 
        var latitude = $.trim($("[id*=hdnSuLatitude]").val());
        var longitude = $.trim($("[id*=hdnSuLongitude]").val());
        InitialieServiceUserMap(latitude, longitude);
    }, 300);
    
}