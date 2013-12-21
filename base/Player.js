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

    this.moveForward  = false;
    this.moveBackward = false;
    this.moveLeft     = false;
    this.moveRight    = false;

    this.camera = new THREE.PerspectiveCamera( DOA.Settings.fov,
                                               DOA.Settings.aspect(),
                                               DOA.Settings.minView,
                                               DOA.Settings.maxView );
    this.target = new DOA.Objects.Target( this.camera );
}

/*
================
onKeyDown
    Handles key down event, when player is active.
================
*/
Player.prototype.onKeyDown = function ( code ) {
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
Player.prototype.onKeyUp = function ( code ) {
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
Player.prototype.onMouseDown = function ( code ) {
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
Player.prototype.onMouseUp = function ( code ) {
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
Player.prototype.onMouseMove = function ( event ) {
    if ( this.isActive ) { // get delta
        this.mouseX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        this.mouseY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.target.look( this.mouseX, this.mouseY );
    } else if( event.offsetX ) { // get coordinates
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }
    else if( event.layerX ) {
        this.mouseX = event.layerX;
        this.mouseY = event.layerY;
    }
};

/*
================
animate
    Animates player actions, depending on time delta.
================
*/
Player.prototype.animate = function ( delta ) {
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
DOA.Player = new Player();
