//idleTimeMinute is a global variable. It is declared in site.master page.
var timoutInMinutes = 60000 * parseInt(idleTimeMinute - 1); // Timeout based on the minutes from app_settings table.
var timeoutTimer;
var timeCounterClock;
var IdleSecond = 59;
var IdleMinute = idleTimeMinute - 1;
var flipTime = 1801;
var myFlipClock;

$(window).load(function () {
    $(this).bind("mousemove", function (e) {
        isCancel60SecondCountDown = true;
        $("#myTimerModal").modal("hide");

        if (typeof myFlipClock !== 'undefined') {
           myFlipClock.stop();
        }

        ResetTimers();
    });


    $(this).bind("keypress", function (e) {
        isCancel60SecondCountDown = true;
        $("#myTimerModal").modal("hide");

        if (typeof myFlipClock !== 'undefined') {
          myFlipClock.stop();
        }

        ResetTimers();
    });


    $(this).bind("click", function (e) {
        isCancel60SecondCountDown = true;
        $("#myTimerModal").modal("hide");

        if (typeof myFlipClock !== 'undefined') {
            myFlipClock.stop();
        }

        ResetTimers();
    });

});

// Start timers.
function StartTimers() {

    timeoutTimer = setTimeout("IdleTimeoutRedirect()", timoutInMinutes);
    timeCounterClock = setInterval("IdleTimeCounter()", 1000); //1000 is 1 second

}

// Reset timers.
function ResetTimers() {
    clearTimeout(timeoutTimer);
    clearInterval(timeCounterClock);

    IdleSecond = 59;
    IdleMinute = idleTimeMinute - 1;

    $("span[id*=spnIdleTimeOut]").text(IdleMinute + ":" + IdleSecond);

    StartTimers();
}



// Logout the user.
function IdleTimeoutRedirect() {
    window.location = idleTimeOutPageRedirectionUrl;
}



function IdleTimeCounter() {


    $("span[id*=spnIdleTimeOut]").text(AddLeadingZeroIfSingleDigit(IdleMinute) + ":" + AddLeadingZeroIfSingleDigit(IdleSecond));

    IdleSecond = IdleSecond - 1;

    if (IdleSecond < 0) {
        IdleSecond = 59;
        IdleMinute = IdleMinute - 1;
    }

    if (IdleMinute == 0) { 
        isCancel60SecondCountDown = false;
        $("#myTimerModal").modal("show");
        RegisterMyTimerClock();
    }

}

function AddLeadingZeroIfSingleDigit(integerValue) {

    if (integerValue < 10) {
        return "0" + integerValue;
    }

    return integerValue;



}


function StopFlipClockTimer() {

    $("#myTimerModal").modal("hide");
    isCancel60SecondCountDown = true;
}

function RegisterMyTimerClock() {

    myFlipClock = new FlipClock($('.bds-clock'), 59, {
        clockFace: 'MinuteCounter',
        countdown: true,
        autoStart: true,
        callbacks: {
            start: function () {
                isCancel60SecondCountDown = false;
            }, // end start
            stop: function () {
                if (isCancel60SecondCountDown == false) {
                    IdleTimeoutRedirect();
                }
            } //end stop
        }
    });
}