/*
===============================================================================

    Class defines in-game physics and calculations.

===============================================================================
*/
var Engine = new function () {
    var instance;
    function Engine() { if ( !instance ) { instance = this; } else { return instance; } }

    this.renderer = new THREE.WebGLRenderer( { alpha: false } );

    this.axis = new DOA.Axis();

    /*
    ---------------------------------------------------------------------------
    Drawing methods
    ---------------------------------------------------------------------------
    */
    this.toogleAxis = function () {
        if (this.axis.enabled) {
            this.axis.enabled = false;
            World.scene.remove(this.axis.clear());
        } else {
            this.axis.enabled = true;
            World.scene.add(this.axis.create());
        }
    }
}
