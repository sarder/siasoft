$(document).ready(function () {
    "use strict";
    // Hide error box after 10 seconds
    if ($("[id*=MainContent_divMessage]")) {
        $("[id*=MainContent_divMessage]").delay(5000).fadeOut('slow');
    }
    //Toggle menu
    $(".menu-toggle").click(function (e) {
        
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    // Progressbar
    if ($(".progress .progress-bar")[0]) {
        $('.progress .progress-bar').progressbar(); // bootstrap 3
    }
    // Round progress bar
    if (document.getElementById('round-bar')) {
        var pc = document.getElementById('round-bar').getAttribute('data-percent');
        $(".round-bar").circularloader({
            backgroundColor: "#ffffff", //background colour of inner circle
            fontColor: "#ececec", //font color of progress text
            fontSize: "14px", //font size of progress text
            radius: 45, //radius of circle
            progressBarBackground: "#ececec", //background colour of circular progress Bar
            progressBarColor: "#1dafeb", //colour of circular progress bar
            progressBarWidth: 2, //progress bar width
            progressPercent: pc, //progress percentage out of 100
            showText: true
        });
    }
    // Close button functionality
    $(".close").click(function (e) {
        
        e.preventDefault();
        $(this.parentNode).toggleClass("hidden");
    });
    // pop up windows
    $(".close-pop-up").click(function () {
        
        $(this).parent().toggleClass("hidden");
        $(".box-overlay").toggleClass("hidden");
        $('body').css('overflow', 'auto');
    });
    $(".box-overlay").click(function () {
        
        $(this).toggleClass("hidden");
        $(".pop-up").addClass("hidden");
        $('body').css('overflow', 'auto');
    });
    $(".pop-up-link").click(function () {
        
        $(".pop-up").each(function () {
            $(this).addClass("hidden");
            $('body').css('overflow', 'hidden');
        });
        $(".box-overlay").addClass("hidden");
        var id = $(this).attr("id");
        id = id.replace("_link", "");

        $(".box-overlay").toggleClass("hidden");
        $("#" + id).toggleClass("hidden");

    });
    // Avatar selection
    $(".avatars li").click(function (e) {
        
        e.preventDefault();
        $(".avatars li").removeClass("active");
        $(this).addClass("active");
    });
    // Scroll to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50 ) { //500
            $('.scroll_to_top').fadeIn();
        } else {
            $('.scroll_to_top').fadeOut();
        }
    });
    $(".scroll_to_top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    // Add content to after - Sidebar menu
    $(".sidebar-nav li a").each(function () {
        
        var new_class = $.trim($(this).text().toLowerCase());
        new_class = new_class.replace(" ", "_");
        var content = $.trim($(this).text());
        $(this).attr('class', new_class);
        $('body').append('<style>.' + new_class + '::after{content:"' + content + '"}</style>');
        console.log();
    });
    // Open submenu
    $(function () {
        $("#sidebar-wrapper").on("click", "a", function () {
            $("#sidebar-wrapper a").removeClass("active");
            $($(this).attr("href")).addClass("active");
            console.log($(".sub ul"));
        });
    });
    // Style toggle on off button
    if ($('.toggle_onoff')) {
       //$('.toggle_onoff').bootstrapToggle();
    }
});