/**
 * EDLOIDAS DEVPAGE
 * ANGULAR.JS CONTROLLERS
 *
 * @author edloidas
 * @link edloidas@gmail.com
 */

function GameController($scope) {
    // Each scope should hold values of certain UI elements in the game.
    $scope.game = {name: Settings.name,
                   preload: "Loading... Please stand by",
                   start:   "Press any key to continue"}
    $scope.preload = $scope.game.preload;

    !function init() {
        Game.init();
        Game.status = Game.Status.ready;
        $scope.preload = $scope.game.start;
    }();
}

document.onreadystatechange = function() {
if (document.readyState === "complete") {
        var elemPreload = document.getElementById('preload');
        var elemHolder  = document.getElementById('holder');
        document.onkeydown = hidePreload;
        elemPreload.onclick = hidePreload;

        function hidePreload() {
            if (Game.status === Game.Status.ready) {
                document.onkeydown = null;
                elemPreload.onclick = null;
                $(elemHolder).addClass('hidden');
                $(elemPreload).animate({opacity: "toggle"},
                                       0 /* 300 */, "linear",
                                       function() {
                                            elemPreload.remove();
                                            $(elemHolder).removeClass('hidden');
                                        });
                Game.animate();
            }
        }
        hidePreload();
    }
}

window.onresize = function() {
    // Condition will prevent double call
    if (window.innerWidth !== Settings.width || window.innerHeight !== Settings.height) {
        Settings.width = (window.innerWidth < 800) ? 800 : window.innerWidth;
        Settings.height = (window.innerHeight < 600) ? 600 : window.innerHeight;
    }
}
