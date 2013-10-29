/*
===============================================================================

    Class defines main game cycle and initialization.

===============================================================================
*/
var Game = new function () {
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
        console.group( "Game Modules" );

        if ( typeof Settings === "undefined" ) {
            console.info( "Checking [Settings] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [Settings] :: OK." );
        }

        if ( typeof DOA === "undefined" ) { // Objects
            console.info( "Checking [ Objects] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [ Objects] :: OK." );
        }

        if ( typeof Engine === "undefined" ) {
            console.info( "Checking [  Engine] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [  Engine] :: OK." );
        }

        console.groupEnd(); // close Game Modules
        console.group( "Libraries" );

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

        console.groupEnd(); // close Libraries
        console.groupEnd(); // close Verification

        if ( !isSupported ) {
            console.warn( "Execution will be aborted due to previous errors." );
            // Exception should not be caught. Termination is expected.
            throw new Error( "Verification failed. Browser not fully supported." );
        }
    }

    this.Status = {ready: -1, running: 0, paused: 1};
    this.status = null;

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

        Engine.camera = new THREE.PerspectiveCamera( Settings.fov, Settings.aspect(), Settings.minView, Settings.maxView );
        Engine.camera.position.z = Settings.maxView / 2;

        Engine.scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        Engine.scene.add( mesh );

        Engine.renderer = new THREE.CanvasRenderer();
        Engine.renderer.setSize( Settings.width, Settings.height );

        Engine.renderer.domElement.id = "scene";

        document.getElementById( 'holder' ).appendChild( Engine.renderer.domElement );

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
        // mouse wheel for Firefox
        window.addEventListener( 'wheel', onWheel, false );
        // mouse wheel for Chrome and others
        window.addEventListener( 'mousewheel', onMouseWheel, false );
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

        Engine.renderer.render( Engine.scene, Engine.camera );
    }

    /*
    ---------------------------------------------------------------------------
    Camera methods
        Camere rotation.
    ---------------------------------------------------------------------------
    */
    this.cameraRotateXLeft = function () {
        Engine.camera.rotateX(  3 * Math.PI / 180);
    }
    this.cameraRotateXRight = function () {
        Engine.camera.rotateX(- 3 * Math.PI / 180);
    }

    this.cameraRotateYLeft = function () {
        Engine.camera.rotateY(  3 * Math.PI / 180);
    }
    this.cameraRotateYRight = function () {
        Engine.camera.rotateY(- 3 * Math.PI / 180);
    }

    this.cameraRotateZLeft = function () {
        Engine.camera.rotateZ(  30 * Math.PI / 180);
    }
    this.cameraRotateZRight = function () {
        Engine.camera.rotateZ(- 30 * Math.PI / 180);
    }

    this.cameraZoomIn = function () {
        Engine.camera.position.z -= (Engine.camera.position.z >= Settings.minView + 50) ? 50 : 0;
    }

    this.cameraZoomOut = function () {
        Engine.camera.position.z += (Engine.camera.position.z <= Settings.maxView - 50) ? 50 : 0;
    }
}


/*
===============================================================================

    Game events.

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
        Engine.camera.aspect = Settings.aspect();
        Engine.camera.updateProjectionMatrix();
        Engine.renderer.setSize( Settings.width, Settings.height );
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

    if ( event.keyCode === 65 ) { // a
        Game.cameraRotateXLeft();
    }

    if ( event.keyCode === 68 ) { // d
        Game.cameraRotateXRight();
    }

    if ( event.keyCode === 83 ) { // s
        Game.cameraRotateYLeft();
    }

    if ( event.keyCode === 87 ) { // w
        Game.cameraRotateYRight();
    }

    if ( event.keyCode === 81 ) { // q
        Game.cameraRotateZLeft();
    }

    if ( event.keyCode === 69 ) { // e
        Game.cameraRotateZRight();
    }

    if ( event.keyCode === 67 ) { // c
        Engine.toogleAxis();
    }

    if ( event.keyCode === 192 ) { // ~
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

// W3 standard
function onWheel( event ) {
    if (event.deltaY < 0) {
        Game.cameraZoomIn();
    } else {
        Game.cameraZoomOut();
    }
}

function onMouseWheel( event ) {
    if (event.wheelDelta > 0) {
        Game.cameraZoomIn();
    } else {
        Game.cameraZoomOut();
    }
}

/*
===============================================================================

    Start.

===============================================================================
*/
document.onreadystatechange = function () {
if ( document.readyState === "complete" ) {
        var elemPreload = document.getElementById( 'preload' );
        var elemHolder  = document.getElementById( 'holder' );
        function hidePreload() {
            document.onkeydown = null;
            elemPreload.onclick = null;
            elemPreload.remove();
            elemHolder.classList.remove( 'hidden' );

            Game.bind();
            Game.animate();

            Game.status = Game.Status.running;
        }
        document.onkeydown = hidePreload;
        elemPreload.onclick = hidePreload;
        document.getElementById( 'loading-tip' ).textContent = "Press any key to continue";

        Game.init();
        Game.status = Game.Status.ready;


        hidePreload();
    }
}
