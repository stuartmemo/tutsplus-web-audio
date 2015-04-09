var myFakeAjaxCall = function (callback) {
    setTimeout(function () {
        callback();
    }, 3000);
};

$('#buy-now-button').click(function () {
    var that = this,
        $btn = $(this).button('loading');

    myFakeAjaxCall(function () {
        playSuccessSound();
        $btn.button('complete');
    });
});
