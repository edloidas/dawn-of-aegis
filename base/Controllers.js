/**
 * EDLOIDAS DEVPAGE
 * ANGULAR.JS CONTROLLERS
 *
 * @author edloidas
 * @link edloidas@gmail.com
 */

function GameController($scope) {
    $scope.game = Game;
    $scope.settings = Settings;
    $scope.preload = Settings.preload;


    function init() {
        console.group("Initialization");
        console.info("Controller [Game] :: initialization start.");
        // ... done.
        $scope.preload = Settings.start;
        console.info("Controller [Game] :: initialization done.");
        console.groupEnd("Initialization");
    }
    init();
}

document.onreadystatechange = function() {
    if (document.readyState === "complete") return;

    var elemPreload = document.getElementById('preload');
    var elemHolder  = document.getElementById('holder');
    document.onkeydown = hidePreload;
    elemPreload.onclick = hidePreload;

    function hidePreload() {
        document.onkeydown = null;
        elemPreload.onclick = null;
        $(elemHolder).addClass('hidden');
        $(elemPreload).animate({opacity: "toggle"},
                               0 /* 300 */, "linear",
                               function() {
                                    elemPreload.remove();
                                    $(elemHolder).removeClass('hidden');
                                });
    }
    // REMOVE
    hidePreload();
}

window.onresize = function() {
    // Condition will prevent double call
    if (window.innerWidth !== Settings.width || window.innerHeight !== Settings.height) {
        Settings.width = (window.innerWidth < 800) ? 800 : window.innerWidth;
        Settings.height = (window.innerHeight < 600) ? 600 : window.innerHeight;
    }
}
