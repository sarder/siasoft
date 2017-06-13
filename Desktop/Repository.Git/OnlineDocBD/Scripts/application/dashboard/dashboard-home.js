var logedInUserID;
$(document).ready(function () {
    
    $("[id*=ancDashboard]").addClass("active");
    GetCodeBehindProperty();
    GetTotalUserOnline();
});

    setInterval(function(){ 
        //count total user online.  
        GetTotalUserOnline();
    }, 5000);

    function GetTotalUserOnline() {

       
        var param = "logInUserID=" + logedInUserID;
        $.getJSON(globalWCFUrl + "web/GetTotalUserOnline?" + param, {},
       
          function (data) {
              var totalUser = data.d.TotalUser[0].total_user_online;
              $("#spnTotalUserOnline").text(totalUser);
              
          });
    }
