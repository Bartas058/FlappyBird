function changeBackground(backgroundValue) {
    const backgroundImageValue = `url("../Background - Pictures/${backgroundValue}.png")`;
    const boardImageValue = `url("../Background - Pictures/${backgroundValue}_board.png")`;

    $(".loader").removeClass("loader-hidden");

    $('html').css('--background-image', backgroundImageValue);
    $('#board').css('background-image', boardImageValue);

    $('html').on('load', function () {
        $(".loader").addClass("loader-hidden");
    });

    $('#board').focus();
}