$(document).ready(function () {
    const $carousel = $(".owl-carousel");

    if ($carousel.length) {
        $carousel.owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            
        });
    }
});