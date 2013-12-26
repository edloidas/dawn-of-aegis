/*
=================
PlaneTarget
    Entity, that represents target, followed by camera.
=================
*/
Objects.prototype.PlaneTarget = function ( camera ) {
    if ( !(this instanceof Objects.prototype.PlaneTarget) ) {
        return new Objects.prototype.PlaneTarget( camera );
    }
    Objects.prototype.PlaneTarget.super.constructor.call( this, camera );
};
extend( Objects.prototype.PlaneTarget, Objects.prototype.Target );
