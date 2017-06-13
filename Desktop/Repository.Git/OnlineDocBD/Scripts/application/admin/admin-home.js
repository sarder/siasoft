var param;
var notificationMessage;
var logedInUserID;

$(document).ready(function () {

    $("[id*=ancAdminstration]").addClass("active");
    GetCodeBehindProperty();
    LoadUserListViewByParam("");

});

$(window).load(function () {

    if (notificationMessage != "") {
        $("#divNotificationMessage").text(notificationMessage);
        $("#divNotificationMessageArea").removeClass("hidden");
    }

    document.onkeydown = function (event) {
        if (event.keyCode == 13) {
            SearchUserList();
            return false;
        }
    }
});

function ClearSearch() {
    $("#inputID").val("");
    $("#inputFName").val("");
    $("#inputLName").val("");
    $("#divUserListView").empty();
   
    LoadUserListViewByParam("");
    $(".dummy_total_user").text("0");
    $("#divShowAfterSearch").hide();
    $("#divShowBeforeSearch").hide();
    $("#divNotificationMessageArea").addClass("hidden");
    $("[id*=MainContent_divMessage]").hide();
}


function SearchAllUserList() {

    ClearSearch();
    param = "logInUserID=" + logedInUserID + "&userId=&firstName=&lastName&isShowAll=true";
    LoadUserListViewByParam(param);
    GetGridleemnts();
}







function GetGridleemnts() {
    var gridElements = $("#divUserListView").data("kendoGrid").dataSource;

    gridElements.fetch(function () {
        var total = gridElements.total();
        $(".dummy_total_user").text(total);
        if (total > 0) {
            $("#divShowAfterSearch").show();
            $("#divShowBeforeSearch").hide();
        } else {
            $("#divShowAfterSearch").hide();
            $("#divShowBeforeSearch").show();
        }

    });
}
function SearchUserList() {


    var inputID = $.trim($("#inputID").val());
    var firstName = $.trim($("#inputFName").val());
    var lastName = $.trim($("#inputLName").val());

    var clientID = (inputID != "" ? inputID : "");
    var fName = (firstName != "" ? firstName : "");
    var lName = (lastName != "" ? lastName : "");
    $("#divNotificationMessageArea").addClass("hidden");

    if (clientID == "" & fName == "" & lName == "") {
       $("#divBottomMsg").text(USER_SEARCH_TEXT_EMPTY_MESSAGE);
        $("[id*=MainContent_divMessage]").show();
        $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
        $("#divUserListView").empty();
        LoadUserListViewByParam("");
        $(".dummy_total_user").text("0");
        return;
    }
    param = "logInUserID=" + logedInUserID + "&userId=" + clientID + "&firstName=" + fName + "&lastName=" + lName + "&isShowAll=false";
    $("#divUserListView").empty();
    LoadUserListViewByParam(param);

    GetGridleemnts();




}

function LoadUserListViewByParam(param) {


    $("#divUserListView").kendoGrid({
        dataSource:
        {
            transport: {
                read: {
                    url: globalWCFUrl + "web/GetUserList?" + param,
                    dataType: "json"
                }
            },
            schema: {
                data: "d.CilentList",
                total: "d.CilentList.length",
                model:
                {
                    id: "ID"

                }
            },
            pageSize: 15
        },
        height: 581,
        //groupable: true,
        sortable: true,
        autoBind: false,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
         {
             field: "ID",
             title: "ID",
             width: 40
             
         },
         {
             field: "Lock",
             title: "Locked",
             width: 50


         },

         {
             field: "FirstName",
             title: "First Names",
             width: 90

         },
           {
               field: "LastName",
               title: "Last Name",
               width: 90

           },
         {
             field: "UserEmail",
             title: "Email",
             width: 160
         },

        {
            field: "Expiredate",
            title: "Password expires on",
            width: 130,
            template: "#=kendo.toString(kendo.parseDate(Expiredate, 'yyyy-MM-dd'), 'dd/MM/yyyy')#"
        },
          {
              field: "Leaver",
              title: "Leaver",
              width: 50


          }
        ],
        //change: CheckRowSelectedInGrid,
        selectable: true,

    });

}



function CheckSelectedUser() {

    $("#divNotificationMessageArea").addClass("hidden");
    var gview = $("#divUserListView").data("kendoGrid");

    if (typeof gview === 'undefined') {
        return false;
    }

    var selectedItem = gview.dataItem(gview.select());

    if (selectedItem == null) {
        $("#divNotificationMessage").text(USER_NOT_SELECT_MESSAGE);
        $("#divNotificationMessageArea").removeClass("hidden");
        return false;
    }
    var userID = selectedItem.ID;
    var userFullName = selectedItem.FirstName + " " + selectedItem.LastName;
    $("[id*=hdnBreadCrumbUserID]").val(userID);
    $("[id*=hdnBreadCrumbUserName]").val(userFullName);

    return userID;
}

function UserSelectValidation() {

    var isUserSelect = CheckSelectedUser();

    if (isUserSelect == false) {
        return false;
    }
    return true;

}