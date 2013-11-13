/*
===============================================================================

    Class defines in-game common calculations.

===============================================================================
*/
function Engine() {
    if ( !(this instanceof Engine) ) return new Engine();

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false } );

    this.axis = new DOA.Objects.Axis();
    this.grid = new DOA.Objects.Grid();
}

/*
================
toogleDevMode
    Turns on/off developer mode. In dev mode meshes,
    coordinates and grid are visible.
================
*/
this.toogleDevMode = function () {
    if ( this.axis.enabled ) {
        this.axis.enabled = false;
        DOA.World.scene.remove( this.axis.clear() );
    } else {
        this.axis.enabled = true;
        DOA.World.scene.add( this.axis.create() );
    }

    if ( this.grid.enabled ) {
        this.grid.enabled = false;
        DOA.World.scene.remove( this.grid.clear() );
    } else {
        this.grid.enabled = true;
        DOA.World.scene.add( this.grid.create() );
    }

    // if ( Player.target.enabled ) {
    //     Player.target.enabled = false;
    //     DOA.World.scene.remove( Player.target.clear() );
    // } else {
    //     Player.target.enabled = true;
    //     DOA.World.scene.add( Player.target.create() );
    // }
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Engine = new Engine();
