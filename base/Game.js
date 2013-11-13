/*
===============================================================================

    Class defines main game cycle and initialization.

===============================================================================
*/
function Game() {
    if ( !(this instanceof Game) ) return new Game();

    this.isRunnig = false;          // scene animation on / off

    this.stats  = null;             // stats DOM element
    this.canvas = null;             // element, that locks pointer

    this.status = 0;                // active game element index

    this.clock = new THREE.Clock(); // timer to sync coordinates changes

    //@#
    var geometry, material, mesh;
    //#@
}

/*
================
Initialization
    Initializes Game
================
*/
Game.prototype.init = function () {
    DOA.Settings.scaleWindow();
    DOA.Player.camera.aspect = DOA.Settings.aspect();
    DOA.Player.camera.updateProjectionMatrix();
    DOA.UI.updateSize();

    // @#
    DOA.Player.camera.position.z = DOA.Settings.maxView / 4;
    DOA.Player.camera.position.y = DOA.Settings.maxView / 4;
    DOA.Player.camera.position.x = DOA.Settings.maxView / 4;
    DOA.Player.camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );
    DOA.World.scene.add( mesh );
    // #@

    DOA.Engine.renderer.setSize( DOA.Settings.width, DOA.Settings.height );
    DOA.Engine.renderer.setClearColor( DOA.Settings.background );
    DOA.Engine.renderer.domElement.id = 'scene';
    DOA.Engine.renderer.domElement.style.display = 'none';
    // Manual clean for the multiple camera rendering.
    DOA.Engine.renderer.autoClear = false;

    document.body.appendChild( DOA.Engine.renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
}

/*
================
Binding
    Binds main game events for keyboard, mouse and window.
================
*/
Game.prototype.bind = function () {
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
    document.addEventListener( 'fullscreenchange',       fullscreenChange, false );
    document.addEventListener( 'mozfullscreenchange',    fullscreenChange, false );
    document.addEventListener( 'webkitfullscreenchange', fullscreenChange, false );
}

/*
================
Animate
    The main rendering process.
================
*/
Game.prototype.animate = function () {
    // render
    requestAnimationFrame( Game.prototype.animate );

    DOA.Player.animate( DOA.Game.clock.getDelta() );

    // @#
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    // #@

    // Clean previous buffer
    DOA.Engine.renderer.clear();
    // Render world (Layer 1)
    DOA.Engine.renderer.render( DOA.World.scene, DOA.Player.camera );
    // Render User Interface (Layer 2)
    DOA.Engine.renderer.render( DOA.UI.scene, DOA.UI.camera );
}

/*
================
toggleStats
    Shows / hides stats DOM element.
================
*/
Game.prototype.toggleStats = function () {
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
        }, 1000 / DOA.Settings.fps ); // 1000 == 1s
    } else if ( document.getElementById( 'stats' ) === null ) {
        document.body.appendChild( this.stats.domElement );
    } else {
        document.getElementById( 'stats' ).remove();
    }
}

/*
================
toggleMenu
    Shows / hide game menu and toggles pointer lock.
================
*/
Game.prototype.toggleMenu = function () {
    if ( this.status === 1 ) {
        this.canvas.requestPointerLock();
        this.status = 0;
    } else {
        document.exitPointerLock();
        this.status = 1;
    }
}

/*
================
toggleFullscreen
    Toggle fullscreen mode and manages pointer lock.
================
*/
Game.prototype.toggleFullscreen = function () {
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


/*
-------------------------------------------------------------------------------
    Game events
-------------------------------------------------------------------------------
*/

/*
================
onWindowResize
    Function changes 'holder' element size with minimum of 800x600. It also
    normalizes camera aspect ratio to fit new resolution.
================
*/
function onWindowResize() {
    // Condition will prevent double call
    if ( window.innerWidth !== DOA.Settings.width || window.innerHeight !== DOA.Settings.height ) {
        DOA.Settings.scaleWindow();
        DOA.Player.camera.aspect = DOA.Settings.aspect();
        DOA.Player.camera.updateProjectionMatrix();
        DOA.UI.updateSize();
        DOA.Engine.renderer.setSize( DOA.Settings.width, DOA.Settings.height );
    }
}

/*
-------------------------------------------------------------------------------
Keyboard Events
-------------------------------------------------------------------------------
*/
function onKeyDown( event ) {
    // Handled by DOA.Player. return: 0 - handled, keyCode - otherwise.
    var code = DOA.Player.onKeyDown( event.keyCode );
    switch ( code ) {
        case 0: // alredy handled
            break;
        case 77: // m
            DOA.Game.toggleMenu();
            break;
        case 88: // x
            DOA.Game.toggleFullscreen();
            break;
        case 90: // z
            DOA.Engine.toggleDevMode();
            break;
        case 192: // ~
            DOA.Game.toggleStats();
            break;
    }
}

function onKeyUp( event ) {
    var code = DOA.Player.onKeyUp( event.keyCode );

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
    switch ( DOA.Game.status ) {
        case 0: // game active
            if ( !DOA.Player.isActive ) { // DOA.Player not active
                DOA.Game.canvas.requestPointerLock();
            } else { // DOA.Player active
                DOA.Player.onMouseDown( event.button );
            }
            break;
        case 1: // main menu
            break;
        // other menus
    }
}

function onMouseUp( event ) {
    switch ( DOA.Game.status ) {
        case 0: // game active
            DOA.Player.onMouseUp( event.button );
            break;
        case 1: // main menu
            break;
        // other menus
    }
}

function onMouseMove( event ) {
    DOA.Player.onMouseMove( event );
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
    DOA.Player.isActive = ( document.pointerLockElement === DOA.Game.canvas ||
                        document.mozPointerLockElement === DOA.Game.canvas ||
                        document.webkitPointerLockElement === DOA.Game.canvas );
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
    if ( document.mozFullscreenElement === DOA.Game.canvas ||
         document.mozFullScreenElement === DOA.Game.canvas ||
         document.webkitFullscreenElement === DOA.Game.canvas ) {
        DOA.Game.canvas.requestPointerLock();
    }
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Game = new Game();
