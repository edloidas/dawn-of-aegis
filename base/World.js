/*
===============================================================================

	Class defines world scene.

===============================================================================
*/
function World() {
	if ( !(this instanceof World) ) return new World();

	this.scene = new THREE.Scene();
}

/*
---------------------------------------------------------------------------
DOA
---------------------------------------------------------------------------
*/
DOA.World = new World();
