$('.button').on('mouseenter', function () {
    $(this).css('transform', 'scale(1.1)');
});

$('.button').on('mouseleave', function () {
    $(this).css('transform', 'scale(1)');
});

$('#statsButton').on('mouseenter', function () {
    $(this).css('transform', 'scale(1.1)');
});

$('#statsButton').on('mouseleave', function () {
    $(this).css('transform', 'scale(1)');
});

$(window).on("load", function () {
    const loader = $(".loader");

    if (loader.length) {
        loader.addClass("loader-hidden");

        loader.on("transitionend", function () {
            if ($(document.body).has(loader)) {
                loader.remove();
            }
        });
    }
});