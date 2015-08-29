/*
=================
Axis
	Represents axis, as three vectors.
=================
*/
Objects.prototype.Axis = function () {
	if ( !(this instanceof Objects.prototype.Axis) ) {
		return new Objects.prototype.Axis();
	}
	Objects.prototype.Axis.super.constructor.call( this );

	this.mesh = new THREE.AxisHelper( DOA.Settings.maxView );
};
extend( Objects.prototype.Axis, Objects.prototype.DevActor );
