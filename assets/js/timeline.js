let scrolling = true;
let screenTops = [];
let activeEvent, inactiveEvent,y,prevTop,newTop;
let barHeight;
const timeline=$('.timeline');
function init() {
    const screen = $(".screen");
    $(".donate-lg").css({top: screen[1].offsetTop + "px"});
    screen.each(function (i) {
        screenTops[i] = this.offsetTop;
    });
}

function eventClick($this) {
    const scrollTop = $(".screen")[$this.index() - 2].offsetTop;
    const top=parseFloat(timeline.css('top'));
    $("html, body").animate({
        scrollTop: scrollTop + "px"
    });
    timeline.css('top',top+'px');
}

function manageActiveEvent(scroll) {
    for (let i = 0; i < screenTops.length; i++) {
        if (scroll >= screenTops[i] - 50 && (scroll < screenTops[i + 1] || 1)) {
            const clicked = $($(".timeline .event-circle")[i]);
            if(!clicked.hasClass("active")) {
                clicked
                    .addClass("active")
                    .prevAll(".event-circle")
                    .addClass("complete")
                    .removeClass("active")
                    .end()
                    .nextAll(".event-circle")
                    .removeClass("complete active");
            }
        }
    }
}
function enableScrolling() {
    setTimeout(function () {
        scrolling = true;
    }, 600);
}

function nextEvent() {
    const active = $(".timeline .event-circle.active");
    scrolling = false;
    if (active.index() < $(".timeline").children().length) {
        active.next(".event-circle").click();
    }
    enableScrolling();
}

function prevEvent() {
    const active = $(".timeline .event-circle.active");
    scrolling = false;
    if (active.index() > 2) {
        active.prev(".event-circle").click();
    }
    enableScrolling();
}
let prevScroll=0;
$(window).scroll(function () {
    const scroll = $(window).scrollTop();
    let distance = 100;
    if( VW <  992) distance = 50;
    for (let i = 0; i < screenTops.length; i++)
    {
        if (scroll > screenTops[i] && scroll < screenTops[i + 1])
        {
            const quadrantScrolled = scroll - screenTops[i];
            const diff = screenTops[i + 1] - screenTops[i];
            const progress =  distance * quadrantScrolled / diff;
            const constant = (i * inactiveEvent + activeEvent) + (distance * (i+1));
            let height = constant + progress;
            let gap=VH-2*distance;
            let scrollFactor=prevScroll<scroll?(-100):100;
            if(height>gap)
            {
                newTop=parseFloat(timeline.css('top'))+scrollFactor;
                newTop=newTop>0?0:newTop;
                if(Math.abs(newTop)>(barHeight-$(window).height()))
                {
                    newTop=-(barHeight-$(window).height());
                }
                timeline.css('top',newTop+'px');
            }
            $(".timeline .bar.complete").css({height: height + "px"});
            prevScroll=scroll;
        }
    }
    manageActiveEvent(scroll);
});
function eventSize() {
    activeEvent = $(".timeline .event-circle.active").height();
    inactiveEvent = $(".timeline .event-circle").not(".active").height();
}

$(document).ready(function ()
{
    dragBar();
    setHeight();
    $(".timeline .event-circle").on("click", function () {
        eventClick($(this));
    });
    $("html").keyup(function (e) {
        if (scrolling && VW > 992) {
            if (e.keyCode === 37 || e.keyCode === 38) prevEvent();
            else if (e.keyCode === 39 || e.keyCode === 40) nextEvent();
        }
    });
});

$(window).on("load", function () {
    init();
    eventSize();
});

window.onresize = function () {
    eventSize();
    setHeight();
    init();
};
function setHeight()
{
    eventSize();
    let num=$('.event-circle').length;
    let distance=VW>992?100:50;
    let newHeight=(((num+1)*distance)+((num-1)*inactiveEvent)+activeEvent);
    newHeight=newHeight<VH?VH:newHeight;
    $('.bar.white-bar').css('height',newHeight+'px');
    barHeight=newHeight;
}
function dragBar()
{
    timeline.on(
        {
            mousedown:function(e)
            {
                e.preventDefault();
                y=e.clientY;
                $(this).css('cursor','grabbing');
            },

            mouseup:function(e)
            {
                e.preventDefault();
                if(barHeight>$(window).height())
                {
                    prevTop=parseFloat($(this).css('top'));
                    newTop=(parseFloat(prevTop)+(e.clientY-y));
                    newTop=newTop>0?0:newTop;
                    if(Math.abs(newTop)>(barHeight-$(window).height()))
                    {
                        newTop=-(barHeight-$(window).height());
                    }
                    $(this).css({'top':newTop+'px'});
                }
                $(this).css('cursor','grab');
            },

            touchstart:function(e)
            {
                e.preventDefault();
                y=e.targetTouches[0].clientY;
            },

            touchmove:function(e)
            {
                e.preventDefault();
                if(barHeight>$(window).height())
                {
                    prevTop=parseFloat($(this).css('top'));
                    newTop=(parseFloat(prevTop)+(e.targetTouches[0].clientY-y));
                    newTop=newTop>0?0:newTop;
                    if(Math.abs(parseFloat(newTop))>(barHeight-$(window).height()))
                    {
                        newTop=-(barHeight-$(window).height());
                    }
                    $(this).css({'top':newTop+'px'});
                }
                $(this).css('cursor','grab');


            }

        }
    );
}

