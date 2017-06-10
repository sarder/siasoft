$(document).ready(function() {
	"use strict";	 
	// check if mac or pc
	if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('LINUX X86_64') >= 0 ) { 
	  $("body").addClass("mac");
	} else {
	  $("body").addClass("pc");
	}
	// Toggle menu if is small screen
	if ($(window).width() < 1200) {
		$('#wrapper').removeClass('toggled');
	}
	// Second menu
	function toggleSecondMenu(){
		if($('#wrapper').hasClass('toggled')){
			if($('#sidebar-second').hasClass('visible')){
				$("#sidebar-second").css('left', '-158px');
			}
			else{
				$("#sidebar-second").css('left', '210px');
			}
			$("#sidebar-second").toggleClass('visible');
		}
		else{
			if($('#sidebar-second').hasClass('visible')){
				$("#sidebar-second").css('left', '-158px');
			}
			else{
				$("#sidebar-second").css('left', '70px');
			}
			$("#sidebar-second").toggleClass('visible');
		}		
		$('#page-content-wrapper').toggleClass('overlay');
	}
	$('.open-second-menu').click(function(e) {
        e.preventDefault();
		toggleSecondMenu();
    });
	if($('#wrapper').hasClass('sidebar-visible')){
		toggleSecondMenu();
	}
	// Close 2nd menu if click on body
	$('#page-content-wrapper').click(function(e) {
        //e.preventDefault();
		if($(this).hasClass('overlay') && $('#sidebar-second').hasClass('visible')){
		toggleSecondMenu();
		}
    });
	// Hide error box after 10 seconds
	if ($("#MainContent_divMessage")){
		$("#MainContent_divMessage").delay(5000).fadeOut('slow');
	}
	//Toggle main menu
	$(".menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
		if($('#sidebar-second').hasClass('visible') && !($('#wrapper').hasClass('toggled'))){
			$("#sidebar-second").css('left', '70px');
		}
		else if($('#sidebar-second').hasClass('visible') && $('#wrapper').hasClass('toggled')){
			$("#sidebar-second").css('left', '210px');
		}
    });	
	// Toggle class when open/close submenu in sidebar
	$(".parent").click(function(e) {
        e.preventDefault();
		// open menu if is closed		
        if(!($("#wrapper").hasClass("toggled"))){
			$("#wrapper").addClass("toggled");
			$("#sidebar-second").css('left', '210px');			
		}
		// check if already open
		if($(this).hasClass("open")){
			$(this).removeClass("open");
			$(this).removeClass("active");
			var id = $(this).attr('href');
			$(id + " .submenu").removeClass("in");
			console.log('hey');
		}
		else{
			$(".parent").removeClass("open");
			$(".parent").removeClass("active");
			$(".submenu").removeClass("in");
			$(".submenu").removeClass("active");
			if($(this).has("ul.collapse.in")){
				$(this).toggleClass("open");
				$(this).toggleClass("active");
			}
			console.log('hi');
		}
    });	
	$('.submenu li a').on('click', function(e) {
		e.preventDefault();
		window.location.href = $(this).attr('href');
	});
	// Progressbar
	if ($(".progress .progress-bar")[0]) {
		$('.progress .progress-bar').progressbar(); // bootstrap 3
	}
	// Round progress bar
	if (document.getElementById('round-bar')){
		var pc = document.getElementById('round-bar').getAttribute('data-percent');
		$(".round-bar").circularloader({
			backgroundColor: "#ffffff",//background colour of inner circle
			fontColor: "#495678",//font color of progress text
			fontSize: "14px",//font size of progress text
			radius: 45,//radius of circle
			progressBarBackground: "#ececec",//background colour of circular progress Bar
			progressBarColor: "#1dafeb",//colour of circular progress bar
			progressBarWidth: 2,//progress bar width
			progressPercent: pc,//progress percentage out of 100
			showText: true
		});
	}
	// Close button functionality
	$(".close").click(function(e) {
        e.preventDefault();
        $(this.parentNode).toggleClass("hidden");
    });
	// pop up windows
	$(".close-pop-up").click(function(){
		 $(this).parent().toggleClass("hidden");
		 $(".box-overlay").toggleClass("hidden");
         $('body').css('overflow', 'auto'); 
		});	 
	$(".box-overlay").click(function(){		 
		 $(this).toggleClass("hidden");
		 $(".pop-up").addClass("hidden");
         $('body').css('overflow', 'auto'); 
		});	 
	$(".pop-up-link").click(function(){		 
		$(".pop-up").each(function() {
		   $(this).addClass("hidden");
           $('body').css('overflow', 'hidden'); 
		});
	$(".box-overlay").addClass("hidden");         
	var id = $(this).attr("id");
	id = id.replace("_link","");
	
	$(".box-overlay").toggleClass("hidden");
	$("#"+id).toggleClass("hidden");

	});		
	// Avatar selection
	$(".avatars li").click(function(e) {
        e.preventDefault();
		$(".avatars li").removeClass("active");
        $(this).addClass("active");
    });
	// Scroll to top
	$(window).scroll(function () {
        if ($(this).scrollTop() > 50) { //500
            $('.scroll_to_top').fadeIn();
			if ($(window).width() > 990) {
				aside_fixed();
			}
        } else {
            $('.scroll_to_top').fadeOut();
			if ($(window).width() > 990) {
				aside_inherit();
			}
        }
    });
	$(".scroll_to_top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
	// Add content to after - Sidebar menu
	$( ".sidebar-nav li" ).each(function() {
		var new_class = $.trim($(this).text().toLowerCase());
		new_class = new_class.replace(" ", "_");
		var content = $.trim($(this).text());
		$(this).addClass(new_class);
		$(this).append('<span>'+ content +'</span>');
	});
	// Open submenu
	$(function () {
		$("#sidebar-wrapper").on("click", "a", function () {
			$("#sidebar-wrapper a").removeClass("active");
			$($(this).attr("href")).addClass("active");
		});
	});
	// Switch
	$(".switch").bootstrapSwitch();
	// Style toggle on off button
	if($('.toggle_onoff')){
		$('.toggle_onoff').bootstrapToggle();
	}
	// More/Less button
	// close all collapsed divs functionality
	function close_all(){
		$('.read-more-wrap .collapse.in').each(function() {
			$(this).removeClass("in");
			$("#current_parent .no_of_attachments").removeClass("hidden");
			$("#current_parent").attr('id', '');
			$(".more-trigger").text("More...");
			$(".more-trigger").addClass("collapsed");
		});
	}
	$(".more-trigger").on("click", function () {
		if($(this).hasClass("collapsed")){
			close_all();
			//$(this).text("Less...");
		}
		else{
			//$(this).text("More...");
		}
		var parent = $(this).parent();
		// change visibility of aside divs 
		parent.attr('id', 'current_parent');
		if ( $("#current_parent .no_of_attachments") && $(this).hasClass("collapsed")){
			$("#current_parent .no_of_attachments").addClass("hidden");
			$('#details>div.notes').removeClass("hidden");
			$('#details>div.det').addClass("hidden");
			console.log('1');
		}
		else{
			$("#current_parent .no_of_attachments").removeClass("hidden");
			$('#details>div.notes').addClass("hidden");
			$('#details>div.det').removeClass("hidden");
			console.log('2');
			parent.attr('id', '');
		}
	});
	// aside position function
	var count = 1;
	function aside_fixed(){
		if (count === 1){
			var width = $('#details').outerWidth();
			console.log(width);
			$('#details').css('width', width);
			$('#details').css('position', 'fixed');
			$('#details').css('top', '10vh');
		}
		count++;
	}
	function aside_inherit(){
		$('#details').css('position', 'inherit');
			$('#details').css('top', '0');
		$('#details').css('width', '100%');
		count =1;
	}
});