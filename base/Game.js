/*
===============================================================================

    Class defines main game cycle and initialization.

===============================================================================
*/
var Game = new function () {
    var instance;
    function Game() { if ( !instance ) { instance = this; } else { return instance; } }

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

        console.group( "Verification" );

        if ( typeof Storage === "undefined" ) {
            console.info( "Checking [Storage] :: FAILED." );
            isSupported = false;
        } else {
            console.info( "Checking [Storage] :: OK." );
        }

        if ( ! Detector.webgl ) {
            Detector.addGetWebGLMessage();
            document.getElementById( 'holder' ).innerHTML = "";
            console.info( "Checking [  WebGl] :: FAILED." );
        } else {
            console.info( "Checking [  WebGl] :: OK." );
        }

        console.groupEnd(); // close Browser

        if ( !isSupported ) {
            console.warn( "Execution will be aborted due to previous errors." );
            throw new Error( "Verification failed. Browser not fully supported." );
        }
    }

    /*
    ---------------------------------------------------------------------------
    Game globals
    ---------------------------------------------------------------------------
    */
    this.isRunnig = false;
    this.stats    = null;

    //@# REMOVE
    var geometry, material, mesh;
    //## REMOVE

    /*
    ---------------------------------------------------------------------------
    Initialization
        Initialize Game
    ---------------------------------------------------------------------------
    */
    this.init = function init() {
        this.verify();
        Settings.scaleWindow();

        //@# REMOVE
        Player.camera.position.z = Settings.maxView / 4;
        Player.camera.position.y = Settings.maxView / 4;
        Player.camera.position.x = Settings.maxView / 4;
        Player.camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        mesh = new THREE.Mesh( geometry, material );
        World.scene.add( mesh );
        //## REMOVE

        Engine.renderer.setSize( Settings.width, Settings.height );
        Engine.renderer.setClearColor( Settings.background );
        Engine.renderer.domElement.id = 'scene';

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

        //@# REMOVE
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        //## REMOVE

        Engine.renderer.render( World.scene, Player.camera );
    }

    /*
    ---------------------------------------------------------------------------
    Camera methods
        Camere rotation.
    ---------------------------------------------------------------------------
    */
    this.cameraRotateXLeft = function () {
        Player.camera.rotateX(  3 * Math.PI / 180);
    }
    this.cameraRotateXRight = function () {
        Player.camera.rotateX(- 3 * Math.PI / 180);
    }

    this.cameraRotateYLeft = function () {
        Player.camera.rotateY(  3 * Math.PI / 180);
    }
    this.cameraRotateYRight = function () {
        Player.camera.rotateY(- 3 * Math.PI / 180);
    }

    this.cameraRotateZLeft = function () {
        Player.camera.rotateZ(  30 * Math.PI / 180);
    }
    this.cameraRotateZRight = function () {
        Player.camera.rotateZ(- 30 * Math.PI / 180);
    }

    this.cameraZoomIn = function () {
        Player.camera.position.z -= (Player.camera.position.z >= Settings.minView + 50) ? 50 : 0;
    }

    this.cameraZoomOut = function () {
        Player.camera.position.z += (Player.camera.position.z <= Settings.maxView - 50) ? 50 : 0;
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
        Player.camera.aspect = Settings.aspect();
        Player.camera.updateProjectionMatrix();
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
        Game.cameraRotateYLeft();
    }

    if ( event.keyCode === 68 ) { // d
        Game.cameraRotateYRight();
    }

    if ( event.keyCode === 83 ) { // s
        Game.cameraRotateXRight();
    }

    if ( event.keyCode === 87 ) { // w
        Game.cameraRotateXLeft();
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
            }, 1000 / Settings.fps ); // 1000 == 1s
        } else if ( document.getElementById( 'stats' ) === null ) {
            document.getElementById( 'holder' ).appendChild( Game.stats.domElement );
        } else {
            document.getElementById( 'stats' ).remove();
        }
    }
}

// Wheel event (Firefox, W3 standard)
function onWheel( event ) {
    if (event.deltaY < 0) {
        Game.cameraZoomIn();
    } else {
        Game.cameraZoomOut();
    }
}

// W3 standard (Chrome and others)
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

            Game.isRunnig = true;
        }
        document.onkeydown = hidePreload;
        elemPreload.onclick = hidePreload;
        document.getElementById( 'loading-tip' ).textContent = "Press any key to continue";

        Game.init();

        hidePreload();
    }
}
