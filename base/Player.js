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

    this.camera = new THREE.PerspectiveCamera( Settings.fov, Settings.aspect(), Settings.minView, Settings.maxView );

    /*
    ---------------------------------------------------------------------------
    Keyboard handling
    ---------------------------------------------------------------------------
    */
    this.onKeyDown = function ( code ) {
        if ( !this.isActive ) return code;

        switch ( code ) {
            default:
                return code;
        }
        return 0;
    }

    this.onKeyUp = function ( code ) {
        if ( !this.isActive ) return code;

        switch ( code ) {
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
        } else if( event.offsetX ) { // get coordinates
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;
        }
        else if( event.layerX ) {
            this.mouseX = event.layerX;
            this.mouseY = event.layerY;
        }
    }
}
