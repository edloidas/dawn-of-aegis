/*
===============================================================================

    Class defines player.

===============================================================================
*/
function Player() {
    if ( !(this instanceof Player) ) return new Player();

    this.isActive = false;

    this.mouseX = 0;
    this.mouseY = 0;

    // camera
    // target
}

/*
================
onKeyDown
    Handles key down event, when player is active.
================
*/
Player.prototype.onKeyDown = function ( code ) {
};

/*
================
onKeyUp
    Handles key up event, when player is active.
================
*/
Player.prototype.onKeyUp = function ( code ) {
};

/*
================
onMouseDown
    Handles mouse down event, when player is active.
================
*/
Player.prototype.onMouseDown = function ( code ) {
};

/*
================
onMouseUp
    Handles mouse up event, when player is active.
================
*/
Player.prototype.onMouseUp = function ( code ) {
};

/*
================
onMouseMove
    Handles mouse movement and updates mouse coordinates.
================
*/
Player.prototype.onMouseMove = function ( event ) {
};

/*
================
onWheel
    Handles mouse wheel scroll.
================
*/
Player.prototype.onWheel = function ( event ) {
};

/*
================
animate
    Animates player actions, depending on time delta.
================
*/
Player.prototype.animate = function ( delta ) {
};

/*
===============================================================================

    Class defines default player with modified third person look.

===============================================================================
*/
function DefaultPlayer() {
    if ( !(this instanceof DefaultPlayer) ) {
        return new DefaultPlayer();
    }
    DefaultPlayer.super.constructor.call( this );

    // move on the x-z plane
    this.moveTop     = false;
    this.moveBottom  = false;
    this.moveLeft    = false;
    this.moveRight   = false;

    // view
    this.zoomIn      = false;
    this.zoomOut     = false;
    this.tiltDown    = false;
    this.tiltUp      = false;
    this.rotateLeft  = false;
    this.rotateRight = false;

    // !@ view can be also controlled by the wheel and rmb.

    this.camera = new THREE.PerspectiveCamera( DOA.Settings.fov,
                                               DOA.Settings.aspect(),
                                               DOA.Settings.minView,
                                               DOA.Settings.maxView );
    this.target = new DOA.Objects.PlaneTarget( this.camera );
}

extend( DefaultPlayer, Player );

/*
================
onKeyDown
    Handles key down event, when player is active.
================
*/
DefaultPlayer.prototype.onKeyDown = function ( code ) {
    if ( !this.isActive ) return code;

    switch ( code ) {
        case DOA.Controls.arrowup:     // ↑
            this.moveTop = true;
            break;
        case DOA.Controls.arrowdown:   // ↓
            this.moveBottom = true;
            break;
        case DOA.Controls.arrowleft:   // ←
            this.moveLeft = true;
            break;
        case DOA.Controls.arrowright:  // →
            this.moveRight = true;
            break;
        case DOA.Controls.zoomin:      // +
            this.zoomIn = true;
            break;
        case DOA.Controls.zoomout:     // -
            this.zoomOut = true;
            break;
        case DOA.Controls.tiltdown:    // ;
            this.tiltDown = true;
            break;
        case DOA.Controls.tiltup:      // '
            this.tiltUp = true;
            break;
        case DOA.Controls.rotateleft:  // [
            this.rotateLeft = true;
            break;
        case DOA.Controls.rotateright: // ]
            this.rotateRight = true;
            break;
        default:
            return code;
    }
    return 0;
};

/*
================
onKeyUp
    Handles key up event, when player is active.
================
*/
DefaultPlayer.prototype.onKeyUp = function ( code ) {
    if ( !this.isActive ) return code;

    switch ( code ) {
        case DOA.Controls.arrowup:    // ↑
            this.moveTop = false;
            break;
        case DOA.Controls.arrowdown:  // ↓
            this.moveBottom = false;
            break;
        case DOA.Controls.arrowleft:  // ←
            this.moveLeft = false;
            break;
        case DOA.Controls.arrowright: // →
            this.moveRight = false;
            break;
        case DOA.Controls.zoomin:      // +
            this.zoomIn = false;
            break;
        case DOA.Controls.zoomout:     // -
            this.zoomOut = false;
            break;
        case DOA.Controls.tiltdown:    // ;
            this.tiltDown = false;
            break;
        case DOA.Controls.tiltup:      // '
            this.tiltUp = false;
            break;
        case DOA.Controls.rotateleft:  // [
            this.rotateLeft = false;
            break;
        case DOA.Controls.rotateright: // ]
            this.rotateRight = false;
            break;
        default:
            return code;
    }
    return 0;
};

/*
================
onMouseDown
    Handles mouse down event, when player is active.
================
*/
DefaultPlayer.prototype.onMouseDown = function ( code ) {
};

/*
================
onMouseUp
    Handles mouse up event, when player is active.
================
*/
DefaultPlayer.prototype.onMouseUp = function ( code ) {
};

/*
================
onMouseMove
    Handles mouse movement and updates mouse coordinates.
================
*/
DefaultPlayer.prototype.onMouseMove = function ( event ) {
    if ( this.isActive ) { // get delta
        this.mouseX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        this.mouseY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.target.look( this.mouseX, this.mouseY );
    } else { // get coordinates
        this.mouseX = event.offsetX || event.layerX || 0;
        this.mouseY = event.offsetY || event.layerY || 0;
    }
};

/*
================
onWheel
    Handles mouse wheel scroll.
================
*/
Player.prototype.onWheel = function ( code ) {
    // !@ fixed zoom, didn't use time delta
    this.target.zoom( code );
};

/*
================
animate
    Animates player actions, depending on time delta.
================
*/
DefaultPlayer.prototype.animate = function ( delta ) {
    this.target.delta = delta;

    if ( this.moveTop ) {
        this.target.moveTop();
    }
    if ( this.moveBottom ) {
        this.target.moveBottom();
    }
    if ( this.moveLeft ) {
        this.target.moveLeft();
    }
    if ( this.moveRight ) {
        this.target.moveRight();
    }
};

/*
===============================================================================

    Class defines player with first person look and controls.

===============================================================================
*/
function AltPlayer() {
    if ( !(this instanceof AltPlayer) ) {
        return new AltPlayer();
    }
    AltPlayer.super.constructor.call( this );

    this.moveForward  = false;
    this.moveBackward = false;
    this.moveLeft     = false;
    this.moveRight    = false;

    this.camera = new THREE.PerspectiveCamera( DOA.Settings.fov,
                                               DOA.Settings.aspect(),
                                               DOA.Settings.minView,
                                               DOA.Settings.maxView );
    this.target = new DOA.Objects.VolumeTarget( this.camera );
}

extend( AltPlayer, Player );

/*
================
onKeyDown
    Handles key down event, when player is active.
================
*/
AltPlayer.prototype.onKeyDown = function ( code ) {
    if ( !this.isActive ) return code;

    switch ( code ) {
        case DOA.Controls.forward: // w
            this.moveForward = true;
            break;
        case DOA.Controls.backward: // s
            this.moveBackward = true;
            break;
        case DOA.Controls.strafeleft: // a
            this.moveLeft = true;
            break;
        case DOA.Controls.straferight: // d
            this.moveRight = true;
            break;
        default:
            return code;
    }
    return 0;
};

/*
================
onKeyUp
    Handles key up event, when player is active.
================
*/
AltPlayer.prototype.onKeyUp = function ( code ) {
    if ( !this.isActive ) return code;

    switch ( code ) {
        case DOA.Controls.forward: // w
            this.moveForward = false;
            break;
        case DOA.Controls.backward: // s
            this.moveBackward = false;
            break;
        case DOA.Controls.strafeleft: // a
            this.moveLeft = false;
            break;
        case DOA.Controls.straferight: // d
            this.moveRight = false;
            break;
        default:
            return code;
    }
    return 0;
};

/*
================
onMouseDown
    Handles mouse down event, when player is active.
================
*/
AltPlayer.prototype.onMouseDown = function ( code ) {
    if ( !this.isActive ) return code;

    switch ( code ) {
        case DOA.Controls.lmb:
            break;
        case DOA.Controls.rmb:
            break;
        case DOA.Controls.mmb:
            break;
        default:
            return code;
    }
    return 0;
};

/*
================
onMouseUp
    Handles mouse up event, when player is active.
================
*/
AltPlayer.prototype.onMouseUp = function ( code ) {
    if ( !this.isActive ) return code;

    switch ( code ) {
        case DOA.Controls.lmb:
            break;
        case DOA.Controls.rmb:
            break;
        case DOA.Controls.mmb:
            break;
        default:
            return code;
    }
    return 0;
};

/*
================
onMouseMove
    Handles mouse movement and updates mouse coordinates.
================
*/
AltPlayer.prototype.onMouseMove = function ( event ) {
    if ( this.isActive ) { // get delta
        this.mouseX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        this.mouseY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.target.look( this.mouseX, this.mouseY );
    } else { // get coordinates
        this.mouseX = event.offsetX || event.layerX || 0;
        this.mouseY = event.offsetY || event.layerY || 0;
    }
};

/*
================
animate
    Animates player actions, depending on time delta.
================
*/
AltPlayer.prototype.animate = function ( delta ) {
    this.target.delta = delta;

    if ( this.moveForward ) {
        this.target.moveForward();
    }
    if ( this.moveBackward ) {
        this.target.moveBackward();
    }
    if ( this.moveLeft ) {
        this.target.moveLeft();
    }
    if ( this.moveRight ) {
        this.target.moveRight();
    }
};

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Player = new DefaultPlayer();
