/*
===============================================================================

    Class defines player.

===============================================================================
*/
var Player = new function () {
    var instance;
    function Player() { if ( !instance ) { instance = this; } else { return instance; } }

    this.isActive = false;

    this.mouseX = 0;
    this.mouseY = 0;

    this.moveForward  = false;
    this.moveBackward = false;
    this.moveLeft     = false;
    this.moveRight    = false;

    this.camera = new THREE.PerspectiveCamera( Settings.fov, Settings.aspect(), Settings.minView, Settings.maxView );
    this.target = new DOA.Target( this.camera );

    /*
    ---------------------------------------------------------------------------
    Keyboard handling
    ---------------------------------------------------------------------------
    */
    this.onKeyDown = function ( code ) {
        if ( !this.isActive ) return code;

        switch ( code ) {
            case 87: // w
                this.moveForward = true;
                break;
            case 83: // s
                this.moveBackward = true;
                break;
            default:
                return code;
        }
        return 0;
    }

    this.onKeyUp = function ( code ) {
        if ( !this.isActive ) return code;

        switch ( code ) {
            case 87: // w
                this.moveForward = false;
                break;
            case 83: // s
                this.moveBackward = false;
                break;
            default:
                return code;
        }
        return 0;
    }

    this.onMouseDown = function ( code ) {
        if ( !this.isActive ) return code;

        switch ( code ) {
            case 0: // lbm
                break;
            case 2: // rbm
                break;
            case 1: // mbm
                break;
            default:
                return code;
        }
        return 0;
    }

    this.onMouseUp = function ( code ) {
        if ( !this.isActive ) return code;

        switch ( code ) {
            case 0: // lbm
                break;
            case 2: // rbm
                break;
            case 1: // mbm
                break;
            default:
                return code;
        }
        return 0;
    }

    this.onMouseMove = function ( event ) {
        if ( this.isActive ) { // get delta
            this.mouseX = event.movementX || event.mozMovementX || event.webkitMovementX || 0,
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
    }

    this.animate = function () {
        if (this.moveForward) this.target.moveForward();
        if (this.moveBackward) this.target.moveBackward();
    }
}
