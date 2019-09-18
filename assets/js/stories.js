let lastScrollTop = 0;

function morePictures() {
    $(".more-pictures").on("click", function () {
        $('#myModal').modal();
    });

    $(".holder").on("click", function () {
        $(".holder.active").removeClass("active col-12").addClass("col").find("img").animate({ width : "100px"});
        $(this).addClass("active col-12").removeClass("col").find("img").animate({ width : "100%"});
    });
}

$(document).ready(function () {

    $("html, body").animate({ scrollTop: 0 });
    $(".gallery img").on("click", function () {
        $(".gallery img.active").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".screen").find(".event-image img").attr("src", $(this).attr("src"));
    });

    morePictures();
});

$(window).scroll( function () {
    const scroll = $(this).scrollTop();
    if (VW > 992) {
        const scrollFixed = $(".screen")[1].offsetTop;
        if (scroll > 0 && scroll < scrollFixed) {
            $(".donate-lg").css({top: scrollFixed - scroll + "px"});
        }
    }
    else {
        const el = $(".donate-sm");
        const h = el.height();
        console.log(h);
        if (scroll > lastScrollTop){
            TweenMax.to(el, 0.6, { bottom: "-" + h - 10 + "px"});
        } else {
            TweenMax.to(el, 0.6, { bottom: "0"});
        }
    }
    lastScrollTop = scroll;
});