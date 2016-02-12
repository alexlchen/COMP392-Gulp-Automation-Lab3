var config;
(function (config) {
    var Screen = (function () {
        function Screen() {
        }
        Screen.WIDTH = 640;
        Screen.HEIGHT = 480;
        Screen.RATIO = 1.333333;
        return Screen;
    })();
    config.Screen = Screen;
})(config || (config = {}));

//# sourceMappingURL=screen.js.map
