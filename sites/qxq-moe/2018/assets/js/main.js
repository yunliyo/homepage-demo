"use strict"

let tStart = new Date().getTime();

$(window).on('load', function () {
    let tEnd = new Date().getTime();
    if (tEnd - tStart < 500) {
        setTimeout(function () {
            $("#load-mask").attr("data-status", "done")
        }, 500 - tEnd + tStart);
    } else {
        $("#load-mask").attr("data-status", "done")
    }
});

$(function () {
    $("#menu-open-button").click(function () {
        if ($(this).attr("data-status") == "open") {
            $(this).removeAttr("data-status");
            $("#overlay").removeAttr("data-status");
            $("#id").removeAttr("data-status");
        } else {
            $(this).attr("data-status", "open");
            $("#overlay").attr("data-status", "show");
            $("#id").attr("data-status", "blur");
        }
    });

    $("#menu-event>li>button").click(function () {
        let index = $(this).parent().index() + 1;
        $("#menu-event>li>button").removeAttr("data-status");
        $(this).attr("data-status", "active");
        $("#profile>div").removeAttr("data-status");
        let targetElement = $("#profile>div:nth-child(" + index + ")");
        targetElement.attr("data-status", "active");
    })
});
