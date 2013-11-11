/*
===============================================================================

    Element, that perform game preload and initialization.
    Uses Modernizr library ( load() module from YepNope library ).

===============================================================================
*/

// Essential game files
var files = [
    "base/Utils.js",
    "base/Settings.js",
    "base/Objects.js",
    "base/Player.js",
    "base/UI.js",
    "base/World.js",
    "base/Engine.js",
    "base/Game.js"];

// Non-essential game files.
// #@ use preload "preload!base/data/textures/img.gif" @#
var data = [];


/*
================
OnReadyStateChanage
    Loads game files and initializes the game.
================
*/
document.onreadystatechange = function () {
    if ( document.readyState === 'complete' ) {
        var i = 0;
        // regex converts full path to file name.
        var filePath = /.*\//gi;

        var progress = document.getElementById('loading-tip'),
            preload  = document.getElementById( 'preload' );

        Modernizr.load([
            {
                load : files,
                callback : function ( file ) {
                    progress.textContent = "Loading... " +
                                           "[" + (++i) + "/" + files.length + "] " +
                                           file.replace(filePath, '');
                },
                complete : function () {
                    /*
                    ================
                    hidePreload
                        Hides loading screen and starts game animation.
                    ================
                    */
                    function hidePreload() {
                        document.onkeydown = null;
                        preload.onclick = null;
                        preload.remove();
                        Engine.renderer.domElement.style.display = 'block';

                        Game.bind();
                        Game.animate();

                        Game.isRunnig = true;
                        Game.status = 0;

                        Game.canvas = Engine.renderer.domElement;
                        Game.canvas.requestPointerLock = Game.canvas.requestPointerLock    ||
                                                         Game.canvas.mozRequestPointerLock ||
                                                         Game.canvas.webkitRequestPointerLock;
                        document.exitPointerLock = document.exitPointerLock    ||
                                                   document.mozExitPointerLock ||
                                                   document.webkitExitPointerLock;
                        Game.canvas.requestFullscreen = Game.canvas.requestFullscreen    ||
                                                        Game.canvas.mozRequestFullscreen ||
                                                        Game.canvas.mozRequestFullScreen || // Older API upper case 'S'.
                                                        Game.canvas.webkitRequestFullscreen;
                    }
                    document.onkeydown = hidePreload;
                    preload.onclick    = hidePreload;

                    progress.textContent = "Press any key to continue";

                    Game.init();
                    //#@
                    hidePreload();
                    //@#

                    // preload non-essential data
                    // Modernizr.load(data);
                }
            }
        ]);
    }
}
