/*
===============================================================================

    Class defines main game cycle and initialization.

===============================================================================
*/
function Game() {
    if ( !(this instanceof Game) ) return new Game();

    this.stats  = null; // stats DOM element
    this.canvas = null; // element, that locks pointer

    this.status = 0;    // active game element index
                        // 0 - third person control (main)
                        // 1 - first person control (eyes view)
                        // 2 - mouse control (menu)

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

    // @#
    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );
    DOA.World.scene.add( mesh );
    // #@

    DOA.Engine.renderer.setSize( DOA.Settings.width, DOA.Settings.height );
    DOA.Engine.renderer.setClearColor( DOA.Settings.background );
    DOA.Engine.renderer.domElement.id = 'scene';
    DOA.Engine.renderer.domElement.style.display = 'none';
    // !@ Manual clean for the multiple camera rendering.
    DOA.Engine.renderer.autoClear = false;

    // !@ Render World for first time
    // World.scene will be displayed on first-time pause.
    DOA.Engine.renderer.clear();
    DOA.Engine.renderer.render( DOA.World.scene, DOA.Player.camera );
    DOA.Engine.renderer.render( DOA.UI.scene, DOA.UI.camera );
    DOA.Settings.updateAnisotropy();

    document.body.appendChild( DOA.Engine.renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    // append after renderer DOM
    DOA.UI.init();
    DOA.UI.updateSize();
};

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
    document.addEventListener( 'pointerlockchange',       DOA.Game.onPointerLockChange, false );
    document.addEventListener( 'mozpointerlockchange',    DOA.Game.onPointerLockChange, false );
    document.addEventListener( 'webkitpointerlockchange', DOA.Game.onPointerLockChange, false );

    document.addEventListener( 'pointerlockerror',        DOA.Game.onPointerLockError,  false );
    document.addEventListener( 'mozpointerlockerror',     DOA.Game.onPointerLockError,  false );
    document.addEventListener( 'webkitpointerlockerror',  DOA.Game.onPointerLockError,  false );

    // FULLSCREEN
    document.addEventListener( 'fullscreenchange',       fullscreenChange, false );
    document.addEventListener( 'mozfullscreenchange',    fullscreenChange, false );
    document.addEventListener( 'webkitfullscreenchange', fullscreenChange, false );
};

/*
================
Animate
    The main rendering process.
================
*/
Game.prototype.animate = function () {
    // render
    requestAnimationFrame( Game.prototype.animate );

    if ( DOA.Game.status === 0 ) {
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
};

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
};

/*
================
toggleMenu
    Shows / hide game menu and toggles pointer lock.
================
*/
Game.prototype.toggleMenu = function () {
    if ( this.status === 1 ) {
        DOA.Settings.apply();
        DOA.UI.menu.domElement.style.display = 'none';
        this.canvas.requestPointerLock();
        this.status = 0;
    } else {
        DOA.UI.menu.domElement.style.display = 'block';
        document.exitPointerLock();
        this.status = 1;
    }
};

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
};


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
================
onKeyDown
    Controls key down event global handling.
================
*/
function onKeyDown( event ) {
    // Handled by DOA.Player. return: 0 - handled, keyCode - otherwise.
    var code = DOA.Player.onKeyDown( event.keyCode );
    switch ( code ) {
        case 0: // alredy handled
            break;
        case DOA.Controls.devmenu:
            DOA.Game.toggleMenu();
            break;
        case DOA.Controls.fullscreen:
            DOA.Game.toggleFullscreen();
            break;
        case DOA.Controls.devmode:
            DOA.Engine.toggleDevMode();
            break;
        case DOA.Controls.debug:
            DOA.Game.toggleStats();
            break;
    }
}

/*
================
onKeyUp
    Controls key up event global handling.
================
*/
function onKeyUp( event ) {
    var code = DOA.Player.onKeyUp( event.keyCode );

    switch ( code ) {
        case 0: // alredy handled
            break;
    }
}

/*
================
onMouseDown
    Controls mouse down event global handling.
================
*/
function onMouseDown( event ) {
    switch ( DOA.Game.status ) {
        case 0: // game active
            if ( !DOA.Player.isActive ) { // Player look is active
                DOA.Game.canvas.requestPointerLock();
            } else {
                DOA.Player.onMouseDown( event.button );
            }
            break;
        case 1:
            break;
    }
}

/*
================
onMouseUp
    Controls mouse up event global handling.
================
*/
function onMouseUp( event ) {
    switch ( DOA.Game.status ) {
        case 0: // game active
            DOA.Player.onMouseUp( event.button );
            break;
        case 1:
            break;
    }
}

/*
================
onMouseUp
    Controls mouse move event global handling.
================
*/
function onMouseMove( event ) {
    DOA.Player.onMouseMove( event );
}

/*
================
onWheel
    Controls wheel event global handling in firefox.
================
*/
function onWheel( event ) {
    if ( event.deltaY < 0 ) {
        DOA.Player.onWheel(  1 ); // up
    } else {
        DOA.Player.onWheel( -1 ); // down
    }
}

/*
================
onMouseWheel
    Controls wheel event global handling in chrome.
================
*/
function onMouseWheel( event ) {
    if ( event.wheelDelta > 0 ) {
        DOA.Player.onWheel(  1 ); // up
    } else {
        DOA.Player.onWheel( -1 ); // down
    }
}


/*
-------------------------------------------------------------------------------
Window manipulations
-------------------------------------------------------------------------------
*/

/*
================
onPointerLockChange
    Controls pointer lock event handling.
================
*/
Game.prototype.onPointerLockChange = function ( event ) {
    DOA.Player.isActive = ( document.pointerLockElement === DOA.Game.canvas ||
                            document.mozPointerLockElement === DOA.Game.canvas ||
                            document.webkitPointerLockElement === DOA.Game.canvas );
};

/*
================
onPointerLockError
    Controls pointer lock event error.
================
*/
Game.prototype.onPointerLockError = function ( event ) {
    console.warn( 'Pointer lock error.' );
};

/*
================
fullscreenChange
    Controls fullscreen change event.
================
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
