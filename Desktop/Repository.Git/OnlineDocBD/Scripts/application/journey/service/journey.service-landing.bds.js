var recentServiceID;
var isBackFromAddEditPage;
var journeyBackFromModuleName;
var notificationMessage;

$(document).ready(function () {

    GetJourneyHomeCodeBehindPRoperty();
    GetBdsServiceAndAssociateItemHiddenFieldValueOnLoadTime();

    if (recentServiceID != "0") {
        ActiveRecentServiceTab();
    }
 
    $("[id*=hdnOptionSeletedValue]").val(0);
    $("[id*=hdnoptionSortSelectedValue]").val(2);
    $("[id*=hdnOptionUserSelectedValue]").val(0);
    
    
});

$(window).load(function(){

    if (notificationMessage != "") {
        ShowBdsNotificationMessage("[id*=MainContent_divMessage]", notificationMessage);
    }
    $(".su-close,#suSlideDetails").click(function () {
        $("#service-user-slide").css({ "right": "-360px" });
        $("#suSlideDetails").fadeOut(300, function () {
            $("#suSlideDetails").css({ "z-index": "-1" });
        });

    });

})


function GetBdsServiceAndAssociateItemHiddenFieldValueOnLoadTime(){

    journeyBackFromModuleName = $.trim($("[id*=hdnNoteBackFromModuleName]").val());

}



function DoServiceSelectValidation() {
    var serviceId = $.trim($("[id*=hdnSelectedServiceID]").val());
    if (serviceId == "") {
        ShowBdsNotificationMessage("[id*=MainContent_divMessage]", SERVICE_NOT_SELECT_MESSAGE)
        return false;
    }
}

function DoActiveServiceListByElement(element) {
    $(".dummy_journey_detailsClear").html("");
    $(".dummy_service_list").removeClass("active");
    $(element).addClass("active");
    serviceID = $.trim($(element).find(".dummy_service_id").text());
    
    $("[id*=hdnSelectedAdvocateId]").val($.trim($(element).find(".dummy_advocate_id").text()));
    $("[id*=hdnSelectedServiceID]").val(serviceID);
    $("[id*=hdnServiceDetailsID]").val(serviceID);
    $("[id*=btnServiceDetailsClick]").click();
    
}


function GoToEditNote(element) {
    var selecteNoteID = $.trim($(element).attr("note-id"));
    if (selecteNoteID != "") {
        $("[id*=hdnServiceNoteBreadCrumbID]").val(selecteNoteID);
        $("[id*=btnEditNote]").click();
    }
}

function GoToDeleteNote(element) {
    var selecteNoteID = $.trim($(element).attr("note-id"));
    if (selecteNoteID != "") {
        $("[id*=hdnServiceNoteBreadCrumbID]").val(selecteNoteID);
        $("[id*=btnDeleteNote]").click();
    }
}


function ActiveRecentServiceTab() {
    var intRecentServiceID = parseInt(recentServiceID);

    $("li.dummy_service_list").each(function () {
        listMatchID = parseInt($.trim($(this).children('.dummy_service_id').text()));
        if (intRecentServiceID == listMatchID) {
            serviceID = $(this).find(".dummy_service_id").text();
            $("[id*=hdnSelectedServiceID]").val(serviceID);
            $("[id*=hdnSelectedAdvocateId]").val($(this).find(".dummy_advocate_id").text());
            $(this).addClass("active");
            $("[id*=hdnSelectedServiceID]").val(serviceID);
            $("[id*=hdnServiceDetailsID]").val(serviceID);

            ExpandBdsServiceAssociateTab();

        }

    });

}


function ExpandBdsServiceAssociateTab() {

    if (journeyBackFromModuleName != "") {
        if (journeyBackFromModuleName == "note") {
            $(".dummy_service_associate_tab").removeClass("in active");
            $(".dummy_bdsservice_tabcontroler").removeClass("active");
            $("#tabBdsServiceNotes").addClass("in active");
            $(".dummy_note").addClass("active");
        }
    }
}


function ToggleNoteDetailsDivLessAndMore(element) {
    
    if ($(element).hasClass("btn btn-grey-border more-trigger collapsed dummy_note_trigger") || $(element).hasClass("btn btn-grey-border more-trigger dummy_note_trigger collapsed")) {
        $(".dummy_note_trigger").addClass("collapsed");
        $(".dummy_note_trigger").text("More...");
        $(element).text("Less...");
        $(element).removeClass("collapsed");
        $("p.dummy_doc_count").show();
        $(".dummy_note_collapse.collapse").removeClass("in");
        $(element).closest("div.dummy_parent_note").find("p.dummy_doc_count").hide();
    } else {
        $(element).text("More...");
        $("p.dummy_doc_count").show();
        $(element).closest("div.dummy_parent_note").find("p.dummy_doc_count").show();
    }
}

function UpdateNoteListByElement(element) {
    debugger;
    $(".dummy_notes_filter_clear").html("");
    var queryType = $.trim($(element).attr("query-type"));
    
    var serviceId = $.trim($("[id*=hdnSelectedServiceID]").val());

    if (queryType == "activity") {
        var optionValue = $.trim($(element).attr("data-id"));
        $("[id*=hdnOptionSeletedValue]").val(optionValue);
        $("#byNotes").text($(element).text());
    }

    if (queryType == "user") {
        var optionValue = $.trim($(element).find("span.dummy_notesort_userid").text());
        $("[id*=hdnOptionUserSelectedValue]").val(optionValue);      
        $("#byUsers").text($.trim($(element).find("span.dummy_notesort_username").text()));

    }

    if (queryType == "sort-by") {
        var optionValue = $.trim($(element).attr("data-id"));
        $("[id*=hdnoptionSortSelectedValue]").val(optionValue);
        $("#sortBy").text($(element).text());
        
    }

    $("[id*=hdnNoteListServiceID]").val(serviceId);
    $("[id*=hdnQueryType]").val(queryType);
    $("[id*=btnNoteListFilterClick]").click();
}

function ShowSericeUserDetailsSlider() {
    var suID = $.trim($(event).closest("td").next("td").text());
    BindServiceUserSliderPanelData(suID);
    setTimeout(function () {
        $("#service-user-slide").css({ "right": "0" });
        $("#suSlideDetails").css({ "z-index": "10000" });
        $("#suSlideDetails").fadeIn(300, function () {
        });

    }, 400);

}

function BindServiceUserSliderPanelData(selectedSuID) {
    var dataParam = "logInUserID=" + logedInUserID + "&serviceUserID=" + serviceUserID;
    sliderDataUrl = globalWCFUrl + "web/GetServiceUserDetailsInfo?" + $.trim(dataParam);
    $(".dummy_panel_reset").html("");
    var jqxhr = $.getJSON(sliderDataUrl,
        {
            format: "json"
        })
        .done(function (data, status, xhr) {

            if (data.d != null) {

                $("[id*=hdnSlSuID]").val(data.d.ServiceUserInfo.SERVICE_USER_ID);
                $("[id*=hdnSlSuName]").val(data.d.ServiceUserInfo.SERVICE_USER_FULL_NAME);
                $("#spnSuName").html(data.d.ServiceUserInfo.SERVICE_USER_FULL_NAME);
                $("#spnSuAge").html(data.d.ServiceUserInfo.GENDER_NAME + ", " + data.d.ServiceUserInfo.SERVICE_USER_AGE + " years old <br/> Added " + data.d.ServiceUserInfo.ADDED_BEFOR_DAYS + " by " + data.d.ServiceUserInfo.CREATED_NAME);
                if (data.d.ServiceUserInfo.SERVICE_USER_AVATAR_URL != null && data.d.ServiceUserInfo.SERVICE_USER_AVATAR_URL != "") {
                    $("#suDetailsAvatar").attr("src", baseUrl + data.d.ServiceUserInfo.SERVICE_USER_AVATAR_URL);
                } else {
                    $("#suDetailsAvatar").attr("src", baseUrl + "images/avatars/avatar_01.png");
                }

                if (data.d.ServiceUserInfo.SERVICE_USER_IS_RISK == true) {
                    $("#divSuRisk").removeClass("bds-green-circle");
                    $("#divSuRisk").addClass("bds-red-circle");
                    $("#divSuRiskDetails").html("<div class='margin-top-eight'>" + data.d.ServiceUserInfo.SERVICE_USER_RISK_NOTES + "</div>");
                    $(".bds-scroller").css({ "overflow-y": "scroll" });
                } else {
                    $(".bds-scroller").css({ "overflow-y": "hidden" });
                    $("#divSuRisk").addClass("bds-green-circle");
                    $("#divSuRisk").removeClass("bds-red-circle");
                    $("#divSuRiskDetails").html("<p class='su-slide-content margin-top-eight'>No risk recorded </p>");
                }

                if (data.d.ServiceUserInfo.SERVICE_USER_PHONE != null && data.d.ServiceUserInfo.SERVICE_USER_PHONE != "") {
                    $("#spnSuPhone").html(data.d.ServiceUserInfo.SERVICE_USER_PHONE + " (messages ok)");
                } else {
                    $("#spnSuPhone").html("(no messages)");
                }

                if (data.d.ServiceUserInfo.SERVICE_USER_MOBILE != null && data.d.ServiceUserInfo.SERVICE_USER_MOBILE != "") {
                    $("#spnSuMobile").html(data.d.ServiceUserInfo.SERVICE_USER_MOBILE + " (text or message ok)");
                } else {
                    $("#spnSuMobile").html("(no messages) (no text)");
                }

                if (data.d.ServiceUserInfo.SERVICE_USER_EMAIL != null && data.d.ServiceUserInfo.SERVICE_USER_EMAIL != "") {
                    $("#spnSuEmail").html(data.d.ServiceUserInfo.SERVICE_USER_EMAIL);
                } else {
                    $("#spnSuEmail").html("(no email)");
                }
                debugger;
                if (data.d.ServiceUserInfo.OPEN_SERVICE > 0 || data.d.ServiceUserInfo.CLOSE_SERVICE > 0) {

                    var startDateFull = kendo.parseDate(data.d.ServiceUserInfo.LAST_RECORD_DATE, 'dd/MM/yyyy hhmm');
                    var fullDateString = "";
                    if (startDateFull != null) {
                        var startDateDay = ((startDateFull.getDate()) >= 10) ? (startDateFull.getDate()) : '0' + (startDateFull.getDate());
                        var startDateMonth = ((startDateFull.getMonth() + 1) >= 10) ? (startDateFull.getMonth() + 1) : '0' + (startDateFull.getMonth() + 1);
                        var startDateYear = startDateFull.getFullYear();
                        fullDateString = startDateDay + " " + GetMonthNameByMonthNumber(parseInt(startDateMonth)) + " " + startDateYear;
                    }
                    $("#spnSuServices").html(data.d.ServiceUserInfo.SERVICE_USER_FIRST_NAME + " has " + data.d.ServiceUserInfo.OPEN_SERVICE + " open services and " + data.d.ServiceUserInfo.CLOSE_SERVICE + " closed services. <br/> <br/> The last recorded contact with " + data.d.ServiceUserInfo.SERVICE_USER_FIRST_NAME + " was on " + fullDateString);
                    $("[id*=lnkManageClick]").html("Manage");
                } else {
                    $("#spnSuServices").html("(None)");
                    $("[id*=lnkManageClick]").html("Add Service");
                }
            }
        })
        .fail(function (data, status, xhr) {
            return false;
        })
        .always(function () {
            return false;
        });
}
function GetMonthNameByMonthNumber(monthNumber) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var monthName = monthNames[monthNumber];
    return monthName;
}