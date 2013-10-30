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

        document.getElementById( 'holder' ).appendChild( Engine.renderer.domElement );

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
        window.addEventListener( 'keydown',  onKeyDown,  false );
        window.addEventListener( 'keyup',    onKeyUp,    false );

        // MOUSE
        window.oncontextmenu = function () { return false; }; // disable RMB menu
        window.addEventListener( 'mousedown', onMouseDown, false );
        window.addEventListener( 'mouseup',   onMouseUp,   false );

        window.addEventListener( 'mousemove', onMouseMove, false );

        // MOUSE WHEEL
        window.addEventListener( 'wheel',      onWheel,      false ); // fx
        window.addEventListener( 'mousewheel', onMouseWheel, false ); // chrome
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
            document.getElementById( 'holder' ).appendChild( this.stats.domElement );

            var st = this.stats;
            setInterval( function () {
                st.begin();
                // do eval
                st.end();
            }, 1000 / Settings.fps ); // 1000 == 1s
        } else if ( document.getElementById( 'stats' ) === null ) {
            document.getElementById( 'holder' ).appendChild( this.stats.domElement );
        } else {
            document.getElementById( 'stats' ).remove();
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
Keyboard events
    Function register events, when key is down:
        ~ or ` -- to show debug console ( fps/ms ).
    Key codes ( EN type ):
    ( Esc )[27], ( Enter )[13], ( Tab )[9]
    ( LShift )[16], ( LCtrl )[17], ( LAlt )[18]
    ( w )[87], ( a )[65], ( s )[83], ( d )[68]
    ( q )[81], ( e )[69], ( r )[82], ( f )[70]
    ( c )[67], ( i )[73], ( m )[77], ( p )[80]
    ( ~ )[192], ( z )[90]
-------------------------------------------------------------------------------
*/
// Player actions and movement (start)
function onKeyDown( event ) {
    // Handle by player. Return 0 if handled, otherwise returns keyCode.
    var code = Player.onKeyDown( event.keyCode );

    switch ( code ) {
        case 0: // alredy handled
            break;
        case 90:
            Engine.toogleDevMode();
            break;
        case 192:
            Game.toogleStats();
            break;
    }
}

// Player actions and movement (stop)
function onKeyUp( event ) {
    // Handle by player. Return 0 if handled, otherwise returns keyCode.
    var code = Player.onKeyUp( event.keyCode );

    switch ( code ) {
        case 0: // alredy handled
            break;
    }
}

/*
-------------------------------------------------------------------------------
Mouse Events
    button: 0 - LBM
            1 - MBM
            2 - RBM
-------------------------------------------------------------------------------
*/
function onMouseDown( event ) {
    switch ( event.button ) {
        case 0: break;
        case 2: break;
        case 1: break;
    }
}

function onMouseUp( event ) {
    switch ( event.button ) {
        case 0: break;
        case 2: break;
        case 1: break;
    }
}

function onMouseMove( event ) {
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
