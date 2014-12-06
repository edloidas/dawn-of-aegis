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

    // Libraries
    this.lib = [
        "lib/three",
        "lib/stats",
        "lib/dat.gui"
    ];

    // Essential game files
    this.files = [
        "base/Utils",
        "base/Settings",
        "base/Objects",
        "base/Caches",
        "base/Player",
        "base/UI",
        "base/World",
        "base/Engine",
        "base/Game"];

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

    if ( typeof Storage !== "undefined" ) {
        console.info( "Storage support     : YES" );
    } else {
        console.info( "Storage support     : NO" );
        isSupported = false;
    }

    var audio = document.createElement('audio');
    if ( !!audio.canPlayType ) {
        console.info( "Audio support       : YES" );
    } else {
        console.info( "Audio support       : NO" );
        isSupported = false;
    }

    if ( typeof Worker !== "undefined" ) {
        console.info( "Webworkers support  : YES" );
    } else {
        console.info( "Webworkers support  : NO" );
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
};

// DOA object
var DOA = new Doa();


/*
---------------------------------------------------------------------------
RequireJS
---------------------------------------------------------------------------
*/
require.config({
    baseUrl: ""
});

function chainRequire( files, index ) {
    files = files || [];
    index = index || 0;

    document.dispatchEvent( new CustomEvent( 'required', {
        'detail': {
            'name' : files[index],
            'count': index + 1,
            'total': files.length
            }
        }));

    if ( index <= files.length - 1 ) {
        require([files[index]], function () {
            index++;
            chainRequire(files, index);
        });
    }
}


/*
---------------------------------------------------------------------------
Loader
---------------------------------------------------------------------------
*/
var reqiuredListener =
document.addEventListener( 'required', function ( e ) {

    if (e.detail.count > e.detail.total) {
        console.groupEnd();
        this.removeEventListener( 'required', reqiuredListener );

        var progress = document.getElementById( 'loading-tip' ),
            preload  = document.getElementById( 'preload' );

            document.onkeydown = hidePreload;
            preload.onclick    = hidePreload;

            progress.textContent = "Press any key to continue";

            DOA.Game.init();
            //@#
            hidePreload();
            //#@
    } else {
        console.info("[" + e.detail.count + "/" + e.detail.total + "]'" + e.detail.name + "' loading.");
    }

}, false );

function hidePreload() {
    document.onkeydown = null;
    preload.onclick = null;
    preload.remove();
    DOA.Engine.renderer.domElement.style.display = 'block';

    DOA.Game.bind();
    DOA.Game.animate();

    DOA.Game.isRunnig = true;
    DOA.Game.status = 1;

    DOA.Game.canvas = DOA.Engine.renderer.domElement;
    DOA.Game.canvas.requestPointerLock =
                      DOA.Game.canvas.requestPointerLock    ||
                      DOA.Game.canvas.mozRequestPointerLock ||
                      DOA.Game.canvas.webkitRequestPointerLock;
    document.exitPointerLock =
                      document.exitPointerLock    ||
                      document.mozExitPointerLock ||
                      document.webkitExitPointerLock;
    DOA.Game.fullscreen = document.body;
    DOA.Game.fullscreen.requestFullscreen =
                      DOA.Game.canvas.requestFullscreen    ||
                      DOA.Game.canvas.mozRequestFullscreen ||
                      DOA.Game.canvas.mozRequestFullScreen ||
                      DOA.Game.canvas.webkitRequestFullscreen;
}


/*
---------------------------------------------------------------------------
Start application
---------------------------------------------------------------------------
*/
function start() {
    if ( document.readyState === 'complete' ) {
        DOA.verify();

        console.groupCollapsed( 'Preload' );

        require(DOA.lib, function () {
            chainRequire(DOA.files);
        });
    }
}

// Start, when the document is loaded
document.onreadystatechange = function () {
    start();
};
// ...or start at instant, if paged is cached
start();
