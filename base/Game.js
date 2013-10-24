/*
===============================================================================

    Class defines main game cycle and initialization.

===============================================================================
*/
var Game = new function() {
    var instance;

    function Game() {
        if ( !instance ) {
            instance = this;
        } else {
            return instance;
        }
    }

    /*
    ---------------------------------------------------------------------------
    Verification
        Method runs first time initializations and checks browser compatibility
        for the used technologies and loaded modules. Throws exception in case
        of incompatibility, that prevents further program execution.
    ---------------------------------------------------------------------------
    */
    this.verify = function () {
        var isSupported = true;

        if ( typeof console === "undefined"
                || typeof console.log === "undefined"
                || typeof console.info === "undefined"
                || typeof console.warn === "undefined"
                || typeof console.error === "undefined" ) {
            throw "Exception : initialization failed. \"console\" is not available."
        }

        console.group( "Verification" );
        console.group( "Browser" );
        console.info( "Checking [ Console] :: OK." );

        if ( typeof Storage === "undefined" ) {
            console.info( "Checking [ Storage] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [ Storage] :: OK." );
        }

        console.groupEnd(); // close Browser
        console.group( "Libraries" );

        if ( typeof jQuery === "undefined" ) {
            console.info( "Checking [  jQuery] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [  jQuery] :: OK." );
        }

        if ( typeof angular === "undefined" ) {
            console.info( "Checking [ Angular] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [ Angular] :: OK." );
        }

        console.groupEnd(); // close Libraries
        console.group( "Game Modules" );

        if ( typeof Save === "undefined" ) {
            console.info( "Checking [    Save] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [    Save] :: OK." );
        }

        if ( typeof Settings === "undefined" ) {
            console.info( "Checking [Settings] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [Settings] :: OK." );
        }

        if ( typeof Engine === "undefined" ) {
            console.info( "Checking [  Engine] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [  Engine] :: OK." );
        }

        console.groupEnd(); // close Game Modules
        console.group( "WebGL & Three.js" );

        if ( typeof THREE === "undefined" ) {
            console.info( "Checking [   THREE] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [   THREE] :: OK." );
        }

        if ( typeof Stats === "undefined" ) {
            console.info( "Checking [   Stats] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [   Stats] :: OK." );
        }

        if ( typeof Detector === "undefined" ) {
            console.info( "Checking [Detector] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [Detector] :: OK." );
        }

        console.groupEnd(); // close WebGL & Three.js
        console.groupEnd(); // close Verification

        if ( !isSupported ) {
            console.warn( "Execution will be aborted due to previous errors." );
            // Exception should not be caught. Termination is expected.
            throw new Error( "Verification failed. Browser not fully supported." );
        }
    }

    this.Status = {ready: -1, running: 0, paused: 1};
    this.status = null;

    this.camera   = null;
    this.scene    = null;
    this.renderer = null;
    var geometry, material, mesh;

    this.stats = null;

    /*
    ---------------------------------------------------------------------------
    Initialization
        Initialize Game
    ---------------------------------------------------------------------------
    */
    this.init = function init() {
        this.verify();
        Settings.scaleWindow();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.domElement.id = "scene";

        document.getElementById( 'holder' ).appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );
    }

    /*
    ---------------------------------------------------------------------------
    Binding
        Bing main game events for button and mouse.
    ---------------------------------------------------------------------------
    */
    this.bind = function bind() {
        window.addEventListener( 'keydown', onKeyDown, false );
    }

    /*
    ---------------------------------------------------------------------------
    Animate
        The main rendering process.
    ---------------------------------------------------------------------------
    */
    this.animate = function animate() {
        // render
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );
    }
}


/*
===============================================================================

    Gmae events.

===============================================================================
*/

/*
-------------------------------------------------------------------------------
onWindowResize
    Function changes 'holder' element size with minimum of 800x600. It also
    normalizes camera aspect ratio to fit new resolution.
-------------------------------------------------------------------------------
*/
function onWindowResize() {
    // Condition will prevent double call
    if ( window.innerWidth !== Settings.width || window.innerHeight !== Settings.height ) {
        Settings.scaleWindow();
        camera.aspect = Settings.aspect();
        camera.updateProjectionMatrix();
        renderer.setSize( Settings.width, Settings.height );
    }
}

/*
-------------------------------------------------------------------------------
onKeyDown
    Function register events, when key is down:
        ~ or ` -- to show debug console ( fps/ms ).
-------------------------------------------------------------------------------
*/
function onKeyDown( event ) {
    // Key codes ( EN type ):
    // ( ~ )[192], ( Esc )[27], ( Enter )[13]
    // ( w )[87], ( a )[65], ( s )[83], ( d )[68]
    // ( q )[81], ( e )[69], ( r )[82], ( f )[70]
    // ( c )[67], ( i )[73], ( m )[77], ( p )[80]
    var code = event.keyCode;

    if ( event.keyCode === 192 ) {
        if ( Game.stats === null ) {
            Game.stats = new Stats();
            Game.stats.setMode( 0 ); // 0: fps, 1: ms

            Game.stats.domElement.id = 'stats';
            Game.stats.domElement.style.position = 'fixed';
            Game.stats.domElement.style.left = '0px';
            Game.stats.domElement.style.top = '0px';
            Game.stats.domElement.style.zIndex = 99;
            document.getElementById( 'holder' ).appendChild( Game.stats.domElement );

            setInterval( function () {
                Game.stats.begin();
                // do eval
                Game.stats.end();
            }, 1000 / 60 );
        } else if ( document.getElementById( 'stats' ) === null ) {
            document.getElementById( 'holder' ).appendChild( Game.stats.domElement );
        } else {
            document.getElementById( 'stats' ).remove();
        }
    }
}
