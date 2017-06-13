var isZoomInDivHeight = false;

function DoZoomInOrOut(parentDivName, iconElem, dummyZoomClassName) {

    var issueDivWidth = $(iconElem).width();
    var classNames = $(iconElem).attr("class");
    var collapsClass = $("#" + parentDivName + " .panel-title a").attr("class");
    //alert("parent div:" + parentDivName);



    if (classNames.search(/zoom-in-icon/i) > -1) {
        //This is a global varibale. It is declared in section-manage.aspx page
        isZoomInGlobal = true;


        $(iconElem).removeClass("zoom-in-icon");
        $(iconElem).addClass("zoom-out-icon");
        $(iconElem).parent().parent().addClass("full-width-zoom");
        $(iconElem).parent().parent().removeClass("crsContainer");

        $("." + dummyZoomClassName).each(function () {
            var zoomClassPresentHeight = $(this).height();

            $(this).height(zoomClassPresentHeight + 100);
            zoomInDivHeight = zoomClassPresentHeight + 60;

            $("." + dummyZoomClassName + " .k-grid-content").height(zoomClassPresentHeight + 60);

        });

        $('html, body').animate({ scrollTop: $("#" + parentDivName).offset().top -= 80 }, 'slow');
    }
    else if (classNames.search(/zoom-out-icon/i) > -1) {

        //This is a global varibale. It is declared in section-manage.aspx page
        isZoomInGlobal = false;


        $(iconElem).removeClass("zoom-out-icon");
        $(iconElem).addClass("zoom-in-icon");
        $(iconElem).parent().parent().removeClass("full-width-zoom");
        $(iconElem).parent().parent().addClass("crsContainer");
        $("." + dummyZoomClassName).each(function () {
            var zoomClassPresentHeight = $(this).height();

            $(this).height(zoomClassPresentHeight - 100);
            $("." + dummyZoomClassName + " .k-grid-content").height(zoomClassPresentHeight - 60);
        });

    }

    if (collapsClass !== "") {
        $("#" + parentDivName + " .panel-title a").click();

    }

    isZoomInDivHeight = true;
} //end function




function ZoomInZoomOutForPrevNextArrow(parentDivName, iconElem, dummyZoomClassName, IsZoomIn) {

    var issueDivWidth = $(iconElem).width();
    var classNames = $(iconElem).attr("class");



    if (IsZoomIn == true) {

        $(iconElem).removeClass("zoom-in-icon");
        $(iconElem).addClass("zoom-out-icon");
        $(iconElem).parent().parent().addClass("full-width-zoom");
        $(iconElem).parent().parent().removeClass("crsContainer");

        $("." + dummyZoomClassName).each(function () {
            var zoomClassPresentHeight = $(this).height();
            if (isZoomInDivHeight = false) {
                $(this).height(zoomClassPresentHeight + 100);
                $("." + dummyZoomClassName + " .k-grid-content").height(zoomClassPresentHeight + 60);
            }
        });

        $('html, body').animate({ scrollTop: $("#" + parentDivName).offset().top }, 100);
    }
    else if (IsZoomIn == false) {

        $(iconElem).removeClass("zoom-out-icon");
        $(iconElem).addClass("zoom-in-icon");
        $(iconElem).parent().parent().removeClass("full-width-zoom");
        $(iconElem).parent().parent().addClass("crsContainer");
        $("." + dummyZoomClassName).each(function () {
            var zoomClassPresentHeight = $(this).height();
            if (isZoomInDivHeight = false) {
                $(this).height(zoomClassPresentHeight - 100);
                $("." + dummyZoomClassName + " .k-grid-content").height(zoomClassPresentHeight - 60);
            }
        });

    }


}



function GoToNext(elem) {

    var nextElemId = $.trim($(elem).attr("prevOrNextElement"));
    var zoomElemId = $.trim($(elem).attr("zoomContainerNextOrPrev"));
    var zoomInIconDivId = $.trim($(elem).attr("zoomIconElement"));
    var collapseExpandID = $.trim($(elem).attr("collapseid"));
    var currentSection = $.trim($(elem).attr("currentdiv"));
    var collspsClass = $("#" + nextElemId + " .panel-title a").attr("class");
    var expandClass = $("#" + currentSection + " .panel-title a").attr("class");

    if (expandClass == "") {
        $("#" + currentSection + " .panel-title a").click();
    }

    setTimeout(function () {
        if (collspsClass !== "") {
            $("#" + nextElemId + " .collapsed").click();
        }



        //==== This is for current section which arrow is clicked  ===
        var currentSectionZoomableID = $.trim($(elem).attr("isMeZoomable"));
        var myZoomIconElementID = $.trim($(elem).attr("myZoomIconElement"));
        //==========================================================


        if (currentSectionZoomableID != "" && isZoomInGlobal == true && myZoomIconElementID != "") {
            ZoomInZoomOutForPrevNextArrow(currentSectionZoomableID, $("#" + myZoomIconElementID), 'dummy_zoom_issue', false);
        }

        else if (zoomElemId != "" && zoomInIconDivId != "" && isZoomInGlobal == true) {
            ZoomInZoomOutForPrevNextArrow(zoomElemId, $("#" + zoomInIconDivId), 'dummy_zoom_issue', true);
        }

        $('html, body').animate({ scrollTop: $("#" + nextElemId).offset().top -= 80 }, 'slow');
        return false;
    }, 250);


    //$('html, body').animate({ scrollTop: $("#" + nextElemId).offset().top }, 300);


}



function GoToPrev(elem) {


    var prevElemId = $.trim($(elem).attr("prevOrNextElement"));
    var zoomElemId = $.trim($(elem).attr("zoomContainerNextOrPrev"));
    var zoomInIconDivId = $.trim($(elem).attr("zoomIconElement"));
    var collapseExpandID = $.trim($(elem).attr("collapseid"));
    var currentSection = $.trim($(elem).attr("currentdiv"));
    var expandClass = $("#" + currentSection + " .panel-title a").attr("class");

    if (expandClass == "") {
        $("#" + currentSection + " .panel-title a").click();
    }

    $("#" + prevElemId + " .collapsed").click();

    //==== This is for current section which arrow is clicked  ===
    var currentSectionZoomableID = $.trim($(elem).attr("isMeZoomable"));
    var myZoomIconElementID = $.trim($(elem).attr("myZoomIconElement"));
    //==========================================================

    if (currentSectionZoomableID != "" && isZoomInGlobal == true && myZoomIconElementID != "") {
        ZoomInZoomOutForPrevNextArrow(currentSectionZoomableID, $("#" + myZoomIconElementID), 'dummy_zoom_issue', false);
    }

    else if (zoomElemId != "" && zoomInIconDivId != "" && isZoomInGlobal == true) {
        ZoomInZoomOutForPrevNextArrow(zoomElemId, $("#" + zoomInIconDivId), 'dummy_zoom_issue', true);
    }


    $('html, body').animate({ scrollTop: $("#" + prevElemId).offset().top -= 80 }, 'slow');

}




