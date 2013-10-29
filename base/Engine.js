/*
===============================================================================

    Class defines in-game physics and calculations.

===============================================================================
*/
var Engine = new function () {
    var instance;

    // constructor
    function Engine() {

        if ( !instance ) {
            instance = this;
        } else {
            return instance;
        }
    }

    this.camera   = null;
    this.scene    = null;
    this.renderer = null;

    this.axis = new DOA.Axis();

    /*
    ---------------------------------------------------------------------------
    Drawing methods
    ---------------------------------------------------------------------------
    */
    this.toogleAxis = function () {
        if (this.axis.enabled) {
            this.axis.enabled = false;
            this.scene.remove(this.axis.clear());
        } else {
            this.axis.enabled = true;
            this.scene.add(this.axis.create());
        }
    }
}
