var bdsWindowHeight;
var bdsWindowWidth;
var bdsScrollerHeight;
var halfPaddingTop;

$(document).ready(function(){
    $("li.parent").click(function () {
        $("li.parent").removeClass("open");
        $(this).addClass("open");
        $("li.parent ul.collapse.submenu").removeClass("in");
    });


    bdsWindowHeight = $(document).height();
    bdsWindowWidth = $(document).width();
    bdsScrollerHeight = (bdsWindowHeight - 35);
    $(".bds-scroller").css({ "height": bdsScrollerHeight });

});


$(window).on('resize', function () {
    bdsWindowHeight = $(document).height();
    bdsWindowWidth = $(document).width();
    bdsScrollerHeight = (bdsWindowHeight - 35);
    $(".bds-scroller").css({ "height": bdsScrollerHeight });
});

// New Code For Scrolling

function ExpandCollapsByID(elem) {

    var sectionID = $(elem).attr("clpsid");
    $("#" + sectionID + " .collapsed").click();
    $('html, body').animate({ scrollTop: $("#" + sectionID).offset().top -= 80 }, 300);
    return false;
}