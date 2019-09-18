$(document).ready( function () {
    if(VW > 992) {
        const width = $(".the-tagline").width() + $(".the-tagline").offset().left + $(".stories").width();
        const height = width - VW + VH;
        $("body").height(height+"px");

        const difference = VH - $(".stories").height();
        for(let i = 0; i < $(".column").length; i++) {
            let accepted = false;
            while(!accepted) {
                let displacement = Math.random() * 100 ;
                if(displacement < difference) accepted = true;
                if(i % 2 === 0) displacement *= -1;
                $(".column")[i].style.top = displacement+"px"
            }
        }
    }
});

$(window).scroll( function () {
    if(VW > 992) {
        const scroll = $(window).scrollTop();
        $(".the-left-scrolling-bar").css( {
            left:  - scroll + "px"
        } );
    }
});