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
        Checks compatibility and prevent further execution.
    ---------------------------------------------------------------------------
    */
    this.verify = function () {
        var isSupported = true;

        console.group( "Verification" );

        if ( typeof Storage === "undefined" ) {
            console.info( "Storage support :     NO" );
            isSupported = false;
        } else {
            console.info( "Storage support :     YES" );
        }

        if ( Detector.webgl ) {
            console.info( "WebGL support :       YES" );
        } else {
            console.info( "WebGL support :       NO" );
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
            console.info( "Fullscreen support :  YES" );
        } else {
            console.info( "Fullscreen support :  NO" );
            isSupported = false;
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
    this.isRunnig = false; // scene animation on / off

    this.stats         = null; // stats DOM element
    this.canvas = null; // element, that locks pointer

    this.status = 0; // active game element index

    //@# REMOVE
    var geometry, material, mesh;
    //## REMOVE

    /*
    ---------------------------------------------------------------------------
    Initialization
        Initialize Game
    ---------------------------------------------------------------------------
    */
    this.init = function () {
        this.verify();
        Settings.scaleWindow();
        Player.camera.aspect = Settings.aspect();
        Player.camera.updateProjectionMatrix();

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
        Engine.renderer.domElement.style.display = 'none';

        document.body.appendChild( Engine.renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );
    }

    /*
    ---------------------------------------------------------------------------
    Binding
        Bind main game events for button and mouse.
    ---------------------------------------------------------------------------
    */
    this.bind = function () {
        // KEYBOARD
        window.addEventListener( 'keydown', onKeyDown, false );
        window.addEventListener( 'keyup',   onKeyUp,   false );

        // MOUSE
        window.oncontextmenu = function () { return false; }; // disable RMB menu
        window.addEventListener( 'mousedown', onMouseDown, false );
        window.addEventListener( 'mouseup',   onMouseUp,   false );

        window.addEventListener( 'mousemove', onMouseMove, false );

        // MOUSE WHEEL
        window.addEventListener( 'wheel',      onWheel,      false ); // fx
        window.addEventListener( 'mousewheel', onMouseWheel, false ); // chrome

        // POINTER LOCK
        document.addEventListener( 'pointerlockchange',       onPointerLockChange, false );
        document.addEventListener( 'mozpointerlockchange',    onPointerLockChange, false );
        document.addEventListener( 'webkitpointerlockchange', onPointerLockChange, false );

        document.addEventListener( 'pointerlockerror',        onPointerLockError,  false );
        document.addEventListener( 'mozpointerlockerror',     onPointerLockError,  false );
        document.addEventListener( 'webkitpointerlockerror',  onPointerLockError,  false );

        // FULLSCREEN
        document.addEventListener('fullscreenchange',       fullscreenChange, false);
        document.addEventListener('mozfullscreenchange',    fullscreenChange, false);
        document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
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
    Other methods
    ---------------------------------------------------------------------------
    */
    this.toogleStats = function () {
        if ( this.stats === null ) {
            this.stats = new Stats();
            this.stats.setMode( 0 ); // 0: fps, 1: ms

            this.stats.domElement.id = 'stats';
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.left = '0px';
            this.stats.domElement.style.top = '0px';
            this.stats.domElement.style.zIndex = 99;
            document.body.appendChild( this.stats.domElement );

            var st = this.stats;
            setInterval( function () {
                st.begin();
                // do eval
                st.end();
            }, 1000 / Settings.fps ); // 1000 == 1s
        } else if ( document.getElementById( 'stats' ) === null ) {
            document.body.appendChild( this.stats.domElement );
        } else {
            document.getElementById( 'stats' ).remove();
        }
    }

    this.toogleMenu = function () {
        if ( this.status === 1 ) {
            this.canvas.requestPointerLock();
            this.status = 0;
        } else {
            document.exitPointerLock();
            this.status = 1;
        }
    }

    this.toogleFullscreen = function () {
        if ( document.mozFullscreenElement === this.canvas ||
             document.mozFullScreenElement === this.canvas ||
             document.webkitFullscreenElement === this.canvas ) {

            if ( document.cancelFullScreen ) {
                document.cancelFullScreen();
            } else if ( document.mozCancelFullScreen ) {
                document.mozCancelFullScreen();
            } else if ( document.webkitCancelFullScreen ) {
                document.webkitCancelFullScreen();
            }

        } else {
            this.canvas.requestFullscreen();
        }
    }
}


/*
===============================================================================

    Game events

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
Keyboard Events
-------------------------------------------------------------------------------
*/
function onKeyDown( event ) {
    // Handled by player. return: 0 - handled, keyCode - otherwise.
    var code = Player.onKeyDown( event.keyCode );
    switch ( code ) {
        case 0: // alredy handled
            break;
        case 77: // m
            Game.toogleMenu();
            break;
        case 88: // x
            Game.toogleFullscreen();
            break;
        case 90: // z
            Engine.toogleDevMode();
            break;
        case 192: // ~
            Game.toogleStats();
            break;
    }
}

function onKeyUp( event ) {
    var code = Player.onKeyUp( event.keyCode );

    switch ( code ) {
        case 0: // alredy handled
            break;
    }
}

/*
-------------------------------------------------------------------------------
Mouse Events
-------------------------------------------------------------------------------
*/
function onMouseDown( event ) {
    switch ( Game.status ) {
        case 0: // game active
            if ( !Player.isActive ) { // player not active
                Game.canvas.requestPointerLock();
            } else { // player active
                Player.onMouseDown( event.button );
            }
            break;
        case 1: // main menu
            break;
        // other menus
    }
}

function onMouseUp( event ) {
    switch ( Game.status ) {
        case 0: // game active
            Player.onMouseUp( event.button );
            break;
        case 1: // main menu
            break;
        // other menus
    }
}

function onMouseMove( event ) {
    Player.onMouseMove( event );
}

function onWheel( event ) {
    if ( event.deltaY < 0 ) {
        // up
    } else {
        // down
    }
}

function onMouseWheel( event ) {
    if ( event.wheelDelta > 0 ) {
        // up
    } else {
        // down
    }
}

/*
-------------------------------------------------------------------------------
Ponter Lock Events
-------------------------------------------------------------------------------
*/
var onPointerLockChange = function ( event ) {
    Player.isActive = ( document.pointerLockElement === Game.canvas ||
                        document.mozPointerLockElement === Game.canvas ||
                        document.webkitPointerLockElement === Game.canvas );
}

var onPointerLockError = function ( event ) {
    console.warn( 'Pointer lock error.' );
}

/*
-------------------------------------------------------------------------------
Fullscreen Events
-------------------------------------------------------------------------------
*/
function fullscreenChange() {
    // lock pointer only for manual fullscreen via 'x'
    if ( document.mozFullscreenElement === Game.canvas ||
         document.mozFullScreenElement === Game.canvas ||
         document.webkitFullscreenElement === Game.canvas ) {
        Game.canvas.requestPointerLock();
    }
}

/*
===============================================================================

    Entry point
        Triggered after the page is loaded.

===============================================================================
*/
document.onreadystatechange = function () {
if ( document.readyState === "complete" ) {
        var elemPreload = document.getElementById( 'preload' );

        function hidePreload() {
            document.onkeydown = null;
            elemPreload.onclick = null;
            elemPreload.remove();
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
        elemPreload.onclick = hidePreload;
        document.getElementById( 'loading-tip' ).textContent = "Press any key to continue";

        Game.init();

        hidePreload();
    }
}
