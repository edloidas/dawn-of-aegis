/*
===============================================================================

	Class defines in-game common calculations.

===============================================================================
*/
function Engine() {
	if ( !(this instanceof Engine) ) return new Engine();

	this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );

	this.axis = new DOA.Objects.Axis();
	this.grid = new DOA.Objects.Grid();

	this._objects = new Cache();
}

/*
================
toogleDevMode
	Turns on/off developer mode. In dev mode meshes,
	coordinates and grid are visible.
================
*/
Engine.prototype.toggleDevMode = function () {
	this.axis.toggle();
	this.grid.toggle();
};

/*
================
animate
	Animates (model animation) all active game objects.
================
*/
Engine.prototype.animate = function ( delta ) {
	for ( var k in this._objects._values ) {
		this._objects.get( k ).animate( delta );
	}
};

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.Engine = new Engine();
