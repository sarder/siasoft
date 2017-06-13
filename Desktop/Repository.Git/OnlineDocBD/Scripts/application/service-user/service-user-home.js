var notificationMessage;
var logedInUserID;

$(document).ready(function () {
    $("[id*=ancServiceUser]").addClass("active");
    GetCodeBehindProperty();
    LoadUserListViewByParam("");
    $("#txtSearchID").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

            return false;
        }
    });
});

$(window).load(function () {

    if (notificationMessage != "") {
        ShowBdsNotificationMessage("[id*=MainContent_divMessage]", notificationMessage);
    }
    document.onkeydown = function (event) {
        if (event.keyCode == 13) {
            SearchServiceUserList();
            return false;
        }
    }


    $(".su-close,#suSlideDetails").click(function () {
        $("#service-user-slide").css({ "right": "-360px" });
        $("#suSlideDetails").fadeOut(300, function () {
            $("#suSlideDetails").css({ "z-index": "-1" });
        });
        
    });

    $("[id*=chkNotification]").bootstrapSwitch({
        onText: 'On',
        offText: 'Off'
    });

});

function LoadUserListViewByParam(param) {
    //alert(param);

    $("#divUserListView").kendoGrid({
        dataSource:
          {
              transport: {
                  read: {
                      url: globalWCFUrl + "web/GetServiceUserList?" + param,
                      dataType: "json"

                  }
              },
              schema: {
                  data: "d.ServiceUserList",
                  total: "d.ServiceUserList.length",
                  model:
               {
                   id: "SERVICE_USER_ID"

               }
              },
              pageSize: 10
          },
        height: 640,
        reorderable: true,
        resizable: true,
        filterable: true,
        columnMenu: true,
        sortable: true,
        scrollable: {
            virtual: true
        },
        selectable: "multiple cell",
        allowCopy: true,
        pageable: {
            refresh: true,
            numeric: false,
            previousNext: false
        },
        columns: [
            {
                template: "#if(SERVICE_USER_IS_DECEASED==false) {#<div onclick='ShowSericeUserDetailsSlider(this);' style='cursor: pointer;'> <div class='customer-photo'" +
                                "style='background-image: url(../#: SERVICE_USER_AVATAR_URL #);'></div>" +
                            "<div class='customer-name'>#: SERVICE_USER_FIRST_NAME # #: SERVICE_USER_LAST_NAME #</div></div> #}# #if(SERVICE_USER_IS_DECEASED==true) {#<div onclick='ShowSericeUserDetailsSlider(this);' style='cursor: pointer;'> <div class='customer-photo'" +
                                "style='background-image: url(../images/bds-decased.png);background-size: 20px;background-repeat: no-repeat;'></div>" +
                            "<div class='customer-name'>#: SERVICE_USER_FIRST_NAME # #: SERVICE_USER_LAST_NAME #</div></div> #}#",
                field: "SERVICE_USER_FIRST_NAME",
                title: "Name",
                width: 60
            },
           {
               field: "SERVICE_USER_ID",
               title: "ID",
               width: 30
           },
           {
               field: "GENDER_NAME",
               title: "Gender",
               width: 35

           },
           {
               field: "SERVICE_USER_IS_RISK",
               title: "Risk",
               width: 35,
               template: "#if(SERVICE_USER_IS_RISK==true) {#<div class='risk-red'></div>#}else {#<div class='risk-green'></div>#}#"
           },
          {
              field: "SERVICE_USER_BIRTH_DATE",
              title: "DoB",
              width: 40,
              template: "#if(SERVICE_USER_BIRTH_DATE==null) {#<div >&nbsp;</div>#}else {##=kendo.toString(kendo.parseDate(SERVICE_USER_BIRTH_DATE, 'yyyy-MM-dd'), 'dd/MM/yyyy')##}#"
          },
          {
                field: "SERVICE_USER_AGE",
                title: "Age",
                width: 35,
                template: "#if(SERVICE_USER_BIRTH_DATE!=null) {# #: SERVICE_USER_AGE # #}#"

            },
            
            {
                field: "PCA_POSTAL_CODE",
                title: "Postcode",
                width: 45

            },
            {
                width: 60,
                command: [

              {
                  name: "Manage",
                  width: "30px",
                  template: "<a class='btn btn-primary grid-btn' id-index='2' click-mode='manage' onclick='ServiceUserCurrentSelectedIdClick(this);'>Manage</a>"
              }, // Manage
               {
                   name: "Edit",
                   width: "30px",
                   template: "<a class='btn btn-grey grid-btn' id-index='2' click-mode='edit' onclick='ServiceUserCurrentSelectedIdClick(this);'>Edit</a>"
               }, // Edit 
              {
                  name: "Delete",
                  template: "<a class='btn btn-grey-border grid-btn' id-index='2' click-mode='delete' onclick='ServiceUserCurrentSelectedIdClick(this);'>Delete</a>",
                  width: "30px",
              } // Delete 
              ]
        }
        
        ],
        change: function (e) {
            var gview = this.select();
            var selectedItem = this.dataItem(gview);
            var userFullName = selectedItem.SERVICE_USER_FIRST_NAME + " " + selectedItem.SERVICE_USER_LAST_NAME;
            $("[id*=hdnSuFirstName]").val(selectedItem.SERVICE_USER_FIRST_NAME);
            $("#spnFullName").text(userFullName);
            $("[id*=hdnSelectedServiceUserName]").val(userFullName);
            $("[id*=hdnBreadCrumbUserID]").val(selectedItem.SERVICE_USER_ID);
            GetServiceUserDetailsByID(selectedItem.SERVICE_USER_ID);
            
        },
        selectable: true

    });

}


function GetServiceUserDetailsByID(suID) {
    $("[id*=hdnSuDetailsID]").val(suID);
    $("[id*=btnSuDetailsClick]").click();
}

function ClearSearch() {
    $("[id*=MainContent_divMessage]").hide();
    EmptySearchResult()
    $("#divUserListView").empty();
    LoadUserListViewByParam("");
    $(".dummy_total_user").text("0");
    $("#divShowAfterSearch").hide();
    $("#divShowBeforeSearch").hide()
}

function EmptySearchResult() {

    $("#txtSearchID").val("");
    $("#inputFName").val("");
    $("#inputLName").val("");
    $("#inputPostcode").val("");
    $("[id*=hdnSelectedServiceUserName]").val("");
    $("[id*=hdnBreadCrumbUserID]").val("");
    $("#divSuDetails").hide();
    $("#divNotificationMessageArea").addClass("hidden");
}

function SearchAllServiceUserList() {
    $("[id*=MainContent_divMessage]").hide();
    EmptySearchResult();
    $("#divUserListView").empty();
    param = "logInUserID=" + logedInUserID + "&userId=&firstName=&lastName=&postCode=&isShowAll=true";
    LoadUserListViewByParam(param);
    GetGridElement();

}

function GetGridElement()
{
 
    var gridElements = $("#divUserListView").data("kendoGrid").dataSource;
    gridElements.fetch(function () {
        var total = gridElements.total();
        

        if (total > 0) {
            $("#divShowAfterSearch").show();
            $("#divShowBeforeSearch").hide();
            if (total > 1) {
                $(".dummy_total_user").text(total + " Results");
            } else {
                $(".dummy_total_user").text(total + " Result");
            }

        } else {
            $("#divShowAfterSearch").hide();
            $("#divShowBeforeSearch").show();
        }

        $("#divUserListView .k-pager-refresh.k-link").click();
    });
}


function SearchServiceUserList()
{
    $("#divSuDetails").hide();
    $("[id*=hdnSelectedServiceUserName]").val("");
    $("[id*=hdnBreadCrumbUserID]").val("");
    var totalInput = 0;
    $(".ensearch").each(function()
    {
        if ($.trim($(this).val()) != '')
        {
            totalInput++;
        }
    });

    if (totalInput < 1)
    {
        $("#divBottomMsg").text(USER_SEARCH_TEXT_EMPTY_MESSAGE);
        $("[id*=MainContent_divMessage]").show();
        $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
        $("#divUserListView").empty();
        LoadUserListViewByParam("");
        $(".dummy_total_user").text("0");
        return;
    }
    $("#divNotificationMessageArea").addClass("hidden");


    var inputID = $.trim($("#txtSearchID").val());
    var firstName = $.trim($("#inputFName").val());
    var lastName = $.trim($("#inputLName").val());
    var postCode = $.trim($("#inputPostcode").val());

    var clientID = (inputID != "" ? inputID : "");
    var fName = (firstName != "" ? firstName : "");
    var lName = (lastName != "" ? lastName : "");
    var pCode = (postCode != "" ? postCode : "");
    pCode = pCode.replace(/\s+/g, '');

    if (pCode.length > 3) {
        var len = pCode.length;
        pCode = pCode.substring(0, len - 3) + " " + pCode.substring(len - 3);

    }
    param = "logInUserID=" + logedInUserID + "&userId=" + clientID + "&firstName=" + fName + "&lastName=" + lName + "&postCode=" + pCode + "&isShowAll=false";
    $("#divUserListView").empty();
    LoadUserListViewByParam(param);
    GetGridElement();

    setTimeout(function () { 
    if (clientID != "") {
        $('#divUserListView .k-grid-content').highlight(clientID);
    }
    if (fName != "") {
        $('#divUserListView .k-grid-content').highlight(fName);
    }
    if (lName != "") {
        $('#divUserListView .k-grid-content').highlight(lName);
    }

    if (pCode != "") {
        $('#divUserListView .k-grid-content').highlight(pCode);
    }
    
    }, 2200);
    
    
}


function ServiceUserCurrentSelectedIdClick(event) {
    var rowIDIndex = $.trim($(event).attr("id-index"));
    var btnClickMode = $.trim($(event).attr("click-mode"));

    var userID = $(event).closest("tr").find("td:nth-child(" + rowIDIndex + ")").text();
    var selectedServiceUserID = GetCurrentSelectedIdByGridName("#divUserListView", "#divNotificationMessageArea");

  

    if (userID == selectedServiceUserID) {
        HideEdocumentNotificationMessage("#divNotificationMessageArea");
        if (btnClickMode == "manage") {
            $("[id*=btnManageUser]").click();
        }
        if (btnClickMode == "edit") {
            $("[id*=btnEditUser]").click();
        }
        if (btnClickMode == "delete") {
            
            $("[id*=btnDeleteServiceUser]").click();
        }

    } else {
        ShowEdocumentNotificationMessage("#divNotificationMessageArea", EDOCUMENT_INVALID_ROW_EDIT_MSG);
    }

    return false;
}


function GetCurrentSelectedIdByGridName(GridName, notificationMsgAreaID) {

    var gview = $(GridName).data("kendoGrid");

    if (typeof gview === 'undefined') {
        ShowEdocumentNotificationMessage(notificationMsgAreaID, EDOCUMENT_INVALID_ROW_EDIT_MSG);
        return false;
    }

    var selectedItem = gview.dataItem(gview.select());

    if (selectedItem === null) {
        ShowEdocumentNotificationMessage(notificationMsgAreaID, EDOCUMENT_INVALID_ROW_EDIT_MSG);
        return false;
    }

    var returnID = selectedItem.SERVICE_USER_ID;

    return returnID;
}



function ShowSericeUserDetailsSlider(event) {
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
    dataParam = "logInUserID=" + logedInUserID + "&serviceUserID=" + selectedSuID;
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