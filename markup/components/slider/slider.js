var elemCount = $('.slider__list > li').length,
    viewWidth = $(".container").width(),
    elemCountView = 3,
    forAdapt = 10,
    elemWidth = 0,
    elemCountBase = $('.slider__list > li').length - elemCountView;


function sliderResize() {
    if ($(window).width() <= '450') {
        forAdapt = 30;
        elemCountView = 1;
    } else if ($(window).width() <= '768') {
        forAdapt = 15;
        elemCountView = 2;
    } else {
        forAdapt = 10;
        elemCountView = 3;
    }
    elemWidth = -($('.slider__list > li').length - ($(".container").width() - 24 * elemCountView)) / elemCountView + forAdapt;
    $(".slider__item").width(elemWidth);
    $(".slider__list").css('right', "0px");
    elemCountBase = $('.slider__list > li').length - elemCountView;
    elemCount = elemCountBase;
};
sliderResize();

$(window).resize(sliderResize);


function slideChange(dir) {
    var step = elemWidth * dir,
        rightSp = parseInt($(".slider__list").css('right'));
    elemCount -= 1 * dir;
    if (elemCount == -1) {
        step = 0;
        elemCount = elemCountBase;
    } else if (elemCount > elemCountBase) {
        step = (-step * (elemCount - 1)) + (24 * (elemCount - 1));
        elemCount = 0;
    } else {
        step += (rightSp + 24 * dir);
    }
    $(".slider__list").css('right', step + "px");
};

$(".arrow__link--left").click((e) => {
    e.preventDefault();
    slideChange(-1);
});

$(".arrow__link--right").click((e) => {
    e.preventDefault();
    slideChange(1);
});

if ($(document).width() <= 768) {
    $(".slider__list").swipe({
        swipeLeft: () => {
            slideChange(1);
        },
        threshold: 70
    });
    $(".slider__list").swipe({
        swipeRight: () => {
            slideChange(-1);
        },
        threshold: 70
    });
}

