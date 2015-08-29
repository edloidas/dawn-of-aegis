/*
=================
Grid
	Represents grid on xz coordinates.
=================
*/
Objects.prototype.Grid = function ( step ) {
	if ( !(this instanceof Objects.prototype.Grid) ) {
		return new Objects.prototype.Grid( step );
	}
	Objects.prototype.Grid.super.constructor.call( this );

	step = step || 50;

	this.mesh = new THREE.GridHelper( DOA.Settings.maxView, step );
};
extend( Objects.prototype.Grid, Objects.prototype.DevActor );
