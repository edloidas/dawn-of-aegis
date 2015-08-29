/*
=================
DevActor
	Represents extended version of an actor,
	with the engine object list support.
=================
*/
Objects.prototype.DevActor = function () {
	if ( !(this instanceof Objects.prototype.DevActor) ) {
		return new Objects.prototype.DevActor();
	}
	Objects.prototype.DevActor.super.constructor.call( this );

	this._group = 'dev';
};
extend( Objects.prototype.DevActor, Objects.prototype.Actor );
