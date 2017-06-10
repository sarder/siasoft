function AreYouSure(modalLink) {

    if (isShowPopupInAddEdit == true) {
    
        $("#divModalAreYouSeor").modal('show');
        $(".dummy_vlidation_hide").hide();
        $(".ifYes").click(function () {
            ClickYes(modalLink)
        });


        $(".ifNo").click(function () {
            ClickNo()
        });



    } else {

        window.location = modalLink;
    
    
    }

  

    
    $("html").css("overflow-y", "scroll");
}    

function ClickYes(Link) {

    $("[id*= hdnGotoUrlForHamberger]").val(Link);
    $("[id*= btnDeleteDefaultChild]").click();
    $("#divModalAreYouSeor").modal('hide');
}

    function ClickNo() {

        $("#divModalAreYouSeor").modal('hide');
        
    }