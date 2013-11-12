/*
===============================================================================

    Class defines in-game physics and calculations.

===============================================================================
*/
var Engine = new function () {
    var instance;
    function Engine() { if ( !instance ) { instance = this; } else { return instance; } }

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );

    this.axis = new Doa.Axis();
    this.grid = new Doa.Grid();

    /*
    ---------------------------------------------------------------------------
    toogleDevMode
        Turns on/off developer mode. In dev mode meshes, coordinates and grid
        are visible.
    ---------------------------------------------------------------------------
    */
    this.toogleDevMode = function () {
        if ( this.axis.enabled ) {
            this.axis.enabled = false;
            World.scene.remove( this.axis.clear() );
        } else {
            this.axis.enabled = true;
            World.scene.add( this.axis.create() );
        }

        if ( this.grid.enabled ) {
            this.grid.enabled = false;
            World.scene.remove( this.grid.clear() );
        } else {
            this.grid.enabled = true;
            World.scene.add( this.grid.create() );
        }

        // if ( Player.target.enabled ) {
        //     Player.target.enabled = false;
        //     World.scene.remove( Player.target.clear() );
        // } else {
        //     Player.target.enabled = true;
        //     World.scene.add( Player.target.create() );
        // }
    }
}
