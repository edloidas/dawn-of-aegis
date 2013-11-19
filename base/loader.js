/*
===============================================================================

    Element, that perform game preload and initialization.
    Uses Modernizr library ( load() module from YepNope library ).
    Loads game files and initializes the game.

===============================================================================
*/

/*
================
    Main game object.
    Used as name space.
================
*/
function Doa() {
    if ( !(this instanceof Doa) ) return new Doa();

    // Essential game files
    this.files = [
        "base/Utils.js",
        "base/Settings.js",
        "base/Caches.js",
        "base/Objects.js",
        "base/Player.js",
        "base/UI.js",
        "base/World.js",
        "base/Engine.js",
        "base/Game.js"];

    // Non-essential game files.
    // #@ use preload "preload!base/data/textures/img.gif" @#
    this.data = [];
}

/*
================
Verification
    Checks compatibility and prevent further execution.
================
*/
Doa.prototype.verify = function () {
    var isSupported = true;

    console.groupCollapsed( "Verification" );

    if ( Modernizr.localstorage && Modernizr.sessionstorage ) {
        console.info( "Storage support     : YES" );
    } else {
        console.info( "Storage support     : NO" );
        isSupported = false;
    }

    if ( Modernizr.webgl ) {
        console.info( "WebGL support       : YES" );
    } else {
        console.info( "WebGL support       : NO" );
        isSupported = false;
    }

    if ( Modernizr.audio.wav === "probably" ) {
        console.info( "Audio support       : YES" );
    } else {
        console.info( "Audio support       : NO" );
        isSupported = false;
    }

    if ( Modernizr.webworkers ) {
        console.info( "Webworkers support  : YES" );
    } else {
        console.info( "Webworkers support  : NO" );
        isSupported = false;
    }

    if ( Modernizr.websockets ) {
        console.info( "Websockets support  : YES" );
    } else {
        console.info( "Websockets support  : NO" );
        isSupported = false;
    }

    if ( 'pointerLockElement' in document ||
         'mozPointerLockElement' in document ||
         'webkitPointerLockElement' in document ) {
        console.info( "PointerLock support : YES" );
    } else {
        console.info( "PointerLock support : NO" );
        isSupported = false;
    }

    if ( 'mozFullScreenElement' in document ||
         'mozFullscreenElement' in document ||
         'webkitFullscreenElement' in document ) {
        console.info( "Fullscreen support  : YES" );
    } else {
        console.info( "Fullscreen support  : NO" );
        isSupported = false;
    }

    console.groupEnd(); // close Browser

    if ( !isSupported ) {
        console.warn( "Execution will be aborted due to previous errors." );
        throw new Error( "Verification failed. Browser not fully supported." );
    }
}

// DOA object
var DOA = new Doa();


/*
---------------------------------------------------------------------------
Loader
---------------------------------------------------------------------------
*/
document.onreadystatechange = function () {
    if ( document.readyState === 'complete' ) {
        DOA.verify();

        var i = 0;
        // regex converts full path to file name.
        var filePath = /.*\//gi;

        var progress = document.getElementById( 'loading-tip' ),
            preload  = document.getElementById( 'preload' );

        console.groupCollapsed( 'Preload' );

        Modernizr.load([
            {
                load : DOA.files,
                callback : function ( file ) {
                    progress.textContent = "Loading... " +
                                           "[" + (++i) + "/" + DOA.files.length + "] " +
                                           file.replace(filePath, '');
                },
                complete : function () {
                    console.groupEnd(); // Preload

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
                        DOA.Engine.renderer.domElement.style.display = 'block';

                        DOA.Game.bind();
                        DOA.Game.animate();

                        DOA.Game.isRunnig = true;
                        DOA.Game.status = 0;

                        DOA.Game.canvas = DOA.Engine.renderer.domElement;
                        DOA.Game.canvas.requestPointerLock =
                                            DOA.Game.canvas.requestPointerLock    ||
                                            DOA.Game.canvas.mozRequestPointerLock ||
                                            DOA.Game.canvas.webkitRequestPointerLock;
                        document.exitPointerLock =
                                            document.exitPointerLock    ||
                                            document.mozExitPointerLock ||
                                            document.webkitExitPointerLock;
                        DOA.Game.canvas.requestFullscreen =
                                            DOA.Game.canvas.requestFullscreen    ||
                                            DOA.Game.canvas.mozRequestFullscreen ||
                                            DOA.Game.canvas.mozRequestFullScreen ||
                                            DOA.Game.canvas.webkitRequestFullscreen;
                    }
                    document.onkeydown = hidePreload;
                    preload.onclick    = hidePreload;

                    progress.textContent = "Press any key to continue";

                    DOA.Game.init();
                    //@#
                    hidePreload();
                    //#@

                    // preload non-essential data
                    // Modernizr.load( DOA.data );
                }
            }
        ]);
    }
}
