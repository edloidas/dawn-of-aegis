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
    this.rotateLeft  = false;
    this.rotateRight = false;
    this.tiltDown    = false;
    this.tiltUp      = false;

    // !@ view can be also controlled by the wheel and rmb.

    this.camera = new THREE.PerspectiveCamera( DOA.Settings.fov,
                                               DOA.Settings.aspect(),
                                               DOA.Settings.minView,
                                               DOA.Settings.maxView );
    this.target = new DOA.Objects.PlaneTarget( this.camera );

    // Init position
    this.target.look();
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
        case DOA.Controls.rotateleft:  // [
            this.rotateLeft = true;
            break;
        case DOA.Controls.rotateright: // ]
            this.rotateRight = true;
            break;
        case DOA.Controls.tiltdown:    // ;
            this.tiltDown = true;
            break;
        case DOA.Controls.tiltup:      // '
            this.tiltUp = true;
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
        case DOA.Controls.arrowup:     // ↑
            this.moveTop = false;
            break;
        case DOA.Controls.arrowdown:   // ↓
            this.moveBottom = false;
            break;
        case DOA.Controls.arrowleft:   // ←
            this.moveLeft = false;
            break;
        case DOA.Controls.arrowright:  // →
            this.moveRight = false;
            break;
        case DOA.Controls.zoomin:      // +
            this.zoomIn = false;
            break;
        case DOA.Controls.zoomout:     // -
            this.zoomOut = false;
            break;
        case DOA.Controls.rotateleft:  // [
            this.rotateLeft = false;
            break;
        case DOA.Controls.rotateright: // ]
            this.rotateRight = false;
            break;
        case DOA.Controls.tiltdown:    // ;
            this.tiltDown = false;
            break;
        case DOA.Controls.tiltup:      // '
            this.tiltUp = false;
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
    if ( this.zoomIn ) {
        this.target.zoomIn();
    }
    if ( this.zoomOut ) {
        this.target.zoomOut();
    }
    if ( this.rotateLeft ) {
        this.target.rotateLeft();
    }
    if ( this.rotateRight ) {
        this.target.rotateRight();
    }
    if ( this.tiltDown ) {
        this.target.tiltDown();
    }
    if ( this.tiltUp ) {
        this.target.tiltUp();
    }

    this.target.animate( delta );
};
